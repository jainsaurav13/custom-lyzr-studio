/* ============================================================================
   PART 2 — sensitivity, simulation, risk, and all the wiring.
   ========================================================================== */

/* ------------------------------------------------------------ Monte Carlo */
function makeRng(seed) {
  let s = seed >>> 0;
  return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}
function monteCarlo(p) {
  const n = Math.round(p.mcPaths);
  const rnd = makeRng(20260808);
  const norm = () => {
    let u = 0, v = 0;
    while (u === 0) u = rnd();
    while (v === 0) v = rnd();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const H = Math.round(p.horizon);
  const pShockAny = 1 - Math.pow(1 - p.shockProb, H);
  const out = { nv: [], eq: [], minD: [], minDNoBs: [], bs: [], gb: [], demand: [] };
  let called = 0, capHit = 0, below1 = 0, eqNeg = 0, nvNeg = 0;

  for (let i = 0; i < n; i++) {
    const z = norm(), e1 = norm(), e2 = norm();
    const k = Math.sqrt(Math.max(0, 1 - p.rho * p.rho));
    const f1 = p.rho * z + k * e1;   // price-decay factor
    const f2 = p.rho * z + k * e2;   // utilisation factor

    const q = Object.assign({}, p);
    q.priceDecay = clamp(p.priceDecay + p.sdDecay * f1, -0.15, 0.8);
    q.util0 = clamp(p.util0 - p.sdUtil * f2, 0.03, 1);
    if (rnd() < pShockAny) {
      q.shockYear = 1 + Math.floor(rnd() * H);
      q.shockUtilCut = p.shockSize;
      q.shockPriceCut = p.shockSize * 0.7;
    }
    const r = project(q);
    out.nv.push(r.nvNPV);
    out.eq.push(r.eqIRR == null ? -0.95 : r.eqIRR);
    out.minD.push(r.minDSCR == null ? 99 : r.minDSCR);
    out.minDNoBs.push(r.minDSCRNoBs == null ? 99 : r.minDSCRNoBs);
    out.bs.push(r.cumBackstop);
    out.gb.push(r.giveback);
    out.demand.push(z);
    if (r.yearsCalled > 0) called++;
    if (r.capBinds) capHit++;
    if (r.minDSCR != null && r.minDSCR < 1) below1++;
    if (r.eqIRR == null || r.eqIRR < 0) eqNeg++;
    if (r.nvNPV < 0) nvNeg++;
  }
  const pct = (a, q) => {
    const s = a.slice().sort((x, y) => x - y);
    return s[clamp(Math.floor(q * (s.length - 1)), 0, s.length - 1)];
  };
  const cvar = (a, q) => {
    const s = a.slice().sort((x, y) => x - y);
    const cut = Math.max(1, Math.floor(q * s.length));
    return sum(s.slice(0, cut)) / cut;
  };
  // conditional: backstop called in the worst demand decile
  const idx = out.demand.map((v, i) => [v, i]).sort((a, b) => b[0] - a[0]).slice(0, Math.max(1, Math.floor(n * 0.1)));
  const tailBs = idx.map(x => out.bs[x[1]]);

  return {
    n, ...out,
    nvMean: sum(out.nv) / n, nvP5: pct(out.nv, 0.05), nvP50: pct(out.nv, 0.5), nvP95: pct(out.nv, 0.95),
    nvCVaR: cvar(out.nv, 0.05),
    eqP5: pct(out.eq, 0.05), eqP50: pct(out.eq, 0.5), eqP95: pct(out.eq, 0.95),
    bsMean: sum(out.bs) / n, bsP95: pct(out.bs, 0.95),
    tailBsMean: sum(tailBs) / tailBs.length,
    pCalled: called / n, pCap: capHit / n, pBelow1: below1 / n, pEqNeg: eqNeg / n, pNvNeg: nvNeg / n,
  };
}

/* ------------------------------------------------------------- solvers */
function solve(fn, lo, hi, target) {
  let flo = fn(lo) - target, fhi = fn(hi) - target;
  if (!isFinite(flo) || !isFinite(fhi) || flo * fhi > 0) return null;
  for (let i = 0; i < 60; i++) {
    const m = (lo + hi) / 2, fm = fn(m) - target;
    if (flo * fm <= 0) { hi = m; fhi = fm; } else { lo = m; flo = fm; }
  }
  return (lo + hi) / 2;
}
const withP = (over) => project(Object.assign({}, P, over));

/* ----------------------------------------------------------- the rail UI */
function buildRail() {
  const rail = document.getElementById('rail');
  let h = '';
  SPEC.forEach((g, gi) => {
    h += '<details class="group"' + (g.open ? ' open' : '') + '><summary><h3>' + g.g + '</h3></summary><div class="group-body">';
    g.items.forEach(it => {
      h += '<div class="ctl" data-k="' + it.k + '">';
      h += '<div class="ctl-head"><label for="c_' + it.k + '">' + it.l + '</label>' +
        (it.type === 'seg' ? '' : '<span class="ctl-val" id="v_' + it.k + '"></span>') + '</div>';
      if (it.type === 'seg') {
        h += '<div class="seg" id="c_' + it.k + '" role="group" aria-label="' + it.l + '">' +
          it.opts.map(o => '<button type="button" data-v="' + o[0] + '">' + o[1] + '</button>').join('') + '</div>';
      } else {
        h += '<input type="range" id="c_' + it.k + '" min="' + it.min + '" max="' + it.max +
          '" step="' + it.step + '" value="' + P[it.k] + '">';
      }
      if (it.note) h += '<p class="ctl-note">' + it.note + '</p>';
      h += '</div>';
    });
    h += '</div></details>';
  });
  h += '<div class="rail-actions"><button type="button" id="resetBtn">Reset to base</button>' +
       '<button type="button" id="linkBtn">Copy scenario link</button></div>';
  rail.innerHTML = h;

  SPEC.forEach(g => g.items.forEach(it => {
    const node = document.getElementById('c_' + it.k);
    if (it.type === 'seg') {
      node.addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        P[it.k] = b.dataset.v; activePreset = null; syncRail(); schedule();
      });
    } else {
      node.addEventListener('input', () => {
        P[it.k] = parseFloat(node.value); activePreset = null; syncRail(); schedule();
      });
    }
  }));
  document.getElementById('resetBtn').addEventListener('click', () => applyPreset('repaired'));
  document.getElementById('linkBtn').addEventListener('click', function () {
    const url = location.origin + location.pathname + '#' + serialize();
    navigator.clipboard && navigator.clipboard.writeText(url);
    this.textContent = 'Copied'; setTimeout(() => this.textContent = 'Copy scenario link', 1400);
  });
}

function syncRail() {
  SPEC.forEach(g => g.items.forEach(it => {
    const node = document.getElementById('c_' + it.k);
    if (!node) return;
    if (it.type === 'seg') {
      [].forEach.call(node.querySelectorAll('button'), b =>
        b.setAttribute('aria-pressed', String(b.dataset.v === P[it.k])));
    } else {
      if (parseFloat(node.value) !== P[it.k]) node.value = P[it.k];
      const v = document.getElementById('v_' + it.k);
      if (v) v.textContent = it.f(P[it.k]);
      node.classList.toggle('is-off', P[it.k] === 0 && it.min < 0);
    }
  }));
  [].forEach.call(document.querySelectorAll('#presets .preset'), b =>
    b.setAttribute('aria-pressed', String(b.dataset.id === activePreset)));
}

