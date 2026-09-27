import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, MessageCircle, Printer, Trash2 } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import PropertyCard from '../components/properties/PropertyCard';
import { IMG } from '../lib/images';
import { properties } from '../mocks/properties';
import { useShortlist } from '../context/ShortlistContext';
import { useToast } from '../context/ToastContext';
import { cn, formatNumber, formatPrice, pricePerSqFt } from '../lib/utils';
import { EMAIL, SITE_NAME, whatsappLink } from '../lib/constants';
import { usePageMeta } from '../hooks/usePageMeta';

export default function ShortlistPage() {
  usePageMeta('Saved Properties | Zamin Real Estate', 'Your shortlisted properties with a side-by-side comparison of beds, baths, area and price per square foot.');

  const { ids, clear } = useShortlist();
  const { toast } = useToast();
  const [confirmClear, setConfirmClear] = useState(false);

  const saved = useMemo(() => properties.filter((p) => ids.includes(p.id)), [ids]);
  const withMetrics = useMemo(
    () => saved.map((p) => ({ ...p, perSqFt: pricePerSqFt(p.price, p.areaSqFt) })),
    [saved]
  );

  // Best value: lowest price per sq ft among sale properties (fallback: all)
  const saleOnes = withMetrics.filter((p) => p.purpose === 'sale' && p.perSqFt > 0);
  const bestId = saleOnes.length
    ? saleOnes.reduce((min, p) => (p.perSqFt < min.perSqFt ? p : min), saleOnes[0]).id
    : withMetrics.length
      ? withMetrics.reduce((min, p) => (p.perSqFt > 0 && p.perSqFt < (min.perSqFt || Infinity) ? p : min), withMetrics[0]).id
      : null;

  const summaryLines = () =>
    withMetrics.map(
      (p, i) =>
        `${i + 1}. ${p.title} — ${p.location}, ${p.region} — ${formatPrice(p.price)}${p.purpose === 'rent' ? '/month' : ''} — ${p.beds || '–'} beds, ${formatNumber(p.areaSqFt)} sq ft`
    );

  const onEmail = () => {
    const body = [`MY ZAMIN PROPERTY SHORTLIST`, '', ...summaryLines(), '', `Compare details: zaminzameen.com/shortlist`, `Prepared with ${SITE_NAME}.`].join('\n');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('My Zamin Property Shortlist')}&body=${encodeURIComponent(body)}`;
  };

  const onWhatsAppShare = () => {
    const msg = [`My property shortlist via ${SITE_NAME}:`, '', ...summaryLines(), '', 'zaminzameen.com'].join('\n');
    window.open(whatsappLink(msg), '_blank');
  };

  return (
    <>
      <PageHero
        eyebrow="Saved Properties"
        title="Your Property Shortlist"
        subtitle="Everything you’ve saved in one place — compare them side by side, then email, print or share the list."
        image={IMG.sunlitHills}
      />

      {saved.length === 0 ? (
        <section className="wrap py-20 text-center">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-50 text-primary-300">
            <Heart className="h-10 w-10" />
          </span>
          <h2 className="font-heading mt-6 text-3xl font-bold text-primary-950">Your shortlist is empty</h2>
          <p className="mx-auto mt-2 max-w-md text-foreground-500">
            Tap the heart on any property card to save it here — it stays on your device, ready whenever you return.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/properties-for-sale" className="btn-primary">Browse Properties for Sale</Link>
            <Link to="/properties-for-rent" className="btn-ghost">Browse Rentals</Link>
          </div>
        </section>
      ) : (
        <>
          {/* Actions */}
          <section className="wrap pt-10">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-background-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-foreground-500">
                <span className="font-extrabold text-primary-800">{saved.length}</span> saved {saved.length === 1 ? 'property' : 'properties'}
                {bestId && <span className="ml-2 text-accent-600">· best value highlighted below</span>}
              </p>
              <div className="flex flex-wrap gap-2">
                <button onClick={onEmail} className="btn-ghost btn-sm">
                  <Mail className="h-4 w-4" /> Email summary
                </button>
                <button onClick={() => window.print()} className="btn-ghost btn-sm">
                  <Printer className="h-4 w-4" /> Print / PDF
                </button>
                <button onClick={onWhatsAppShare} className="btn-whatsapp btn-sm">
                  <MessageCircle className="h-4 w-4" /> Share on WhatsApp
                </button>
                {confirmClear ? (
                  <button
                    onClick={() => {
                      clear();
                      setConfirmClear(false);
                      toast('Shortlist cleared', 'info');
                    }}
                    className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
                  >
                    Yes, clear all
                  </button>
                ) : (
                  <button onClick={() => setConfirmClear(true)} className="btn btn-sm border border-background-300 text-foreground-500 hover:border-red-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" /> Clear
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Cards */}
          <section className="wrap py-10">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {saved.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>

          {/* Comparison table */}
          <section className="wrap pb-16">
            <h2 className="font-heading mb-6 text-2xl font-bold text-primary-950 md:text-3xl">Side-by-side comparison</h2>
            <div className="overflow-x-auto rounded-2xl ring-1 ring-background-200">
              <table className="w-full min-w-[720px] bg-white text-sm">
                <thead className="bg-primary-50 text-left text-xs font-extrabold uppercase tracking-wider text-primary-800">
                  <tr>
                    <th className="px-5 py-4">Property</th>
                    <th className="px-4 py-4 text-center">Beds</th>
                    <th className="px-4 py-4 text-center">Baths</th>
                    <th className="px-4 py-4 text-right">Area (sq ft)</th>
                    <th className="px-4 py-4 text-right">Price</th>
                    <th className="px-5 py-4 text-right">Price / sq ft</th>
                  </tr>
                </thead>
                <tbody>
                  {withMetrics.map((p) => (
                    <tr key={p.id} className={cn('border-t border-background-100', p.id === bestId && 'bg-accent-50')}>
                      <td className="px-5 py-4">
                        <Link to={`/property/${p.id}`} className="font-bold text-primary-900 hover:text-primary-700">
                          {p.title}
                        </Link>
                        <p className="text-xs text-foreground-400">
                          {p.location}, {p.region} · {p.purpose === 'sale' ? 'For sale' : 'For rent'}
                          {p.id === bestId && <span className="ml-2 tag bg-accent-500 text-white">Best value</span>}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-center font-semibold">{p.beds || '—'}</td>
                      <td className="px-4 py-4 text-center font-semibold">{p.baths || '—'}</td>
                      <td className="px-4 py-4 text-right font-semibold">{formatNumber(p.areaSqFt)}</td>
                      <td className="px-4 py-4 text-right font-bold text-primary-800">
                        {formatPrice(p.price)}
                        {p.purpose === 'rent' && <span className="text-xs font-semibold text-foreground-400">/mo</span>}
                      </td>
                      <td className="px-5 py-4 text-right font-semibold">
                        {p.perSqFt > 0 ? `PKR ${formatNumber(p.perSqFt)}${p.purpose === 'rent' ? '/mo' : ''}` : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-foreground-400">
              “Best value” = lowest price per square foot among for-sale properties. For rentals, price/sq ft is per month.
            </p>
          </section>

          {/* Printable summary */}
          <div className="print-summary p-10 font-body">
            <h1 className="font-heading text-3xl font-bold text-primary-900">{SITE_NAME} — Saved Property Shortlist</h1>
            <p className="mt-1 text-sm text-gray-600">{saved.length} properties · zaminzameen.com/shortlist</p>
            <table className="mt-6 w-full text-sm">
              <thead>
                <tr className="border-b-2 border-primary-900 text-left">
                  <th className="py-2 pr-3">Property</th>
                  <th className="py-2 pr-3 text-center">Beds</th>
                  <th className="py-2 pr-3 text-center">Baths</th>
                  <th className="py-2 pr-3 text-right">Sq ft</th>
                  <th className="py-2 pr-3 text-right">Price</th>
                  <th className="py-2 text-right">Per sq ft</th>
                </tr>
              </thead>
              <tbody>
                {withMetrics.map((p) => (
                  <tr key={p.id} className="border-b border-gray-200">
                    <td className="py-2.5 pr-3">
                      <span className="font-bold">{p.title}</span>
                      <br />
                      <span className="text-xs text-gray-500">
                        {p.location}, {p.region}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 text-center">{p.beds || '—'}</td>
                    <td className="py-2.5 pr-3 text-center">{p.baths || '—'}</td>
                    <td className="py-2.5 pr-3 text-right">{formatNumber(p.areaSqFt)}</td>
                    <td className="py-2.5 pr-3 text-right font-semibold">
                      {formatPrice(p.price)}
                      {p.purpose === 'rent' ? '/mo' : ''}
                    </td>
                    <td className="py-2.5 text-right">{p.perSqFt > 0 ? `PKR ${formatNumber(p.perSqFt)}` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 text-xs text-gray-500">{SITE_NAME} · +92 355 509 9430 · Sultanabad, Danyore, Gilgit</p>
          </div>
        </>
      )}
    </>
  );
}
