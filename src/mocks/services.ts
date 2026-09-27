import { IMG } from '../lib/images';

export interface Service {
  id: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  image: string;
  icon: string; // lucide icon name
}

export const services: Service[] = [
  {
    id: 'buying',
    title: 'Property Buying',
    short: 'Find the right home, plot or investment asset anywhere in Gilgit-Baltistan.',
    description:
      'Tell us your budget and requirements and we shortlist verified options across Hunza, Skardu, Gilgit, Chilas, Nagar and Ghizer. Every property we show has been physically inspected and its ownership documents reviewed by our team.',
    bullets: [
      'Curated shortlists matched to budget & needs',
      'Escorted viewings anywhere in the region',
      'Independent document & title verification',
      'Negotiation support grounded in real deal data',
    ],
    image: IMG.houseKeys,
    icon: 'home',
  },
  {
    id: 'selling',
    title: 'Property Selling',
    short: 'Professional marketing and honest pricing to sell within weeks, not months.',
    description:
      'We photograph, list and promote your property across our website, WhatsApp network and buyer database — free of charge until we close. Pricing is based on genuine recent sales, so your property sells at the right value.',
    bullets: [
      'Free professional photography & listing',
      'Honest pricing from verified comparables',
      'Buyer screening & accompanied viewings',
      'Complete transfer & registry handling',
    ],
    image: IMG.houseModernWhite,
    icon: 'key',
  },
  {
    id: 'renting',
    title: 'Renting & Lettings',
    short: 'Quality tenants for landlords and fair homes for tenants.',
    description:
      'From family houses in Danyore to seasonal lodges in Hunza, we manage the full rental cycle: marketing, tenant screening, documented agreements and deposit handling. Commission is one month’s rent — charged once, clearly.',
    bullets: [
      'Tenant screening & reference checks',
      'Documented tenancy agreements',
      'Deposit & advance handling',
      'Seasonal lease structures for tourism assets',
    ],
    image: IMG.apartmentBright,
    icon: 'building',
  },
  {
    id: 'valuation',
    title: 'Property Valuation',
    short: 'Free, evidence-based market valuations from real closed transactions.',
    description:
      'We value property from transactions we have handled and verified — not from wishful asking prices. Owners use our valuations to price sales, settle inheritances and make listing decisions with confidence.',
    bullets: [
      'Free market valuation for owners',
      'Based on actual closed deals',
      'Written valuation note on request',
      'Inheritance & partition guidance',
    ],
    image: IMG.calculatorFinance,
    icon: 'chart',
  },
  {
    id: 'legal',
    title: 'Legal & Documentation',
    short: 'Verification, agreements and registry handled end to end.',
    description:
      'Our documentation team checks fard, mutation and NOC status, drafts sale and tenancy agreements, and coordinates stamp duty, CVT and sub-registrar appointments. We stay with both parties until the registry is signed.',
    bullets: [
      'Title & NOC verification',
      'Sale / tenancy agreement drafting',
      'Stamp duty & CVT coordination',
      'Power-of-attorney guided transfers',
    ],
    image: IMG.contractSigning,
    icon: 'scale',
  },
  {
    id: 'investment',
    title: 'Investment Advisory',
    short: 'Data-grounded guidance for tourism and residential investments.',
    description:
      'Gilgit-Baltistan’s tourism boom is creating real opportunities — guest houses, plots and commercial assets. We share occupancy data, rental yields and honest risk notes so you invest on facts, not rumours.',
    bullets: [
      'Tourism asset due diligence',
      'Rental yield & occupancy estimates',
      'Plot & development feasibility',
      'Diaspora investment support',
    ],
    image: IMG.sunlitHills,
    icon: 'trending',
  },
  {
    id: 'management',
    title: 'Property Management',
    short: 'We look after your property while you live away.',
    description:
      'For owners living abroad or in other cities, we hold keys, collect rent, arrange repairs, pay bills and send monthly statements. Your property stays cared for and income keeps flowing.',
    bullets: [
      'Rent collection & monthly statements',
      'Repairs & maintenance coordination',
      'Bill payment on your behalf',
      'Regular condition reports with photos',
    ],
    image: IMG.interiorLiving,
    icon: 'shield',
  },
];
