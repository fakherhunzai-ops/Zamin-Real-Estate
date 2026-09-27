import { Link } from 'react-router-dom';
import { Bath, BedDouble, Heart, MapPin, Ruler } from 'lucide-react';
import type { Property } from '../../mocks/properties';
import { cn, formatPrice, formatNumber } from '../../lib/utils';
import { onImgError } from '../../lib/imgFallback';
import { useShortlist } from '../../context/ShortlistContext';
import { useToast } from '../../context/ToastContext';

interface Props {
  property: Property;
  view?: 'grid' | 'list';
}

const BADGE_COLORS: Record<string, string> = {
  New: 'bg-accent-500 text-white',
  'Hot Deal': 'bg-red-500 text-white',
  'Investor Pick': 'bg-primary-800 text-white',
  Premium: 'bg-primary-950 text-accent-300',
};

export default function PropertyCard({ property: p, view = 'grid' }: Props) {
  const { has, toggle } = useShortlist();
  const { toast } = useToast();
  const saved = has(p.id);
  const list = view === 'list';

  const onToggle = () => {
    toggle(p.id);
    toast(saved ? 'Removed from your shortlist' : 'Saved to your shortlist', saved ? 'info' : 'success');
  };

  return (
    <article className={cn('card card-hover group relative flex', list ? 'flex-col md:flex-row' : 'flex-col')}>
      {/* Image */}
      <Link to={`/property/${p.id}`} className={cn('relative block overflow-hidden', list ? 'md:w-[46%] md:shrink-0' : '')}>
        <img
          src={p.images[0]}
          alt={p.title}
          loading="lazy"
          onError={onImgError}
          className={cn('w-full object-cover transition duration-500 group-hover:scale-105', list ? 'h-52 md:h-full' : 'h-56')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 via-transparent to-transparent" />
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="tag bg-primary-950/80 text-white backdrop-blur">{p.purpose === 'sale' ? 'For Sale' : 'For Rent'}</span>
          {p.badge && <span className={cn('tag', BADGE_COLORS[p.badge] ?? 'bg-primary-700 text-white')}>{p.badge}</span>}
        </div>
        {/* Shortlist heart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggle();
          }}
          aria-label={saved ? 'Remove from shortlist' : 'Save to shortlist'}
          className={cn(
            'absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition',
            saved ? 'bg-accent-500 text-white' : 'bg-white/90 text-foreground-500 hover:text-accent-600'
          )}
        >
          <Heart className={cn('h-5 w-5', saved && 'fill-current')} />
        </button>
        {/* Price ribbon */}
        <div className="absolute bottom-3 left-3">
          <span className="font-heading text-xl font-bold text-white drop-shadow md:text-2xl">
            {formatPrice(p.price)}
            {p.purpose === 'rent' && <span className="text-sm font-semibold text-white/80">/month</span>}
          </span>
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <Link to={`/property/${p.id}`}>
          <h3 className="font-heading text-lg font-bold leading-snug text-primary-950 transition group-hover:text-primary-700">
            {p.title}
          </h3>
        </Link>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-foreground-500">
          <MapPin className="h-4 w-4 shrink-0 text-accent-600" />
          {p.location}, {p.region}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-background-200 pt-4 text-sm text-foreground-600">
          {p.beds > 0 && (
            <span className="flex items-center gap-1.5">
              <BedDouble className="h-4 w-4 text-primary-600" /> {p.beds} {p.beds === 1 ? 'Bed' : 'Beds'}
            </span>
          )}
          {p.baths > 0 && (
            <span className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-primary-600" /> {p.baths} {p.baths === 1 ? 'Bath' : 'Baths'}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Ruler className="h-4 w-4 text-primary-600" /> {formatNumber(p.areaSqFt)} sq ft
          </span>
          <span className="ml-auto hidden rounded-full bg-primary-50 px-2.5 py-1 text-[11px] font-bold text-primary-700 sm:inline-flex">
            {p.type}
          </span>
        </div>
      </div>
    </article>
  );
}
