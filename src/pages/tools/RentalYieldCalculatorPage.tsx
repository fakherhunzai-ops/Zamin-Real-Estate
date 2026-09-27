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
  rent: number;
  opex: number;
  vacantMonths: number;
}

interface Both {
  a: Inputs;
  b: Inputs;
}

const DEFAULTS: Both = {
  a: { price: 20_000_000, rent: 45_000, opex: 60_000, vacantMonths: 1 },
  b: { price: 65_000_000, rent: 250_000, opex: 400_000, vacantMonths: 3 },
};

function compute(i: Inputs) {
  const grossIncome = i.rent * 12;
  const vacancyLoss = i.rent * i.vacantMonths;
  const netIncome = Math.max(0, grossIncome - vacancyLoss - i.opex);
  const grossYield = i.price > 0 ? (grossIncome / i.price) * 100 : 0;
  const netYield = i.price > 0 ? (netIncome / i.price) * 100 : 0;
  const payback = netIncome > 0 ? i.price / netIncome : 0;
  return { grossIncome, netIncome, grossYield, netYield, payback };
}

export default function RentalYieldCalculatorPage() {
  usePageMeta(
    'Rental Yield Calculator | Zamin Free Tools',
    'Calculate gross and net rental yield and payback period for any property in Gilgit-Baltistan — compare two investments side by side.'
  );

  const { loadSaved, save } = useSavedReport<Both>('zamin.report.rentalyield');
  const { toast } = useToast();
  const [inputs, setInputs] = useState<Both>(() => loadSaved() ?? DEFAULTS);

  useEffect(() => {
    if (loadSaved()) toast('Your saved rental-yield report was restored', 'info');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const A = useMemo(() => compute(inputs.a), [inputs.a]);
  const B = useMemo(() => compute(inputs.b), [inputs.b]);

  const upd = (side: 'a' | 'b') => (key: keyof Inputs) => (v: number) =>
    setInputs((prev) => ({ ...prev, [side]: { ...prev[side], [key]: v } }));

  const fmt = (n: number) => formatPrice(Math.round(n));
  const pct = (n: number) => `${n.toFixed(2)}%`;

  const onSave = () => {
    save(inputs);
    toast('Report saved on this device');
  };

  const onEmail = () => {
    const row = (label: string, i: Inputs, r: ReturnType<typeof compute>) =>
      `${label}: price ${fmt(i.price)} @ ${fmt(i.rent)}/month → gross ${pct(r.grossYield)}, net ${pct(r.netYield)}, payback ${r.payback ? r.payback.toFixed(1) + ' yrs' : '—'}`;
    const body = [
      `RENTAL YIELD SUMMARY — ${SITE_NAME}`,
      '',
      row('Scenario A', inputs.a, A),
      row('Scenario B', inputs.b, B),
      '',
      `Estimates only. ${SITE_NAME}, Gilgit-Baltistan.`,
    ].join('\n');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('My Zamin Rental Yield Summary')}&body=${encodeURIComponent(body)}`;
  };

  const scenarioBlock = (side: 'a' | 'b', res: ReturnType<typeof compute>, label: string) => (
    <div className={cn('rounded-3xl border-2 bg-white p-6 md:p-7', side === 'a' ? 'border-primary-200' : 'border-accent-200')}>
      <div className="flex items-center justify-between">
        <ScenarioChip label={label} tone={side} />
        <span className="text-xs font-bold text-foreground-400">{side === 'a' ? 'e.g. city apartment' : 'e.g. guest house'}</span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
        <ToolField id={`${side}-price`} label="Purchase price" prefix="PKR" value={inputs[side].price} onChange={upd(side)('price')} step={500000} min={0} />
        <ToolField id={`${side}-rent`} label="Monthly rent" prefix="PKR" value={inputs[side].rent} onChange={upd(side)('rent')} step={5000} min={0} />
        <ToolField id={`${side}-opex`} label="Annual costs" prefix="PKR" value={inputs[side].opex} onChange={upd(side)('opex')} step={10000} min={0} suffix="tax, upkeep" />
        <ToolField id={`${side}-vacant`} label="Vacancy" suffix="months/yr" value={inputs[side].vacantMonths} onChange={upd(side)('vacantMonths')} min={0} max={12} />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Stat label="Gross yield" value={pct(res.grossYield)} highlight />
        <Stat label="Net yield" value={pct(res.netYield)} highlight />
        <Stat label="Net annual income" value={fmt(res.netIncome)} sub={`Gross: ${fmt(res.grossIncome)}`} />
        <Stat label="Payback period" value={res.payback > 0 ? `${res.payback.toFixed(1)} yrs` : '—'} />
      </div>
    </div>
  );

  return (
    <>
      <ToolHeader
        eyebrow="Free Tool"
        title="Rental Yield Calculator"
        subtitle="Compare two investments — a city rental versus a tourism asset — and see gross yield, net yield and payback side by side."
      />

      <section className="wrap-narrow py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {scenarioBlock('a', A, 'Property A')}
          {scenarioBlock('b', B, 'Property B')}
        </div>

        <div className="mt-8 rounded-3xl bg-primary-950 p-6 text-white md:p-8">
          <h2 className="font-heading text-xl font-bold">Which works harder?</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Net yield winner', val: A.netYield >= B.netYield ? 'Property A' : 'Property B', note: `${pct(Math.max(A.netYield, B.netYield))} vs ${pct(Math.min(A.netYield, B.netYield))}` },
              { label: 'Net income gap', val: fmt(Math.abs(A.netIncome - B.netIncome)), note: 'per year, after costs' },
              { label: 'Payback difference', val: A.payback && B.payback ? `${Math.abs(A.payback - B.payback).toFixed(1)} yrs` : '—', note: 'time to recover capital' },
            ].map((c) => (
              <div key={c.label} className="rounded-2xl bg-white/5 p-4">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-accent-300">{c.label}</p>
                <p className="font-heading mt-1 text-xl font-bold">{c.val}</p>
                <p className="mt-0.5 text-xs text-white/60">{c.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/50">
            Tourism assets carry seasonality risk — model vacancy honestly. Ask us for real occupancy data before committing.
          </p>
        </div>

        <div className="mt-8">
          <ReportActions onPrint={() => window.print()} onSave={onSave} onEmail={onEmail} />
        </div>
      </section>

      {/* Printable summary */}
      <div className="print-summary p-10 font-body">
        <h1 className="font-heading text-3xl font-bold text-primary-900">{SITE_NAME} — Rental Yield Summary</h1>
        <p className="mt-1 text-sm text-gray-600">Gilgit-Baltistan’s most trusted property agency · Estimates only.</p>
        {(['a', 'b'] as const).map((side) => {
          const res = side === 'a' ? A : B;
          const i = inputs[side];
          return (
            <div key={side} className="mt-6 rounded border border-gray-300 p-5">
              <h2 className="text-lg font-bold">Property {side.toUpperCase()}</h2>
              <table className="mt-2 w-full text-sm">
                <tbody>
                  {[
                    ['Purchase price', fmt(i.price)],
                    ['Monthly rent', fmt(i.rent)],
                    ['Annual costs', fmt(i.opex)],
                    ['Vacancy allowance', `${i.vacantMonths} months`],
                    ['Gross annual income', fmt(res.grossIncome)],
                    ['Net annual income', fmt(res.netIncome)],
                    ['Gross yield', pct(res.grossYield)],
                    ['Net yield', pct(res.netYield)],
                    ['Payback period', res.payback > 0 ? `${res.payback.toFixed(1)} years` : '—'],
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

      <ToolCrossLinks currentPath="/tools/rental-yield-calculator" />
      <CtaBand title="Model it on a real property" subtitle="Pick any listing on our site, plug its price and rent into this calculator, then talk to us about the numbers." primaryLabel="Browse Investment Properties" primaryTo="/properties-for-sale" />
    </>
  );
}
