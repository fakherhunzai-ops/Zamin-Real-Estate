import { useState, useEffect, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BedDouble,
  Building2,
  ChevronLeft,
  ChevronRight,
  Handshake,
  Home,
  KeyRound,
  MapPin,
  Mountain,
  Quote,
  Search,
  ShieldCheck,
  Star,
  TrendingUp,
} from 'lucide-react';
import { IMG } from '../lib/images';
import { featuredProperties, REGIONS, PROPERTY_TYPES } from '../mocks/properties';
import { testimonials } from '../mocks/testimonials';
import { services } from '../mocks/services';
import PropertyCard from '../components/properties/PropertyCard';
import SectionHeading from '../components/ui/SectionHeading';
import CtaBand from '../components/ui/CtaBand';
import { cn } from '../lib/utils';
import { COMMISSION_RENTAL, COMMISSION_SALES } from '../lib/constants';
import { usePageMeta } from '../hooks/usePageMeta';
import { onImgError } from '../lib/imgFallback';

const STATS = [
  { value: '15+', label: 'Years in Gilgit-Baltistan' },
  { value: '900+', label: 'Deals closed' },
  { value: '6', label: 'Valleys covered' },
  { value: `${COMMISSION_SALES}`, label: 'Transparent sales commission' },
];

const WHY_US = [
  {
    icon: ShieldCheck,
    title: 'Every document verified',
    text: 'Fard, mutation and NOC checks before any property is listed or shown. No clean title, no listing.',
  },
  {
    icon: Handshake,
    title: 'Transparent commission',
    text: `${COMMISSION_SALES} on sales and ${COMMISSION_RENTAL.toLowerCase()} on rentals — agreed in writing, paid only when we deliver.`,
  },
  {
    icon: MapPin,
    title: 'Local experts, everywhere',
    text: 'Consultants on the ground in Hunza, Skardu, Gilgit, Chilas, Nagar and Ghizer — not arm-chair agents.',
  },
  {
    icon: TrendingUp,
    title: 'Real deal data',
    text: 'We price from closed transactions we handled ourselves, so our advice is anchored in facts, not rumours.',
  },
];