function buildPresets() {
  const node = document.getElementById('presets');
  node.innerHTML = PRESETS.map(p =>
    '<button type="button" class="preset" data-id="' + p.id + '" title="' + p.blurb + '">' + p.name + '</button>').join('');
  node.addEventListener('click', e => {
    const b = e.target.closest('.preset'); if (!b) return;
    applyPreset(b.dataset.id);
  });
}
function applyPreset(id) {
  const p = PRESETS.find(x => x.id === id);
  if (!p) return;
  P = Object.assign({}, p.v);
  activePreset = id;
  syncRail(); schedule();
}

/* ---------------------------------------------------------- URL encoding */
function serialize() {
  return Object.keys(FIELD).map(k => k + '=' + P[k]).join('&');
}
function deserialize(s) {
  if (!s) return false;
  let hit = false;
  s.replace(/^#/, '').split('&').forEach(pair => {
    const [k, v] = pair.split('=');
    if (!(k in FIELD)) return;
    P[k] = FIELD[k].type === 'seg' ? v : parseFloat(v);
    if (FIELD[k].type !== 'seg' && !isFinite(P[k])) P[k] = FIELD[k].d;
    hit = true;
  });
  return hit;
}

/* ================================================================ RENDER */
let raf = null, mcTimer = null;
function schedule() {
  if (raf) cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => { raf = null; renderFast(); });
  clearTimeout(mcTimer);
  mcTimer = setTimeout(renderSlow, 140);
  try { history.replaceState(null, '', '#' + serialize()); } catch (e) {}
}

let R = null;
function renderFast() {
  R = project(P);
  document.getElementById('brandSub').textContent =
    fmtInt(P.gpus) + ' GPU · ' + fmtUSD(R.capex) + ' · ' + Math.round(P.tenor) + 'yr @ ' + fmtPct(P.rate, 2);
  renderVerdict(R);
  flowDiagram(document.getElementById('flowSvg'), R);
  renderFlowTable(R);
  renderProjection(R);
  renderWaterfall(R);
  renderRisk(R);
}
function renderSlow() {
  if (!R) return;
  renderHeat(R);
  renderTornado(R);
  renderBreakeven(R);
  const mc = monteCarlo(P);
  renderMC(R, mc);
  renderRisk(R, mc);
}

/* ---------------------------------------------------------- verdict block */
function sevOf(v, bands, better) {
  // bands ascending: [warnAt, seriousAt, critAt] in "worse" direction
  const worse = better === 'low' ? (a, b) => a > b : (a, b) => a < b;
  if (v == null) return 'warn';
  if (worse(v, bands[2])) return 'crit';
  if (worse(v, bands[1])) return 'sev';
  if (worse(v, bands[0])) return 'warn';
  return 'ok';
}
const ICON = {
  ok: '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M1.6 5.2 4 7.6 8.6 2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  warn: '<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M5 .8 9.6 8.8H.4z" opacity=".25"/><path d="M5 .8 9.6 8.8H.4z" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/><rect x="4.4" y="3.6" width="1.2" height="2.6" rx=".6"/><circle cx="5" cy="7.3" r=".65"/></svg>',
  sev: '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="5" cy="5" r="4"/><path d="M5 2.8v2.6" stroke-linecap="round"/><circle cx="5" cy="7.2" r=".7" fill="currentColor" stroke="none"/></svg>',
  crit: '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="5" cy="5" r="4"/><path d="M3.2 3.2 6.8 6.8M6.8 3.2 3.2 6.8" stroke-linecap="round"/></svg>',
};
const LABELS = { ok: 'ok', warn: 'watch', sev: 'serious', crit: 'critical' };
const pill = (sev, text) => '<span class="pill ' + sev + '">' + ICON[sev] + (text || LABELS[sev]) + '</span>';

function renderVerdict(r) {
  const sev = r.nvNPV < 0 ? 'crit' : r.giveback > 0.6 ? 'sev' : r.giveback > 0.3 ? 'warn' : 'ok';
  const fig = document.getElementById('heroFig');
  fig.innerHTML = fmtUSD(r.nvNPV) + ' <small>vs ' + fmtUSD(r.grossProfitEcon) + ' sale profit alone</small>';
  fig.style.color = r.nvNPV < 0 ? 'var(--crit-ink)' : 'var(--ink)';

  const yrs = r.yearsCalled;
  document.getElementById('heroSub').innerHTML =
    'Gross profit of <strong>' + fmtUSD(r.grossProfitEcon) + '</strong> on the GPU sale, less <strong>' +
    fmtUSD(r.pvBackstop) + '</strong> of backstop calls' +
    (yrs ? ' across <strong>' + yrs + '</strong> year' + (yrs > 1 ? 's' : '') : ' (never called)') +
    ', plus <strong>' + fmtUSD(r.pvUpside) + '</strong> of upside share. Present valued at ' +
    fmtPct(P.nvDiscount, 1) + '.';

  // meter: how much of the sale profit the guarantee gives back
  const share = clamp(r.giveback, 0, 1.6);
  const over = share > 1;
  document.getElementById('heroBar').innerHTML =
    '<div style="display:flex;align-items:center;gap:9px;margin-bottom:6px">' +
    pill(sev, 'give-back ' + fmtPct(r.giveback, 0)) +
    '<span style="font-size:11.5px;color:var(--ink-3)">of gross profit returned via the backstop</span></div>' +
    '<div style="height:9px;border-radius:5px;background:var(--surface-3);overflow:hidden;position:relative">' +
    '<div style="height:100%;width:' + clamp(share / 1.6 * 100, 0, 100) + '%;background:' +
    (over ? 'var(--crit)' : share > 0.6 ? 'var(--serious)' : share > 0.3 ? 'var(--warn)' : 'var(--s1)') + '"></div>' +
    '<div style="position:absolute;left:62.5%;top:0;bottom:0;width:1px;background:var(--ink-3)"></div>' +
    '</div>' +
    '<div style="display:flex;justify-content:space-between;font-size:10.5px;color:var(--ink-3);margin-top:4px;font-family:var(--mono)">' +
    '<span>0%</span><span>100% — profit fully returned</span><span>160%</span></div>';

  const dNo = r.minDSCRNoBs;
  const tiles = [
    { l: 'Min DSCR', v: fmtX(r.minDSCR), n: 'excl. backstop ' + fmtX(dNo),
      sev: sevOf(r.minDSCR, [1.35, 1.15, 1.0], 'high') },
    { l: 'Equity IRR', v: r.eqIRR == null ? 'wiped out' : fmtPct(r.eqIRR, 1),
      n: r.eqMOIC != null ? fmtX(r.eqMOIC) + ' MOIC on ' + fmtUSD(r.equity) : '',
      sev: sevOf(r.eqIRR, [0.15, 0.06, 0], 'high') },
    { l: 'Backstop called', v: r.cumBackstop > 0 ? fmtUSD(r.cumBackstop) : 'never',
      n: r.yearsCalled + ' of ' + r.years.length + ' years' + (r.cumUnpaid > 1 ? ' · ' + fmtUSD(r.cumUnpaid) + ' capped out' : ''),
      sev: r.cumUnpaid > 1 ? 'crit' : r.cumBackstop > r.grossProfitRaw ? 'sev' : r.cumBackstop > 0 ? 'warn' : 'ok' },
    { l: 'Max exposure', v: fmtUSD(maxExposure(r)),
      n: (maxExposure(r) / (r.grossProfitRaw || 1)).toFixed(1) + '× the profit on the sale',
      sev: sevOf(r.grossProfitRaw / (maxExposure(r) || 1), [0.8, 0.45, 0.25], 'high') },
  ];
  document.getElementById('tiles').innerHTML = tiles.map(t =>
    '<div class="tile"><div class="tile-label">' + t.l + ' ' + pill(t.sev) + '</div>' +
    '<div class="tile-val">' + t.v + '</div>' +
    '<div class="tile-note">' + t.n + '</div></div>').join('');
}

