export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** Format PKR amounts in the Pakistani Cr / Lac convention (Lac only from 10 Lac up). */
export function formatPrice(amount: number): string {
  if (amount >= 1_00_000_00) return `PKR ${(amount / 1_00_000_00).toFixed(2).replace(/\.?0+$/, '')} Cr`;
  if (amount >= 1_000_000) return `PKR ${(amount / 1_00_000).toFixed(1).replace(/\.0$/, '')} Lac`;
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

export function formatPriceShort(amount: number): string {
  return formatPrice(amount).replace('PKR ', '');
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-PK');
}

export function pricePerSqFt(price: number, areaSqFt: number): number {
  if (!areaSqFt) return 0;
  return Math.round(price / areaSqFt);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function daysSince(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
}

export function pluralize(n: number, singular: string, plural?: string): string {
  return n === 1 ? singular : plural ?? `${singular}s`;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Simple promise-based delay for simulating form submissions. */
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
