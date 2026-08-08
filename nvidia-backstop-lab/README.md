# NVIDIA Backstop Lab

An interactive model of the vendor-backstop GPU project financing described in
`AI_GPU_Project_Finance_Model_Template.xlsx` — rebuilt so you can move the
assumptions and watch who actually ends up holding the risk.

The source workbook answers one question: *what does this deal look like in a
single good year?* This tool answers the question underneath it: **what is the
backstop actually worth, to whom, and in which states of the world does it stop
working?**

Open `index.html`. No build, no server, no dependencies.

---

## The deal being modelled

An SPV buys 20,000 GPUs for $600M and builds $400M of datacenter around them.
$750M of that $1.0B is senior debt at 8% over 6 years; $250M is sponsor equity.
The fleet rents at $4.00/GPU/hour at 75% utilisation.

NVIDIA — the vendor — sits on **both sides**:

- it **sells** the GPUs (booking gross profit at t = 0),
- it **guarantees** a 50% utilisation floor (paying cash into the SPV if revenue
  falls short),
- it **takes 10%** of revenue above that floor.

So NVIDIA is short a put on GPU demand and long a capped call, with the premium
paid in hardware margin it books immediately. The workbook models the SPV's view
of this. It never models NVIDIA's.

---

## What the tool does

| Panel | What it answers |
|---|---|
| **Verdict strip** | NVIDIA's net present position, and the *give-back ratio* — how much of the sale profit the guarantee hands back |
| **Flow of funds** | Year-1 cash between sponsors, lenders, customers, NVIDIA and the SPV, with arrow width proportional to dollars |
| **Projection** | Revenue by source, cost stack, DSCR **with and without the backstop**, and NVIDIA's cumulative position year by year |
| **Sensitivity** | A price-decay × utilisation surface for six different outputs, a tornado ranking every driver, and break-even solvers |
| **Monte Carlo** | 2,000 correlated paths — distributions, tail statistics, and the probability the guarantee is called, capped, or breached |
| **Risk register** | Eleven live findings that re-severity themselves as you move the controls |
| **Audit** | Every workbook formula, a cell-for-cell tie-out, and the twelve modelling gaps |

Six scenario presets, from **Reproduce workbook** (the Excel exactly as written)
to **2001 redux** (the dark-fibre ending). Every setting is encoded in the URL —
`Copy scenario link` shares the exact state you're looking at.

---

## The headline findings

**1. The guarantee is denominated in the wrong unit.**
`Backstop!B5 = B4 * Assumptions!B2 * B10 * B9` measures the shortfall in
*utilisation* and then prices it at the *current* rental rate. Two consequences:

- A pure price collapse triggers **nothing**. Keep the fleet full at $1.30/hr
  instead of $4.00 and utilisation never breaches 50%, so the floor never pays,
  while the SPV starves.
- When the floor *is* breached, it pays out at the collapsed price — the
  guarantee shrinks exactly as it is needed.

The `Floor is valued at` toggle switches between the workbook's spot basis and a
year-1-price basis. The gap between them is the difference between a utilisation
floor and a revenue floor, and it is large.

**2. The lenders are underwriting NVIDIA, not the business.**
Plot DSCR with the backstop removed. Where that line sits below 1.00×, the loan
is repaid out of a vendor guarantee. That is corporate credit exposure to NVIDIA
wearing project-finance clothes — and the workbook's own DSCR
(`Credit!B4`) cannot show it, because `Operations!B10` never picks the backstop
up in the first place.

**3. The risks do not diversify — they are the same risk.**
Cheap GPU-hours and empty GPU-hours arrive together, in the same demand
downturn that pressures NVIDIA's own order book. The Monte Carlo draws price and
utilisation from one common factor for exactly this reason. At the default
settings the expected backstop cost roughly doubles in the worst demand decile.

**4. Caps protect the guarantor by destroying the guarantee.**
An aggregate cap is the standard fix for exposure like this. Set one and watch
the *unpaid* shortfall appear — the support switches off partway through the
stress it was written for, at precisely the moment the lenders were relying on
it.