/* worst-case undiscounted backstop: revenue goes to zero for the whole term */
function maxExposure(r) {
  const p = r.p, cap = p.gpus * p.hours;
  let tot = 0;
  for (let t = 1; t <= Math.round(p.backstopYears) && t <= r.years.length; t++) {
    const refP = p.basis === 'fixed' ? p.price0 : p.price0 * Math.pow(1 - p.priceDecay, t - 1);
    tot += p.floorUtil * cap * refP;
  }
  return Math.min(tot, r.aggCap);
}

/* ------------------------------------------------------------ flow table */
function renderFlowTable(r) {
  const y = r.years[0];
  table(document.getElementById('flowTbl'), ['Flow', 'Direction', 'Timing', 'Amount'], [
    ['Equity sponsors', 'into SPV', 't = 0', fmtUSD(r.equity)],
    ['Senior lenders', 'into SPV', 't = 0', fmtUSD(r.debt)],
    ['GPU purchase from NVIDIA', 'out of SPV', 't = 0', fmtUSD(r.capexGpu)],
    ['Datacenter build', 'out of SPV', 't = 0', fmtUSD(r.capexOther)],
    ['Customer rentals', 'into SPV', 'year 1', fmtUSD(y.revenue)],
    ['NVIDIA backstop payment', 'into SPV', 'year 1', fmtUSD(y.bsPaid)],
    ['Cash operating costs', 'out of SPV', 'year 1', fmtUSD(y.opex)],
    ['Interest', 'out of SPV', 'year 1', fmtUSD(y.interest)],
    ['Principal', 'out of SPV', 'year 1', fmtUSD(y.principal)],
    ['NVIDIA upside share', 'out of SPV', 'year 1', fmtUSD(y.upside)],
    ['Cash tax', 'out of SPV', 'year 1', fmtUSD(y.tax)],
  ], ['Residual to equity', '', 'year 1', fmtUSD(y.cfads - y.debtService)]);
}

/* ------------------------------------------------------------- projection */
function renderProjection(r) {
  const cats = r.years.map(y => 'Y' + y.t);
  const S = k => cssv(k);

  stackedColumns(document.getElementById('revSvg'), {
    cats,
    series: [
      { l: 'Contracted (take-or-pay)', c: S('--s1'), v: r.years.map(y => y.revContract) },
      { l: 'Spot rentals', c: S('--s2'), v: r.years.map(y => y.revSpot) },
      { l: 'NVIDIA backstop', c: S('--s3'), v: r.years.map(y => y.bsPaid) },
    ],
    yFmt: v => fmtM(v), yFmtFull: v => fmtUSD(v),
    catLabel: c => 'Year ' + c.slice(1), totalLabel: 'Total cash revenue',
   
  });
  legend(document.getElementById('revLegend'), [
    { l: 'Contracted (take-or-pay)', c: S('--s1') },
    { l: 'Spot rentals', c: S('--s2') },
    { l: 'NVIDIA backstop', c: S('--s3') },
  ]);
  table(document.getElementById('revTbl'),
    ['Year', 'Rental $/hr', 'Utilisation', 'Contracted', 'Spot', 'Backstop', 'Total'],
    r.years.map(y => ['Year ' + y.t, '$' + y.price.toFixed(2), fmtPct(y.util, 0),
      fmtM(y.revContract), fmtM(y.revSpot), fmtM(y.bsPaid), fmtM(y.revenue + y.bsPaid)]));

  stackedColumns(document.getElementById('costSvg'), {
    cats,
    series: [
      { l: 'Operating costs', c: S('--s1'), v: r.years.map(y => y.opex) },
      { l: 'Interest', c: S('--s2'), v: r.years.map(y => y.interest) },
      { l: 'Principal', c: S('--s3'), v: r.years.map(y => y.principal) },
      { l: 'NVIDIA upside share', c: S('--s4'), v: r.years.map(y => y.upside) },
      { l: 'Cash tax', c: S('--s5'), v: r.years.map(y => y.tax) },
    ],
    line: { l: 'Cash revenue incl. backstop', c: S('--s7'), v: r.years.map(y => y.revenue + y.bsPaid) },
    yFmt: v => fmtM(v), yFmtFull: v => fmtUSD(v),
    catLabel: c => 'Year ' + c.slice(1),
  });
  legend(document.getElementById('costLegend'), [
    { l: 'Operating costs', c: S('--s1') }, { l: 'Interest', c: S('--s2') },
    { l: 'Principal', c: S('--s3') }, { l: 'NVIDIA upside share', c: S('--s4') },
    { l: 'Cash tax', c: S('--s5') },
    { l: 'Cash revenue incl. backstop', c: S('--s7'), line: true },
  ]);
  table(document.getElementById('costTbl'),
    ['Year', 'Revenue', 'Opex', 'EBITDA', 'Interest', 'Principal', 'Tax', 'Equity CF'],
    r.years.map(y => ['Year ' + y.t, fmtM(y.revenue + y.bsPaid), fmtM(y.opex), fmtM(y.ebitda),
      fmtM(y.interest), fmtM(y.principal), fmtM(y.tax), fmtM(y.equityCF)]));

  const dY = r.years.filter(y => y.debtService > 1);
  lineChart(document.getElementById('dscrSvg'), {
    cats: dY.map(y => 'Y' + y.t),
    series: [
      { l: 'DSCR (with backstop)', c: S('--s1'), v: dY.map(y => clamp(y.dscr, -1, 8)) },
      { l: 'DSCR (backstop removed)', c: S('--s2'), v: dY.map(y => clamp(y.dscrNoBs, -1, 8)), dash: '5 4' },
    ],
    rules: [
      { v: 1, l: '1.00× default', c: cssv('--crit') },
      { v: 1.25, l: '1.25× covenant', c: cssv('--warn') },
    ],
    yFmt: v => v.toFixed(2) + '×', yFmtFull: v => v.toFixed(2) + '×',
    catLabel: c => 'Year ' + c.slice(1),
    empty: 'No debt service at these settings — the deal is all-equity',
  });
  legend(document.getElementById('dscrLegend'), [
    { l: 'DSCR (with backstop)', c: S('--s1'), line: true },
    { l: 'DSCR (backstop removed)', c: S('--s2'), line: true },
  ]);
  table(document.getElementById('dscrTbl'),
    ['Year', 'CFADS', 'Debt service', 'DSCR', 'DSCR excl. backstop', 'Closing debt'],
    r.years.map(y => ['Year ' + y.t, fmtM(y.cfads),
      y.debtService > 1 ? fmtM(y.debtService) : 'repaid',
      y.debtService > 1 ? fmtX(y.dscr) : '\u2014',
      y.debtService > 1 ? fmtX(y.dscrNoBs) : '\u2014', fmtM(y.balance)]));

  lineChart(document.getElementById('nvSvg'), {
    cats: ['t0'].concat(cats),
    series: [{ l: 'NVIDIA cumulative position', c: S('--s1'), v: [r.nvT0].concat(r.nvCum), fill: true }],
    rules: [{ v: 0, l: 'break-even', c: cssv('--crit') }],
    zero: true,
    yFmt: v => fmtM(v), yFmtFull: v => fmtUSD(v),
    catLabel: c => c === 't0' ? 'At the sale' : 'Year ' + c.slice(1),
  });
  legend(document.getElementById('nvLegend'), [
    { l: 'Cumulative: sale profit − backstop + upside share', c: S('--s1'), line: true },
  ]);
  table(document.getElementById('nvTbl'),
    ['Period', 'Backstop paid', 'Upside received', 'Net for the year', 'Cumulative'],
    [['At the sale', '—', fmtM(r.grossProfitEcon), fmtM(r.nvT0), fmtM(r.nvT0)]].concat(
      r.years.map((y, i) => ['Year ' + y.t, fmtM(-y.bsPaid), fmtM(y.upside),
        fmtM(-y.bsPaid + y.upside + y.equityCF * P.nvEquityPct), fmtM(r.nvCum[i])])));
}

