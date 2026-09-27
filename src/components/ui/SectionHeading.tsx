import { cn } from '../../lib/utils';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', light = false, className }: Props) {
  return (
    <div className={cn('mb-10 max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <span className={light ? 'eyebrow-light' : 'eyebrow'}>{eyebrow}</span>}
      <h2 className={cn('font-heading text-3xl font-bold leading-tight md:text-4xl', light ? 'text-white' : 'text-primary-950')}>
        {title}
      </h2>
      {subtitle && <p className={cn('mt-3 text-base leading-relaxed', light ? 'text-white/70' : 'text-foreground-500')}>{subtitle}</p>}
    </div>
  );
}
