import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, List, RotateCcw, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { properties, REGIONS, PROPERTY_TYPES, type Property, type PropertyPurpose } from '../../mocks/properties';
import PropertyCard from './PropertyCard';
import { cn } from '../../lib/utils';
import { readStorage, writeStorage } from '../../hooks/useLocalStorage';
import { scrollToId } from '../../lib/utils';

interface Filters {
  region: string;
  type: string;
  price: string;
  beds: string;
  area: string;
}

const DEFAULT_FILTERS: Filters = { region: '', type: '', price: '', beds: '', area: '' };

interface PriceBucket {
  id: string;
  label: string;
  min: number;
  max: number;
}

const SALE_PRICES: PriceBucket[] = [
  { id: 'lt1cr', label: 'Under PKR 1 Cr', min: 0, max: 10_000_000 },
  { id: '1to2cr', label: 'PKR 1 – 2 Cr', min: 10_000_000, max: 20_000_000 },
  { id: '2to4cr', label: 'PKR 2 – 4 Cr', min: 20_000_000, max: 40_000_000 },
  { id: 'gt4cr', label: 'Above PKR 4 Cr', min: 40_000_000, max: Infinity },
];

const RENT_PRICES: PriceBucket[] = [
  { id: 'lt30k', label: 'Under PKR 30,000', min: 0, max: 30_000 },
  { id: '30to60k', label: 'PKR 30,000 – 60,000', min: 30_000, max: 60_000 },
  { id: '60to100k', label: 'PKR 60,000 – 1 Lakh', min: 60_000, max: 100_000 },
  { id: 'gt100k', label: 'Above PKR 1 Lakh', min: 100_000, max: Infinity },
];

const AREA_BUCKETS: PriceBucket[] = [
  { id: 'lt1000', label: 'Under 1,000 sq ft', min: 0, max: 1000 },
  { id: '1to3k', label: '1,000 – 3,000 sq ft', min: 1000, max: 3000 },
  { id: '3to6k', label: '3,000 – 6,000 sq ft', min: 3000, max: 6000 },
  { id: 'gt6k', label: 'Above 6,000 sq ft', min: 6000, max: Infinity },
];

const BED_OPTIONS = [
  { id: '', label: 'Any beds' },
  { id: '1', label: '1+ beds' },
  { id: '2', label: '2+ beds' },
  { id: '3', label: '3+ beds' },
  { id: '5', label: '5+ beds' },
];

const SORTS = [
  { id: 'newest', label: 'Newest first' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'area-desc', label: 'Largest area' },
];

const PAGE_SIZE = 6;

function matchesFilters(p: Property, f: Filters, priceBuckets: PriceBucket[]): boolean {
  if (f.region && p.region !== f.region) return false;
  if (f.type && p.type !== f.type) return false;
  if (f.beds && p.beds < Number(f.beds)) return false;
  if (f.price) {
    const b = priceBuckets.find((x) => x.id === f.price);
    if (b && !(p.price >= b.min && p.price < b.max)) return false;
  }
  if (f.area) {
    const b = AREA_BUCKETS.find((x) => x.id === f.area);
    if (b && !(p.areaSqFt >= b.min && p.areaSqFt < b.max)) return false;
  }
  return true;
}

function activeCount(f: Filters): number {
  return Object.values(f).filter(Boolean).length;
}

interface RememberedRecord {
  filters: Filters;
  lastVisitTs: number;
}

