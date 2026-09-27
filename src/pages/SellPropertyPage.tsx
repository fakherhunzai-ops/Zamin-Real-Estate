import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Camera, CheckCircle2, FileCheck, Handshake, Loader2, PhoneCall, Send, TrendingUp } from 'lucide-react';
import { IMG } from '../lib/images';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import CtaBand from '../components/ui/CtaBand';
import { cn, delay } from '../lib/utils';
import { COMMISSION_RENTAL, COMMISSION_SALES, PHONE_DISPLAY, PHONE_TEL } from '../lib/constants';
import { REGIONS, PROPERTY_TYPES } from '../mocks/properties';
import { usePageMeta } from '../hooks/usePageMeta';

const STEPS = [
  { icon: PhoneCall, title: 'Tell us about it', text: 'Fill the form below or call us. We listen first — your goals, timeline and expectations.' },
  { icon: Camera, title: 'We visit & photograph', text: 'A consultant visits within days, takes professional photos and notes every selling point.' },
  { icon: TrendingUp, title: 'Honest pricing', text: 'We price from real closed deals in your mohalla — not wishful asking prices.' },
  { icon: Handshake, title: 'We negotiate & close', text: 'Screened buyers, accompanied viewings, and full transfer handled to the registry.' },
];

interface FormState {
  name: string;
  phone: string;
  email: string;
  purpose: string;
  region: string;
  location: string;
  type: string;
  area: string;
  expectedPrice: string;
  documents: string;
  notes: string;
}

const INITIAL: FormState = {
  name: '',
  phone: '',
  email: '',
  purpose: 'sale',
  region: '',
  location: '',
  type: '',
  area: '',
  expectedPrice: '',
  documents: '',
  notes: '',
};

