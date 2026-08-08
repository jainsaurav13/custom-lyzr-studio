# Model specification

The complete calculation chain, so any number in the tool can be traced by hand.
Notation: `t` is the year index starting at 1; `H` is the analysis horizon.

---

## 1. The source workbook, in full

Five sheets, twenty-one formulas. Reproduced here verbatim.

### Assumptions (inputs only)

| Cell | Parameter | Value |
|---|---|---|
| B2 | GPUs | 20,000 |
| B3 | GPU Cost | 30,000 |
| B4 | Other CapEx | 400,000,000 |
| B5 | Debt % | 0.75 |
| B6 | Interest Rate | 0.08 |
| B7 | Loan Tenor (yrs) | 6 |
| B8 | Utilization | 0.75 |
| B9 | Rental $/GPU/hr | 4 |
| B10 | Hours/Year | 8,760 |
| B11 | Opex % Revenue | 0.25 |
| B12 | Nvidia Floor Utilization | 0.50 |
| B13 | Revenue Share Above Floor | 0.10 |

### Operations

```
B1  GPU CapEx               = Assumptions!B2 * Assumptions!B3
B2  Total CapEx             = B1 + Assumptions!B4
B3  Debt                    = B2 * Assumptions!B5
B4  Equity                  = B2 - B3
B5  Annual Revenue          = Assumptions!B2 * Assumptions!B10 * Assumptions!B8 * Assumptions!B9
B6  Operating Expense       = B5 * Assumptions!B11
B7  EBITDA                  = B5 - B6
B8  Interest Expense        = B3 * Assumptions!B6
B9  Principal / Year        = B3 / Assumptions!B7
B10 Cash After Debt Service = B7 - B8 - B9
```

### Backstop

```
B2  Actual Utilization      = Assumptions!B8
B3  Guaranteed Floor        = Assumptions!B12
B4  Shortfall               = MAX(0, B3 - B2)
B5  Backstop Revenue        = B4 * Assumptions!B2 * Assumptions!B10 * Assumptions!B9
B6  Upside Share to Nvidia  = MAX(0, B2 - B3) * Assumptions!B2 * Assumptions!B10
                              * Assumptions!B9 * Assumptions!B13
```

### Credit

```
B2  Cash Available for Debt Service = Operations!B10 + Operations!B8 + Operations!B9
B3  Debt Service                    = Operations!B8 + Operations!B9
B4  DSCR                            = B2 / B3
```

Note `B2` expands to `(EBITDA − I − P) + I + P ≡ EBITDA`. The DSCR is therefore
EBITDA ÷ debt service by construction — a restatement of the EBITDA line, not an
independent test.

### Equity Returns

```
B2  Equity Invested     = Operations!B4
B3  Year 1 Cash Flow    = Operations!B10 + Backstop!B5 - Backstop!B6
B4  Simple Cash Yield   = B3 / B2
```

### Resulting base case

| Line | Value |
|---|---|
| GPU CapEx | $600,000,000 |
| Total CapEx | $1,000,000,000 |
| Debt / Equity | $750,000,000 / $250,000,000 |
| Annual Revenue | $525,600,000 |
| Operating Expense | $131,400,000 |
| EBITDA | $394,200,000 |
| Interest / Principal | $60,000,000 / $125,000,000 |
| Cash After Debt Service | $209,200,000 |
| Backstop Revenue | $0 |
| Upside Share to Nvidia | $17,520,000 |
| DSCR | 2.130811× |
| Year 1 Cash Flow | $191,680,000 |
| Simple Cash Yield | 76.672% |

---

## 2. The extended engine

### Capital

```
capexGpu    = gpus × gpuCost
capexOther  = gpus × otherCapexPerGpu        (workbook: flat $400M)
capex       = capexGpu + capexOther
debt        = capex × debtPct
equity      = capex − debt
capacity    = gpus × hours                    GPU-hours available per year
```

### Revenue

```
price_t  = price0 × (1 − priceDecay)^(t−1)
util_t   = clamp(util0 + utilDrift × (t−1), 0.02, 1)
cov_t    = contractedPct   if t ≤ contractYears, else 0

revContract_t = capacity × cov_t × price0          take-or-pay, at the year-1 rate
revSpot_t     = capacity × (1 − cov_t) × util_t × price_t
revenue_t     = revContract_t + revSpot_t
```

Take-or-pay capacity is paid in full regardless of use, so it carries neither
utilisation nor price risk. This is the mechanism by which contract cover, not
the backstop, does most of the real credit work.

### Backstop

```
inTerm_t     = t ≤ backstopYears
refPrice_t   = price0                              if basis = "fixed"
             = price_t                             if basis = "spot"   ← the workbook
guaranteed_t = floorUtil × capacity × refPrice_t    (0 outside the term)

bsGross_t    = max(0, guaranteed_t − revenue_t)
annCap_t     = annualCapPct × guaranteed_t          (∞ when annualCapPct ≥ 1)
bsPaid_t     = max(0, min(bsGross_t, annCap_t, aggCap − Σbs<t))
bsUnpaid_t   = bsGross_t − bsPaid_t                 the shortfall the guarantee did NOT cover

upside_t     = max(0, revenue_t − guaranteed_t) × sharePct     (0 outside the term)
aggCap       = (aggCapPctGP / 100) × capexGpu × nvGrossMargin
```

Setting `basis = spot`, `backstopYears = tenor`, and both caps to uncapped
reproduces `Backstop!B5` and `Backstop!B6` exactly.

### Costs, tax, EBITDA

