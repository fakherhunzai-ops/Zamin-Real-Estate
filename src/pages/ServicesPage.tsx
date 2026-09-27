import { Home, KeyRound, Building2, TrendingUp, Scale, ShieldCheck, Check } from 'lucide-react';
import { IMG } from '../lib/images';
import PageHero from '../components/ui/PageHero';
import CtaBand from '../components/ui/CtaBand';
import { services } from '../mocks/services';
import { cn } from '../lib/utils';
import { usePageMeta } from '../hooks/usePageMeta';
import { onImgError } from '../lib/imgFallback';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  key: KeyRound,
  building: Building2,
  chart: TrendingUp,
  scale: Scale,
  trending: TrendingUp,
  shield: ShieldCheck,
};

export default function ServicesPage() {
  usePageMeta(
    'Our Services | Zamin Real Estate & Consultants',
    'Buying, selling, renting, valuation, legal & documentation, investment advisory and property management across Gilgit-Baltistan.'
  );

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Everything You Need, Under One Trusted Roof"
        subtitle="Seven services covering the full property lifecycle — each delivered by specialists who live and work in Gilgit-Baltistan."
        image={IMG.contractSigning}
      />

      <section className="wrap py-14 md:py-20">
        <div className="space-y-16 md:space-y-24">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Home;
            const reversed = i % 2 === 1;
            return (
              <article key={s.id} id={s.id} className={cn('grid items-center gap-10 lg:grid-cols-2', reversed && 'lg:[&>*:first-child]:order-2')}>
                <div className="relative">
                  <img src={s.image} alt={s.title} loading="lazy" onError={onImgError} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl" />
                  <span className="absolute -bottom-5 left-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-800 to-accent-600 text-white shadow-lg">
                    <Icon className="h-8 w-8" />
                  </span>
                </div>
                <div>
                  <span className="eyebrow">Service {String(i + 1).padStart(2, '0')}</span>
                  <h2 className="font-heading text-3xl font-bold text-primary-950">{s.title}</h2>
                  <p className="mt-4 leading-relaxed text-foreground-600">{s.description}</p>
                  <ul className="mt-6 space-y-3">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm font-semibold text-foreground-700">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                          <Check className="h-3 w-3" />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CtaBand
        title="Speak With a Property Consultant"
        subtitle="Whatever stage you’re at — browsing, listing, renting or investing — start with a free, no-pressure conversation."
        primaryLabel="Contact Us"
        primaryTo="/contact"
      />
    </>
  );
}
