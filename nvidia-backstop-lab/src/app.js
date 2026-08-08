/* ============================================================================
   NVIDIA BACKSTOP LAB
   A rebuild of AI_GPU_Project_Finance_Model_Template.xlsx as a live model.

   The source workbook is 5 sheets / 21 formulas, single-period, held flat.
   This engine keeps every one of those formulas intact (see WORKBOOK preset +
   the tie-out table) and then extends it along the axes the workbook cannot
   see: time, price decay, contract cover, cost fixity, caps, tax, and
   correlated demand risk.
   ========================================================================== */

/* ------------------------------------------------------------------ utils */
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const sum = a => a.reduce((s, x) => s + x, 0);
const MINUS = '−';

function fmtUSD(v, force) {
  if (v == null || !isFinite(v)) return '—';
  const s = v < 0 ? MINUS : '';
  const a = Math.abs(v);
  if (a >= 1e9) return s + '$' + (a / 1e9).toFixed(a / 1e9 >= 10 ? 1 : 2) + 'B';
  if (a >= 1e6) return s + '$' + (a / 1e6).toFixed(a / 1e6 >= 10 ? 0 : 1) + 'M';
  if (a >= 1e3) return s + '$' + (a / 1e3).toFixed(0) + 'K';
  return s + '$' + a.toFixed(force ? 2 : 0);
}
const fmtM = v => (v == null || !isFinite(v)) ? '—'
  : (v < 0 ? MINUS : '') + '$' + (Math.abs(v) / 1e6).toFixed(Math.abs(v) >= 1e8 ? 0 : 1) + 'M';
const fmtPct = (v, d = 1) => (v == null || !isFinite(v)) ? '—'
  : (v < 0 ? MINUS : '') + (Math.abs(v) * 100).toFixed(d) + '%';
const fmtX = v => v == null ? '—' : (isFinite(v) ? v.toFixed(2) + '×' : '∞');
const fmtInt = v => v.toLocaleString('en-US');

/* ------------------------------------------------------------- controls spec */
const SPEC = [
  { g: 'Fleet & capital', open: true, items: [
    { k: 'gpus', l: 'GPUs deployed', min: 1000, max: 100000, step: 1000, d: 20000, f: fmtInt },
    { k: 'gpuCost', l: 'Cost per GPU', min: 10000, max: 60000, step: 1000, d: 30000, f: v => '$' + fmtInt(v) },
    { k: 'otherCapexPerGpu', l: 'Datacenter capex per GPU', min: 0, max: 50000, step: 1000, d: 20000, f: v => '$' + fmtInt(v),
      note: 'Shell, power, cooling, networking. The workbook fixes this at $400M for 20,000 GPUs, i.e. $20k each — but never rescales it when fleet size changes.' },
    { k: 'debtPct', l: 'Debt share of capex', min: 0, max: 0.9, step: 0.01, d: 0.75, f: v => fmtPct(v, 0) },
    { k: 'rate', l: 'Interest rate', min: 0.03, max: 0.18, step: 0.0025, d: 0.08, f: v => fmtPct(v, 2) },
    { k: 'tenor', l: 'Loan tenor', min: 3, max: 10, step: 1, d: 6, f: v => v + ' yrs' },
    { k: 'ioYears', l: 'Interest-only period', min: 0, max: 4, step: 1, d: 0, f: v => v + ' yrs' },
    { k: 'amort', l: 'Amortisation', type: 'seg', opts: [['straight', 'Straight-line'], ['annuity', 'Annuity']], d: 'straight' },
  ]},
  { g: 'Demand & pricing', open: true, items: [
    { k: 'util0', l: 'Year-1 utilisation', min: 0.1, max: 1, step: 0.01, d: 0.75, f: v => fmtPct(v, 0) },
    { k: 'utilDrift', l: 'Utilisation drift / yr', min: -0.12, max: 0.06, step: 0.005, d: 0, f: v => (v >= 0 ? '+' : MINUS) + (Math.abs(v) * 100).toFixed(1) + 'pp' },
    { k: 'price0', l: 'Rental rate, year 1', min: 0.4, max: 10, step: 0.05, d: 4, f: v => '$' + v.toFixed(2) + '/hr' },
    { k: 'priceDecay', l: 'Rental price decay / yr', min: -0.1, max: 0.55, step: 0.01, d: 0, f: v => (v >= 0 ? MINUS : '+') + (Math.abs(v) * 100).toFixed(0) + '%',
      note: 'The variable the workbook does not have. Each GPU generation resets the price of the last one.' },
    { k: 'contractedPct', l: 'Fleet under take-or-pay', min: 0, max: 1, step: 0.05, d: 0, f: v => fmtPct(v, 0),
      note: 'Contracted capacity is paid in full at the year-1 rate whether or not the customer uses it, so this slice is immune to both utilisation and price. The workbook has no equivalent — it treats every GPU-hour as spot.' },
    { k: 'contractYears', l: 'Contract term', min: 0, max: 10, step: 1, d: 3, f: v => v + ' yrs' },
    { k: 'hours', l: 'Sellable hours / yr', min: 6000, max: 8760, step: 60, d: 8760, f: fmtInt },
  ]},
  { g: 'Operating costs & tax', items: [
    { k: 'fixedOpexPerGpu', l: 'Fixed opex per GPU / yr', min: 0, max: 12000, step: 250, d: 0, f: v => '$' + fmtInt(v),
      note: 'Power, colo, staff, maintenance — incurred whether or not the GPU is rented. The workbook sets this to zero and makes 100% of opex flex with revenue.' },
    { k: 'varOpexPct', l: 'Variable opex, % of revenue', min: 0, max: 0.5, step: 0.01, d: 0.25, f: v => fmtPct(v, 0) },
    { k: 'opexInfl', l: 'Fixed opex inflation / yr', min: -0.05, max: 0.2, step: 0.005, d: 0, f: v => fmtPct(v, 1) },
    { k: 'taxRate', l: 'Cash tax rate', min: 0, max: 0.35, step: 0.01, d: 0, f: v => fmtPct(v, 0) },
    { k: 'gpuLife', l: 'GPU depreciation life', min: 2, max: 8, step: 1, d: 5, f: v => v + ' yrs' },
  ]},
  { g: 'NVIDIA backstop terms', open: true, items: [
    { k: 'floorUtil', l: 'Guaranteed floor utilisation', min: 0, max: 1, step: 0.01, d: 0.5, f: v => fmtPct(v, 0) },
    { k: 'sharePct', l: 'NVIDIA share of upside', min: 0, max: 0.5, step: 0.01, d: 0.1, f: v => fmtPct(v, 0) },
    { k: 'basis', l: 'Floor is valued at', type: 'seg', d: 'spot',
      opts: [['spot', 'Spot price'], ['fixed', 'Year-1 price']],
      note: 'The workbook multiplies the shortfall by the CURRENT rental rate, so the guarantee shrinks exactly as prices fall. Switch to year-1 price to see what a real revenue floor costs.' },
    { k: 'backstopYears', l: 'Backstop term', min: 0, max: 10, step: 1, d: 6, f: v => v + ' yrs' },
    { k: 'annualCapPct', l: 'Annual cap, % of floor revenue', min: 0, max: 1, step: 0.05, d: 1, f: v => v >= 1 ? 'uncapped' : fmtPct(v, 0) },
    { k: 'aggCapPctGP', l: 'Aggregate cap, % of gross profit', min: 0, max: 400, step: 10, d: 400, f: v => v >= 400 ? 'uncapped' : v + '%',
      note: 'Where the guarantee stops. A cap protects NVIDIA and simultaneously destroys the credit support the lenders thought they had.' },
  ]},
  { g: 'NVIDIA economics', items: [
    { k: 'nvGrossMargin', l: 'Gross margin on GPU sale', min: 0, max: 0.9, step: 0.01, d: 0.75, f: v => fmtPct(v, 0) },
    { k: 'incrementality', l: 'Sale is incremental', min: 0, max: 1, step: 0.05, d: 1, f: v => fmtPct(v, 0),
      note: 'How much of this order would NOT have happened without the backstop. At 100% the guarantee buys real revenue; at 0% NVIDIA wrote a free option on demand it already had.' },
    { k: 'nvEquityPct', l: 'NVIDIA equity in the SPV', min: 0, max: 0.5, step: 0.01, d: 0, f: v => fmtPct(v, 0) },
    { k: 'nvDiscount', l: 'Discount rate', min: 0, max: 0.25, step: 0.005, d: 0.1, f: v => fmtPct(v, 1) },
  ]},
  { g: 'Exit & horizon', items: [
    { k: 'horizon', l: 'Analysis horizon', min: 3, max: 12, step: 1, d: 8, f: v => v + ' yrs' },
    { k: 'residualPct', l: 'GPU residual at exit', min: 0, max: 0.6, step: 0.01, d: 0.1, f: v => fmtPct(v, 0) },
    { k: 'shellResidPct', l: 'Datacenter residual at exit', min: 0, max: 1, step: 0.05, d: 0.3, f: v => fmtPct(v, 0) },
  ]},
  { g: 'Monte Carlo', items: [
    { k: 'mcPaths', l: 'Paths', min: 500, max: 5000, step: 500, d: 2000, f: fmtInt },
    { k: 'sdDecay', l: 'Price decay volatility', min: 0, max: 0.3, step: 0.01, d: 0.1, f: v => fmtPct(v, 0) + 'pp' },
    { k: 'sdUtil', l: 'Utilisation volatility', min: 0, max: 0.35, step: 0.01, d: 0.12, f: v => fmtPct(v, 0) + 'pp' },
    { k: 'rho', l: 'Price / utilisation correlation', min: 0, max: 1, step: 0.05, d: 0.75, f: v => v.toFixed(2),
      note: 'At 0 the two risks diversify. At 1 they are the same risk — cheap GPUs and empty GPUs arrive together, and the backstop is called precisely when NVIDIA can least afford it.' },
    { k: 'shockProb', l: 'Annual demand-shock probability', min: 0, max: 0.3, step: 0.01, d: 0.06, f: v => fmtPct(v, 0) },
    { k: 'shockSize', l: 'Shock severity', min: 0, max: 0.7, step: 0.05, d: 0.35, f: v => fmtPct(v, 0) },
  ]},
];