export default function HomePage() {
  usePageMeta(
    'Zamin Real Estate & Consultants | Gilgit-Baltistan Property',
    'Gilgit-Baltistan’s most trusted property agency. Buy, sell and rent houses, apartments and land in Hunza, Skardu, Gilgit, Nagar and Ghizer with transparent commission.'
  );

  const navigate = useNavigate();

  // Hero search state
  const [region, setRegion] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [beds, setBeds] = useState('');

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (region) params.set('region', region);
    if (type) params.set('type', type);
    if (price) params.set('price', price);
    if (beds) params.set('beds', beds);
    navigate(`/properties-for-sale${params.toString() ? `?${params}` : ''}`);
  };

  // Testimonials carousel
  const [tIndex, setTIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);
  const t = testimonials[tIndex];

  const heroSelect =
    'w-full rounded-xl border-0 bg-white/95 px-3 py-3 text-sm font-semibold text-foreground-800 focus:ring-2 focus:ring-accent-500';

  return (
    <>
      {/* ————— HERO ————— */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <img src={IMG.heroValley} alt="Snow-capped peaks above the Hunza valley in Gilgit-Baltistan" onError={onImgError} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/70 via-primary-950/50 to-primary-950/80" />
        <div className="wrap relative pb-16 pt-36">
          <span className="tag bg-accent-500 text-white shadow-lg">Gilgit-Baltistan’s Most Trusted Property Agency</span>
          <h1 className="font-heading mt-6 max-w-3xl text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Find Your Place Between
            <span className="block text-accent-300">the Mountains</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
            Buy, sell and rent property across Hunza, Skardu, Gilgit, Chilas, Nagar and Ghizer — with verified documents
            and honest, transparent commission.
          </p>

          {/* Search bar */}
          <form
            onSubmit={onSearch}
            className="mt-9 grid gap-3 rounded-2xl bg-white/10 p-4 shadow-2xl ring-1 ring-white/20 backdrop-blur-md md:grid-cols-[1fr_1fr_1fr_1fr_auto] md:items-center md:gap-2"
          >
            <select className={heroSelect} value={region} onChange={(e) => setRegion(e.target.value)} aria-label="Location">
              <option value="">All locations</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <select className={heroSelect} value={type} onChange={(e) => setType(e.target.value)} aria-label="Property type">
              <option value="">All property types</option>
              {PROPERTY_TYPES.map((pt) => (
                <option key={pt} value={pt}>
                  {pt}
                </option>
              ))}
            </select>
            <select className={heroSelect} value={price} onChange={(e) => setPrice(e.target.value)} aria-label="Budget">
              <option value="">Any budget</option>
              <option value="lt1cr">Under PKR 1 Cr</option>
              <option value="1to2cr">PKR 1 – 2 Cr</option>
              <option value="2to4cr">PKR 2 – 4 Cr</option>
              <option value="gt4cr">Above PKR 4 Cr</option>
            </select>
            <select className={heroSelect} value={beds} onChange={(e) => setBeds(e.target.value)} aria-label="Bedrooms">
              <option value="">Any bedrooms</option>
              <option value="1">1+ beds</option>
              <option value="2">2+ beds</option>
              <option value="3">3+ beds</option>
              <option value="5">5+ beds</option>
            </select>
            <button type="submit" className="btn-accent md:px-8">
              <Search className="h-4 w-4" /> Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
            <Link to="/properties-for-sale" className="flex items-center gap-1.5 font-semibold text-white hover:text-accent-300">
              <Home className="h-4 w-4 text-accent-400" /> Properties for Sale
            </Link>
            <Link to="/properties-for-rent" className="flex items-center gap-1.5 font-semibold text-white hover:text-accent-300">
              <KeyRound className="h-4 w-4 text-accent-400" /> Properties for Rent
            </Link>
            <Link to="/valuation" className="flex items-center gap-1.5 font-semibold text-white hover:text-accent-300">
              <TrendingUp className="h-4 w-4 text-accent-400" /> Free Valuation
            </Link>
          </div>
        </div>
      </section>

      {/* ————— STATS ————— */}
      <section className="relative z-10 -mt-12">
        <div className="wrap">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-background-200 shadow-xl md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white px-6 py-7 text-center">
                <p className="font-heading text-3xl font-bold text-primary-800">{s.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-foreground-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ————— FEATURED PROPERTIES ————— */}
      <section className="wrap py-16 md:py-24">
        <SectionHeading
          eyebrow="Hand-Picked Listings"
          title="Featured Properties"
          subtitle="Five of the finest verified listings across the region right now — inspected, photographed and document-checked by our consultants."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.slice(0, 5).map((p, i) => (
            <div key={p.id} className={cn(i === 0 && 'sm:col-span-2 lg:col-span-1')}>
              <PropertyCard property={p} />
            </div>
          ))}
          <Link
            to="/properties-for-sale"
            className="card card-hover flex min-h-[280px] flex-col items-center justify-center gap-4 border-2 border-dashed border-accent-300 bg-accent-50 p-8 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-500 text-white">
              <Mountain className="h-7 w-7" />
            </span>
            <p className="font-heading text-xl font-bold text-primary-900">Explore all listings</p>
            <p className="max-w-xs text-sm text-foreground-500">Filter by valley, budget and type to find your perfect match.</p>
            <span className="btn-primary btn-sm mt-2">
              View All Properties <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>

      {/* ————— SERVICES OVERVIEW ————— */}
      <section className="bg-primary-950 py-16 md:py-24">
        <div className="wrap">
          <SectionHeading
            light
            eyebrow="What We Do"
            title="Buy, Sell and Rent with Confidence"
            subtitle="Three core promises, backed by fifteen years of closed deals in Gilgit-Baltistan."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Home,
                title: 'Buying',
                text: services[0].short,
                to: '/properties-for-sale',
                cta: 'Browse properties',
              },
              {
                icon: Building2,
                title: 'Selling',
                text: services[1].short,
                to: '/sell-your-property',
                cta: 'List your property',
              },
              {
                icon: KeyRound,
                title: 'Renting',
                text: services[2].short,
                to: '/properties-for-rent',
                cta: 'Browse rentals',
              },
            ].map((s) => (
              <Link
                key={s.title}
                to={s.to}
                className="group rounded-2xl border border-white/10 bg-white/5 p-8 transition hover:border-accent-400/40 hover:bg-white/10"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-500/15 text-accent-400 transition group-hover:bg-accent-500 group-hover:text-white">
                  <s.icon className="h-7 w-7" />
                </span>
                <h3 className="font-heading mt-5 text-2xl font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-accent-400">
                  {s.cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/services" className="btn-outline-light">
              See All Seven Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ————— WHY CHOOSE US ————— */}
      <section className="wrap py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <img src={IMG.valleyRiver} alt="River winding through a Gilgit-Baltistan valley" onError={onImgError} className="rounded-3xl object-cover shadow-2xl" loading="lazy" />
            <div className="float-slow absolute -bottom-6 -right-4 rounded-2xl bg-white p-5 shadow-xl md:-right-8">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                  <Award className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-heading text-2xl font-bold text-primary-900">900+</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground-400">Deals closed</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Why Zamin"
              title="The Agency Gilgit-Baltistan Trusts"
              subtitle="We built Zamin on a simple belief: property deals in our valleys should be honest, documented and fair to both sides."
            />
            <div className="grid gap-6 sm:grid-cols-2">
              {WHY_US.map((w) => (
                <div key={w.title} className="rounded-2xl border border-background-200 bg-white p-6 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                    <w.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-bold text-primary-950">{w.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground-500">{w.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ————— TESTIMONIALS ————— */}
      <section className="bg-background-100 py-16 md:py-24">
        <div className="wrap-narrow">
          <SectionHeading eyebrow="Client Stories" title="Trusted Across the Valleys and Beyond" />
          <div className="relative rounded-3xl bg-white p-8 shadow-lg md:p-12">
            <Quote className="absolute -top-6 left-8 h-12 w-12 rounded-xl bg-accent-500 p-2.5 text-white shadow-lg" />
            <div key={t.id} className="fade-in">
              <div className="flex gap-1 text-accent-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn('h-5 w-5', i < t.rating ? 'fill-current' : 'text-background-300')} />
                ))}
              </div>
              <p className="font-heading mt-5 text-xl font-medium leading-relaxed text-foreground-800 md:text-2xl">
                “{t.text}”
              </p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="font-bold text-primary-950">{t.name}</p>
                  <p className="text-sm text-foreground-400">
                    {t.role} · {t.origin}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTIndex((tIndex - 1 + testimonials.length) % testimonials.length)}
                    aria-label="Previous testimonial"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-background-300 text-foreground-500 transition hover:border-primary-700 hover:text-primary-700"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setTIndex((tIndex + 1) % testimonials.length)}
                    aria-label="Next testimonial"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-background-300 text-foreground-500 transition hover:border-primary-700 hover:text-primary-700"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((x, i) => (
                <button
                  key={x.id}
                  onClick={() => setTIndex(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  className={cn('h-2 rounded-full transition-all', i === tIndex ? 'w-8 bg-accent-500' : 'w-2 bg-background-300 hover:bg-background-400')}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ————— CTA ————— */}
      <CtaBand
        title="List Your Property with Zamin"
        subtitle="Free photography, honest pricing from real closed deals, and viewings handled by professionals. You pay nothing until we deliver."
      />
    </>
  );
}