```
opexFixed_t = fixedOpexPerGpu × gpus × (1 + opexInfl)^(t−1)
opexVar_t   = varOpexPct × revenue_t
opex_t      = opexFixed_t + opexVar_t
ebitda_t    = revenue_t + bsPaid_t − upside_t − opex_t

dep_t       = capexGpu / gpuLife   (t ≤ gpuLife)  +  capexOther / 20  (t ≤ 20)
taxable_t   = ebitda_t − interest_t − dep_t
```

Losses carry forward without limit and are consumed before tax is charged:

```
if taxable_t ≤ 0:  nol += −taxable_t;  tax_t = 0
else:              used = min(nol, taxable_t)
                   nol −= used
                   tax_t = (taxable_t − used) × taxRate
```

Setting `fixedOpexPerGpu = 0`, `varOpexPct = 0.25`, `opexInfl = 0`,
`taxRate = 0` reproduces `Operations!B6` and `Operations!B7`.

### Debt

```
balance_0   = debt
interest_t  = balance_{t−1} × rate                 ← on the BALANCE, not the original debt
amortYrs    = max(1, tenor − ioYears)

principal_t = 0                                    if t ≤ ioYears or t > tenor
            = debt / amortYrs                      if amort = "straight"
            = max(0, pmt − interest_t)             if amort = "annuity"
              where pmt = debt × rate / (1 − (1+rate)^−amortYrs)
principal_t = min(principal_t, balance_{t−1})

balance_t   = balance_{t−1} − principal_t
debtService_t = interest_t + principal_t
```

In year 1 `interest_1 = debt × rate`, matching `Operations!B8`. From year 2 the
workbook and this engine diverge — deliberately. See flaw 05.

### Cover and equity

```
cfads_t     = ebitda_t − tax_t
dscr_t      = cfads_t / debtService_t
dscrNoBs_t  = (cfads_t − bsPaid_t) / debtService_t   ← what the lenders actually own

equityCF_t  = cfads_t − debtService_t
equityCF_H += capexGpu × residualPct + capexOther × shellResidPct − balance_H
equityCF_0  = −equity

eqIRR       = IRR([equityCF_0 … equityCF_H])         bisection on [−0.95, 8]
eqMOIC      = Σ equityCF_{1..H} / equity
```

Years after the loan is repaid have `debtService_t = 0` and no defined DSCR;
they are excluded from the cover chart rather than plotted as infinity.

### NVIDIA's position

```
grossProfitRaw  = capexGpu × nvGrossMargin
grossProfitEcon = grossProfitRaw × incrementality

nvCF_0 = grossProfitEcon − nvEquityPct × equity
nvCF_t = −bsPaid_t + upside_t + nvEquityPct × equityCF_t

nvNPV      = nvCF_0 + Σ nvCF_t / (1 + nvDiscount)^t
giveback   = PV(bsPaid) / grossProfitRaw
maxExposure = min( Σ_{t ≤ backstopYears} floorUtil × capacity × refPrice_t , aggCap )
```

`giveback` is measured against **raw** gross profit — the accounting profit on
the sale — while `nvNPV` uses the **incrementality-adjusted** figure. The two
answer different questions: how much of the booked margin is at risk, versus
whether the arrangement created value at all.

`maxExposure` is the undiscounted worst case: revenue goes to zero for the whole
backstop term. It is the number a credit committee would size the exposure on.

---

## 3. Monte Carlo

One latent demand factor `z ~ N(0,1)` drives both price and utilisation, so the
two move together:

```
k  = √(1 − ρ²)
f₁ = ρz + k·e₁            e₁, e₂ ~ N(0,1) independent
f₂ = ρz + k·e₂

priceDecay' = clamp(priceDecay + sdDecay × f₁, −0.15, 0.8)
util0'      = clamp(util0     − sdUtil  × f₂,  0.03, 1.0)
```

Note the **opposite signs**: a high draw of `z` means weak demand, which raises
price decay *and* lowers utilisation. Setting `ρ = 0` makes the two risks
diversify and the guarantee look far cheaper than it is.

A demand shock is drawn once per path with probability
`1 − (1 − shockProb)^H`, landing in a uniformly chosen year and applying a
permanent level break from that year onward:

```
util_t  ×= (1 − shockSize)          for t ≥ shockYear
price_t ×= (1 − shockSize × 0.7)    for t ≥ shockYear
```

The generator is a seeded LCG with Box–Muller transformation, so the same
settings always produce identical statistics.

Reported: mean / P5 / P50 / P95 of NVIDIA net PV and equity IRR; expected
shortfall (mean of the worst 5%); probability the backstop is called, the cap
binds, DSCR breaches 1.00×, and equity loses money; and expected backstop cost
both unconditionally and conditional on the worst demand decile. That last pair
is the wrong-way-risk statistic — the ratio between them is how much the
correlation costs.

---

## 4. Sensitivity and solvers

**Heatmap.** 9 price-decay steps (0–40%) × 8 utilisation steps (25–95%), a full
re-projection per cell — 72 model runs. Diverging blue↔red about the metric's
natural threshold (0 for present values and IRR, 1.0× for DSCR, 100% for
give-back); sequential blue where the metric has no meaningful midpoint.

**Tornado.** Ten drivers, each moved to a low and a high case with everything
else held at the current settings, sorted by swing. Bars are coloured by whether
the outcome improves or worsens, not by which direction the input moved — a
higher floor and a lower price decay both read as "better" on their own terms.

**Break-even.** Bisection to 60 iterations on:

- year-1 rental rate where minimum DSCR = 1.00×
- year-1 rental rate where equity IRR = 0%
- year-1 rental rate and year-1 utilisation that first trigger the backstop
- price decay where NVIDIA's net PV = 0

A break-even *above* today's rate means the threshold is already breached, and
is reported as such rather than as headroom.
