import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Clock, Link2, MessageCircle, Phone } from 'lucide-react';
import { getPost, relatedPosts } from '../mocks/blog';
import NotFoundPage from './NotFoundPage';
import JsonLd from '../components/ui/JsonLd';
import CtaBand from '../components/ui/CtaBand';
import { cn, formatDate } from '../lib/utils';
import { PHONE_DISPLAY, PHONE_TEL, SITE_URL, whatsappLink } from '../lib/constants';
import { useToast } from '../context/ToastContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { onImgError } from '../lib/imgFallback';

const TOOL_LINKS = [
  { to: '/tools/mortgage-calculator', title: 'Mortgage & EMI Calculator', text: 'Plan a loan and monthly payment.' },
  { to: '/tools/rental-yield-calculator', title: 'Rental Yield Calculator', text: 'Gross & net yield on any property.' },
  { to: '/tools/stamp-duty-calculator', title: 'Stamp Duty Estimator', text: 'Full transfer cost for any deal.' },
];

export default function BlogArticlePage() {
  const { slug } = useParams();
  const post = getPost(slug ?? '');
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [copied, setCopied] = useState(false);

  usePageMeta(post ? `${post.title} | Zamin Blog` : 'Article | Zamin Blog', post?.excerpt);

  // Reading progress
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    if (!post) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    post.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [post]);

  if (!post) return <NotFoundPage />;

  const related = relatedPosts(post);
  const url = `${SITE_URL}/blog/${post.slug}`;
  const shareMsg = `${post.title} — from Zamin Real Estate & Consultants: ${url}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast('Article link copied');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast('Could not copy — long-press the address bar instead', 'info');
    }
  };

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          author: { '@type': 'Person', name: post.author },
          publisher: { '@type': 'Organization', name: 'Zamin Real Estate & Consultants', url: SITE_URL },
          datePublished: post.date,
          url,
        }}
      />
      <div id="reading-progress" style={{ width: `${progress}%` }} />

      {/* Header */}
      <section className="relative overflow-hidden bg-primary-950 pb-14 pt-32 md:pt-40">
        <img src={post.image} alt="" aria-hidden onError={onImgError} className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/80 to-primary-950/40" />
        <div className="wrap-narrow relative">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-bold text-white/70 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="tag bg-accent-500 text-white">{post.category}</span>
            <span className="text-xs font-semibold text-white/60">
              {formatDate(post.date)} · <Clock className="mr-0.5 inline h-3.5 w-3.5" />
              {post.readMinutes} min read · by {post.author}
            </span>
          </div>
          <h1 className="font-heading mt-4 max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl">{post.title}</h1>
        </div>
      </section>

      {/* Body + sidebar */}
      <section className="wrap-narrow grid gap-10 py-12 lg:grid-cols-[1fr_280px]">
        <article>
          {post.sections.map((s) => (
            <section key={s.id} id={s.id} className="mb-10 scroll-mt-28">
              <h2 className="font-heading text-2xl font-bold text-primary-950 md:text-3xl">{s.heading}</h2>
              {s.paragraphs.map((para, i) => (
                <p key={i} className="mt-4 leading-relaxed text-foreground-600">
                  {para}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-5 space-y-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 font-semibold text-foreground-700">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-accent-600" /> {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Share */}
          <div className="mt-10 rounded-2xl border border-background-200 bg-white p-6">
            <p className="text-xs font-extrabold uppercase tracking-wider text-foreground-400">Share this article</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={whatsappLink(shareMsg)} target="_blank" rel="noreferrer" className="btn-whatsapp btn-sm">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost btn-sm"
              >
                Facebook
              </a>
              <button onClick={copyLink} className="btn-ghost btn-sm">
                {copied ? <Check className="h-4 w-4 text-accent-600" /> : <Link2 className="h-4 w-4" />} {copied ? 'Copied' : 'Copy link'}
              </button>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {/* TOC */}
          <div className="rounded-2xl border border-background-200 bg-white p-5">
            <p className="text-xs font-extrabold uppercase tracking-wider text-foreground-400">In this article</p>
            <nav className="mt-3 space-y-1">
              {post.sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={cn(
                    'block rounded-lg px-3 py-2 text-sm font-semibold transition',
                    activeSection === s.id ? 'bg-accent-50 text-primary-800' : 'text-foreground-500 hover:bg-background-100'
                  )}
                >
                  {s.heading}
                </a>
              ))}
            </nav>
          </div>

          {/* Related tools — adaptive */}
          <div className="rounded-2xl bg-primary-950 p-5 text-white">
            <p className="text-xs font-extrabold uppercase tracking-wider text-accent-300">
              {post.financeRelated ? 'Related free tools' : 'Free property tools'}
            </p>
            <div className="mt-3 space-y-2.5">
              {(post.financeRelated ? TOOL_LINKS : TOOL_LINKS.slice(0, 1).concat([{ to: '/tools', title: 'Browse all tools', text: 'Every free calculator in one place.' }])).map((t) => (
                <Link key={t.to} to={t.to} className="group block rounded-xl bg-white/5 p-3.5 transition hover:bg-white/10">
                  <p className="flex items-center justify-between text-sm font-bold">
                    {t.title}
                    <ArrowRight className="h-4 w-4 text-accent-400 transition group-hover:translate-x-0.5" />
                  </p>
                  <p className="mt-0.5 text-xs text-white/60">{t.text}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Consult card */}
          <div className="rounded-2xl border-2 border-accent-300 bg-accent-50 p-5">
            <p className="font-heading text-lg font-bold text-primary-950">Talk it through with a consultant</p>
            <p className="mt-1 text-sm text-foreground-500">Free, frank advice on any property question.</p>
            <a href={`tel:${PHONE_TEL}`} className="btn-primary btn-sm mt-4 w-full">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
            <Link to="/contact" className="btn-ghost btn-sm mt-2 w-full">
              Send a message
            </Link>
          </div>
        </aside>
      </section>

      {/* Related articles */}
      <section className="bg-background-100 py-14">
        <div className="wrap">
          <h2 className="font-heading mb-8 text-2xl font-bold text-primary-950 md:text-3xl">Related Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="card card-hover group flex flex-col">
                <div className="relative overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" onError={onImgError} className="h-44 w-full object-cover transition duration-500 group-hover:scale-105" />
                  <span className="tag absolute left-3 top-3 bg-primary-950/80 text-white backdrop-blur">{p.category}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground-400">{formatDate(p.date)}</p>
                  <h3 className="font-heading mt-1.5 flex-1 text-lg font-bold leading-snug text-primary-950 transition group-hover:text-primary-700">
                    {p.title}
                  </h3>
                  <span className="mt-3 text-sm font-bold text-accent-600">Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Put this knowledge to work" subtitle="Ready to act on what you’ve read? Our consultants will walk through the numbers with you — free." primaryLabel="Browse Properties" primaryTo="/properties-for-sale" />
    </>
  );
}