const FIELD = {};
SPEC.forEach(g => g.items.forEach(i => FIELD[i.k] = i));

/* ------------------------------------------------------------------ presets */
const WORKBOOK = {
  gpus: 20000, gpuCost: 30000, otherCapexPerGpu: 20000, debtPct: 0.75, rate: 0.08,
  tenor: 6, ioYears: 0, amort: 'straight',
  util0: 0.75, utilDrift: 0, price0: 4, priceDecay: 0, contractedPct: 0, contractYears: 3, hours: 8760,
  fixedOpexPerGpu: 0, varOpexPct: 0.25, opexInfl: 0, taxRate: 0, gpuLife: 5,
  floorUtil: 0.5, sharePct: 0.1, basis: 'spot', backstopYears: 6, annualCapPct: 1, aggCapPctGP: 400,
  nvGrossMargin: 0.75, incrementality: 1, nvEquityPct: 0, nvDiscount: 0.1,
  horizon: 6, residualPct: 0, shellResidPct: 0,
  mcPaths: 2000, sdDecay: 0.1, sdUtil: 0.12, rho: 0.75, shockProb: 0.06, shockSize: 0.35,
};

const REPAIRED = Object.assign({}, WORKBOOK, {
  fixedOpexPerGpu: 4500, varOpexPct: 0.08, opexInfl: 0.03, taxRate: 0.21,
  priceDecay: 0.12, utilDrift: -0.01, contractedPct: 0.4, contractYears: 3,
  basis: 'fixed', backstopYears: 5, aggCapPctGP: 150,
  horizon: 8, residualPct: 0.1, shellResidPct: 0.3,
});

const PRESETS = [
  { id: 'workbook', name: 'Reproduce workbook', v: WORKBOOK,
    blurb: 'Every assumption exactly as the Excel has it: one year, no decay, no fixed costs, no tax, no caps.' },
  { id: 'repaired', name: 'Base (repaired)', v: REPAIRED,
    blurb: 'The same deal with the workbook’s structural gaps filled in: price decay, fixed operating costs, contract cover, tax, caps and a term structure.' },
  { id: 'holds', name: 'Demand holds', v: Object.assign({}, REPAIRED, {
      priceDecay: 0.05, util0: 0.85, utilDrift: 0, contractedPct: 0.55, contractYears: 4 }),
    blurb: 'Scarcity persists. Mild price erosion, fleet stays near full, strong contract book.' },
  { id: 'pricewar', name: 'Price war', v: Object.assign({}, REPAIRED, {
      priceDecay: 0.28, util0: 0.7, utilDrift: -0.02 }),
    blurb: 'Capacity arrives faster than demand. The fleet still fills, but at collapsing rates — the case a utilisation-based floor is blind to.' },
  { id: 'airpocket', name: 'Air pocket', v: Object.assign({}, REPAIRED, {
      priceDecay: 0.35, util0: 0.45, utilDrift: -0.03, contractedPct: 0.15, contractYears: 2 }),
    blurb: 'A demand pause. Both price and utilisation break at once, and the contract book has rolled off.' },
  { id: 'telecom', name: '2001 redux', v: Object.assign({}, REPAIRED, {
      priceDecay: 0.45, util0: 0.3, utilDrift: -0.02, contractedPct: 0.1, contractYears: 1,
      rate: 0.12, aggCapPctGP: 120 }),
    blurb: 'The dark-fibre ending: overbuild, price collapse, credit repricing, and vendor financing that turns into a write-off.' },
];

/* ------------------------------------------------------------------- state */
let P = Object.assign({}, REPAIRED);
let activePreset = 'repaired';

