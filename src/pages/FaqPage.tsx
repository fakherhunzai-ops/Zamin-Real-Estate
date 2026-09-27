import { useMemo, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { IMG } from '../lib/images';
import PageHero from '../components/ui/PageHero';
import CtaBand from '../components/ui/CtaBand';
import JsonLd from '../components/ui/JsonLd';
import { faqs, FAQ_CATEGORIES } from '../mocks/faqs';
import { cn } from '../lib/utils';
import { SITE_URL } from '../lib/constants';
import { usePageMeta } from '../hooks/usePageMeta';

export default function FaqPage() {
  usePageMeta(
    'Frequently Asked Questions | Zamin Real Estate',
    'Answers on commission, coverage, listing, valuation and documents for buying and selling property in Gilgit-Baltistan.'
  );

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  const filtered = useMemo(
    () =>
      faqs.filter((f) => {
        if (category && f.category !== category) return false;
        if (query) {
          const q = query.toLowerCase();
          return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
        }
        return true;
      }),
    [query, category]
  );

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
          url: `${SITE_URL}/faq`,
        }}
      />
      <PageHero
        eyebrow="Help Centre"
        title="Frequently Asked Questions"
        subtitle="Commission, coverage, listing, valuation and documents — answered plainly. Can’t find your answer? Call or WhatsApp us."
        image={IMG.deskPlanning}
      />

      <section className="wrap-narrow py-14 md:py-20">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground-300" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions — e.g. commission, NOC, valuation…"
            className="field-input !py-4 !pl-12 shadow-sm"
            aria-label="Search FAQs"
          />
        </div>

        {/* Category tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button onClick={() => setCategory('')} className={cn('chip', !category && 'chip-active')}>
            All ({faqs.length})
          </button>
          {FAQ_CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(category === c ? '' : c)} className={cn('chip', category === c && 'chip-active')}>
              {c}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="mt-8 space-y-3">
          {filtered.length === 0 && (
            <p className="rounded-2xl border-2 border-dashed border-background-300 p-10 text-center text-foreground-500">
              No questions match “{query}”. Try another phrase, or ask us directly on the contact page.
            </p>
          )}
          {filtered.map((f) => {
            const open = openId === f.id;
            return (
              <div key={f.id} className={cn('overflow-hidden rounded-2xl border bg-white transition', open ? 'border-accent-300 shadow-md' : 'border-background-200')}>
                <button
                  onClick={() => setOpenId(open ? null : f.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={open}
                >
                  <span>
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-accent-600">{f.category}</span>
                    <span className="mt-0.5 block font-bold text-primary-950">{f.question}</span>
                  </span>
                  <ChevronDown className={cn('h-5 w-5 shrink-0 text-foreground-400 transition-transform duration-300', open && 'rotate-180 text-accent-600')} />
                </button>
                <div className={cn('grid transition-all duration-300', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                  <div className="overflow-hidden">
                    <p className="border-t border-background-100 px-6 py-5 leading-relaxed text-foreground-600">{f.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CtaBand title="Still have a question?" subtitle="Ask us anything — commission, documents, a specific property. We answer fast and frankly." primaryLabel="Contact Us" primaryTo="/contact" />
    </>
  );
}
