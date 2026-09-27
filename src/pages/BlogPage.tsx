import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Search } from 'lucide-react';
import { IMG } from '../lib/images';
import PageHero from '../components/ui/PageHero';
import AlertBand from '../components/ui/AlertBand';
import { blogPosts, BLOG_CATEGORIES } from '../mocks/blog';
import { cn, formatDate } from '../lib/utils';
import { usePageMeta } from '../hooks/usePageMeta';
import { onImgError } from '../lib/imgFallback';

export default function BlogPage() {
  usePageMeta(
    'Blog & Resources | Zamin Real Estate',
    'Market insights, buying and selling guides, investment analysis and area guides for Gilgit-Baltistan property.'
  );

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const filtered = useMemo(
    () =>
      blogPosts.filter((p) => {
        if (category && p.category !== category) return false;
        if (query) {
          const q = query.toLowerCase();
          return p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
        }
        return true;
      }),
    [query, category]
  );

  const browsing = Boolean(query || category);
  const featured = blogPosts[0];
  const rest = filtered.filter((p) => p.slug !== featured.slug);

  return (
    <>
      <PageHero
        eyebrow="Blog & Resources"
        title="Knowledge Is the Best Investment"
        subtitle="Market data, field guides and honest analysis from the people closing deals across Gilgit-Baltistan every week."
        image={IMG.writingNotes}
      />

      <section className="wrap py-12 md:py-16">
        {/* Controls */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setCategory('')} className={cn('chip', !category && 'chip-active')}>
              All
            </button>
            {BLOG_CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCategory(category === c ? '' : c)} className={cn('chip', category === c && 'chip-active')}>
                {c}
              </button>
            ))}
          </div>
          <div className="relative lg:w-80">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-300" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="field-input !py-2.5 !pl-10"
              aria-label="Search articles"
            />
          </div>
        </div>

        {/* Featured article */}
        {!browsing && (
          <Link to={`/blog/${featured.slug}`} className="card card-hover group mt-8 grid overflow-hidden lg:grid-cols-2">
            <div className="relative overflow-hidden">
              <img src={featured.image} alt={featured.title} onError={onImgError} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 lg:h-full" />
              <span className="tag absolute left-4 top-4 bg-accent-500 text-white">{featured.category}</span>
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-10">
              <p className="text-xs font-bold uppercase tracking-wider text-foreground-400">
                Featured · {formatDate(featured.date)} · {featured.readMinutes} min read
              </p>
              <h2 className="font-heading mt-3 text-2xl font-bold leading-snug text-primary-950 transition group-hover:text-primary-700 md:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 leading-relaxed text-foreground-500">{featured.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-accent-600">
                Read article <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="mt-12 rounded-2xl border-2 border-dashed border-background-300 p-12 text-center text-foreground-500">
            No articles match “{query}”. Try another phrase or browse a category.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="card card-hover group flex flex-col">
                <div className="relative overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" onError={onImgError} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" />
                  <span className="tag absolute left-3 top-3 bg-primary-950/80 text-white backdrop-blur">{p.category}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground-400">
                    {formatDate(p.date)} <Clock className="h-3.5 w-3.5" /> {p.readMinutes} min
                  </p>
                  <h3 className="font-heading mt-2 text-lg font-bold leading-snug text-primary-950 transition group-hover:text-primary-700">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-foreground-500">{p.excerpt}</p>
                  <span className="mt-4 text-sm font-bold text-accent-600">Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <AlertBand
        title="Get property alerts & market notes"
        subtitle="Join the newsletter for new listings and monthly market insights from Gilgit-Baltistan."
        idPrefix="blog-alert"
      />
    </>
  );
}
