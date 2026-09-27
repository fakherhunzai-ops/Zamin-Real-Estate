import { Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_LINK } from '../../lib/constants';

/** Mobile-only sticky one-tap Call / WhatsApp bar. Collapsible + remembered. */
export default function StickyContactBar() {
  const [collapsed, setCollapsed] = useLocalStorage<boolean>('zamin.contactbar.collapsed', false);

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        aria-label="Restore contact bar"
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary-800 text-white shadow-xl md:hidden"
      >
        <Phone className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-primary-800 bg-primary-950/95 px-3 pb-[max(env(safe-area-inset-bottom),10px)] pt-2.5 backdrop-blur md:hidden">
      <div className="flex items-center gap-2">
        <a href={`tel:${PHONE_TEL}`} className="btn-primary flex-1 !px-3 !py-2.5 !text-xs">
          <Phone className="h-4 w-4" /> Call Now
        </a>
        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn-whatsapp flex-1 !px-3 !py-2.5 !text-xs">
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
        <button
          onClick={() => setCollapsed(true)}
          aria-label={`Collapse contact bar (call ${PHONE_DISPLAY} anytime)`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