**5. The base case assumes a yield that guarantees its own erosion.**
$4.00/hr at 75% utilisation is $26,280 per GPU per year against $50,000 of
all-in installed cost — a two-year payback. Returns like that attract capacity,
and capacity is what compresses the rental rate. The workbook holds the price
flat while assuming a yield that makes flat prices implausible.

---

## What was fixed relative to the workbook

Every one of these is reproduced in the **Audit** section with the offending
cell reference.

| # | The workbook | This tool |
|---|---|---|
| 01 | One year, held flat | Full schedule to the horizon, debt balance rolling |
| 02 | Rental rate is a constant | Annual price decay, plus decay sensitivity |
| 03 | Floor measured in utilisation, priced at spot | Basis toggle: spot or year-1 price |
| 04 | Opex 100% variable with revenue | Fixed $/GPU/yr + variable %, with inflation |
| 05 | Interest charged on *original* debt forever | Interest accrues on the closing balance |
| 06 | Backstop never reaches `Operations!B10` | DSCR shown with and without it |
| 07 | DSCR is EBITDA ÷ debt service by construction | CFADS built from the cash statement, after tax |
| 08 | Backstop uncapped and undated | Annual cap, aggregate cap, term, unpaid shortfall tracked |
| 09 | NVIDIA's own P&L absent | Full NVIDIA position, PV, give-back ratio, max exposure |
| 10 | No tax, depreciation, residual or exit | Cash tax with loss carry-forward, depreciation, residual exit |
| 11 | Datacenter capex hardcoded at $400M | Expressed per installed GPU |
| 12 | Every risk independent | Correlated Monte Carlo with a demand-shock jump |

Two additions have no workbook equivalent and are worth understanding before you
read the outputs:

- **Take-or-pay cover.** Contracted capacity is paid in full at the year-1 rate
  whether or not the customer uses it, so that slice is immune to both
  utilisation and price. The workbook treats every GPU-hour as spot. Raising
  contract cover therefore *raises* year-1 revenue above the workbook's number.
- **Incrementality.** The share of the order that would not have happened
  without the backstop. At 100% the guarantee buys real revenue; at 0% NVIDIA
  wrote a free option against demand it already had. This is the difference
  between vendor financing and round-tripping, and it is a judgement, not a
  calculation.

---

## Verifying it

Select **Reproduce workbook** and scroll to the Audit section. All 16 checkable
values from the source file — every `Operations`, `Backstop`, `Credit` and
`Equity Returns` output — are compared cell for cell. Any non-zero difference is
a bug in this tool, and it says so.

```
Operations!B5   Annual Revenue   =B2*B10*B8*B9        $526M    $526M   match
Credit!B4       DSCR             =B2/B3            2.130811 2.130811   match
Equity!B4       Simple Cash Yield =B3/B2           0.766720 0.766720   match
```

---

## Layout

```
src/page.html    markup + the full design system (tokens, both themes)
src/app.js       the engine, chart primitives, formatters
src/app2.js      sensitivity, Monte Carlo, risk register, wiring
build.mjs        concatenates the three into the two outputs below
index.html       ← generated. the standalone app. open this.
artifact.html    ← generated. same page, no document skeleton
```

Run `node build.mjs` after editing anything in `src/`.

The single-file output is deliberate: the whole thing runs from a file:// URL
with no toolchain, which matters for something a credit committee might open on
a laptop with no network.

---

## Caveats

Every number here is a modelled illustration of the assumptions you set. Nothing
is sourced from NVIDIA disclosure, and the deal parameters come from the
template workbook, not from any real transaction. Present values discount from
year 1; the GPU sale and the equity draw are treated as t = 0. The Monte Carlo
uses a fixed seed, so the same settings always produce the same statistics.

The model deliberately stops short of a few things a real credit analysis would
include: no debt covenants with cash sweeps or lock-up tests, no construction
period or ramp, no working capital, no refinancing at maturity, and a single
flat discount rate rather than separate cost of capital by claim. It also treats
NVIDIA's guarantee as certain to be honoured — the one risk a backstop analysis
can never model from inside the backstop.
