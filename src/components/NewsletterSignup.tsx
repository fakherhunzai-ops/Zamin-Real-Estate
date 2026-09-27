import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { cn, delay } from '../lib/utils';

interface Props {
  variant?: 'light' | 'dark';
  compact?: boolean;
  idPrefix?: string;
}

export default function NewsletterSignup({ variant = 'light', compact = false, idPrefix = 'nl' }: Props) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [error, setError] = useState('');
  const dark = variant === 'dark';

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setState('loading');
    await delay(900);
    setState('done');
  };

  if (state === 'done') {
    return (
      <div className={cn('flex items-center gap-2 text-sm font-semibold', dark ? 'text-accent-300' : 'text-primary-700')}>
        <CheckCircle2 className="h-5 w-5" /> You’re subscribed — new listings will land in your inbox.
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <div className={cn('flex w-full gap-2', compact ? 'flex-row' : 'flex-col sm:flex-row')}>
        <input
          id={`${idPrefix}-email`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-label="Email address"
          className={dark ? 'field-input-dark' : 'field-input'}
        />
        <button type="submit" disabled={state === 'loading'} className={cn(dark ? 'btn-accent' : 'btn-primary', 'shrink-0')}>
          {state === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Subscribe
        </button>
      </div>
      {error && <p className={cn('mt-2 text-xs font-semibold', dark ? 'text-red-300' : 'text-red-600')}>{error}</p>}
    </form>
  );
}
