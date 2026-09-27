import { useEffect, useMemo, useState } from 'react';
import { Settings2 } from 'lucide-react';
import { ToolHeader, ToolCrossLinks, ToolField, Stat, ReportActions, ScenarioChip } from '../../components/tools/ToolLayout';
import CtaBand from '../../components/ui/CtaBand';
import { useSavedReport } from '../../hooks/useSavedReport';
import { useToast } from '../../context/ToastContext';
import { cn, formatPrice } from '../../lib/utils';
import { EMAIL, SITE_NAME } from '../../lib/constants';
import { usePageMeta } from '../../hooks/usePageMeta';

interface State {
  priceA: number;
  priceB: number;
  stampPct: number;
  cvtPct: number;
  miscPct: number;
  regFixed: number;
}

const DEFAULTS: State = { priceA: 20_000_000, priceB: 35_000_000, stampPct: 3, cvtPct: 2, miscPct: 0.5, regFixed: 5000 };

function compute(price: number, s: State) {
  const stamp = (price * s.stampPct) / 100;
  const cvt = (price * s.cvtPct) / 100;
  const misc = (price * s.miscPct) / 100;
  const total = stamp + cvt + misc + s.regFixed;
  return { stamp, cvt, misc, total, pct: price > 0 ? (total / price) * 100 : 0 };
}