/* -------------------------------------------------------------- waterfall */
function renderWaterfall(r) {
  const y = r.years[0];
  const steps = [
    { l: 'Customer rentals', v: y.revenue, total: false },
    { l: 'NVIDIA backstop', v: y.bsPaid },
    { l: 'Operating costs', v: -y.opex },
    { l: 'NVIDIA upside share', v: -y.upside },
    { l: 'EBITDA', total: true },
    { l: 'Cash tax', v: -y.tax },
    { l: 'Interest', v: -y.interest },
    { l: 'Principal', v: -y.principal },
    { l: 'Cash to equity', total: true },
  ];
  waterfall(document.getElementById('wfSvg'), { steps });
  table(document.getElementById('wfTbl'), ['Line', 'Amount', 'Running'],
    (() => { let run = 0; return steps.map(s => {
      if (!s.total) run += s.v;
      return [s.l, s.total ? '—' : fmtUSD(s.v), fmtUSD(run)];
    }); })());
}

/* ------------------------------------------------------------- heatmap UI */
const HEAT_X = [0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40];
const HEAT_Y = [0.95, 0.85, 0.75, 0.65, 0.55, 0.45, 0.35, 0.25];

function renderHeat(r) {
  const mk = document.getElementById('heatMetric').value || 'nvNPV';
  const M = METRIC[mk];
  const z = HEAT_Y.map(u => HEAT_X.map(d => {
    const rr = withP({ priceDecay: d, util0: u });
    const v = M.get(rr);
    return v == null ? null : v;
  }));
  document.getElementById('heatDesc').textContent = M.desc;
  heatmap(document.getElementById('heatSvg'), {
    xs: HEAT_X, ys: HEAT_Y, z, mid: M.mid, better: M.better,
    xFmt: v => (v * 100).toFixed(0) + '%', yFmt: v => (v * 100).toFixed(0) + '%',
    xTitle: 'Annual rental price decay →', yTitle: '← Year-1 utilisation',
    xLabel: 'Price decay', yLabel: 'Utilisation',
    metricLabel: M.l,
    cellFmt: v => v == null ? '—' : (mk === 'eqIRR' || mk === 'giveback') ? (v * 100).toFixed(0)
      : mk === 'minDSCR' || mk === 'minDSCRNoBs' ? v.toFixed(2)
      : (v / 1e6).toFixed(0),
    fullFmt: v => M.fmt(v),
    markX: P.priceDecay, markY: P.util0,
  });
  table(document.getElementById('heatTbl'),
    ['Utilisation \\ decay'].concat(HEAT_X.map(v => (v * 100).toFixed(0) + '%')),
    HEAT_Y.map((u, j) => [(u * 100).toFixed(0) + '%'].concat(z[j].map(v => M.fmt(v)))));
}

/* ------------------------------------------------------------- tornado UI */
const TORN = [
  { l: 'Rental price decay', k: 'priceDecay', lo: p => clamp(p.priceDecay - 0.10, -0.1, 0.8), hi: p => clamp(p.priceDecay + 0.10, -0.1, 0.8), f: v => fmtPct(v, 0) + ' /yr' },
  { l: 'Year-1 utilisation', k: 'util0', lo: p => clamp(p.util0 - 0.15, 0.05, 1), hi: p => clamp(p.util0 + 0.15, 0.05, 1), f: v => fmtPct(v, 0) },
  { l: 'Year-1 rental rate', k: 'price0', lo: p => p.price0 * 0.75, hi: p => p.price0 * 1.25, f: v => '$' + v.toFixed(2) + '/hr' },
  { l: 'Fleet under contract', k: 'contractedPct', lo: p => clamp(p.contractedPct - 0.25, 0, 1), hi: p => clamp(p.contractedPct + 0.25, 0, 1), f: v => fmtPct(v, 0) },
  { l: 'Fixed opex per GPU', k: 'fixedOpexPerGpu', lo: p => Math.max(0, p.fixedOpexPerGpu - 2000), hi: p => p.fixedOpexPerGpu + 2000, f: v => '$' + fmtInt(Math.round(v)) },
  { l: 'Guaranteed floor', k: 'floorUtil', lo: p => clamp(p.floorUtil - 0.15, 0, 1), hi: p => clamp(p.floorUtil + 0.15, 0, 1), f: v => fmtPct(v, 0) },
  { l: 'Interest rate', k: 'rate', lo: p => Math.max(0.005, p.rate - 0.025), hi: p => p.rate + 0.025, f: v => fmtPct(v, 2) },
  { l: 'GPU cost', k: 'gpuCost', lo: p => p.gpuCost * 0.8, hi: p => p.gpuCost * 1.2, f: v => '$' + fmtInt(Math.round(v)) },
  { l: 'Debt share of capex', k: 'debtPct', lo: p => clamp(p.debtPct - 0.15, 0, 0.9), hi: p => clamp(p.debtPct + 0.15, 0, 0.9), f: v => fmtPct(v, 0) },
  { l: 'Utilisation drift', k: 'utilDrift', lo: p => p.utilDrift - 0.03, hi: p => p.utilDrift + 0.03, f: v => (v >= 0 ? '+' : MINUS) + (Math.abs(v) * 100).toFixed(1) + 'pp/yr' },
];

function renderTornado(r) {
  const mk = document.getElementById('tornMetric').value || 'nvNPV';
  const M = METRIC[mk];
  const base = M.get(r);
  document.getElementById('tornDesc').textContent =
    'Each bar moves one assumption while everything else stays put. Output: ' + M.l.toLowerCase() + '.';
  const rows = TORN.map(t => {
    const lv = t.lo(P), hv = t.hi(P);
    const a = M.get(withP({ [t.k]: lv })), b = M.get(withP({ [t.k]: hv }));
    return { l: t.l, lo: a == null ? base : a, hi: b == null ? base : b,
      loLabel: t.f(lv), hiLabel: t.f(hv), swing: Math.max(Math.abs((a == null ? base : a) - base), Math.abs((b == null ? base : b) - base)) };
  }).sort((x, y) => y.swing - x.swing);

  tornado(document.getElementById('tornSvg'), {
    rows, base, fmt: M.fmt, better: M.better, metricLabel: M.l,
  });
  legend(document.getElementById('tornLegend'), [
    { l: 'Moves the outcome up', c: cssv('--s1') },
    { l: 'Moves the outcome down', c: cssv('--s8') },
  ]);
  table(document.getElementById('tornTbl'), ['Assumption', 'Low case', 'Result', 'High case', 'Result', 'Swing'],
    rows.map(x => [x.l, x.loLabel, M.fmt(x.lo), x.hiLabel, M.fmt(x.hi), M.fmt(x.swing).replace(MINUS, '±')]));
}

