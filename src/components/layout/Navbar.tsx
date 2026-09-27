import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Mountain, Phone, X, Heart, MessageCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_LINK } from '../../lib/constants';
import { useShortlist } from '../../context/ShortlistContext';

const NAV_LINKS = [
  { to: '/properties-for-sale', label: 'Buy' },
  { to: '/properties-for-rent', label: 'Rent' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { ids } = useShortlist();
  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        transparent ? 'bg-gradient-to-b from-primary-950/70 to-transparent py-4' : 'bg-white/95 py-2 shadow-lg shadow-primary-900/5 backdrop-blur'
      )}
    >
      <div className="wrap flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" aria-label="Zamin Real Estate home">
          <span
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-800 to-primary-600 text-white shadow-md',
              transparent && 'from-white/20 to-white/10 backdrop-blur'
            )}
          >
            <Mountain className="h-6 w-6" />
          </span>
          <span className="leading-tight">
            <span className={cn('font-heading block text-2xl font-bold tracking-tight', transparent ? 'text-white' : 'text-primary-900')}>
              Zamin
            </span>
            <span
              className={cn(
                'block text-[9px] font-extrabold uppercase tracking-[0.22em]',
                transparent ? 'text-white/80' : 'text-accent-600'
              )}
            >
              Real Estate & Consultants
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-sm font-bold transition',
                  transparent
                    ? isActive
                      ? 'bg-white/15 text-white'
                      : 'text-white/85 hover:bg-white/10 hover:text-white'
                    : isActive
                      ? 'bg-primary-50 text-primary-800'
                      : 'text-foreground-600 hover:bg-primary-50 hover:text-primary-800'
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Shortlist heart */}
          <Link
            to="/shortlist"
            aria-label="Saved properties"
            className={cn(
              'relative hidden h-11 w-11 items-center justify-center rounded-full transition md:flex',
              transparent ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-primary-50 text-primary-800 hover:bg-primary-100'
            )}
          >
            <Heart className={cn('h-5 w-5', ids.length > 0 && 'fill-current text-accent-600')} />
            {ids.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-[10px] font-extrabold text-white">
                {ids.length}
              </span>
            )}
          </Link>

          {/* Call pill */}
          <a
            href={`tel:${PHONE_TEL}`}
            className={cn(
              'hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition xl:flex',
              transparent ? 'bg-accent-400/20 text-white backdrop-blur hover:bg-accent-400/30' : 'bg-primary-100 text-primary-800 hover:bg-primary-200'
            )}
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>

          {/* WhatsApp circle */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition hover:scale-105 hover:bg-[#1fb857]"
          >
            <MessageCircle className="h-5 w-5" />
          </a>

          {/* List your property CTA */}
          <Link
            to="/sell-your-property"
            className={cn(
              'hidden rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-md transition md:inline-flex',
              'bg-gradient-to-r from-primary-900 to-primary-700 hover:from-primary-800 hover:to-primary-600'
            )}
          >
            List Your Property
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-full transition lg:hidden',
              transparent ? 'bg-white/15 text-white' : 'bg-primary-50 text-primary-800'
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 lg:hidden',
          open ? 'max-h-[calc(100vh-72px)] overflow-y-auto' : 'max-h-0'
        )}
      >
        <nav className="wrap flex flex-col gap-1 bg-white pb-6 pt-3 shadow-xl">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  'rounded-xl px-4 py-3 text-base font-bold',
                  isActive ? 'bg-primary-50 text-primary-800' : 'text-foreground-700 hover:bg-background-100'
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/valuation"
            className={({ isActive }) =>
              cn(
                'rounded-xl px-4 py-3 text-base font-bold',
                isActive ? 'bg-primary-50 text-primary-800' : 'text-foreground-700 hover:bg-background-100'
              )
            }
          >
            Free Valuation
          </NavLink>
          <NavLink
            to="/tools"
            className={({ isActive }) =>
              cn(
                'rounded-xl px-4 py-3 text-base font-bold',
                isActive ? 'bg-primary-50 text-primary-800' : 'text-foreground-700 hover:bg-background-100'
              )
            }
          >
            Free Tools
          </NavLink>
          <Link to="/shortlist" className="flex items-center gap-2 rounded-xl px-4 py-3 text-base font-bold text-foreground-700 hover:bg-background-100">
            <Heart className="h-4 w-4 text-accent-600" /> Saved Properties {ids.length > 0 && `(${ids.length})`}
          </Link>
          <div className="mt-3 flex flex-col gap-2">
            <Link to="/sell-your-property" className="btn-primary">
              List Your Property
            </Link>
            <a href={`tel:${PHONE_TEL}`} className="btn-ghost">
              <Phone className="h-4 w-4" /> Call {PHONE_DISPLAY}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
