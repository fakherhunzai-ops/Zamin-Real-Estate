import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFoundPage() {
  usePageMeta('Page Not Found | Zamin Real Estate');

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 pt-20 text-center">
      <div>
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-50 text-primary-400">
          <Compass className="h-10 w-10" />
        </span>
        <p className="font-heading mt-6 text-6xl font-bold text-primary-900">404</p>
        <h1 className="font-heading mt-2 text-2xl font-bold text-primary-950">This trail leads nowhere</h1>
        <p className="mx-auto mt-2 max-w-md text-foreground-500">
          The page you’re looking for doesn’t exist or has moved. Let’s get you back on the map.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">Back to Home</Link>
          <Link to="/properties-for-sale" className="btn-ghost">Browse Properties</Link>
        </div>
      </div>
    </section>
  );
}
