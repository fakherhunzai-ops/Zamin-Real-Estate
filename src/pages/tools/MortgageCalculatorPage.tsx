import { useEffect, useMemo, useState } from 'react';
import { ToolHeader, ToolCrossLinks, ToolField, Stat, ReportActions, ScenarioChip } from '../../components/tools/ToolLayout';
import CtaBand from '../../components/ui/CtaBand';
import { useSavedReport } from '../../hooks/useSavedReport';
import { useToast } from '../../context/ToastContext';
import { cn, formatPrice } from '../../lib/utils';
import { EMAIL, SITE_NAME } from '../../lib/constants';
import { usePageMeta } from '../../hooks/usePageMeta';

interface Inputs {
  price: number;
  downPct: number;
  years: number;
  rate: number;
}

interface Both {
  a: Inputs;
  b: Inputs;
}

const DEFAULTS: Both = {
  a: { price: 20_000_000, downPct: 20, years: 15, rate: 16 },
  b: { price: 35_000_000, downPct: 30, years: 20, rate: 16 },
};

function compute(inp: Inputs) {
  const loan = Math.max(0, inp.price * (1 - inp.downPct / 100));
  const n = Math.max(1, Math.round(inp.years * 12));
  const r = inp.rate / 1200;
  const emi = r > 0 ? (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : loan / n;
  const totalPaid = emi * n;
  const totalInterest = totalPaid - loan;
  // yearly schedule
  let bal = loan;
  const rows: { year: number; interest: number; principal: number; balance: number }[] = [];
  for (let y = 1; y <= Math.ceil(n / 12); y++) {
    let interest = 0;
    let principal = 0;
    for (let m = 0; m < 12 && (y - 1) * 12 + m < n; m++) {
      const i = bal * r;
      interest += i;
      const pr = emi - i;
      principal += pr;
      bal -= pr;
    }
    rows.push({ year: y, interest, principal, balance: Math.max(0, bal) });
  }
  return { loan, emi, totalPaid, totalInterest, rows, downAmount: inp.price - loan };
}

export default function MortgageCalculatorPage() {
  usePageMeta(
    'Mortgage & EMI Calculator | Zamin Free Tools',
    'Estimate your monthly mortgage payment, total interest and yearly repayment schedule for property in Gilgit-Baltistan — free, with a printable summary.'
  );

  const { loadSaved, save } = useSavedReport<Both>('zamin.report.mortgage');
  const { toast } = useToast();
  const [inputs, setInputs] = useState<Both>(() => loadSaved() ?? DEFAULTS);

  useEffect(() => {
    const saved = loadSaved();
    if (saved) toast('Your saved mortgage report was restored', 'info');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const A = useMemo(() => compute(inputs.a), [inputs.a]);
  const B = useMemo(() => compute(inputs.b), [inputs.b]);

  const upd = (side: 'a' | 'b') => (key: keyof Inputs) => (v: number) =>
    setInputs((prev) => ({ ...prev, [side]: { ...prev[side], [key]: v } }));

  const fmt = (n: number) => formatPrice(Math.round(n));

  const onSave = () => {
    save(inputs);
    toast('Report saved on this device');
  };

  const onEmail = () => {
    const body = [
      `MORTGAGE SUMMARY — ${SITE_NAME}`,
      '',
      `SCENARIO A: Property ${fmt(inputs.a.price)}, ${inputs.a.downPct}% down, ${inputs.a.years} yrs @ ${inputs.a.rate}%`,
      `  Loan: ${fmt(A.loan)} | Monthly EMI: ${fmt(A.emi)}`,
      `  Total paid: ${fmt(A.totalPaid)} | Total interest: ${fmt(A.totalInterest)}`,
      '',
      `SCENARIO B: Property ${fmt(inputs.b.price)}, ${inputs.b.downPct}% down, ${inputs.b.years} yrs @ ${inputs.b.rate}%`,
      `  Loan: ${fmt(B.loan)} | Monthly EMI: ${fmt(B.emi)}`,
      `  Total paid: ${fmt(B.totalPaid)} | Total interest: ${fmt(B.totalInterest)}`,
      '',
      `Estimates only — confirm rates with your bank. ${SITE_NAME}, Gilgit-Baltistan.`,
    ].join('\n');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('My Zamin Mortgage Summary')}&body=${encodeURIComponent(body)}`;
  };

  const scenarioBlock = (side: 'a' | 'b', res: ReturnType<typeof compute>, label: string) => (
    <div className={cn('rounded-3xl border-2 bg-white p-6 md:p-7', side === 'a' ? 'border-primary-200' : 'border-accent-200')}>
      <div className="flex items-center justify-between">
        <ScenarioChip label={label} tone={side} />
        <span className="text-xs font-bold text-foreground-400">{inputs[side].years} years @ {inputs[side].rate}%</span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
        <ToolField id={`${side}-price`} label="Property price" prefix="PKR" value={inputs[side].price} onChange={upd(side)('price')} step={500000} min={0} />
        <ToolField id={`${side}-down`} label="Down payment" suffix={`${inputs[side].downPct}%`} value={inputs[side].downPct} onChange={upd(side)('downPct')} min={0} max={95} step={5} />
        <ToolField id={`${side}-years`} label="Loan term" suffix="years" value={inputs[side].years} onChange={upd(side)('years')} min={1} max={30} />
        <ToolField id={`${side}-rate`} label="Interest rate" suffix="% p.a." value={inputs[side].rate} onChange={upd(side)('rate')} min={0} max={40} step={0.5} />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Stat label="Monthly EMI" value={fmt(res.emi)} highlight />
        <Stat label="Loan amount" value={fmt(res.loan)} sub={`Down: ${fmt(res.downAmount)}`} />
        <Stat label="Total interest" value={fmt(res.totalInterest)} />
        <Stat label="Total paid" value={fmt(res.totalPaid)} />
      </div>
    </div>
  );

  return (
    <>
      <ToolHeader
        eyebrow="Free Tool"
        title="Mortgage & EMI Calculator"
        subtitle="Compare two loans side by side, see your monthly payment and total interest, and take a printable summary to the bank."
      />

      <section className="wrap-narrow py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {scenarioBlock('a', A, 'Scenario A')}
          {scenarioBlock('b', B, 'Scenario B')}
        </div>

        {/* Comparison */}
        <div className="mt-8 rounded-3xl bg-primary-950 p-6 text-white md:p-8">
          <h2 className="font-heading text-xl font-bold">Head-to-head</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Monthly payment difference', val: fmt(Math.abs(A.emi - B.emi)), note: A.emi < B.emi ? 'A is cheaper/month' : 'B is cheaper/month' },
              { label: 'Interest difference over term', val: fmt(Math.abs(A.totalInterest - B.totalInterest)), note: A.totalInterest < B.totalInterest ? 'A saves on interest' : 'B saves on interest' },
              { label: 'Loan size difference', val: fmt(Math.abs(A.loan - B.loan)), note: A.loan < B.loan ? 'A borrows less' : 'B borrows less' },
            ].map((c) => (
              <div key={c.label} className="rounded-2xl bg-white/5 p-4">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-accent-300">{c.label}</p>
                <p className="font-heading mt-1 text-xl font-bold">{c.val}</p>
                <p className="mt-0.5 text-xs text-white/60">{c.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/50">
            Estimates assume a fixed rate for the full term. Confirm current rates and eligibility with your bank before applying.
          </p>
        </div>

        {/* Schedule A */}
        <div className="mt-8 overflow-hidden rounded-3xl ring-1 ring-background-200">
          <div className="bg-white px-6 py-4">
            <h3 className="font-heading text-lg font-bold text-primary-950">Yearly schedule — Scenario A</h3>
          </div>
          <div className="max-h-80 overflow-y-auto">
            <table className="w-full bg-white text-sm">
              <thead className="sticky top-0 bg-primary-50 text-left text-xs font-extrabold uppercase tracking-wider text-primary-800">
                <tr>
                  <th className="px-6 py-3">Year</th>
                  <th className="px-4 py-3 text-right">Interest paid</th>
                  <th className="px-4 py-3 text-right">Principal paid</th>
                  <th className="px-6 py-3 text-right">Balance left</th>
                </tr>
              </thead>
              <tbody>
                {A.rows.map((r) => (
                  <tr key={r.year} className="border-t border-background-100 text-foreground-600">
                    <td className="px-6 py-2.5 font-bold">{r.year}</td>
                    <td className="px-4 py-2.5 text-right">{fmt(r.interest)}</td>
                    <td className="px-4 py-2.5 text-right">{fmt(r.principal)}</td>
                    <td className="px-6 py-2.5 text-right font-semibold">{fmt(r.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8">
          <ReportActions onPrint={() => window.print()} onSave={onSave} onEmail={onEmail} />
        </div>
      </section>

      {/* Printable summary */}
      <div className="print-summary p-10 font-body">
        <h1 className="font-heading text-3xl font-bold text-primary-900">{SITE_NAME} — Mortgage Summary</h1>
        <p className="mt-1 text-sm text-gray-600">Gilgit-Baltistan’s most trusted property agency · Estimates only, not a loan offer.</p>
        {(['a', 'b'] as const).map((side) => {
          const res = side === 'a' ? A : B;
          return (
            <div key={side} className="mt-6 rounded border border-gray-300 p-5">
              <h2 className="text-lg font-bold">Scenario {side.toUpperCase()}</h2>
              <table className="mt-2 w-full text-sm">
                <tbody>
                  {[
                    ['Property price', fmt(inputs[side].price)],
                    ['Down payment', `${inputs[side].downPct}% (${fmt(res.downAmount)})`],
                    ['Loan amount', fmt(res.loan)],
                    ['Term', `${inputs[side].years} years`],
                    ['Interest rate', `${inputs[side].rate}% p.a.`],
                    ['Monthly EMI', fmt(res.emi)],
                    ['Total interest', fmt(res.totalInterest)],
                    ['Total paid', fmt(res.totalPaid)],
                  ].map(([k, v]) => (
                    <tr key={k} className="border-t border-gray-200">
                      <td className="py-1.5 font-semibold">{k}</td>
                      <td className="py-1.5 text-right">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
        <p className="mt-6 text-xs text-gray-500">zaminzameen.com · +92 355 509 9430 · Sultanabad, Danyore, Gilgit</p>
      </div>

      <ToolCrossLinks currentPath="/tools/mortgage-calculator" />
      <CtaBand title="Found a home worth financing?" subtitle="We’ll help you structure the deal, verify the documents and negotiate the price — then you take our summary to the bank." primaryLabel="Browse Properties" primaryTo="/properties-for-sale" />
    </>
  );
}
