import { Link } from 'react-router-dom';
import { Mail, MapPin, Mountain, Phone, MessageCircle, Clock } from 'lucide-react';
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_LINK,
  BUSINESS_HOURS,
} from '../../lib/constants';
import NewsletterSignup from '../NewsletterSignup';

const COLUMNS = [
  {
    title: 'Properties',
    links: [
      { label: 'Properties for Sale', to: '/properties-for-sale' },
      { label: 'Properties for Rent', to: '/properties-for-rent' },
      { label: 'Sell / Rent Your Property', to: '/sell-your-property' },
      { label: 'Free Valuation', to: '/valuation' },
      { label: 'Saved Shortlist', to: '/shortlist' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Our Services', to: '/services' },
      { label: 'Blog & Resources', to: '/blog' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Free Tools',
    links: [
      { label: 'All Tools', to: '/tools' },
      { label: 'Mortgage Calculator', to: '/tools/mortgage-calculator' },
      { label: 'Rental Yield Calculator', to: '/tools/rental-yield-calculator' },
      { label: 'Stamp Duty Estimator', to: '/tools/stamp-duty-calculator' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-primary-950 pb-24 pt-16 text-white md:pb-10">
      <div className="wrap grid gap-12 lg:grid-cols-[1.4fr_2fr]">
        {/* Brand + newsletter */}
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-primary-600 text-white shadow-md">
              <Mountain className="h-6 w-6" />
            </span>
            <span className="leading-tight">
              <span className="font-heading block text-2xl font-bold">Zamin</span>
              <span className="block text-[9px] font-extrabold uppercase tracking-[0.22em] text-accent-300">
                Real Estate & Consultants
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
            Gilgit-Baltistan’s most trusted property agency. Buy, sell, rent and invest across Hunza, Skardu, Gilgit,
            Chilas, Nagar and Ghizer — with transparent commission and honest advice.
          </p>

          <div className="mt-7">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-accent-300">Get Property Alerts</h3>
            <p className="mb-3 mt-1 text-xs text-white/50">New listings in your inbox before they hit WhatsApp groups.</p>
            <NewsletterSignup variant="dark" idPrefix="footer-nl" />
          </div>

          {/* Socials */}
          <div className="mt-7 flex items-center gap-3">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366] transition hover:bg-[#25D366] hover:text-white"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            {['facebook', 'instagram', 'youtube'].map((s) => (
              <a
                key={s}
                href={`https://${s}.com/zaminrealestate`}
                target="_blank"
                rel="noreferrer"
                aria-label={s}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-accent-500 hover:text-white"
              >
                <i className={`ri-${s}-fill text-lg`} aria-hidden />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns + contact */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-accent-300">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to + l.label}>
                    <Link to={l.to} className="text-sm text-white/60 transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact strip */}
      <div className="wrap mt-12 grid gap-4 border-t border-white/10 pt-8 text-sm text-white/70 md:grid-cols-3">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
          <span>
            {ADDRESS_LINE_1}
            <br />
            {ADDRESS_LINE_2}
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-3 transition hover:text-white">
            <Phone className="h-5 w-5 shrink-0 text-accent-400" /> {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 transition hover:text-white">
            <Mail className="h-5 w-5 shrink-0 text-accent-400" /> {EMAIL}
          </a>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
          <span>
            {BUSINESS_HOURS.map((h) => (
              <span key={h.days} className="block">
                <span className="font-semibold text-white/85">{h.days}:</span> {h.hours}
              </span>
            ))}
          </span>
        </div>
      </div>

      <div className="wrap mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row">
        <p>© {new Date().getFullYear()} Zamin Real Estate & Consultants. All rights reserved.</p>
        <p>Gilgit-Baltistan, Pakistan · Serving Hunza · Skardu · Gilgit · Chilas · Nagar · Ghizer</p>
      </div>
    </footer>
  );
}