/* ------------------------------------------------------------- break-even */
function renderBreakeven(r) {
  const priceDSCR = solve(v => { const rr = withP({ price0: v }); return rr.minDSCR == null ? -9 : rr.minDSCR; }, 0.1, 20, 1.0);
  const priceIRR = solve(v => { const rr = withP({ price0: v }); return rr.eqIRR == null ? -0.95 : rr.eqIRR; }, 0.1, 20, 0);
  const priceCall = solve(v => { const rr = withP({ price0: v }); return rr.cumBackstop > 1 ? 1 : -1; }, 0.1, 20, 0);
  const decayZero = solve(v => withP({ priceDecay: v }).nvNPV, -0.1, 0.8, 0);
  const utilCall = solve(v => (withP({ util0: v }).cumBackstop > 1 ? 1 : -1), 0.03, 1, 0);

  // headroom reads as a distance below today's rate; a break-even ABOVE today's
  // rate means the threshold is already breached, and must not be shown as room
  const room = bp => {
    if (bp == null) return '';
    const d = 1 - bp / P.price0;
    return d >= 0 ? fmtPct(d, 0) + ' of headroom below today'
                  : fmtPct(-d, 0) + ' ABOVE today — already breached';
  };
  const roomSev = (bp, bands) => bp == null ? 'ok' : sevOf(1 - bp / P.price0, bands, 'high');

  const rows = [
    { l: 'Rental rate where DSCR hits 1.00×', v: priceDSCR == null ? 'never in range' : '$' + priceDSCR.toFixed(2) + '/hr',
      d: room(priceDSCR), sev: roomSev(priceDSCR, [0.45, 0.25, 0.1]) },
    { l: 'Rental rate where equity IRR hits 0%', v: priceIRR == null ? 'never in range' : '$' + priceIRR.toFixed(2) + '/hr',
      d: room(priceIRR), sev: roomSev(priceIRR, [0.4, 0.22, 0.08]) },
    { l: 'Rental rate that first triggers the backstop', v: priceCall == null ? 'already triggered / never' : '$' + priceCall.toFixed(2) + '/hr',
      d: room(priceCall), sev: 'ok' },
    { l: 'Utilisation that first triggers the backstop', v: utilCall == null ? 'already triggered / never' : fmtPct(utilCall, 0),
      d: utilCall == null ? '' : (P.util0 - utilCall > 0 ? fmtPct(P.util0 - utilCall, 0) + ' of headroom' : ''), sev: 'ok' },
    { l: 'Price decay where NVIDIA’s net PV hits zero', v: decayZero == null ? 'not in range' : fmtPct(decayZero, 0) + ' /yr',
      d: decayZero == null ? 'profit survives the whole range' : 'currently ' + fmtPct(P.priceDecay, 0) + ' /yr',
      sev: decayZero == null ? 'ok' : sevOf(decayZero - P.priceDecay, [0.15, 0.08, 0.02], 'high') },
  ];
  document.getElementById('beCard').innerHTML =
    '<div class="card-head"><h3>Break-even points</h3><p>How far each driver has to move before something breaks, from where the sliders sit now.</p></div>' +
    rows.map(x =>
      '<div style="padding:9px 0;border-top:1px solid var(--rule)">' +
      '<div style="display:flex;gap:8px;align-items:baseline"><span style="font-size:12px;color:var(--ink-2);flex:1">' + x.l + '</span>' +
      pill(x.sev) + '</div>' +
      '<div style="font-family:var(--mono);font-size:16px;font-weight:650;margin-top:2px;font-variant-numeric:tabular-nums">' + x.v + '</div>' +
      (x.d ? '<div style="font-size:11px;color:var(--ink-3);font-variant-numeric:tabular-nums">' + x.d + '</div>' : '') +
      '</div>').join('');
}

/* ------------------------------------------------------------ Monte Carlo */
function renderMC(r, mc) {
  document.getElementById('mcNLabel').textContent = fmtInt(mc.n);
  const S = k => cssv(k);

  histogram(document.getElementById('mcNvSvg'), {
    values: mc.nv, fmt: v => fmtM(v), threshold: 0, better: 'high',
    xTitle: 'NVIDIA net present value',
    marks: [
      { v: mc.nvP5, l: 'P5', c: cssv('--ink-3') },
      { v: mc.nvP50, l: 'median', c: cssv('--ink-2') },
      { v: r.nvNPV, l: 'current settings', c: cssv('--s7'), dash: '4 3' },
    ],
  });
  legend(document.getElementById('mcNvLegend'), [
    { l: 'Paths where NVIDIA keeps money', c: S('--s1') },
    { l: 'Paths where the sale profit is fully given back', c: S('--s8') },
  ]);

  histogram(document.getElementById('mcEqSvg'), {
    values: mc.eq, fmt: v => fmtPct(v, 0), threshold: 0, better: 'high',
    lo: -0.6, hi: Math.max(0.6, mc.eqP95 * 1.1),
    xTitle: 'Equity IRR over the full horizon',
    marks: [
      { v: mc.eqP5, l: 'P5', c: cssv('--ink-3') },
      { v: mc.eqP50, l: 'median', c: cssv('--ink-2') },
    ],
  });
  legend(document.getElementById('mcEqLegend'), [
    { l: 'Positive equity return', c: S('--s1') },
    { l: 'Equity loses money', c: S('--s8') },
  ]);

  const stats = [
    ['NVIDIA net PV — median', fmtUSD(mc.nvP50)],
    ['NVIDIA net PV — 5th percentile', fmtUSD(mc.nvP5)],
    ['Expected shortfall (worst 5%)', fmtUSD(mc.nvCVaR)],
    ['Chance the sale profit is fully given back', fmtPct(mc.pNvNeg, 0)],
    ['Chance the backstop is called at all', fmtPct(mc.pCalled, 0)],
    ['Chance the backstop cap binds', fmtPct(mc.pCap, 0)],
    ['Expected backstop cost', fmtUSD(mc.bsMean)],
    ['Backstop cost in the worst demand decile', fmtUSD(mc.tailBsMean)],
    ['Chance DSCR drops below 1.00×', fmtPct(mc.pBelow1, 0)],
    ['Chance equity loses money', fmtPct(mc.pEqNeg, 0)],
    ['Equity IRR — median', fmtPct(mc.eqP50, 1)],
    ['Equity IRR — 5th percentile', fmtPct(mc.eqP5, 1)],
  ];
  document.getElementById('mcStats').innerHTML =
    '<div class="card-head"><h3>Simulation summary</h3><p>Across ' + fmtInt(mc.n) +
    ' correlated paths. Deterministic seed — the same settings always give the same numbers.</p></div>' +
    '<div class="mc-grid">' +
    stats.map(s => '<div style="background:var(--surface);padding:10px 12px">' +
      '<div style="font-size:11.5px;color:var(--ink-3);line-height:1.3">' + s[0] + '</div>' +
      '<div style="font-family:var(--mono);font-size:17px;font-weight:650;margin-top:2px;font-variant-numeric:tabular-nums">' + s[1] + '</div>' +
      '</div>').join('') + '</div>';
}

