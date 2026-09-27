import { Link } from 'react-router-dom';
import { Phone, MessageCircle } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_LINK } from '../../lib/constants';

interface Props {
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryTo?: string;
}

/** Standardised dark forest-green CTA band used across pages. */
export default function CtaBand({
  title,
  subtitle = 'Speak with a Zamin consultant today — honest advice, transparent commission, and 15 years of Gilgit-Baltistan deals behind every answer.',
  primaryLabel = 'List Your Property',
  primaryTo = '/sell-your-property',
}: Props) {
  return (
    <section className="wrap py-16 md:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 px-6 py-12 text-center shadow-2xl shadow-primary-900/30 md:px-16 md:py-16">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent-500/15 blur-3xl" aria-hidden />
        <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-accent-400/10 blur-3xl" aria-hidden />
        <div className="relative">
          <span className="eyebrow-light">Talk to Zamin</span>
          <h2 className="font-heading mx-auto max-w-2xl text-3xl font-bold text-white md:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">{subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to={primaryTo} className="btn-accent btn-lg">
              {primaryLabel}
            </Link>
            <a href={`tel:${PHONE_TEL}`} className="btn-outline-light btn-lg">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn-whatsapp btn-lg">
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