export default function StampDutyCalculatorPage() {
  usePageMeta(
    'Stamp Duty & Transfer Cost Estimator | Zamin Free Tools',
    'Estimate stamp duty, CVT and registration costs for any property deal in Gilgit-Baltistan — compare two deal values side by side.'
  );

  const { loadSaved, save } = useSavedReport<State>('zamin.report.stampduty');
  const { toast } = useToast();
  const [inputs, setInputs] = useState<State>(() => loadSaved() ?? DEFAULTS);

  useEffect(() => {
    if (loadSaved()) toast('Your saved stamp-duty report was restored', 'info');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const A = useMemo(() => compute(inputs.priceA, inputs), [inputs]);
  const B = useMemo(() => compute(inputs.priceB, inputs), [inputs]);

  const set = (key: keyof State) => (v: number) => setInputs((prev) => ({ ...prev, [key]: v }));
  const fmt = (n: number) => formatPrice(Math.round(n));

  const onSave = () => {
    save(inputs);
    toast('Report saved on this device');
  };

  const onEmail = () => {
    const row = (label: string, price: number, r: ReturnType<typeof compute>) =>
      `${label}: value ${fmt(price)} → total transfer cost ${fmt(r.total)} (${r.pct.toFixed(2)}% of value)`;
    const body = [
      `STAMP DUTY & TRANSFER COST ESTIMATE — ${SITE_NAME}`,
      '',
      row('Scenario A', inputs.priceA, A),
      row('Scenario B', inputs.priceB, B),
      '',
      `Rates used: stamp duty ${inputs.stampPct}%, CVT ${inputs.cvtPct}%, misc ${inputs.miscPct}%, registration ${fmt(inputs.regFixed)}.`,
      `Estimates only — government rates change; verify at the time of transfer.`,
    ].join('\n');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('My Zamin Transfer Cost Estimate')}&body=${encodeURIComponent(body)}`;
  };

  const scenarioBlock = (side: 'a' | 'b', price: number, res: ReturnType<typeof compute>, label: string) => (
    <div className={cn('rounded-3xl border-2 bg-white p-6 md:p-7', side === 'a' ? 'border-primary-200' : 'border-accent-200')}>
      <ScenarioChip label={label} tone={side} />
      <div className="mt-5">
        <ToolField id={`${side}-price`} label="Declared property value" prefix="PKR" value={price} onChange={set(side === 'a' ? 'priceA' : 'priceB')} step={500000} min={0} />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Stat label="Stamp duty" value={fmt(res.stamp)} sub={`${inputs.stampPct}%`} />
        <Stat label="CVT" value={fmt(res.cvt)} sub={`${inputs.cvtPct}%`} />
        <Stat label="Registration" value={fmt(inputs.regFixed)} sub="fixed fee" />
        <Stat label="Miscellaneous" value={fmt(res.misc)} sub={`${inputs.miscPct}%`} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <Stat label="Total transfer cost" value={fmt(res.total)} highlight />
        <Stat label="As % of value" value={`${res.pct.toFixed(2)}%`} highlight />
      </div>
    </div>
  );

  return (
    <>
      <ToolHeader
        eyebrow="Free Tool"
        title="Stamp Duty & Transfer Cost Estimator"
        subtitle="Budget the full government cost of a deal — stamp duty, CVT, registration and miscellaneous — before you negotiate the price."
      />

      <section className="wrap-narrow py-12 md:py-16">
        {/* Rate settings */}
        <div className="mb-6 rounded-2xl border border-background-200 bg-white p-5">
          <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-foreground-400">
            <Settings2 className="h-4 w-4 text-accent-600" /> Adjust rates (typical GB values pre-filled)
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            <ToolField id="r-stamp" label="Stamp duty" suffix="%" value={inputs.stampPct} onChange={set('stampPct')} min={0} max={10} step={0.5} />
            <ToolField id="r-cvt" label="CVT" suffix="%" value={inputs.cvtPct} onChange={set('cvtPct')} min={0} max={10} step={0.5} />
            <ToolField id="r-misc" label="Miscellaneous" suffix="%" value={inputs.miscPct} onChange={set('miscPct')} min={0} max={5} step={0.25} />
            <ToolField id="r-reg" label="Registration fee" prefix="PKR" value={inputs.regFixed} onChange={set('regFixed')} min={0} step={1000} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {scenarioBlock('a', inputs.priceA, A, 'Deal A')}
          {scenarioBlock('b', inputs.priceB, B, 'Deal B')}
        </div>

        <div className="mt-8 rounded-3xl bg-primary-950 p-6 text-white md:p-8">
          <h2 className="font-heading text-xl font-bold">Budget check</h2>
          <p className="mt-2 text-sm text-white/70">
            Deal A needs <strong className="text-white">{fmt(A.total)}</strong> in government charges; Deal B needs{' '}
            <strong className="text-white">{fmt(B.total)}</strong> — a difference of{' '}
            <strong className="text-white">{fmt(Math.abs(A.total - B.total))}</strong>. Keep this on top of your down payment when
            planning funds.
          </p>
          <p className="mt-4 text-xs text-white/50">
            Charges apply to the declared value recorded on the sale deed. Rates vary by notification — our legal team confirms the
            exact challans at transfer time, included in our commission.
          </p>
        </div>

        <div className="mt-8">
          <ReportActions onPrint={() => window.print()} onSave={onSave} onEmail={onEmail} />
        </div>
      </section>

      {/* Printable summary */}
      <div className="print-summary p-10 font-body">
        <h1 className="font-heading text-3xl font-bold text-primary-900">{SITE_NAME} — Transfer Cost Estimate</h1>
        <p className="mt-1 text-sm text-gray-600">Gilgit-Baltistan’s most trusted property agency · Estimates only.</p>
        {(['a', 'b'] as const).map((side) => {
          const res = side === 'a' ? A : B;
          const price = side === 'a' ? inputs.priceA : inputs.priceB;
          return (
            <div key={side} className="mt-6 rounded border border-gray-300 p-5">
              <h2 className="text-lg font-bold">Deal {side.toUpperCase()} — declared value {fmt(price)}</h2>
              <table className="mt-2 w-full text-sm">
                <tbody>
                  {[
                    [`Stamp duty (${inputs.stampPct}%)`, fmt(res.stamp)],
                    [`CVT (${inputs.cvtPct}%)`, fmt(res.cvt)],
                    ['Registration (fixed)', fmt(inputs.regFixed)],
                    [`Miscellaneous (${inputs.miscPct}%)`, fmt(res.misc)],
                    ['TOTAL transfer cost', fmt(res.total)],
                    ['Effective rate', `${res.pct.toFixed(2)}% of value`],
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

      <ToolCrossLinks currentPath="/tools/stamp-duty-calculator" />
      <CtaBand title="Never overpay — on price or paperwork" subtitle="Our documentation team verifies documents, confirms the exact government charges and stays with you until the registry is signed." primaryLabel="Ask About a Deal" primaryTo="/contact" />
    </>
  );
}