/* ============================================================== THE ENGINE */
function project(p) {
  const N = p.gpus;
  const capexGpu = N * p.gpuCost;
  const capexOther = N * p.otherCapexPerGpu;
  const capex = capexGpu + capexOther;
  const debt = capex * p.debtPct;
  const equity = capex - debt;
  const H = Math.round(p.horizon);
  const capacity = N * p.hours;                 // GPU-hours available per year

  const grossProfitRaw = capexGpu * p.nvGrossMargin;
  const grossProfitEcon = grossProfitRaw * p.incrementality;
  const aggCap = (p.aggCapPctGP >= 400) ? Infinity : (p.aggCapPctGP / 100) * grossProfitRaw;

  // annuity payment if selected
  const amortYrs = Math.max(1, Math.round(p.tenor) - Math.round(p.ioYears));
  const pmt = p.rate > 0
    ? debt * p.rate / (1 - Math.pow(1 + p.rate, -amortYrs))
    : debt / amortYrs;

  let bal = debt, aggPaid = 0, nol = 0;
  const years = [];

  // optional demand shock (used by the Monte Carlo): a level break from
  // `shockYear` onward, hitting utilisation and price together.
  const shockYr = p.shockYear || 0;
  const shocked = t => shockYr > 0 && t >= shockYr;

  for (let t = 1; t <= H; t++) {
    let price = p.price0 * Math.pow(1 - p.priceDecay, t - 1);
    let util = clamp(p.util0 + p.utilDrift * (t - 1), 0.02, 1);
    if (shocked(t)) {
      price *= (1 - (p.shockPriceCut || 0));
      util = clamp(util * (1 - (p.shockUtilCut || 0)), 0.01, 1);
    }
    const cov = (t <= Math.round(p.contractYears)) ? p.contractedPct : 0;

    // take-or-pay slice is paid in full at the year-1 rate regardless of use
    const revContract = capacity * cov * p.price0;
    const revSpot = capacity * (1 - cov) * util * price;
    const revenue = revContract + revSpot;
    const effUtil = revenue / (capacity * p.price0 || 1); // revenue expressed in yr-1-price utilisation units

    // ---- backstop
    const inTerm = t <= Math.round(p.backstopYears);
    const refPrice = (p.basis === 'fixed') ? p.price0 : price;
    const guaranteed = inTerm ? p.floorUtil * capacity * refPrice : 0;
    const bsGross = Math.max(0, guaranteed - revenue);
    const annCap = (p.annualCapPct >= 1) ? Infinity : p.annualCapPct * guaranteed;
    const bsPaid = Math.max(0, Math.min(bsGross, annCap, aggCap - aggPaid));
    aggPaid += bsPaid;
    const bsUnpaid = bsGross - bsPaid;
    const upside = inTerm ? Math.max(0, revenue - guaranteed) * p.sharePct : 0;

    // ---- costs
    const opexFixed = p.fixedOpexPerGpu * N * Math.pow(1 + p.opexInfl, t - 1);
    const opexVar = p.varOpexPct * revenue;
    const opex = opexFixed + opexVar;
    const ebitda = revenue + bsPaid - upside - opex;

    // ---- debt
    const interest = bal * p.rate;
    let principal = 0;
    if (t > Math.round(p.ioYears) && t <= Math.round(p.tenor)) {
      principal = (p.amort === 'annuity') ? Math.max(0, pmt - interest) : debt / amortYrs;
      principal = Math.min(principal, bal);
    }
    const debtService = interest + principal;

    // ---- tax with loss carry-forward
    const depGpu = t <= Math.round(p.gpuLife) ? capexGpu / Math.round(p.gpuLife) : 0;
    const depOther = t <= 20 ? capexOther / 20 : 0;
    const dep = depGpu + depOther;
    let taxable = ebitda - interest - dep, tax = 0;
    if (taxable <= 0) { nol += -taxable; }
    else { const use = Math.min(nol, taxable); nol -= use; tax = (taxable - use) * p.taxRate; }

    const cfads = ebitda - tax;
    const dscr = debtService > 0 ? cfads / debtService : Infinity;
    const dscrNoBs = debtService > 0 ? (cfads - bsPaid) / debtService : Infinity;

    bal = bal - principal;
    let equityCF = cfads - debtService;
    let terminal = 0;
    if (t === H) {
      terminal = capexGpu * p.residualPct + capexOther * p.shellResidPct - bal;
      equityCF += terminal;
    }

    years.push({ t, price, util, effUtil, cov, revContract, revSpot, revenue,
      guaranteed, bsGross, bsPaid, bsUnpaid, upside, opexFixed, opexVar, opex, ebitda,
      interest, principal, debtService, dep, tax, cfads, dscr, dscrNoBs,
      balance: bal, equityCF, terminal });
  }

  // ---- aggregates
  const d = p.nvDiscount;
  const pv = arr => arr.reduce((s, v, i) => s + v / Math.pow(1 + d, i + 1), 0);

  const pvBackstop = pv(years.map(y => y.bsPaid));
  const pvUpside = pv(years.map(y => y.upside));
  const pvNvEquity = pv(years.map(y => y.equityCF * p.nvEquityPct));
  const nvT0 = grossProfitEcon - p.nvEquityPct * equity;
  const nvNPV = nvT0 - pvBackstop + pvUpside + pvNvEquity;

  const nvCum = []; let run = nvT0;
  years.forEach(y => { run += -y.bsPaid + y.upside + y.equityCF * p.nvEquityPct; nvCum.push(run); });

  const equityCFs = [-equity].concat(years.map(y => y.equityCF));
  const eqIRR = irr(equityCFs);
  const eqMOIC = equity > 0 ? sum(years.map(y => y.equityCF)) / equity : null;

  const dscrs = years.map(y => y.dscr).filter(isFinite);
  const minDSCR = dscrs.length ? Math.min.apply(null, dscrs) : null;
  const minDSCRNoBs = years.map(y => y.dscrNoBs).filter(isFinite);

  return {
    p, years, capexGpu, capexOther, capex, debt, equity, capacity,
    grossProfitRaw, grossProfitEcon, aggCap,
    pvBackstop, pvUpside, nvT0, nvNPV, nvCum,
    eqIRR, eqMOIC, minDSCR,
    minDSCRNoBs: minDSCRNoBs.length ? Math.min.apply(null, minDSCRNoBs) : null,
    cumBackstop: sum(years.map(y => y.bsPaid)),
    cumUnpaid: sum(years.map(y => y.bsUnpaid)),
    cumUpside: sum(years.map(y => y.upside)),
    giveback: grossProfitRaw > 0 ? pvBackstop / grossProfitRaw : 0,
    yearsCalled: years.filter(y => y.bsPaid > 1).length,
    yearsBelow1: years.filter(y => isFinite(y.dscr) && y.dscr < 1).length,
    yearsBelow1NoBs: years.filter(y => isFinite(y.dscrNoBs) && y.dscrNoBs < 1).length,
    capBinds: years.some(y => y.bsUnpaid > 1),
  };
}

function irr(cf) {
  const npv = r => cf.reduce((s, c, i) => s + c / Math.pow(1 + r, i), 0);
  let lo = -0.9499, hi = 8;
  let flo = npv(lo), fhi = npv(hi);
  if (!isFinite(flo) || !isFinite(fhi) || flo * fhi > 0) return null;
  for (let i = 0; i < 160; i++) {
    const m = (lo + hi) / 2, fm = npv(m);
    if (flo * fm <= 0) { hi = m; fhi = fm; } else { lo = m; flo = fm; }
  }
  return (lo + hi) / 2;
}

