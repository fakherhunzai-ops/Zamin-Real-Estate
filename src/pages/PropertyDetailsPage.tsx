import { useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Heart,
  Home,
  Loader2,
  MapPin,
  Phone,
  Ruler,
  MessageCircle,
} from 'lucide-react';
import { getProperty, similarProperties } from '../mocks/properties';
import PropertyCard from '../components/properties/PropertyCard';
import NotFoundPage from './NotFoundPage';
import JsonLd from '../components/ui/JsonLd';
import { cn, formatNumber, formatPrice, pricePerSqFt, formatDate, delay } from '../lib/utils';
import { PHONE_DISPLAY, PHONE_TEL, whatsappLink, SITE_URL } from '../lib/constants';
import { useShortlist } from '../context/ShortlistContext';
import { useToast } from '../context/ToastContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { onImgError } from '../lib/imgFallback';

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const property = getProperty(id ?? '');
  const { has, toggle } = useShortlist();
  const { toast } = useToast();

  const [activeImg, setActiveImg] = useState(0);

  // Enquiry form state
  const [form, setForm] = useState({ name: '', phone: '', date: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  usePageMeta(
    property ? `${property.title} | Zamin Real Estate` : 'Property | Zamin Real Estate',
    property ? property.description[0].slice(0, 155) : undefined
  );

  if (!property) return <NotFoundPage />;

  const p = property;
  const saved = has(p.id);
  const similar = similarProperties(p);
  const perSqFt = p.areaSqFt ? pricePerSqFt(p.price, p.areaSqFt) : 0;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(`${p.location}, ${p.region}, Gilgit-Baltistan, Pakistan`)}&z=12&output=embed`;

  const whatsappMsg = `Assalam-o-Alaikum Zamin! I'm interested in "${p.title}" (${formatPrice(p.price)}${p.purpose === 'rent' ? '/month' : ''}) listed on your website. Please share more details.`;

  const submitEnquiry = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = 'Please enter your name.';
    if (!/^[+0-9][0-9\s-]{8,}$/.test(form.phone.trim())) errs.phone = 'Enter a valid phone number.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus('loading');
    await delay(1000);
    setStatus('done');
    toast('Enquiry sent — Zamin will call you back shortly');
  };

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': p.type === 'Land / Plot' ? 'Place' : 'Residence',
          name: p.title,
          url: `${SITE_URL}/property/${p.id}`,
          image: p.images,
          address: { '@type': 'PostalAddress', addressLocality: p.location, addressRegion: p.region, addressCountry: 'PK' },
          offers: { '@type': 'Offer', price: p.price, priceCurrency: 'PKR' },
        }}
      />

      {/* Gallery */}
      <section className="wrap pb-6 pt-24 md:pt-28">
        <Link to={p.purpose === 'sale' ? '/properties-for-sale' : '/properties-for-rent'} className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-foreground-400 transition hover:text-primary-700">
          <ArrowLeft className="h-4 w-4" /> Back to {p.purpose === 'sale' ? 'properties for sale' : 'properties for rent'}
        </Link>
        <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
          <div className="relative overflow-hidden rounded-2xl">
            <img src={p.images[activeImg]} alt={`${p.title} — photo ${activeImg + 1}`} onError={onImgError} className="h-[320px] w-full object-cover md:h-[480px]" />
            {p.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImg((activeImg - 1 + p.images.length) % p.images.length)}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-primary-950/60 text-white backdrop-blur transition hover:bg-primary-950/80"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setActiveImg((activeImg + 1) % p.images.length)}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-primary-950/60 text-white backdrop-blur transition hover:bg-primary-950/80"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            <span className="tag absolute left-4 top-4 bg-primary-950/80 text-white backdrop-blur">{p.purpose === 'sale' ? 'For Sale' : 'For Rent'}</span>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-2 lg:grid-rows-2">
            {p.images.slice(0, 4).map((img, i) => (
              <button
                key={img + i}
                onClick={() => setActiveImg(i)}
                className={cn('relative overflow-hidden rounded-xl border-2 transition', i === activeImg ? 'border-accent-500' : 'border-transparent opacity-80 hover:opacity-100', p.images.length === 2 && 'lg:col-span-1')}
              >
                <img src={img} alt={`${p.title} thumbnail ${i + 1}`} onError={onImgError} className="h-24 w-full object-cover lg:h-full lg:max-h-[232px]" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content + sticky enquiry */}
      <section className="wrap grid gap-10 pb-16 lg:grid-cols-[1.6fr_1fr]">
        <div>
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {p.badge && <span className="tag bg-accent-500 text-white">{p.badge}</span>}
                <span className="tag bg-primary-100 text-primary-800">{p.type}</span>
              </div>
              <h1 className="font-heading mt-3 text-3xl font-bold text-primary-950 md:text-4xl">{p.title}</h1>
              <p className="mt-2 flex items-center gap-1.5 text-foreground-500">
                <MapPin className="h-4 w-4 text-accent-600" /> {p.address}
              </p>
            </div>
            <div className="text-right">
              <p className="font-heading text-3xl font-bold text-primary-800 md:text-4xl">
                {formatPrice(p.price)}
                {p.purpose === 'rent' && <span className="text-lg text-foreground-400">/month</span>}
              </p>
              {p.negotiable && <p className="text-xs font-bold uppercase tracking-wider text-accent-600">Negotiable</p>}
              {perSqFt > 0 && <p className="mt-1 text-sm text-foreground-400">PKR {formatNumber(perSqFt)} / sq ft</p>}
            </div>
          </div>

          {/* Specs */}
          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-background-200 ring-1 ring-background-200 sm:grid-cols-4">
            {[
              ...(p.beds > 0 ? [{ icon: BedDouble, label: 'Bedrooms', value: String(p.beds) }] : []),
              ...(p.baths > 0 ? [{ icon: Bath, label: 'Bathrooms', value: String(p.baths) }] : []),
              { icon: Ruler, label: 'Area', value: p.areaLabel },
              { icon: Building2, label: 'Type', value: p.type },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 bg-white px-5 py-4">
                <s.icon className="h-6 w-6 shrink-0 text-primary-600" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground-400">{s.label}</p>
                  <p className="text-sm font-bold text-primary-950">{s.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => { toggle(p.id); toast(saved ? 'Removed from your shortlist' : 'Saved to your shortlist', saved ? 'info' : 'success'); }} className={saved ? 'btn-accent' : 'btn-ghost'}>
              <Heart className={cn('h-4 w-4', saved && 'fill-current')} /> {saved ? 'Saved' : 'Save Property'}
            </button>
            <a href={whatsappLink(whatsappMsg)} target="_blank" rel="noreferrer" className="btn-whatsapp">
              <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
            </a>
          </div>

          {/* Description */}
          <div className="mt-10">
            <h2 className="font-heading text-2xl font-bold text-primary-950">About this property</h2>
            {p.description.map((para) => (
              <p key={para.slice(0, 32)} className="mt-4 leading-relaxed text-foreground-600">
                {para}
              </p>
            ))}
          </div>

          {/* Investment note */}
          {p.investmentNote && (
            <div className="mt-8 rounded-2xl border-l-4 border-accent-500 bg-accent-50 p-6">
              <p className="text-xs font-extrabold uppercase tracking-wider text-accent-700">Investment note from our consultants</p>
              <p className="mt-2 font-semibold text-primary-900">{p.investmentNote}</p>
            </div>
          )}

          {/* Features */}
          <div className="mt-10">
            <h2 className="font-heading text-2xl font-bold text-primary-950">Features & Amenities</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-foreground-700 ring-1 ring-background-200">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" /> {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Details table */}
          <div className="mt-10">
            <h2 className="font-heading text-2xl font-bold text-primary-950">Property Details</h2>
            <dl className="mt-4 overflow-hidden rounded-2xl ring-1 ring-background-200">
              {[
                ['Property ID', `ZAM-${p.id.toUpperCase().slice(0, 8)}`],
                ['Purpose', p.purpose === 'sale' ? 'For Sale' : 'For Rent'],
                ['Type', p.type],
                ['Location', `${p.location}, ${p.region}`],
                ['Area', `${p.areaLabel} (${formatNumber(p.areaSqFt)} sq ft)`],
                ['Listed', formatDate(p.listedAt)],
                ...(perSqFt > 0 ? [['Price per sq ft', `PKR ${formatNumber(perSqFt)}`]] : []),
                ['Commission', p.purpose === 'sale' ? '2.5% – 3% (agreed in writing)' : 'One month’s rent'],
              ].map(([k, v], i) => (
                <div key={k} className={cn('grid grid-cols-2 gap-4 px-5 py-3.5 text-sm', i % 2 === 0 ? 'bg-white' : 'bg-background-50')}>
                  <dt className="font-bold text-foreground-400">{k}</dt>
                  <dd className="text-right font-semibold text-foreground-800">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Map */}
          <div className="mt-10">
            <h2 className="font-heading text-2xl font-bold text-primary-950">Location</h2>
            <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-background-200">
              <iframe title={`Map of ${p.location}, ${p.region}`} src={mapSrc} className="h-80 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <p className="mt-2 text-xs text-foreground-400">
              Approximate area shown for privacy. Exact location shared with serious buyers after verification.
            </p>
          </div>
        </div>

        {/* Sticky enquiry card */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-background-200">
            <p className="text-xs font-extrabold uppercase tracking-wider text-accent-600">Enquire about this property</p>
            <p className="font-heading mt-1 text-xl font-bold text-primary-950">Speak with a Zamin Consultant</p>

            {status === 'done' ? (
              <div className="fade-in mt-5 rounded-2xl bg-accent-50 p-5 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-accent-600" />
                <p className="mt-3 font-bold text-primary-900">Enquiry received!</p>
                <p className="mt-1 text-sm text-foreground-500">
                  A consultant will call you back within working hours. For an instant response, use WhatsApp below.
                </p>
                <a href={whatsappLink(whatsappMsg)} target="_blank" rel="noreferrer" className="btn-whatsapp btn-sm mt-4">
                  <MessageCircle className="h-4 w-4" /> Chat Now
                </a>
              </div>
            ) : (
              <form onSubmit={submitEnquiry} noValidate className="mt-5 space-y-4">
                <div>
                  <label htmlFor="enq-name" className="field-label">Your name</label>
                  <input id="enq-name" className="field-input" placeholder="Full name" {...field('name')} />
                  {errors.name && <p className="mt-1 text-xs font-semibold text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="enq-phone" className="field-label">Phone / WhatsApp</label>
                  <input id="enq-phone" className="field-input" placeholder="+92 3xx xxxxxxx" {...field('phone')} />
                  {errors.phone && <p className="mt-1 text-xs font-semibold text-red-600">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="enq-date" className="field-label">Preferred viewing date (optional)</label>
                  <input id="enq-date" type="date" className="field-input" {...field('date')} />
                </div>
                <div>
                  <label htmlFor="enq-msg" className="field-label">Message (optional)</label>
                  <textarea id="enq-msg" rows={3} className="field-input" placeholder="I'd like to arrange a viewing…" {...field('message')} />
                </div>
                <button type="submit" disabled={status === 'loading'} className="btn-primary w-full">
                  {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Calendar className="h-4 w-4" />}
                  Schedule Viewing / Enquire
                </button>
                <p className="text-center text-[11px] text-foreground-400">
                  Your enquiry is also emailed to Zamin so no lead is ever missed.
                </p>
              </form>
            )}

            <div className="mt-5 grid gap-2 border-t border-background-200 pt-5">
              <a href={`tel:${PHONE_TEL}`} className="btn-outline w-full">
                <Phone className="h-4 w-4" /> Call {PHONE_DISPLAY}
              </a>
              <a href={whatsappLink(whatsappMsg)} target="_blank" rel="noreferrer" className="btn-whatsapp w-full">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </section>

      {/* Similar properties */}
      {similar.length > 0 && (
        <section className="bg-background-100 py-14">
          <div className="wrap">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="font-heading text-2xl font-bold text-primary-950 md:text-3xl">Similar Properties</h2>
              <Link to={p.purpose === 'sale' ? '/properties-for-sale' : '/properties-for-rent'} className="text-sm font-bold text-accent-600 hover:underline">
                View all →
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((sp) => (
                <PropertyCard key={sp.id} property={sp} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Home link for SEO crawl */}
      <span className="sr-only"><Home /> {p.title}</span>
    </>
  );
}