/* --------------------------------------------------------- risk register */
function renderRisk(r, mc) {
  const out = [];
  const y1 = r.years[0];

  // 1 — who is actually carrying the credit
  {
    const d = r.minDSCRNoBs, sev = sevOf(d, [1.35, 1.15, 1.0], 'high');
    out.push({ sev, t: 'The lenders are underwriting NVIDIA, not the business',
      b: 'Minimum debt-service cover is <span class="num">' + fmtX(r.minDSCR) + '</span> with the backstop and <span class="num">' +
        fmtX(d) + '</span> without it. ' + (d < 1
          ? 'In <span class="num">' + r.yearsBelow1NoBs + '</span> year(s) the project cannot service its debt from operations at all — the loan is repaid out of NVIDIA’s guarantee. That is a corporate credit exposure to NVIDIA dressed as project finance.'
          : 'Operations cover the debt on their own, so the guarantee is genuine credit enhancement rather than the sole source of repayment.') +
        (Math.abs(r.minDSCR - d) < 0.005 && r.minDSCR < 1.25
          ? ' Note the two figures are identical: the worst year falls outside the ' + Math.round(P.backstopYears) +
            '-year backstop term, so the guarantee provides no support at the exact point cover is thinnest. A backstop shorter than the loan leaves the tail uncovered.'
          : '') });
  }

  // 2 — the floor is denominated in the wrong unit
  if (r.p.basis === 'spot') {
    const alt = withP({ basis: 'fixed' });
    const gap = alt.pvBackstop - r.pvBackstop;
    const sev = P.priceDecay > 0.2 ? 'crit' : P.priceDecay > 0.05 ? 'sev' : 'warn';
    out.push({ sev, t: 'The guarantee shrinks exactly when it is needed',
      b: 'The workbook values the shortfall at the <em>current</em> rental rate (<code>Backstop!B5</code> multiplies by <code>Assumptions!B9</code>). ' +
        'A utilisation floor paid at a collapsed price is not a revenue floor. At ' + fmtPct(P.priceDecay, 0) +
        ' annual decay, the same 50% floor is worth <span class="num">' + fmtUSD(r.pvBackstop) + '</span> here versus <span class="num">' +
        fmtUSD(alt.pvBackstop) + '</span> if it were struck at the year-1 price — a difference of <span class="num">' + fmtUSD(gap) +
        '</span> that the borrower thinks it has and does not.' });
  } else {
    out.push({ sev: 'ok', t: 'Floor struck at the year-1 price',
      b: 'The guarantee is denominated in fixed dollars rather than floating with the rental market, so a price collapse actually triggers support. This is the repaired version of the workbook’s formula — and it is materially more expensive for NVIDIA.' });
  }

  // 3 — price risk is uncovered entirely
  {
    const priceOnly = withP({ util0: P.util0, priceDecay: Math.max(P.priceDecay, 0.3) });
    const sev = priceOnly.cumBackstop < 1 ? 'crit' : 'warn';
    out.push({ sev, t: 'A pure price collapse triggers nothing',
      b: 'The trigger is utilisation, not revenue. Hold the fleet full and cut the rate to a third and the floor is never breached — the SPV starves while the guarantee sits idle. Forcing 30% annual decay at the current utilisation produces <span class="num">' +
        fmtUSD(priceOnly.cumBackstop) + '</span> of backstop payments' + (priceOnly.cumBackstop < 1 ? ' — none at all.' : '.') +
        ' A revenue floor, rather than a utilisation floor, would close this.' });
  }

  // 4 — cost fixity
  {
    const fixShare = y1.opexFixed / (y1.opex || 1);
    if (P.fixedOpexPerGpu < 500) {
      const alt = withP({ fixedOpexPerGpu: 4500, varOpexPct: 0.08 });
      out.push({ sev: 'sev', t: 'Operating costs are modelled as fully variable',
        b: '<code>Operations!B6 =B5*Assumptions!B11</code> makes 100% of opex flex with revenue. Power, colocation, staff and maintenance do not. Charging a realistic $4,500/GPU/yr of fixed cost with 8% variable moves minimum DSCR from <span class="num">' +
          fmtX(r.minDSCR) + '</span> to <span class="num">' + fmtX(alt.minDSCR) + '</span> and equity IRR from <span class="num">' +
          fmtPct(r.eqIRR, 1) + '</span> to <span class="num">' + fmtPct(alt.eqIRR, 1) + '</span>. Every downside case in the workbook is flattered by this one assumption.' });
    } else {
      out.push({ sev: fixShare > 0.75 ? 'warn' : 'ok', t: 'Operating leverage',
        b: '<span class="num">' + fmtPct(fixShare, 0) + '</span> of year-1 operating cost is fixed (<span class="num">' +
          fmtUSD(y1.opexFixed) + '</span>). Fixed cost is what converts a revenue dip into a covenant breach — the higher this share, the faster utilisation loss becomes a default.' });
    }
  }

  // 5 — caps
  {
    const exp = maxExposure(r);
    const mult = exp / (r.grossProfitRaw || 1);
    if (r.capBinds) {
      out.push({ sev: 'crit', t: 'The cap binds — the guarantee stops working mid-stress',
        b: '<span class="num">' + fmtUSD(r.cumUnpaid) + '</span> of shortfall goes unpaid because the aggregate cap of <span class="num">' +
          fmtUSD(r.aggCap) + '</span> is exhausted. A capped backstop protects NVIDIA and simultaneously removes the credit support in exactly the scenario the lenders sized the debt against. Caps are not a detail; they are the whole instrument.' });
    } else {
      out.push({ sev: mult > 3 ? 'sev' : mult > 1.5 ? 'warn' : 'ok', t: 'Uncapped downside against a capped upside',
        b: 'Maximum undiscounted exposure if revenue went to zero for the whole term is <span class="num">' + fmtUSD(exp) +
          '</span>, or <span class="num">' + mult.toFixed(1) + '×</span> the <span class="num">' + fmtUSD(r.grossProfitRaw) +
          '</span> of gross profit on the sale. NVIDIA is short a put and long a capped call: the profit on the hardware is fixed, the obligation is not.' });
    }
  }

  // 6 — wrong-way risk
  if (mc) {
    const sev = P.rho > 0.6 ? 'sev' : P.rho > 0.3 ? 'warn' : 'ok';
    out.push({ sev, t: 'Wrong-way risk: the guarantee is called in NVIDIA’s own bad state',
      b: 'Price and utilisation are drawn with correlation <span class="num">' + P.rho.toFixed(2) +
        '</span> from one demand factor. Expected backstop cost across all paths is <span class="num">' + fmtUSD(mc.bsMean) +
        '</span>, but <span class="num">' + fmtUSD(mc.tailBsMean) + '</span> in the worst demand decile — <span class="num">' +
        (mc.bsMean > 0 ? (mc.tailBsMean / mc.bsMean).toFixed(1) + '×' : 'far') +
        '</span> the average. Those are the same states in which NVIDIA’s own order book, share price and other vendor commitments are under pressure. This exposure does not diversify.' });
  }

  // 7 — contract roll-off
  {
    const cy = Math.round(P.contractYears), tn = Math.round(P.tenor);
    if (P.contractedPct <= 0.01) {
      out.push({ sev: 'sev', t: 'No contracted revenue behind the debt',
        b: 'The entire revenue line is spot. Lenders advancing <span class="num">' + fmtPct(P.debtPct, 0) +
          '</span> of capex against an uncontracted, single-asset-class cash flow are relying on the backstop and the residual value of depreciating hardware. Take-or-pay cover is the credit support that actually survives a price war.' });
    } else if (cy < tn) {
      out.push({ sev: cy < tn - 2 ? 'sev' : 'warn', t: 'Contract cover rolls off before the debt does',
        b: '<span class="num">' + fmtPct(P.contractedPct, 0) + '</span> of the fleet is contracted for <span class="num">' + cy +
          '</span> years against a <span class="num">' + tn + '</span>-year loan. From year <span class="num">' + (cy + 1) +
          '</span> the debt is serviced entirely from spot rentals at a price ' + fmtPct(1 - Math.pow(1 - P.priceDecay, cy), 0) +
          ' below where it started.' });
    } else {
      out.push({ sev: 'ok', t: 'Contract cover matches the debt tenor',
        b: '<span class="num">' + fmtPct(P.contractedPct, 0) + '</span> of the fleet is under take-or-pay for the life of the loan, which is the single most effective piece of credit support in the structure.' });
    }
  }

  // 8 — refinancing / residual
  {
    const last = r.years[r.years.length - 1];
    const resid = r.capexGpu * P.residualPct + r.capexOther * P.shellResidPct;
    const revFall = 1 - (last.revenue / (r.years[0].revenue || 1));
    const sev = last.terminal < 0 ? 'sev' : revFall > 0.5 ? 'warn' : 'ok';
    out.push({ sev, t: 'The asset ages faster than the loan amortises',
      b: 'Revenue in year <span class="num">' + last.t + '</span> is <span class="num">' + fmtPct(revFall, 0) +
        '</span> below year 1, while the loan amortises on a straight <span class="num">' + Math.round(P.tenor) +
        '</span>-year schedule. Exit leaves <span class="num">' + fmtUSD(resid) + '</span> of residual value against <span class="num">' +
        fmtUSD(last.balance) + '</span> of remaining debt, a terminal flow of <span class="num">' +
        fmtUSD(last.terminal) + '</span> to equity.' });
  }

  // 11 — the underlying return assumption is heroic before any of this matters
  {
    const revPerGpu = y1.revenue / P.gpus;
    const costPerGpu = P.gpuCost + P.otherCapexPerGpu;
    const yield1 = revPerGpu / costPerGpu;
    const payback = y1.ebitda > 0 ? r.capex / y1.ebitda : null;
    const sev = yield1 > 0.45 ? 'sev' : yield1 > 0.3 ? 'warn' : 'ok';
    out.push({ sev, t: 'The base case assumes an extraordinary asset yield',
      b: 'At <span class="num">$' + P.price0.toFixed(2) + '/hr</span> and <span class="num">' + fmtPct(P.util0, 0) +
        '</span> utilisation each GPU earns <span class="num">' + fmtUSD(revPerGpu) + '</span> a year against <span class="num">' +
        fmtUSD(costPerGpu) + '</span> of all-in installed cost — a gross yield of <span class="num">' + fmtPct(yield1, 0) +
        '</span>' + (payback ? ' and an EBITDA payback of <span class="num">' + payback.toFixed(1) + ' years</span>' : '') +
        '. Returns like that attract capacity, and capacity is what compresses the rental rate. The workbook holds the price constant while assuming a yield that guarantees it cannot stay constant.' });
  }

  // 9 — incrementality / circularity
  {
    const sev = P.incrementality < 0.5 ? 'sev' : P.incrementality < 0.9 ? 'warn' : 'ok';
    out.push({ sev, t: 'Is this revenue real, or is it a loan to a customer?',
      b: 'At <span class="num">' + fmtPct(P.incrementality, 0) + '</span> incrementality, <span class="num">' +
        fmtUSD(r.grossProfitEcon) + '</span> of the <span class="num">' + fmtUSD(r.grossProfitRaw) +
        '</span> gross profit is genuinely new business. The rest is demand NVIDIA would have had anyway, now carrying a free option written against it. ' +
        (P.nvEquityPct > 0 ? 'NVIDIA also holds <span class="num">' + fmtPct(P.nvEquityPct, 0) +
          '</span> of the SPV equity, funding <span class="num">' + fmtUSD(P.nvEquityPct * r.equity) +
          '</span> of the purchase of its own product — the same dollar counted as revenue and as an investment.' : '') });
  }

  // 10 — the upside share is taken on gross
  {
    const gross = y1.upside, asEbitda = y1.ebitda > 0 ? gross / (y1.ebitda + gross) : null;
    out.push({ sev: 'warn', t: 'The upside share is skimmed off gross revenue, not profit',
      b: '<code>Backstop!B6</code> takes ' + fmtPct(P.sharePct, 0) +
        ' of revenue above the floor before any cost. In year 1 that is <span class="num">' + fmtUSD(gross) + '</span>' +
        (asEbitda ? ', equal to <span class="num">' + fmtPct(asEbitda, 1) + '</span> of pre-share EBITDA' : '') +
        ' — an effective take roughly ' + (asEbitda ? (asEbitda / P.sharePct).toFixed(1) : '1.3') +
        '× the headline rate. It is charged in good states and worth nothing in bad ones, which is the wrong shape for something meant to pay for a guarantee.' });
  }

  const order = { crit: 0, sev: 1, warn: 2, ok: 3 };
  out.sort((a, b) => order[a.sev] - order[b.sev]);
  document.getElementById('riskList').innerHTML = out.map(x =>
    '<div class="risk ' + x.sev + '"><div class="risk-stripe"></div><div class="risk-body">' +
    '<div class="risk-top"><h4>' + x.t + '</h4>' + pill(x.sev) + '</div><p>' + x.b + '</p></div></div>').join('');
}

