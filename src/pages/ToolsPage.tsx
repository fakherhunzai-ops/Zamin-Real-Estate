import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Printer, Save, Mail } from 'lucide-react';
import { IMG } from '../lib/images';
import PageHero from '../components/ui/PageHero';
import CtaBand from '../components/ui/CtaBand';
import { ALL_TOOLS } from '../components/tools/ToolLayout';
import { usePageMeta } from '../hooks/usePageMeta';

const PERKS = [
  { icon: BadgeCheck, title: 'Free forever', text: 'No signup, no paywall, no catch — plan as much as you like.' },
  { icon: Printer, title: 'Bank-ready summaries', text: 'Print or save a branded PDF of every result to take to meetings.' },
  { icon: Save, title: 'Save your reports', text: 'Your last inputs are remembered on your device and restored when you return.' },
  { icon: Mail, title: 'Email the numbers', text: 'Send any summary to your inbox with one tap to share with family.' },
];

export default function ToolsPage() {
  usePageMeta(
    'Free Property Tools | Zamin Real Estate',
    'Free mortgage calculator, rental yield calculator and stamp duty estimator for Gilgit-Baltistan property — with printable summaries.'
  );

  return (
    <>
      <PageHero
        eyebrow="Free Tools"
        title="Plan Before You Commit"
        subtitle="Three professional calculators, built from fifteen years of real Gilgit-Baltistan deals. Free, private and printable."
        image={IMG.calculatorFinance}
      />

      {/* Tool cards */}
      <section className="wrap py-14 md:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {ALL_TOOLS.map((t) => (
            <Link key={t.path} to={t.path} className="card card-hover group flex flex-col p-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-800 to-accent-600 text-white shadow-md transition group-hover:scale-105">
                <t.icon className="h-7 w-7" />
              </span>
              <h2 className="font-heading mt-5 text-2xl font-bold text-primary-950">{t.title}</h2>
              <p className="mt-2 flex-1 leading-relaxed text-foreground-500">{t.text}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-accent-600">
                Open calculator <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Perks */}
      <section className="bg-background-100 py-14 md:py-20">
        <div className="wrap">
          <h2 className="font-heading mb-8 text-center text-3xl font-bold text-primary-950">Every tool, fully equipped</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PERKS.map((p) => (
              <div key={p.title} className="rounded-2xl bg-white p-6 text-center shadow-sm">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-bold text-primary-950">{p.title}</h3>
                <p className="mt-1.5 text-sm text-foreground-500">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Numbers done — now see the properties"
        subtitle="Bring your budget to our listings, or ask a consultant to sanity-check your figures against real market data."
        primaryLabel="Browse Properties"
        primaryTo="/properties-for-sale"
      />
    </>
  );
}
