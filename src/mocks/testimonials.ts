export interface Testimonial {
  id: string;
  name: string;
  origin: string;
  role: string;
  rating: number;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Imran Shah',
    origin: 'Gilgit',
    role: 'Bought a family home in Jutial',
    rating: 5,
    text: 'Zamin handled everything from viewing to mutation. They walked me through every document before I signed anything — the 2.5% commission felt honestly earned.',
  },
  {
    id: 't2',
    name: 'Sadia Karim',
    origin: 'Islamabad (diaspora buyer)',
    role: 'Bought land in Danyore remotely',
    rating: 5,
    text: 'I bought my plot from Islamabad without travelling once. Video viewings, verified fard, and they sent a lawyer to explain the transfer. Total trust.',
  },
  {
    id: 't3',
    name: 'John Matthews',
    origin: 'United Kingdom',
    role: 'Invested in a Skardu guest house',
    rating: 5,
    text: 'Their investment note on the guest house matched reality almost exactly — occupancy, costs, everything. Rare to find numbers you can rely on.',
  },
  {
    id: 't4',
    name: 'Nasreen Bibi',
    origin: 'Hunza',
    role: 'Sold her family orchard farmhouse',
    rating: 5,
    text: 'They priced it honestly, photographed it beautifully and closed in six weeks. No pressure, no hidden charges, and they kept my elderly parents informed at every step.',
  },
  {
    id: 't5',
    name: 'Ali Dad Khan',
    origin: 'Skardu',
    role: 'Rents an executive apartment via Zamin',
    rating: 4,
    text: 'The tenancy agreement was clear and fair, and when the heater failed in December they had it fixed within two days. That is what an agency should do.',
  },
  {
    id: 't6',
    name: 'Farhan Qureshi',
    origin: 'Karachi',
    role: 'Bought a commercial plaza in Chilas',
    rating: 5,
    text: 'I compared four agencies before choosing Zamin. They were the only ones who showed me tenancy agreements and real rent receipts before asking for a token.',
  },
];