/* --------------------------------------------------------------- metrics */
const METRICS = [
  { k: 'nvNPV', l: 'NVIDIA net PV', mid: 0, fmt: fmtM, get: r => r.nvNPV, better: 'high',
    desc: 'Gross profit booked on the sale, less the present value of backstop calls, plus the upside share.' },
  { k: 'giveback', l: 'Give-back ratio', mid: 1, fmt: v => fmtPct(v, 0), get: r => r.giveback, better: 'low',
    desc: 'Present value of backstop calls as a share of the gross profit on the sale. Above 100% the sale loses money.' },
  { k: 'eqIRR', l: 'Equity IRR', mid: 0, fmt: v => fmtPct(v, 1), get: r => r.eqIRR, better: 'high',
    desc: 'Sponsor return over the full horizon, including the exit.' },
  { k: 'minDSCR', l: 'Minimum DSCR', mid: 1, fmt: fmtX, get: r => r.minDSCR, better: 'high',
    desc: 'The worst year of debt-service cover. Below 1.00× the business cannot pay its lenders from operations.' },
  { k: 'minDSCRNoBs', l: 'Min DSCR excl. backstop', mid: 1, fmt: fmtX, get: r => r.minDSCRNoBs, better: 'high',
    desc: 'The same, with NVIDIA’s support removed — what the lenders are actually underwriting.' },
  { k: 'cumBackstop', l: 'Cumulative backstop paid', mid: null, fmt: fmtM, get: r => r.cumBackstop, better: 'low',
    desc: 'Total cash NVIDIA hands back over the term.' },
];
const METRIC = {}; METRICS.forEach(m => METRIC[m.k] = m);