/* ------------------------------------------------------------ audit block */
const EXCEL = [
  ['Operations!B1', 'GPU CapEx', '=Assumptions!B2*B3', 600000000, r => r.capexGpu],
  ['Operations!B2', 'Total CapEx', '=B1+Assumptions!B4', 1000000000, r => r.capex],
  ['Operations!B3', 'Debt', '=B2*Assumptions!B5', 750000000, r => r.debt],
  ['Operations!B4', 'Equity', '=B2-B3', 250000000, r => r.equity],
  ['Operations!B5', 'Annual Revenue', '=B2*B10*B8*B9', 525600000, r => r.years[0].revenue],
  ['Operations!B6', 'Operating Expense', '=B5*Assumptions!B11', 131400000, r => r.years[0].opex],
  ['Operations!B7', 'EBITDA', '=B5-B6', 394200000, r => r.years[0].revenue - r.years[0].opex],
  ['Operations!B8', 'Interest Expense', '=B3*Assumptions!B6', 60000000, r => r.years[0].interest],
  ['Operations!B9', 'Principal / Year', '=B3/Assumptions!B7', 125000000, r => r.years[0].principal],
  ['Operations!B10', 'Cash After Debt Service', '=B7-B8-B9', 209200000,
    r => r.years[0].revenue - r.years[0].opex - r.years[0].interest - r.years[0].principal],
  ['Backstop!B4', 'Shortfall (utilisation)', '=MAX(0,B3-B2)', 0,
    r => Math.max(0, r.p.floorUtil - r.p.util0)],
  ['Backstop!B5', 'Backstop Revenue', '=B4*B2*B10*B9', 0, r => r.years[0].bsPaid],
  ['Backstop!B6', 'Upside Share to Nvidia', '=MAX(0,B2-B3)*…*B13', 17520000, r => r.years[0].upside],
  ['Credit!B4', 'DSCR', '=B2/B3', 2.130810811,
    r => (r.years[0].revenue - r.years[0].opex) / (r.years[0].interest + r.years[0].principal)],
  ['Equity Returns!B3', 'Year 1 Cash Flow', '=Ops!B10+Backstop!B5-B6', 191680000,
    r => r.years[0].revenue - r.years[0].opex - r.years[0].interest - r.years[0].principal + r.years[0].bsPaid - r.years[0].upside],
  ['Equity Returns!B4', 'Simple Cash Yield', '=B3/B2', 0.76672,
    r => (r.years[0].revenue - r.years[0].opex - r.years[0].interest - r.years[0].principal + r.years[0].bsPaid - r.years[0].upside) / r.equity],
];

function renderTieout() {
  const w = project(Object.assign({}, WORKBOOK));
  const rows = EXCEL.map(([cell, name, formula, want, get]) => {
    const got = get(w);
    const diff = Math.abs(got - want);
    const rel = want !== 0 ? diff / Math.abs(want) : diff;
    const ok = rel < 1e-6 || diff < 0.5;
    const f = v => Math.abs(v) > 1000 ? fmtUSD(v) : (Math.abs(v) < 10 ? v.toFixed(6) : v.toFixed(2));
    return [cell, name, '<code>' + formula.replace(/</g, '&lt;') + '</code>', f(want), f(got),
      ok ? '<span style="color:var(--good-ink);font-weight:700">match</span>'
         : '<span style="color:var(--crit-ink);font-weight:700">' + f(got - want) + '</span>'];
  });
  const allOk = rows.every(r => r[5].indexOf('match') >= 0);
  document.getElementById('tieout').innerHTML =
    '<div style="margin-bottom:10px">' + pill(allOk ? 'ok' : 'crit',
      allOk ? 'all ' + rows.length + ' cells reproduce exactly' : 'mismatch') + '</div>' +
    '<div class="tbl-wrap"><table class="data"><thead><tr>' +
    ['Cell', 'Line', 'Workbook formula', 'Excel', 'This tool', 'Difference'].map(c => '<th>' + c + '</th>').join('') +
    '</tr></thead><tbody>' + rows.map(r => '<tr>' + r.map((c, i) =>
      '<td' + (i <= 2 ? ' style="text-align:left"' : '') + '>' + c + '</td>').join('') + '</tr>').join('') +
    '</tbody></table></div>';
}

