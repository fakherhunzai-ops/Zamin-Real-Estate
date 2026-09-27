import type { SyntheticEvent } from 'react';

/** Branded inline SVG placeholder used if a remote image ever fails to load. */
export const FALLBACK_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#123c2c"/>
          <stop offset="1" stop-color="#0a231a"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#g)"/>
      <path d="M0 620 L320 300 L520 480 L760 220 L1200 620 Z" fill="#1e5c43" opacity="0.85"/>
      <path d="M0 700 L260 460 L480 620 L720 400 L1200 700 Z" fill="#2e8463" opacity="0.7"/>
      <circle cx="940" cy="180" r="60" fill="#f2f5ef" opacity="0.9"/>
      <text x="600" y="740" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#cfe8dc" letter-spacing="6">ZAMIN REAL ESTATE</text>
    </svg>`
  );

/** Swap in the branded placeholder if a remote image fails. Safe against loops. */
export function onImgError(e: SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (img.src !== FALLBACK_IMG) img.src = FALLBACK_IMG;
}
