import { useState, type FormEvent } from 'react';
import { CheckCircle2, Clock, Loader2, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { IMG } from '../lib/images';
import PageHero from '../components/ui/PageHero';
import { cn, delay } from '../lib/utils';
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  BUSINESS_HOURS,
  EMAIL,
  MAP_EMBED_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_LINK,
} from '../lib/constants';
import { usePageMeta } from '../hooks/usePageMeta';

const SUBJECTS = ['Buying a property', 'Selling / listing a property', 'Renting', 'Free valuation', 'Investment advice', 'Something else'];

export default function ContactPage() {
  usePageMeta(
    'Contact Us | Zamin Real Estate & Consultants',
    'Call, WhatsApp, email or visit our office in Sultanabad, Danyore Gilgit. We respond within one working day.'
  );

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.';
    if (form.message.trim().length < 10) errs.message = 'Tell us a little more (at least a sentence).';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus('loading');
    await delay(1100);
    setStatus('done');
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to a Real Person, Today"
        subtitle="Call, WhatsApp, email or drop by the office in Sultanabad, Danyore — whichever suits you, we’re ready."
        image={IMG.mistyPeaks}
      />

      {/* Quick contact cards */}
      <section className="wrap -mt-10 relative z-10 grid gap-4 md:grid-cols-3">
        <a href={`tel:${PHONE_TEL}`} className="card card-hover flex items-center gap-4 !bg-white p-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
            <Phone className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-foreground-400">Call us</p>
            <p className="font-bold text-primary-950">{PHONE_DISPLAY}</p>
          </div>
        </a>
        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="card card-hover flex items-center gap-4 !bg-white p-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#1fb857]">
            <MessageCircle className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-foreground-400">WhatsApp</p>
            <p className="font-bold text-primary-950">{PHONE_DISPLAY}</p>
          </div>
        </a>
        <a href={`mailto:${EMAIL}`} className="card card-hover flex items-center gap-4 !bg-white p-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-100 text-accent-600">
            <Mail className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-extrabold uppercase tracking-wider text-foreground-400">Email</p>
            <p className="truncate font-bold text-primary-950">{EMAIL}</p>
          </div>
        </a>
      </section>

      {/* Form + info */}
      <section className="wrap grid gap-10 py-14 md:py-20 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl bg-white p-6 shadow-lg md:p-10">
          {status === 'done' ? (
            <div className="fade-in py-12 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-accent-600" />
              <h2 className="font-heading mt-4 text-2xl font-bold text-primary-950">Message sent!</h2>
              <p className="mx-auto mt-2 max-w-md text-foreground-500">
                Thanks, {form.name.split(' ')[0]} — your message has been delivered to the Zamin team. Expect a reply within one
                working day.
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-heading text-2xl font-bold text-primary-950">Send Us a Message</h2>
              <p className="mt-1 text-sm text-foreground-500">We reply within one working day — usually much sooner.</p>
              <form onSubmit={submit} noValidate className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="ct-name" className="field-label">Full name *</label>
                  <input id="ct-name" className="field-input" placeholder="Your name" value={form.name} onChange={set('name')} />
                  {errors.name && <p className="mt-1 text-xs font-semibold text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="ct-email" className="field-label">Email *</label>
                  <input id="ct-email" type="email" className="field-input" placeholder="you@example.com" value={form.email} onChange={set('email')} />
                  {errors.email && <p className="mt-1 text-xs font-semibold text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="ct-phone" className="field-label">Phone / WhatsApp</label>
                  <input id="ct-phone" className="field-input" placeholder="+92 3xx xxxxxxx" value={form.phone} onChange={set('phone')} />
                </div>
                <div>
                  <label htmlFor="ct-subject" className="field-label">Subject</label>
                  <select id="ct-subject" className="field-input" value={form.subject} onChange={set('subject')}>
                    {SUBJECTS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="ct-msg" className="field-label">Message *</label>
                  <textarea id="ct-msg" rows={5} className="field-input" placeholder="How can we help?" value={form.message} onChange={set('message')} />
                  {errors.message && <p className="mt-1 text-xs font-semibold text-red-600">{errors.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <button type="submit" disabled={status === 'loading'} className="btn-primary btn-lg">
                    {status === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />} Send Message
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Office info */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-primary-950 p-8 text-white">
            <h3 className="font-heading flex items-center gap-2 text-xl font-bold">
              <MapPin className="h-5 w-5 text-accent-400" /> Visit Our Office
            </h3>
            <p className="mt-3 text-white/80">
              {ADDRESS_LINE_1}
              <br />
              {ADDRESS_LINE_2}
            </p>
            <div className={cn('mt-6 border-t border-white/10 pt-6')}>
              <h4 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-accent-300">
                <Clock className="h-4 w-4" /> Opening Hours
              </h4>
              <ul className="mt-3 space-y-1.5 text-sm text-white/75">
                {BUSINESS_HOURS.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4">
                    <span>{h.days}</span>
                    <span className="font-semibold text-white">{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a href={`tel:${PHONE_TEL}`} className="btn-accent mt-6 w-full">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-background-200">
            <iframe title="Zamin Real Estate office — Sultanabad, Danyore Gilgit" src={MAP_EMBED_URL} className="h-72 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>
    </>
  );
}
