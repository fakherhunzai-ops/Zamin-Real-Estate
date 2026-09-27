import type { ReactNode } from 'react';
import { onImgError } from '../../lib/imgFallback';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  children?: ReactNode;
}

/** Inner-page banner with the standardised dark forest-green CTA treatment. */
export default function PageHero({ eyebrow, title, subtitle, image, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-primary-950 pb-16 pt-32 md:pb-20 md:pt-40">
      {image && (
        <>
          <img src={image} alt="" aria-hidden onError={onImgError} className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-950/85 to-primary-900/60" />
        </>
      )}
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" aria-hidden />
      <div className="wrap relative">
        {eyebrow && <span className="eyebrow-light">{eyebrow}</span>}
        <h1 className="font-heading max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