const FLAWS = [
  { n: '01', t: 'One year, held flat forever',
    b: ['There is no time index anywhere in the workbook. <code>Operations!B5</code> is a single number and every downstream sheet consumes it once. A six-year loan is being sized against a single snapshot.',
        '<span class="fix">Here:</span> a full schedule to the analysis horizon, with the debt balance rolling and the asset ageing.'] },
  { n: '02', t: 'No rental price decay',
    b: ['<code>Assumptions!B9</code> is a constant $4.00/hr. GPU rental rates fall as each generation lands and as capacity catches up with demand — this is the single largest driver of the outcome and the workbook has no cell for it.',
        '<span class="fix">Here:</span> an annual decay rate, and a sensitivity surface that shows it dominating everything else.'] },
  { n: '03', t: 'The floor is a utilisation floor, valued at spot',
    b: ['<code>Backstop!B5 =B4*Assumptions!B2*B10*B9</code>. The shortfall is measured in utilisation and then priced at the <em>current</em> rate. If the rate halves, the guarantee halves with it, and a pure price collapse triggers nothing at all because utilisation never moves.',
        '<span class="fix">Here:</span> a basis toggle. Struck at the year-1 price it behaves like a revenue floor; struck at spot it behaves like the workbook.'] },
  { n: '04', t: 'Operating costs are 100% variable',
    b: ['<code>Operations!B6 =B5*Assumptions!B11</code>. If revenue falls 60%, opex falls 60%. Power contracts, colocation leases, staff and maintenance do not work that way — most of the cost base is fixed against installed capacity, not against revenue.',
        '<span class="fix">Here:</span> opex splits into fixed dollars per installed GPU plus a variable percentage, with inflation on the fixed leg.'] },
  { n: '05', t: 'Interest never falls as the loan amortises',
    b: ['<code>Operations!B8 =B3*Assumptions!B6</code> charges interest on the <em>original</em> debt, not the outstanding balance, while <code>B9</code> repays a sixth of principal every year. In year 1 they agree; by year 4 the workbook overstates interest by roughly half. The single-period framing conceals it.',
        '<span class="fix">Here:</span> interest accrues on the closing balance, with straight-line or annuity amortisation and an optional interest-only period.'] },
  { n: '06', t: 'The backstop never reaches the credit metrics',
    b: ['<code>Operations!B10</code> ignores <code>Backstop!B5</code> entirely — the backstop is only picked up in <code>Equity Returns!B3</code>. So <code>Credit!B4</code>, the DSCR the lenders would look at, excludes the very guarantee the deal is built on.',
        '<span class="fix">Here:</span> DSCR is shown both ways, and the gap between the two lines is the measured credit value of the guarantee.'] },
  { n: '07', t: 'DSCR is defined so it can never fail',
    b: ['<code>Credit!B2 =Operations!B10+B8+B9</code> adds interest and principal back to cash after debt service, which returns EBITDA by construction. <code>B4</code> is therefore EBITDA ÷ debt service — a restatement, not a test. It cannot reveal anything the EBITDA line has not already said.',
        '<span class="fix">Here:</span> CFADS is built from the cash statement, after tax, with the backstop treated explicitly.'] },
  { n: '08', t: 'No caps, no term, no counterparty',
    b: ['<code>Backstop!B5</code> is unbounded and undated. In practice a vendor guarantee carries an annual cap, an aggregate cap and a term — and each one removes support precisely in the tail the lenders sized against.',
        '<span class="fix">Here:</span> annual and aggregate caps plus a term, with the unpaid shortfall tracked separately so you can see the guarantee stop working.'] },
  { n: '09', t: 'NVIDIA’s side of the trade is missing',
    b: ['The workbook nets the backstop into the SPV’s equity return and never asks what the arrangement is worth to the guarantor. There is no gross margin, no exposure, no present value, no question of whether the order was incremental.',
        '<span class="fix">Here:</span> a full NVIDIA position — gross profit on the sale, less the present value of calls, plus the upside share, plus any SPV equity, with a give-back ratio and a maximum exposure.'] },
  { n: '10', t: 'No tax, depreciation, residual or exit',
    b: ['Cash equals EBITDA less debt service. There is no tax, no depreciation shield, no working capital, and no terminal value — so a six-year loan against hardware with a five-year economic life simply ends.',
        '<span class="fix">Here:</span> cash tax with loss carry-forward, depreciation on both asset classes, and a residual-value exit net of the remaining debt balance.'] },
  { n: '11', t: 'Datacenter capex does not scale with the fleet',
    b: ['<code>Assumptions!B4</code> is a hardcoded $400,000,000. Change <code>B2</code> from 20,000 GPUs to 40,000 and the model still builds one datacenter — halving the effective build cost per GPU and silently improving every return metric.',
        '<span class="fix">Here:</span> non-GPU capex is expressed per installed GPU, defaulted to the $20,000 the workbook implies.'] },
  { n: '12', t: 'Every risk is treated as independent',
    b: ['Being a single deterministic case, the workbook cannot express that low utilisation and low prices are the same event. A guarantee against uncorrelated risks is cheap; this one is written against a single demand factor that also drives the guarantor’s own results.',
        '<span class="fix">Here:</span> a correlated Monte Carlo, plus a tail statistic showing what the backstop costs in the worst demand decile.'] },
];

function renderFlaws() {
  document.getElementById('flaws').innerHTML = FLAWS.map(f =>
    '<div class="flaw"><h4><span class="n">' + f.n + '</span>' + f.t + '</h4>' +
    f.b.map(p => '<p>' + p + '</p>').join('') + '</div>').join('');
}

/* ==================================================================== BOOT */
function boot() {
  // metric selectors
  const opts = METRICS.map(m => '<option value="' + m.k + '">' + m.l + '</option>').join('');
  const hm = document.getElementById('heatMetric'), tm = document.getElementById('tornMetric');
  hm.innerHTML = opts; tm.innerHTML = opts;
  hm.value = 'nvNPV'; tm.value = 'nvNPV';
  hm.addEventListener('change', () => renderHeat(R));
  tm.addEventListener('change', () => renderTornado(R));

  // table toggles
  document.addEventListener('click', e => {
    const b = e.target.closest('.tbl-toggle'); if (!b) return;
    const t = document.getElementById(b.dataset.tbl);
    const open = t.hasAttribute('hidden');
    if (open) t.removeAttribute('hidden'); else t.setAttribute('hidden', '');
    b.textContent = open ? 'Hide table' : 'Show as table';
  });

  // theme
  document.getElementById('themeBtn').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next = cur ? (cur === 'dark' ? 'light' : 'dark') : (sysDark ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', next);
    renderFast(); renderSlow();
  });

  buildPresets();
  if (!deserialize(location.hash)) { P = Object.assign({}, REPAIRED); activePreset = 'repaired'; }
  else activePreset = null;
  buildRail();
  syncRail();
  renderTieout();
  renderFlaws();
  renderFast();
  renderSlow();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