export default function PropertyListings({ purpose }: { purpose: PropertyPurpose }) {
  const priceBuckets = purpose === 'sale' ? SALE_PRICES : RENT_PRICES;
  const storageKey = `zamin.remembered.${purpose}`;
  const [searchParams] = useSearchParams();

  // Initialise from URL params (e.g. coming from the homepage hero search)
  const initialFilters = (): Filters => {
    const f = { ...DEFAULT_FILTERS };
    (['region', 'type', 'price', 'beds', 'area'] as const).forEach((k) => {
      const v = searchParams.get(k);
      if (v) f[k] = v;
    });
    return f;
  };

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sort, setSort] = useState('newest');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Remembered filters / welcome-back prompt
  const [welcome, setWelcome] = useState<{ saved: Filters; newMatches: number } | null>(null);

  useEffect(() => {
    const record = readStorage<RememberedRecord | null>(storageKey, null);
    const fromUrl = [...searchParams.keys()].length > 0;
    if (!fromUrl && record && activeCount(record.filters) > 0) {
      const all = properties.filter((p) => p.purpose === purpose);
      const matches = all.filter((p) => matchesFilters(p, record.filters, priceBuckets));
      const newMatches = matches.filter((p) => new Date(p.listedAt).getTime() > record.lastVisitTs).length;
      if (matches.length > 0) setWelcome({ saved: record.filters, newMatches });
    }
    // Persist the visit so the next session knows what's new
    writeStorage<RememberedRecord>(storageKey, {
      filters: readStorage<RememberedRecord | null>(storageKey, null)?.filters ?? DEFAULT_FILTERS,
      lastVisitTs: Date.now(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purpose]);

  // Remember current filters for the next visit
  useEffect(() => {
    const t = setTimeout(() => {
      const record = readStorage<RememberedRecord | null>(storageKey, null);
      writeStorage<RememberedRecord>(storageKey, { filters, lastVisitTs: record?.lastVisitTs ?? Date.now() });
    }, 600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, purpose]);

  const all = useMemo(() => properties.filter((p) => p.purpose === purpose), [purpose]);

  const filtered = useMemo(() => {
    const out = all.filter((p) => matchesFilters(p, filters, priceBuckets));
    switch (sort) {
      case 'price-asc':
        return [...out].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...out].sort((a, b) => b.price - a.price);
      case 'area-desc':
        return [...out].sort((a, b) => b.areaSqFt - a.areaSqFt);
      default:
        return [...out].sort((a, b) => new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime());
    }
  }, [all, filters, sort, priceBuckets]);

  useEffect(() => setVisible(PAGE_SIZE), [filters, sort, purpose]);

  const set = (key: keyof Filters) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((f) => ({ ...f, [key]: e.target.value }));
  };

  const clearAll = () => setFilters(DEFAULT_FILTERS);

  const selectClass =
    'w-full rounded-xl border border-background-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-foreground-800 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30';

  const filterControls = (
    <>
      <select className={selectClass} value={filters.region} onChange={set('region')} aria-label="Location">
        <option value="">All locations</option>
        {REGIONS.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      <select className={selectClass} value={filters.type} onChange={set('type')} aria-label="Property type">
        <option value="">All types</option>
        {PROPERTY_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <select className={selectClass} value={filters.price} onChange={set('price')} aria-label="Price range">
        <option value="">{purpose === 'sale' ? 'Any price' : 'Any rent'}</option>
        {priceBuckets.map((b) => (
          <option key={b.id} value={b.id}>
            {b.label}
          </option>
        ))}
      </select>
      <select className={selectClass} value={filters.beds} onChange={set('beds')} aria-label="Bedrooms">
        {BED_OPTIONS.map((b) => (
          <option key={b.id} value={b.id}>
            {b.label}
          </option>
        ))}
      </select>
      <select className={selectClass} value={filters.area} onChange={set('area')} aria-label="Area">
        <option value="">Any area</option>
        {AREA_BUCKETS.map((b) => (
          <option key={b.id} value={b.id}>
            {b.label}
          </option>
        ))}
      </select>
    </>
  );

  return (
    <section className="wrap py-10 md:py-14" id="listings">
      {/* Welcome-back prompt */}
      {welcome && (
        <div className="fade-in mb-8 flex flex-col items-start gap-4 rounded-2xl border border-accent-200 bg-accent-50 p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
            <div>
              <p className="text-sm font-bold text-primary-900">Welcome back — your last search is saved.</p>
              <p className="mt-0.5 text-sm text-foreground-500">
                {welcome.newMatches > 0
                  ? `${welcome.newMatches} new ${welcome.newMatches === 1 ? 'listing' : 'listings'} now match your saved filters.`
                  : 'Your saved filters are ready — pick up where you left off.'}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              className="btn-primary btn-sm"
              onClick={() => {
                setFilters(welcome.saved);
                setWelcome(null);
                scrollToId('listings');
              }}
            >
              Re-check matches
            </button>
            <button className="btn-ghost btn-sm" onClick={() => setWelcome(null)}>
              Start fresh
            </button>
          </div>
        </div>
      )}

      {/* Filter bar */}
      <div className="rounded-2xl border border-background-200 bg-white p-4 shadow-sm md:p-5">
        <div className="hidden grid-cols-5 gap-3 lg:grid">{filterControls}</div>

        <div className="flex flex-wrap items-center justify-between gap-3 lg:mt-3">
          <div className="flex items-center gap-3">
            <button className="btn-ghost btn-sm lg:hidden" onClick={() => setDrawerOpen(true)}>
              <SlidersHorizontal className="h-4 w-4" /> Filters {activeCount(filters) > 0 && `(${activeCount(filters)})`}
            </button>
            <p className="text-sm font-semibold text-foreground-500">
              <span className="font-extrabold text-primary-800">{filtered.length}</span>{' '}
              {filtered.length === 1 ? 'property' : 'properties'} found
            </p>
            {activeCount(filters) > 0 && (
              <button onClick={clearAll} className="flex items-center gap-1 text-xs font-bold text-accent-600 hover:underline">
                <X className="h-3.5 w-3.5" /> Clear all
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select className={selectClass} value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by">
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <div className="hidden overflow-hidden rounded-xl border border-background-300 md:flex">
              <button
                onClick={() => setView('grid')}
                aria-label="Grid view"
                className={cn('flex h-10 w-10 items-center justify-center transition', view === 'grid' ? 'bg-primary-700 text-white' : 'bg-white text-foreground-400 hover:text-primary-700')}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView('list')}
                aria-label="List view"
                className={cn('flex h-10 w-10 items-center justify-center transition', view === 'list' ? 'bg-primary-700 text-white' : 'bg-white text-foreground-400 hover:text-primary-700')}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border-2 border-dashed border-background-300 bg-white p-14 text-center">
          <p className="font-heading text-2xl font-bold text-primary-900">No properties match those filters</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-foreground-500">
            Try widening your price range or choosing a different location — or tell us what you need and we’ll source it for you.
          </p>
          <button onClick={clearAll} className="btn-primary mt-6">
            <RotateCcw className="h-4 w-4" /> Reset filters
          </button>
        </div>
      ) : (
        <>
          <div
            className={cn(
              'mt-8 grid gap-6',
              view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 max-w-4xl mx-auto'
            )}
          >
            {filtered.slice(0, visible).map((p) => (
              <PropertyCard key={p.id} property={p} view={view} />
            ))}
          </div>
          {visible < filtered.length && (
            <div className="mt-10 text-center">
              <button className="btn-outline btn-lg" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                Load More Properties ({filtered.length - visible} remaining)
              </button>
            </div>
          )}
        </>
      )}

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-primary-950/60 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-background-200 px-5 py-4">
              <h3 className="font-heading text-xl font-bold text-primary-950">Filters</h3>
              <button onClick={() => setDrawerOpen(false)} aria-label="Close filters" className="flex h-10 w-10 items-center justify-center rounded-full bg-background-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">{filterControls}</div>
            <div className="flex gap-2 border-t border-background-200 p-4">
              <button className="btn-ghost flex-1" onClick={clearAll}>
                Clear
              </button>
              <button className="btn-primary flex-1" onClick={() => setDrawerOpen(false)}>
                Show {filtered.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
