import { BellRing } from 'lucide-react';
import NewsletterSignup from '../NewsletterSignup';

/** "Get property alerts" signup band — reuses the newsletter form. */
export default function AlertBand({
  title = 'Get property alerts',
  subtitle = 'New matching listings from Gilgit-Baltistan, delivered to your inbox before they hit WhatsApp groups.',
  idPrefix = 'alert-band',
}: {
  title?: string;
  subtitle?: string;
  idPrefix?: string;
}) {
  return (
    <section className="wrap pb-16">
      <div className="flex flex-col items-center gap-6 rounded-3xl border-2 border-dashed border-accent-300 bg-accent-50 px-6 py-10 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-500 text-white shadow-md">
            <BellRing className="h-6 w-6" />
          </span>
          <div>
            <h3 className="font-heading text-2xl font-bold text-primary-950">{title}</h3>
            <p className="mt-1 max-w-xl text-sm text-foreground-500">{subtitle}</p>
          </div>
        </div>
        <div className="w-full max-w-md">
          <NewsletterSignup idPrefix={idPrefix} />
        </div>
      </div>
    </section>
  );
}
