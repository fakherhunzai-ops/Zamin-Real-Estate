import { useState, type FormEvent } from 'react';
import { CheckCircle2, FileText, Loader2, PhoneCall, Send, TrendingUp, Wallet } from 'lucide-react';
import { IMG } from '../lib/images';
import PageHero from '../components/ui/PageHero';
import CtaBand from '../components/ui/CtaBand';
import { delay } from '../lib/utils';
import { REGIONS, PROPERTY_TYPES } from '../mocks/properties';
import { usePageMeta } from '../hooks/usePageMeta';

const BENEFITS = [
  { icon: Wallet, title: '100% Free', text: 'No charge, no obligation to list with us afterwards.' },
  { icon: TrendingUp, title: 'Evidence-Based', text: 'Priced from real closed transactions in your mohalla — not asking-price rumours.' },
  { icon: FileText, title: 'Written Note', text: 'Receive a written valuation summary you can rely on for decisions.' },
  { icon: PhoneCall, title: 'Fast Response', text: 'A consultant calls you back within two working days.' },
];

export default function ValuationPage() {
  usePageMeta(
    'Free Property Valuation | Zamin Real Estate',
    'Get a free, evidence-based market valuation for any property in Gilgit-Baltistan, from real closed transactions.'
  );

  const [form, setForm] = useState({ name: '', phone: '', region: '', location: '', type: '', area: '', notes: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = 'Please enter your name.';
    if (!/^[+0-9][0-9\s-]{8,}$/.test(form.phone.trim())) errs.phone = 'Enter a valid phone number.';
    if (!form.region) errs.region = 'Select your valley.';
    if (form.location.trim().length < 2) errs.location = 'Enter the town / mohalla.';
    if (!form.type) errs.type = 'Select the property type.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus('loading');
    await delay(1100);
    setStatus('done');
  };

  return (
    <>
      <PageHero
        eyebrow="Free Valuation"
        title="What Is Your Property Really Worth?"
        subtitle="A free, honest market valuation from real closed transactions in Gilgit-Baltistan — delivered within two working days."
        image={IMG.calculatorFinance}
      />

      {/* Benefits */}
      <section className="wrap -mt-10 relative z-10 grid gap-px overflow-hidden rounded-2xl bg-background-200 shadow-xl sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((b) => (
          <div key={b.title} className="bg-white p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
              <b.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-3 font-bold text-primary-950">{b.title}</h3>
            <p className="mt-1 text-sm text-foreground-500">{b.text}</p>
          </div>
        ))}
      </section>

      {/* Form */}
      <section className="wrap-narrow py-16 md:py-20">
        <div className="rounded-3xl bg-white p-6 shadow-lg md:p-10">
          {status === 'done' ? (
            <div className="fade-in py-10 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-accent-600" />
              <h2 className="font-heading mt-4 text-2xl font-bold text-primary-950">Valuation request received</h2>
              <p className="mx-auto mt-2 max-w-md text-foreground-500">
                Thanks, {form.name.split(' ')[0]}. Our valuers will review comparable deals in {form.location || form.region} and call{' '}
                {form.phone} within two working days with your figure.
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-heading text-2xl font-bold text-primary-950">Request Your Free Valuation</h2>
              <p className="mt-1 text-sm text-foreground-500">Two minutes now, a defensible figure in two days.</p>
              <form onSubmit={submit} noValidate className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="vl-name" className="field-label">Full name *</label>
                  <input id="vl-name" className="field-input" placeholder="Your name" value={form.name} onChange={set('name')} />
                  {errors.name && <p className="mt-1 text-xs font-semibold text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="vl-phone" className="field-label">Phone / WhatsApp *</label>
                  <input id="vl-phone" className="field-input" placeholder="+92 3xx xxxxxxx" value={form.phone} onChange={set('phone')} />
                  {errors.phone && <p className="mt-1 text-xs font-semibold text-red-600">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="vl-region" className="field-label">Valley / District *</label>
                  <select id="vl-region" className="field-input" value={form.region} onChange={set('region')}>
                    <option value="">Select…</option>
                    {REGIONS.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                  {errors.region && <p className="mt-1 text-xs font-semibold text-red-600">{errors.region}</p>}
                </div>
                <div>
                  <label htmlFor="vl-location" className="field-label">Town / Mohalla *</label>
                  <input id="vl-location" className="field-input" placeholder="e.g. Jutial, Karimabad" value={form.location} onChange={set('location')} />
                  {errors.location && <p className="mt-1 text-xs font-semibold text-red-600">{errors.location}</p>}
                </div>
                <div>
                  <label htmlFor="vl-type" className="field-label">Property type *</label>
                  <select id="vl-type" className="field-input" value={form.type} onChange={set('type')}>
                    <option value="">Select…</option>
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  {errors.type && <p className="mt-1 text-xs font-semibold text-red-600">{errors.type}</p>}
                </div>
                <div>
                  <label htmlFor="vl-area" className="field-label">Approximate area</label>
                  <input id="vl-area" className="field-input" placeholder="e.g. 10 Marla / 2 Kanal" value={form.area} onChange={set('area')} />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="vl-notes" className="field-label">Details that affect value</label>
                  <textarea id="vl-notes" rows={3} className="field-input" placeholder="Road access, view, construction quality, documents…" value={form.notes} onChange={set('notes')} />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" disabled={status === 'loading'} className="btn-primary btn-lg w-full">
                    {status === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />} Get My Free Valuation
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </section>

      <CtaBand
        title="Thinking of selling after the valuation?"
        subtitle="If the number looks right, list with us the same day — free photography, screened buyers, and commission agreed in writing."
        primaryLabel="List Your Property"
        primaryTo="/sell-your-property"
      />
    </>
  );
}