/* ============================================================ SVG HELPERS */
const NS = 'http://www.w3.org/2000/svg';
function el(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}
function txt(parent, x, y, s, cls, extra) {
  const e = el('text', Object.assign({ x, y, class: cls || '' }, extra || {}), parent);
  e.textContent = s;
  return e;
}
const clear = n => { while (n.firstChild) n.removeChild(n.firstChild); };
const cssv = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
function luma(hex) {
  const h = (hex || '').replace('#', '');
  if (h.length !== 6) return 1;
  const c = [0, 2, 4].map(i => {
    const v = parseInt(h.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

function niceTicks(min, max, n) {
  if (min === max) { max = min + 1; }
  const span = max - min;
  const raw = span / Math.max(1, n);
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
  // extend outward so the returned range always CONTAINS [min,max] — otherwise
  // callers that take ticks[0] as the axis floor silently clip their own data
  const out = [];
  const start = Math.floor(min / step) * step;
  const end = Math.ceil(max / step) * step;
  for (let v = start; v <= end + step * 1e-9; v += step) out.push(+v.toFixed(10));
  return out;
}

/* tooltip */
const TT = () => document.getElementById('tt');
function showTT(evt, html) {
  const t = TT();
  t.innerHTML = html;
  t.classList.add('on');
  t.setAttribute('aria-hidden', 'false');
  const r = t.getBoundingClientRect();
  let x = evt.clientX + 14, y = evt.clientY - 12;
  if (x + r.width > window.innerWidth - 8) x = evt.clientX - r.width - 14;
  if (y + r.height > window.innerHeight - 8) y = window.innerHeight - r.height - 8;
  if (y < 8) y = 8;
  t.style.left = x + 'px'; t.style.top = y + 'px';
}
function hideTT() { const t = TT(); t.classList.remove('on'); t.setAttribute('aria-hidden', 'true'); }

function ttRows(title, rows, total) {
  let h = '<h5>' + title + '</h5>';
  rows.forEach(r => {
    h += '<div class="tt-row">' + (r.c ? '<span class="key" style="background:' + r.c + '"></span>' : '') +
      '<span class="k">' + r.k + '</span><span class="v">' + r.v + '</span></div>';
  });
  if (total) h += '<div class="tt-row total"><span class="k">' + total.k + '</span><span class="v">' + total.v + '</span></div>';
  return h;
}

/* legend builder */
function legend(node, items) {
  node.innerHTML = items.map(i =>
    '<span class="item"><span class="key' + (i.line ? ' line' : '') + '" style="background:' + i.c + '"></span>' + i.l + '</span>'
  ).join('');
}

/* generic data table */
function table(node, cols, rows, foot) {
  let h = '<div class="tbl-wrap"><table class="data"><thead><tr>' +
    cols.map(c => '<th>' + c + '</th>').join('') + '</tr></thead><tbody>';
  rows.forEach(r => {
    h += '<tr>' + r.map((c, i) => {
      const neg = typeof c === 'string' && c.indexOf(MINUS) === 0;
      return '<td' + (neg ? ' class="neg"' : '') + '>' + c + '</td>';
    }).join('') + '</tr>';
  });
  h += '</tbody>' + (foot ? '<tfoot><tr>' + foot.map(c => '<td>' + c + '</td>').join('') + '</tr></tfoot>' : '') + '</table></div>';
  node.innerHTML = h;
}

/* ======================================================= CHART: STACKED COL */
function stackedColumns(svg, o) {
  clear(svg);
  const W = 640, Hh = 300, m = { t: 14, r: 14, b: 34, l: 54 };
  const iw = W - m.l - m.r, ih = Hh - m.t - m.b;
  const n = o.cats.length;
  const band = iw / n;
  const bw = Math.min(24, band * 0.62);

  const tot = o.cats.map((_, i) => sum(o.series.map(s => Math.max(0, s.v[i]))));
  const negTot = o.cats.map((_, i) => sum(o.series.map(s => Math.min(0, s.v[i]))));
  const yMax = Math.max.apply(null, tot.concat(o.line ? o.line.v : []).concat([0]));
  const yMin = Math.min.apply(null, negTot.concat(o.line ? o.line.v : []).concat([0]));
  const ticks = niceTicks(yMin, yMax * 1.06, 5);
  const lo = Math.min(ticks[0], yMin), hi = Math.max(ticks[ticks.length - 1], yMax);
  const Y = v => m.t + ih - (v - lo) / (hi - lo) * ih;

  ticks.forEach(v => {
    el('line', { class: 'gridline', x1: m.l, x2: m.l + iw, y1: Y(v), y2: Y(v) }, svg);
    txt(svg, m.l - 8, Y(v) + 3.5, o.yFmt(v), 'tick', { 'text-anchor': 'end' });
  });
  el('line', { class: 'baseline', x1: m.l, x2: m.l + iw, y1: Y(0), y2: Y(0) }, svg);

  const surf = cssv('--surface');
  o.cats.forEach((c, i) => {
    const cx = m.l + band * i + band / 2;
    txt(svg, cx, Hh - 12, c, 'tick', { 'text-anchor': 'middle' });

    let acc = 0, accN = 0;
    o.series.forEach(s => {
      const v = s.v[i];
      if (Math.abs(v) < 1e-6) return;
      let y0, y1;
      if (v > 0) { y0 = Y(acc); y1 = Y(acc + v); acc += v; }
      else { y0 = Y(accN); y1 = Y(accN + v); accN += v; }
      const top = Math.min(y0, y1), h = Math.abs(y1 - y0);
      if (h < 0.4) return;
      el('rect', { x: cx - bw / 2, y: top, width: bw, height: Math.max(0.8, h - 2),
        fill: s.c, rx: 2 }, svg);
    });

    // hover target across the whole band
    const hit = el('rect', { x: m.l + band * i, y: m.t, width: band, height: ih,
      fill: 'transparent', style: 'cursor:crosshair' }, svg);
    const rows = o.series.filter(s => Math.abs(s.v[i]) > 1e-6)
      .map(s => ({ c: s.c, k: s.l, v: o.yFmtFull(s.v[i]) }));
    if (o.line) rows.push({ c: o.line.c, k: o.line.l, v: o.yFmtFull(o.line.v[i]) });
    const html = ttRows(o.catLabel ? o.catLabel(c) : c, rows,
      o.totalLabel ? { k: o.totalLabel, v: o.yFmtFull(tot[i] + negTot[i]) } : null);
    hit.addEventListener('mousemove', e => showTT(e, html));
    hit.addEventListener('mouseleave', hideTT);
  });

  if (o.line) {
    const pts = o.cats.map((_, i) => [m.l + band * i + band / 2, Y(o.line.v[i])]);
    el('polyline', { points: pts.map(p => p.join(',')).join(' '), fill: 'none',
      stroke: o.line.c, 'stroke-width': 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round',
      'stroke-dasharray': o.line.dash || null }, svg);
    const last = pts[pts.length - 1];
    el('circle', { cx: last[0], cy: last[1], r: 4, fill: o.line.c, stroke: surf, 'stroke-width': 2 }, svg);
  }
}

/* ============================================================ CHART: LINES */
function lineChart(svg, o) {
  clear(svg);
  const W = 640, Hh = 300, m = { t: 18, r: 74, b: 34, l: 54 };
  if (!o.cats.length || !o.series.length || o.series.every(s => !s.v.length)) {
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + Hh);
    txt(svg, W / 2, Hh / 2, o.empty || 'No data at these settings', 'axlabel',
      { 'text-anchor': 'middle' });
    return;
  }
  const iw = W - m.l - m.r, ih = Hh - m.t - m.b;
  const n = o.cats.length;
  const X = i => n === 1 ? m.l + iw / 2 : m.l + (iw * i) / (n - 1);

  let all = [];
  o.series.forEach(s => all = all.concat(s.v.filter(v => v != null && isFinite(v))));
  (o.rules || []).forEach(r => all.push(r.v));
  if (o.zero) all.push(0);
  const ticks = niceTicks(Math.min.apply(null, all), Math.max.apply(null, all), 5);
  const lo = ticks[0], hi = ticks[ticks.length - 1];
  const Y = v => m.t + ih - (clamp(v, lo, hi) - lo) / (hi - lo || 1) * ih;

  ticks.forEach(v => {
    el('line', { class: 'gridline', x1: m.l, x2: m.l + iw, y1: Y(v), y2: Y(v) }, svg);
    txt(svg, m.l - 8, Y(v) + 3.5, o.yFmt(v), 'tick', { 'text-anchor': 'end' });
  });

  // threshold rules: labelled inside the plot at the left, so the right margin
  // stays free for the series end-labels
  (o.rules || []).forEach(r => {
    el('line', { x1: m.l, x2: m.l + iw, y1: Y(r.v), y2: Y(r.v),
      stroke: r.c, 'stroke-width': 1, 'stroke-dasharray': '4 3', opacity: .85 }, svg);
    const t = txt(svg, m.l + 5, Y(r.v) - 5, r.l, 'dlabel', { fill: r.c });
    t.setAttribute('paint-order', 'stroke');
    t.setAttribute('stroke', cssv('--surface'));
    t.setAttribute('stroke-width', '3');
  });

  o.cats.forEach((c, i) => txt(svg, X(i), Hh - 12, c, 'tick', { 'text-anchor': 'middle' }));

  const surf = cssv('--surface');
  o.series.forEach(s => {
    if (s.fill) {
      const base = Y(clamp(0, lo, hi));
      const pts = s.v.map((v, i) => X(i) + ',' + Y(v));
      el('polygon', { points: X(0) + ',' + base + ' ' + pts.join(' ') + ' ' + X(n - 1) + ',' + base,
        fill: s.c, opacity: .10 }, svg);
    }
    const pts = s.v.map((v, i) => X(i) + ',' + Y(v)).join(' ');
    el('polyline', { points: pts, fill: 'none', stroke: s.c, 'stroke-width': 2,
      'stroke-linejoin': 'round', 'stroke-linecap': 'round', 'stroke-dasharray': s.dash || null }, svg);
    const li = s.v.length - 1;
    if (s.v[li] != null && isFinite(s.v[li])) {
      el('circle', { cx: X(li), cy: Y(s.v[li]), r: 4, fill: s.c, stroke: surf, 'stroke-width': 2 }, svg);
      if (s.endLabel !== false) txt(svg, X(li) + 8, Y(s.v[li]) + 3.5, o.yFmt(s.v[li]), 'dlabel');
    }
  });

  o.cats.forEach((c, i) => {
    const hw = iw / Math.max(1, n - 1);
    const hit = el('rect', { x: X(i) - hw / 2, y: m.t, width: hw, height: ih,
      fill: 'transparent', style: 'cursor:crosshair' }, svg);
    const html = ttRows(o.catLabel ? o.catLabel(c) : c,
      o.series.map(s => ({ c: s.c, k: s.l, v: o.yFmtFull ? o.yFmtFull(s.v[i]) : o.yFmt(s.v[i]) })));
    hit.addEventListener('mousemove', e => {
      showTT(e, html);
      cross.setAttribute('x1', X(i)); cross.setAttribute('x2', X(i));
      cross.setAttribute('opacity', 1);
    });
    hit.addEventListener('mouseleave', () => { hideTT(); cross.setAttribute('opacity', 0); });
  });
  const cross = el('line', { y1: m.t, y2: m.t + ih, stroke: cssv('--rule-2'), 'stroke-width': 1, opacity: 0 }, svg);
}

/* ========================================================== CHART: HEATMAP */
function heatmap(svg, o) {
  clear(svg);
  const W = 640, Hh = 380, m = { t: 16, r: 16, b: 92, l: 62 };
  const iw = W - m.l - m.r, ih = Hh - m.t - m.b;
  const nx = o.xs.length, ny = o.ys.length;
  const cw = iw / nx, ch = ih / ny;

  let vals = [];
  o.z.forEach(row => row.forEach(v => { if (v != null && isFinite(v)) vals.push(v); }));
  const vmin = Math.min.apply(null, vals), vmax = Math.max.apply(null, vals);
  const mid = o.mid;

  // sequential blue ramp (light->dark), and diverging blue<->red about `mid`
  const BLUE = ['#cde2fb', '#b7d3f6', '#9ec5f4', '#86b6ef', '#6da7ec', '#5598e7', '#3987e5', '#2a78d6', '#256abf', '#1c5cab', '#184f95', '#104281', '#0d366b'];
  const REDS = ['#f7d9d9', '#f0bcbc', '#e89d9d', '#e08080', '#d86363', '#d03b3b', '#b83232', '#9c2a2a', '#7d2121'];
  const NEUT = cssv('--surface-3');

  function color(v) {
    if (v == null || !isFinite(v)) return NEUT;
    if (mid == null) {
      const t = (v - vmin) / (vmax - vmin || 1);
      return BLUE[clamp(Math.round(t * (BLUE.length - 1)), 0, BLUE.length - 1)];
    }
    const up = o.better === 'low' ? -1 : 1;
    const d = (v - mid) * up;
    const scale = Math.max(Math.abs(vmax - mid), Math.abs(vmin - mid)) || 1;
    const t = clamp(Math.abs(d) / scale, 0, 1);
    if (Math.abs(d) < scale * 0.02) return NEUT;
    return d > 0
      ? BLUE[clamp(Math.round(t * 8) + 2, 0, BLUE.length - 1)]
      : REDS[clamp(Math.round(t * 7) + 1, 0, REDS.length - 1)];
  }

  const surf = cssv('--surface');
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const v = o.z[j][i];
      const x = m.l + i * cw, y = m.t + j * ch;
      const c = color(v);
      el('rect', { x: x + 1, y: y + 1, width: cw - 2, height: ch - 2, fill: c, rx: 2 }, svg);
      // value label — pick white or ink from the fill's own luminance so the
      // number always clears contrast, whatever step the ramp landed on
      const dark = luma(c) < 0.42;
      if (cw > 40) {
        const t2 = txt(svg, x + cw / 2, y + ch / 2 + 3.3, o.cellFmt(v), 'dlabel',
          { 'text-anchor': 'middle' });
        t2.setAttribute('fill', dark ? '#ffffff' : '#0c1214');
        t2.setAttribute('font-size', '9.5');
      }
      const hit = el('rect', { x, y, width: cw, height: ch, fill: 'transparent', style: 'cursor:crosshair' }, svg);
      const html = ttRows(o.metricLabel, [
        { k: o.xLabel, v: o.xFmt(o.xs[i]) },
        { k: o.yLabel, v: o.yFmt(o.ys[j]) },
      ], { k: o.metricLabel, v: o.fullFmt(v) });
      hit.addEventListener('mousemove', e => showTT(e, html));
      hit.addEventListener('mouseleave', hideTT);
    }
  }

  o.xs.forEach((x, i) => { if (nx <= 10 || i % 2 === 0)
    txt(svg, m.l + i * cw + cw / 2, m.t + ih + 15, o.xFmt(x), 'tick', { 'text-anchor': 'middle' }); });
  o.ys.forEach((y, j) => txt(svg, m.l - 8, m.t + j * ch + ch / 2 + 3.5, o.yFmt(y), 'tick', { 'text-anchor': 'end' }));
  txt(svg, m.l + iw / 2, m.t + ih + 34, o.xTitle, 'axlabel', { 'text-anchor': 'middle' });
  const yt = txt(svg, 0, 0, o.yTitle, 'axlabel', { 'text-anchor': 'middle',
    transform: 'translate(14,' + (m.t + ih / 2) + ') rotate(-90)' });

  // base-case marker
  if (o.markX != null && o.markY != null) {
    const i = o.xs.reduce((b, v, k) => Math.abs(v - o.markX) < Math.abs(o.xs[b] - o.markX) ? k : b, 0);
    const j = o.ys.reduce((b, v, k) => Math.abs(v - o.markY) < Math.abs(o.ys[b] - o.markY) ? k : b, 0);
    el('rect', { x: m.l + i * cw + 1, y: m.t + j * ch + 1, width: cw - 2, height: ch - 2,
      fill: 'none', stroke: cssv('--ink'), 'stroke-width': 2, rx: 2 }, svg);
  }

  // scale legend
  const lw = 168, lx = m.l, ly = m.t + ih + 50;
  const steps = 11;
  for (let s = 0; s < steps; s++) {
    const v = vmin + (vmax - vmin) * s / (steps - 1);
    el('rect', { x: lx + s * (lw / steps), y: ly, width: lw / steps - 1, height: 9,
      fill: color(v), rx: 1 }, svg);
  }
  txt(svg, lx, ly + 24, o.fullFmt(vmin), 'tick');
  txt(svg, lx + lw, ly + 24, o.fullFmt(vmax), 'tick', { 'text-anchor': 'end' });
  txt(svg, lx + lw + 18, ly + 8, 'outlined cell = current settings', 'axlabel');
}

/* ========================================================== CHART: TORNADO */
function tornado(svg, o) {
  clear(svg);
  const rows = o.rows;
  const W = 640, rowH = 26, m = { t: 12, r: 66, b: 34, l: 172 };
  const Hh = m.t + rows.length * rowH + m.b;
  svg.setAttribute('viewBox', '0 0 ' + W + ' ' + Hh);
  const iw = W - m.l - m.r;

  let ext = 0;
  rows.forEach(r => { ext = Math.max(ext, Math.abs(r.lo - o.base), Math.abs(r.hi - o.base)); });
  ext = ext || 1;
  const X = v => m.l + iw / 2 + (v - o.base) / ext * (iw / 2) * 0.94;

  el('line', { x1: X(o.base), x2: X(o.base), y1: m.t - 4, y2: m.t + rows.length * rowH + 2,
    class: 'baseline' }, svg);
  txt(svg, X(o.base), m.t + rows.length * rowH + 16, 'base ' + o.fmt(o.base), 'tick', { 'text-anchor': 'middle' });

  const good = cssv('--s1'), bad = cssv('--s8');
  rows.forEach((r, i) => {
    const y = m.t + i * rowH;
    const bh = 13;
    [[r.lo, r.loLabel], [r.hi, r.hiLabel]].forEach(([v, lab]) => {
      const isGood = o.better === 'low' ? (v < o.base) : (v > o.base);
      const x0 = X(o.base), x1 = X(v);
      const w = Math.abs(x1 - x0);
      if (w < 0.6) return;
      el('rect', { x: Math.min(x0, x1) + (x1 > x0 ? 1 : 0), y: y + (rowH - bh) / 2,
        width: Math.max(1, w - 1), height: bh, rx: 2.5, fill: isGood ? good : bad }, svg);
      const hit = el('rect', { x: Math.min(x0, x1) - 4, y: y, width: w + 8, height: rowH,
        fill: 'transparent', style: 'cursor:crosshair' }, svg);
      const html = ttRows(r.l, [
        { k: lab, v: '' },
        { k: o.metricLabel, v: o.fmt(v) },
        { k: 'vs base', v: (v - o.base >= 0 ? '+' : MINUS) + o.fmt(Math.abs(v - o.base)).replace(MINUS, '') },
      ]);
      hit.addEventListener('mousemove', e => showTT(e, html));
      hit.addEventListener('mouseleave', hideTT);
    });
    txt(svg, m.l - 12, y + rowH / 2 + 4, r.l, 'axlabel', { 'text-anchor': 'end' });
    const swing = Math.max(Math.abs(r.lo - o.base), Math.abs(r.hi - o.base));
    txt(svg, W - m.r + 8, y + rowH / 2 + 4, '±' + o.fmt(swing).replace(MINUS, ''), 'dlabel');
  });
}

/* ======================================================== CHART: HISTOGRAM */
function histogram(svg, o) {
  clear(svg);
  const W = 640, Hh = 300, m = { t: 26, r: 16, b: 40, l: 46 };
  const iw = W - m.l - m.r, ih = Hh - m.t - m.b;
  const vals = o.values.filter(v => v != null && isFinite(v));
  if (!vals.length) return;
  const lo0 = o.lo != null ? o.lo : Math.min.apply(null, vals);
  const hi0 = o.hi != null ? o.hi : Math.max.apply(null, vals);
  const nb = 34, bw = (hi0 - lo0) / nb || 1;
  const bins = new Array(nb).fill(0);
  vals.forEach(v => { bins[clamp(Math.floor((v - lo0) / bw), 0, nb - 1)]++; });
  const cmax = Math.max.apply(null, bins);
  const X = v => m.l + (clamp(v, lo0, hi0) - lo0) / (hi0 - lo0 || 1) * iw;
  const Y = c => m.t + ih - c / cmax * ih;

  niceTicks(0, cmax, 4).forEach(c => {
    el('line', { class: 'gridline', x1: m.l, x2: m.l + iw, y1: Y(c), y2: Y(c) }, svg);
    txt(svg, m.l - 8, Y(c) + 3.5, fmtInt(Math.round(c)), 'tick', { 'text-anchor': 'end' });
  });

  const cw = iw / nb;
  bins.forEach((c, i) => {
    if (!c) return;
    const v0 = lo0 + i * bw;
    const bad = o.threshold != null && (o.better === 'low' ? v0 > o.threshold : v0 + bw <= o.threshold);
    el('rect', { x: m.l + i * cw + 1, y: Y(c), width: Math.max(1, cw - 2), height: m.t + ih - Y(c),
      fill: bad ? cssv('--s8') : cssv('--s1'), rx: 2 }, svg);
    const hit = el('rect', { x: m.l + i * cw, y: m.t, width: cw, height: ih, fill: 'transparent' }, svg);
    const html = ttRows(o.fmt(v0) + '  →  ' + o.fmt(v0 + bw), [
      { k: 'Paths', v: fmtInt(c) },
      { k: 'Share', v: fmtPct(c / vals.length, 1) },
    ]);
    hit.addEventListener('mousemove', e => showTT(e, html));
    hit.addEventListener('mouseleave', hideTT);
  });

  el('line', { class: 'baseline', x1: m.l, x2: m.l + iw, y1: m.t + ih, y2: m.t + ih }, svg);
  niceTicks(lo0, hi0, 5)
    .filter(v => v >= lo0 - 1e-9 && v <= hi0 + 1e-9)
    .forEach(v => txt(svg, X(v), Hh - 20, o.fmt(v), 'tick', { 'text-anchor': 'middle' }));

  // marker labels alternate between two rows so neighbouring markers never overlap
  (o.marks || []).filter(mk => mk.v != null && isFinite(mk.v)).forEach((mk, i) => {
    const x = X(mk.v);
    const row = i % 2;
    el('line', { x1: x, x2: x, y1: m.t - 2 + row * 11, y2: m.t + ih, stroke: mk.c,
      'stroke-width': 1.5, 'stroke-dasharray': mk.dash || null }, svg);
    const anchor = x > m.l + iw - 46 ? 'end' : x < m.l + 46 ? 'start' : 'middle';
    const t = txt(svg, x, m.t - 5 + row * 11, mk.l, 'dlabel', { 'text-anchor': anchor, fill: mk.c });
    t.setAttribute('paint-order', 'stroke');
    t.setAttribute('stroke', cssv('--surface'));
    t.setAttribute('stroke-width', '3');
  });
  if (o.xTitle) txt(svg, m.l + iw / 2, Hh - 4, o.xTitle, 'axlabel', { 'text-anchor': 'middle' });
}

/* ========================================================= CHART: WATERFALL */
function waterfall(svg, o) {
  clear(svg);
  const W = 780, Hh = 300, m = { t: 22, r: 14, b: 52, l: 58 };
  const iw = W - m.l - m.r, ih = Hh - m.t - m.b;
  const n = o.steps.length, band = iw / n, bw = Math.min(46, band * 0.6);

  let run = 0; const geo = [];
  o.steps.forEach(s => {
    if (s.total) { geo.push({ s, from: 0, to: s.v != null ? s.v : run }); run = s.v != null ? s.v : run; }
    else { geo.push({ s, from: run, to: run + s.v }); run += s.v; }
  });
  let all = [0];
  geo.forEach(g => { all.push(g.from, g.to); });
  const ticks = niceTicks(Math.min.apply(null, all), Math.max.apply(null, all) * 1.05, 5);
  const lo = ticks[0], hi = ticks[ticks.length - 1];
  const Y = v => m.t + ih - (v - lo) / (hi - lo || 1) * ih;

  ticks.forEach(v => {
    el('line', { class: 'gridline', x1: m.l, x2: m.l + iw, y1: Y(v), y2: Y(v) }, svg);
    txt(svg, m.l - 8, Y(v) + 3.5, fmtM(v), 'tick', { 'text-anchor': 'end' });
  });
  el('line', { class: 'baseline', x1: m.l, x2: m.l + iw, y1: Y(0), y2: Y(0) }, svg);

  const up = cssv('--s1'), down = cssv('--s8'), tot = cssv('--ink-3');
  geo.forEach((g, i) => {
    const cx = m.l + band * i + band / 2;
    const y0 = Y(g.from), y1 = Y(g.to);
    const c = g.s.total ? tot : (g.to >= g.from ? up : down);
    el('rect', { x: cx - bw / 2, y: Math.min(y0, y1), width: bw,
      height: Math.max(1.5, Math.abs(y1 - y0)), fill: c, rx: 2.5 }, svg);
    if (i < n - 1) {
      el('line', { x1: cx + bw / 2, x2: m.l + band * (i + 1) + band / 2 - bw / 2,
        y1: y1, y2: y1, stroke: cssv('--rule-2'), 'stroke-width': 1 }, svg);
    }
    txt(svg, cx, Math.min(y0, y1) - 6, (g.s.total ? '' : (g.s.v >= 0 ? '+' : MINUS)) +
      fmtM(Math.abs(g.s.total ? g.to : g.s.v)).replace(MINUS, ''), 'dlabel', { 'text-anchor': 'middle' });
    const words = g.s.l.split(' ');
    let lineArr = [], line = '';
    words.forEach(w => { if ((line + ' ' + w).trim().length > 12) { lineArr.push(line); line = w; } else line = (line + ' ' + w).trim(); });
    lineArr.push(line);
    lineArr.forEach((ln, k) => txt(svg, cx, m.t + ih + 16 + k * 11, ln, 'tick', { 'text-anchor': 'middle' }));
    const hit = el('rect', { x: m.l + band * i, y: m.t, width: band, height: ih, fill: 'transparent' }, svg);
    const html = ttRows(g.s.l, [
      { k: g.s.total ? 'Level' : 'Change', v: fmtUSD(g.s.total ? g.to : g.s.v) },
      { k: 'Running', v: fmtUSD(g.to) },
    ]);
    hit.addEventListener('mousemove', e => showTT(e, html));
    hit.addEventListener('mouseleave', hideTT);
  });
}

/* ====================================================== CHART: FLOW DIAGRAM */
function flowDiagram(svg, r) {
  clear(svg);
  svg.setAttribute('viewBox', '0 0 1000 470');
  const y1 = r.years[0];
  const surf = cssv('--surface'), rule = cssv('--rule-2'), s2 = cssv('--surface-2');

  const sources = [
    { l: 'Equity sponsors', v: r.equity, tag: 't = 0', c: cssv('--s7') },
    { l: 'Senior lenders', v: r.debt, tag: 't = 0', c: cssv('--s7') },
    { l: 'Cloud customers', v: y1.revenue, tag: 'rentals, yr 1', c: cssv('--s1') },
    { l: 'NVIDIA backstop', v: y1.bsPaid, tag: 'shortfall top-up', c: cssv('--s3'), nv: true },
  ];
  const uses = [
    { l: 'NVIDIA — GPU sale', v: r.capexGpu, tag: 't = 0', c: cssv('--s3'), nv: true },
    { l: 'Datacenter build', v: r.capexOther, tag: 't = 0', c: cssv('--s7') },
    { l: 'Cash operating costs', v: y1.opex, tag: 'yr 1', c: cssv('--s2') },
    { l: 'Lenders — debt service', v: y1.debtService, tag: 'yr 1', c: cssv('--s7') },
    { l: 'NVIDIA — upside share', v: y1.upside, tag: 'yr 1', c: cssv('--s4'), nv: true },
    { l: 'Equity — residual cash', v: Math.max(0, y1.cfads - y1.debtService), tag: 'yr 1', c: cssv('--s1') },
  ];

  const maxV = Math.max.apply(null, sources.concat(uses).map(d => d.v).concat([1]));
  const wOf = v => v <= 0 ? 0 : clamp(1.5 + Math.sqrt(v / maxV) * 13, 1.5, 15);

  const LX = 30, LW = 186, RX = 784, RW = 186, CX = 408, CW = 184;
  const box = (x, y, w, h, d) => {
    const g = el('g', { class: 'flow-node' }, svg);
    el('rect', { x, y, width: w, height: h, rx: 7, fill: s2,
      stroke: d.nv ? d.c : rule, 'stroke-width': d.nv ? 1.6 : 1 }, g);
    txt(g, x + 12, y + 21, d.l, 'title');
    txt(g, x + 12, y + 38, fmtM(d.v), 'meta');
    const tagText = d.nv ? d.tag + '  \u00b7  NVDA' : d.tag;
    const tg = txt(g, x + w - 12, y + 38, tagText, 'meta', { 'text-anchor': 'end', opacity: d.nv ? 1 : .72 });
    if (d.nv) { tg.setAttribute('fill', d.c); tg.setAttribute('font-weight', '700'); }
    return g;
  };

  const BH = 52, GAP = 22;
  const sy = i => 40 + i * (BH + GAP);
  const uy = i => 24 + i * (BH + 16);

  // SPV
  el('rect', { x: CX, y: 92, width: CW, height: 216, rx: 9, fill: cssv('--surface'),
    stroke: cssv('--accent'), 'stroke-width': 1.6 }, svg);
  const gc = el('g', { class: 'flow-node' }, svg);
  txt(gc, CX + CW / 2, 128, 'GPU SPV / OpCo', 'title', { 'text-anchor': 'middle' });
  txt(gc, CX + CW / 2, 148, 'the borrower', 'meta', { 'text-anchor': 'middle', opacity: .75 });
  const kpis = [
    ['Total capex', fmtM(r.capex)],
    ['Yr-1 revenue', fmtM(y1.revenue + y1.bsPaid)],
    ['Yr-1 EBITDA', fmtM(y1.ebitda)],
    ['Yr-1 DSCR', fmtX(y1.dscr)],
  ];
  kpis.forEach((k, i) => {
    const yy = 176 + i * 30;
    txt(gc, CX + 14, yy, k[0], 'meta', { opacity: .8 });
    const t = txt(gc, CX + CW - 14, yy, k[1], 'meta', { 'text-anchor': 'end' });
    t.setAttribute('font-weight', '700');
    t.setAttribute('fill', cssv('--ink'));
    el('line', { x1: CX + 12, x2: CX + CW - 12, y1: yy + 9, y2: yy + 9,
      stroke: cssv('--rule'), 'stroke-width': 1 }, gc);
  });

  const arrow = (x0, y0, x1, y1v, w, c, label, dashed) => {
    if (w <= 0) return;
    const mx = (x0 + x1) / 2;
    const d = 'M' + x0 + ',' + y0 + ' C' + mx + ',' + y0 + ' ' + mx + ',' + y1v + ' ' + (x1 - 7) + ',' + y1v;
    el('path', { d, fill: 'none', stroke: c, 'stroke-width': w, opacity: .42,
      'stroke-linecap': 'round', 'stroke-dasharray': dashed ? '6 5' : null }, svg);
    el('path', { d: 'M' + (x1 - 8) + ',' + (y1v - 5) + ' L' + x1 + ',' + y1v + ' L' + (x1 - 8) + ',' + (y1v + 5) + ' Z',
      fill: c, opacity: .78 }, svg);
    const t = txt(svg, mx, (y0 + y1v) / 2 - 6, label, 'flow-lbl strong', { 'text-anchor': 'middle' });
    t.setAttribute('paint-order', 'stroke');
    t.setAttribute('stroke', cssv('--surface'));
    t.setAttribute('stroke-width', '3.5');
  };

  sources.forEach((d, i) => {
    const y = sy(i);
    box(LX, y, LW, BH, d);
    const ty = 118 + i * 52;
    arrow(LX + LW, y + BH / 2, CX, ty, wOf(d.v), d.c, fmtM(d.v), d.nv && d.v <= 0);
  });
  uses.forEach((d, i) => {
    const y = uy(i);
    box(RX, y, RW, BH, d);
    const fy = 118 + i * 34;
    arrow(CX + CW, fy, RX, y + BH / 2, wOf(d.v), d.c, fmtM(d.v));
  });

  txt(svg, LX, 24, 'SOURCES', 'flow-lbl', { opacity: .7, 'letter-spacing': '.12em' });
  txt(svg, RX, 14, 'USES', 'flow-lbl', { opacity: .7, 'letter-spacing': '.12em' });
  if (y1.bsPaid <= 0) {
    txt(svg, LX, sy(3) + BH + 17, 'not called at these settings', 'flow-lbl', { opacity: .8 });
  }
  if (y1.bsUnpaid > 1) {
    const t = txt(svg, LX, sy(3) + BH + 30, 'capped — ' + fmtM(y1.bsUnpaid) + ' of the shortfall is NOT paid', 'flow-lbl');
    t.setAttribute('fill', cssv('--crit'));
  }
}
