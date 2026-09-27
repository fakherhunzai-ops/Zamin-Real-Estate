import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ArrowLeft, Calculator, Home, Percent, Receipt } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ToolDef {
  path: string;
  title: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ALL_TOOLS: ToolDef[] = [
  {
    path: '/tools/mortgage-calculator',
    title: 'Mortgage & EMI Calculator',
    text: 'Monthly payment, total interest and a yearly repayment schedule — with a printable bank-ready summary.',
    icon: Calculator,
  },
  {
    path: '/tools/rental-yield-calculator',
    title: 'Rental Yield Calculator',
    text: 'Gross and net yield plus payback period for any rental or guest-house investment.',
    icon: Percent,
  },
  {
    path: '/tools/stamp-duty-calculator',
    title: 'Stamp Duty & Transfer Cost Estimator',
    text: 'Estimate stamp duty, CVT and registration so the full cost of a deal never surprises you.',
    icon: Receipt,
  },
];

export function ToolHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <section className="relative overflow-hidden bg-primary-950 pb-14 pt-32 md:pt-40">
      <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-accent-500/10 blur-3xl" aria-hidden />
      <div className="wrap-narrow relative">
        <Link to="/tools" className="inline-flex items-center gap-1.5 text-sm font-bold text-white/70 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" /> All free tools
        </Link>
        <span className="eyebrow-light mt-4 block">{eyebrow}</span>
        <h1 className="font-heading max-w-2xl text-3xl font-bold leading-tight text-white md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-white/70">{subtitle}</p>
      </div>
    </section>
  );
}

/** "More free property tools" cross-link section. */
export function ToolCrossLinks({ currentPath }: { currentPath: string }) {
  const others = ALL_TOOLS.filter((t) => t.path !== currentPath);
  return (
    <section className="wrap py-14 md:py-16">
      <h2 className="font-heading mb-6 text-2xl font-bold text-primary-950">More Free Property Tools</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <Link to="/tools" className="card card-hover flex flex-col p-6">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
            <Home className="h-6 w-6" />
          </span>
          <h3 className="mt-4 font-heading text-lg font-bold text-primary-950">Tools Hub</h3>
          <p className="mt-1.5 flex-1 text-sm text-foreground-500">Every free calculator in one place — plan before you commit.</p>
          <span className="mt-4 text-sm font-bold text-accent-600">Visit hub →</span>
        </Link>
        {others.map((t) => (
          <Link key={t.path} to={t.path} className="card card-hover flex flex-col p-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100 text-accent-600">
              <t.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-heading text-lg font-bold text-primary-950">{t.title}</h3>
            <p className="mt-1.5 flex-1 text-sm text-foreground-500">{t.text}</p>
            <span className="mt-4 text-sm font-bold text-accent-600">Open tool →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Field control used by calculators. */
export function ToolField({
  label,
  suffix,
  prefix,
  value,
  onChange,
  min,
  max,
  step,
  id,
}: {
  label: string;
  suffix?: string;
  prefix?: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  id: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="relative">
        {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-foreground-400">{prefix}</span>}
        <input
          id={id}
          type="number"
          className={cn('field-input', prefix && '!pl-14', suffix && '!pr-24')}
          value={Number.isFinite(value) ? value : 0}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        />
        {suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold uppercase text-foreground-400">{suffix}</span>}
      </div>
    </div>
  );
}

/** Result stat tile. */
export function Stat({ label, value, highlight = false, sub }: { label: string; value: string; highlight?: boolean; sub?: string }) {
  return (
    <div className={cn('rounded-2xl p-5 ring-1', highlight ? 'bg-gradient-to-br from-primary-900 to-primary-700 ring-primary-800' : 'bg-white ring-background-200')}>
      <p className={cn('text-[11px] font-extrabold uppercase tracking-wider', highlight ? 'text-accent-300' : 'text-foreground-400')}>{label}</p>
      <p className={cn('font-heading mt-1.5 text-2xl font-bold', highlight ? 'text-white' : 'text-primary-950')}>{value}</p>
      {sub && <p className={cn('mt-1 text-xs', highlight ? 'text-white/60' : 'text-foreground-400')}>{sub}</p>}
    </div>
  );
}

/** Action bar: print / save report / email. */
export function ReportActions({
  onPrint,
  onSave,
  onEmail,
  saveLabel,
}: {
  onPrint: () => void;
  onSave: () => void;
  onEmail: () => void;
  saveLabel?: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <button onClick={onPrint} className="btn-primary btn-sm">
        Print / Save as PDF
      </button>
      <button onClick={onSave} className="btn-ghost btn-sm">
        {saveLabel ?? 'Save this report'}
      </button>
      <button onClick={onEmail} className="btn-outline btn-sm">
        Email me this summary
      </button>
    </div>
  );
}

/** Scenario toggle label chip. */
export function ScenarioChip({ label, tone }: { label: string; tone: 'a' | 'b' }) {
  return (
    <span className={cn('tag', tone === 'a' ? 'bg-primary-100 text-primary-800' : 'bg-accent-100 text-accent-700')}>{label}</span>
  );
}