export default function SellPropertyPage() {
  usePageMeta(
    'Sell or Rent Your Property in Gilgit-Baltistan | Zamin Real Estate',
    'List your house, plot, shop or guest house with Zamin. Free photography, honest pricing from real deals, and no charge until we close.'
  );

  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = 'Please enter your name.';
    if (!/^[+0-9][0-9\s-]{8,}$/.test(form.phone.trim())) errs.phone = 'Enter a valid phone number.';
    if (!form.region) errs.region = 'Select your valley.';
    if (form.location.trim().length < 2) errs.location = 'Enter the town / mohalla.';
    if (!form.type) errs.type = 'Select the property type.';
    if (form.area.trim().length < 2) errs.area = 'Enter the area (e.g. 10 Marla).';
    if (form.expectedPrice.trim().length < 3) errs.expectedPrice = form.purpose === 'sale' ? 'Expected sale price, e.g. PKR 1.5 Cr.' : 'Expected monthly rent, e.g. PKR 40,000.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    await delay(1200);
    setStatus('done');
    window.scrollTo({ top: document.getElementById('listing-form')?.offsetTop ?? 0, behavior: 'smooth' });
  };

  const err = (k: string) => errors[k] && <p className="mt-1 text-xs font-semibold text-red-600">{errors[k]}</p>;

  return (
    <>
      <PageHero
        eyebrow="Sell / Rent Your Property"
        title="Sell Faster. Rent Smarter. Pay Nothing Until We Deliver."
        subtitle="Free professional photography, honest pricing from real closed deals, and buyers screened before they ever reach your door."
        image={IMG.houseEvening}
      />

      {/* Commission transparency */}
      <section className="wrap -mt-10 relative z-10">
        <div className="grid gap-px overflow-hidden rounded-2xl bg-background-200 shadow-xl md:grid-cols-2">
          <div className="bg-white p-8">
            <p className="text-xs font-extrabold uppercase tracking-wider text-accent-600">Sales commission</p>
            <p className="font-heading mt-2 text-3xl font-bold text-primary-900">{COMMISSION_SALES}</p>
            <p className="mt-1 text-sm text-foreground-500">Of the final deal value. Agreed in writing before we start. Nothing upfront.</p>
          </div>
          <div className="bg-white p-8">
            <p className="text-xs font-extrabold uppercase tracking-wider text-accent-600">Rental commission</p>
            <p className="font-heading mt-2 text-3xl font-bold text-primary-900">{COMMISSION_RENTAL}</p>
            <p className="mt-1 text-sm text-foreground-500">Charged once at signing of the tenancy. No renewal fees, ever.</p>
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="wrap py-16 md:py-20">
        <SectionHeading eyebrow="How It Works" title="From Listing to Handover in Four Steps" />
        <div className="grid gap-6 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.title} className="card card-hover relative p-6">
              <span className="absolute right-4 top-4 font-heading text-4xl font-bold text-background-200">0{i + 1}</span>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-bold text-primary-950">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground-500">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Listing form */}
      <section id="listing-form" className="bg-background-100 py-16 md:py-20">
        <div className="wrap-narrow">
          <SectionHeading eyebrow="Free Listing" title="Tell Us About Your Property" subtitle="Complete the form and a consultant will call you back within one working day." />
          <div className="rounded-3xl bg-white p-6 shadow-lg md:p-10">
            {status === 'done' ? (
              <div className="fade-in py-10 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-accent-600" />
                <h3 className="font-heading mt-4 text-2xl font-bold text-primary-950">Thank you, {form.name.split(' ')[0]}!</h3>
                <p className="mx-auto mt-2 max-w-md text-foreground-500">
                  Your property details are with our team. We’ll call {form.phone} within one working day to arrange a visit and
                  free valuation.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a href={`tel:${PHONE_TEL}`} className="btn-primary">Call Us Now</a>
                  <Link to="/valuation" className="btn-ghost">Request a Formal Valuation</Link>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="sp-name" className="field-label">Full name *</label>
                  <input id="sp-name" className="field-input" placeholder="Your name" value={form.name} onChange={set('name')} />
                  {err('name')}
                </div>
                <div>
                  <label htmlFor="sp-phone" className="field-label">Phone / WhatsApp *</label>
                  <input id="sp-phone" className="field-input" placeholder="+92 3xx xxxxxxx" value={form.phone} onChange={set('phone')} />
                  {err('phone')}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="sp-email" className="field-label">Email (optional)</label>
                  <input id="sp-email" type="email" className="field-input" placeholder="you@example.com" value={form.email} onChange={set('email')} />
                </div>

                <div className="md:col-span-2">
                  <span className="field-label">I want to *</span>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { v: 'sale', label: 'Sell my property' },
                      { v: 'rent', label: 'Rent it out' },
                    ].map((o) => (
                      <button
                        key={o.v}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, purpose: o.v }))}
                        className={cn(
                          'rounded-xl border-2 px-4 py-3 text-sm font-bold transition',
                          form.purpose === o.v ? 'border-accent-500 bg-accent-50 text-primary-900' : 'border-background-200 text-foreground-500 hover:border-background-300'
                        )}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="sp-region" className="field-label">Valley / District *</label>
                  <select id="sp-region" className="field-input" value={form.region} onChange={set('region')}>
                    <option value="">Select…</option>
                    {REGIONS.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                  {err('region')}
                </div>
                <div>
                  <label htmlFor="sp-location" className="field-label">Town / Mohalla *</label>
                  <input id="sp-location" className="field-input" placeholder="e.g. Danyore, Karimabad" value={form.location} onChange={set('location')} />
                  {err('location')}
                </div>
                <div>
                  <label htmlFor="sp-type" className="field-label">Property type *</label>
                  <select id="sp-type" className="field-input" value={form.type} onChange={set('type')}>
                    <option value="">Select…</option>
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  {err('type')}
                </div>
                <div>
                  <label htmlFor="sp-area" className="field-label">Area *</label>
                  <input id="sp-area" className="field-input" placeholder="e.g. 10 Marla / 1 Kanal" value={form.area} onChange={set('area')} />
                  {err('area')}
                </div>
                <div>
                  <label htmlFor="sp-price" className="field-label">{form.purpose === 'sale' ? 'Expected sale price *' : 'Expected monthly rent *'}</label>
                  <input id="sp-price" className="field-input" placeholder={form.purpose === 'sale' ? 'e.g. PKR 1.5 Cr' : 'e.g. PKR 40,000'} value={form.expectedPrice} onChange={set('expectedPrice')} />
                  {err('expectedPrice')}
                </div>
                <div>
                  <label htmlFor="sp-docs" className="field-label">Documents you hold</label>
                  <select id="sp-docs" className="field-input" value={form.documents} onChange={set('documents')}>
                    <option value="">Select…</option>
                    <option>Fard + mutation in my name</option>
                    <option>Fard only</option>
                    <option>Inherited / partition pending</option>
                    <option>Not sure</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="sp-notes" className="field-label">Anything else we should know?</label>
                  <textarea id="sp-notes" rows={4} className="field-input" placeholder="Views, access, tenants, urgency…" value={form.notes} onChange={set('notes')} />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" disabled={status === 'loading'} className="btn-primary btn-lg w-full">
                    {status === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                    Submit My Property for Free Listing
                  </button>
                  <p className="mt-3 text-center text-xs text-foreground-400">
                    <FileCheck className="mr-1 inline h-3.5 w-3.5" />
                    Zamin is also emailed instantly — so your details are never lost.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <CtaBand
        title="Prefer to talk it through first?"
        subtitle="Call us for a frank conversation about your property — what it’s worth, what buyers want, and what to expect."
        primaryLabel="Get a Free Valuation"
        primaryTo="/valuation"
      />
    </>
  );
}
