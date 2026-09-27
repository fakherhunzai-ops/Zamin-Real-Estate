export const SITE_NAME = 'Zamin Real Estate & Consultants';
export const SITE_NAME_SHORT = 'Zamin';
export const SITE_TAGLINE = 'Gilgit-Baltistan’s Most Trusted Property Agency';
export const SITE_URL = 'https://zaminzameen.com';

export const PHONE_DISPLAY = '+92 355 509 9430';
export const PHONE_TEL = '+923555099430';
export const WHATSAPP_NUMBER = '923555099430';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
export const EMAIL = 'baqircustoms369@gmail.com';
export const ADDRESS_LINE_1 = 'Sultanabad, Danyore';
export const ADDRESS_LINE_2 = 'Gilgit, Gilgit-Baltistan, Pakistan';
export const ADDRESS_FULL = `${ADDRESS_LINE_1}, ${ADDRESS_LINE_2}`;

export const MAP_EMBED_URL =
  'https://www.google.com/maps?q=Sultanabad,+Danyore,+Gilgit,+Gilgit-Baltistan,+Pakistan&z=13&output=embed';

export const BUSINESS_HOURS = [
  { days: 'Monday – Saturday', hours: '9:00 AM – 6:00 PM' },
  { days: 'Sunday', hours: 'By appointment' },
];

export const COMMISSION_SALES = '2.5% – 3%';
export const COMMISSION_RENTAL = "One month's rent";

export const AREAS_SERVED = ['Hunza', 'Skardu', 'Gilgit', 'Chilas', 'Nagar', 'Ghizer'];

export const SOCIALS = [
  { name: 'Facebook', icon: 'facebook', href: 'https://facebook.com/zaminrealestate', aria: 'Zamin on Facebook' },
  { name: 'Instagram', icon: 'instagram', href: 'https://instagram.com/zaminrealestate', aria: 'Zamin on Instagram' },
  { name: 'YouTube', icon: 'youtube', href: 'https://youtube.com/@zaminrealestate', aria: 'Zamin on YouTube' },
  { name: 'WhatsApp', icon: 'whatsapp', href: WHATSAPP_LINK, aria: 'Chat with Zamin on WhatsApp' },
] as const;

export const whatsappLink = (message: string) =>
  `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`;
