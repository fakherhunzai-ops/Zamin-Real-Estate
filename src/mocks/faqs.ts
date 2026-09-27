export interface Faq {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FAQ_CATEGORIES = ['Commission & Fees', 'Coverage & Visits', 'Listing Your Property', 'Valuation', 'Documents & Legal'] as const;

export const faqs: Faq[] = [
  {
    id: 'f1',
    category: 'Commission & Fees',
    question: 'What commission does Zamin charge?',
    answer:
      'For sales we charge 2.5%–3% of the final deal value, agreed in writing before we start. For rentals we charge one month’s rent. There are no hidden charges, no "file fees", and you never pay anything until your deal is closed.',
  },
  {
    id: 'f2',
    category: 'Commission & Fees',
    question: 'Is the commission negotiable?',
    answer:
      'On high-value deals (above PKR 5 crore) or exclusive mandates where we take full marketing responsibility, the rate can be discussed openly before signing. Whatever we agree is written into the agency agreement — no surprises later.',
  },
  {
    id: 'f3',
    category: 'Commission & Fees',
    question: 'Do I pay anything upfront to list my property?',
    answer:
      'No. Photography, listing, promotion and viewings are all free for owners. Our fee is only earned when we bring you a completed sale or signed tenancy.',
  },
  {
    id: 'f4',
    category: 'Coverage & Visits',
    question: 'Which areas does Zamin cover?',
    answer:
      'We operate across all of Gilgit-Baltistan: Hunza (Karimabad, Aliabad), Skardu, Gilgit city and Danyore, Chilas, Nagar and Ghizer. If your property is anywhere in the region, we can serve it.',
  },
  {
    id: 'f5',
    category: 'Coverage & Visits',
    question: 'Can I buy property while living abroad or in another city?',
    answer:
      'Yes — roughly a third of our buyers are diaspora or out-of-city clients. We conduct live video viewings, verify title documents with our legal team, and can arrange a power-of-attorney based transfer guided step by step.',
  },
  {
    id: 'f6',
    category: 'Coverage & Visits',
    question: 'Do you arrange site visits to remote valleys?',
    answer:
      'Yes. We schedule escorted visits anywhere in Gilgit-Baltistan, including Ghizer and upper Nagar. For serious buyers we can arrange a multi-property itinerary over two or three days.',
  },
  {
    id: 'f7',
    category: 'Listing Your Property',
    question: 'How do I list my property with Zamin?',
    answer:
      'Fill in the listing form on our "Sell / Rent Your Property" page or call us directly. We visit the property within days, take professional photos, agree a realistic price, and your listing goes live on our site and WhatsApp channels.',
  },
  {
    id: 'f8',
    category: 'Listing Your Property',
    question: 'How long does it usually take to sell?',
    answer:
      'Well-priced residential homes in Gilgit city typically sell within 4–8 weeks. Land and niche tourism assets can take longer — usually 2–4 months. Honest pricing is the single biggest factor, and we will tell you straight if a price is too high.',
  },
  {
    id: 'f9',
    category: 'Listing Your Property',
    question: 'Do I need to be present for viewings?',
    answer:
      'No. Most owners hand us the keys or arrange access with a neighbour. We accompany every viewing personally, collect visitor feedback, and report back to you after each one.',
  },
  {
    id: 'f10',
    category: 'Valuation',
    question: 'Is your property valuation really free?',
    answer:
      'Yes. We provide a free market valuation for any property in Gilgit-Baltistan, based on recent comparable deals in the same mohalla or village. There is no obligation to list with us afterwards.',
  },
  {
    id: 'f11',
    category: 'Valuation',
    question: 'How accurate are your valuations?',
    answer:
      'We value from actual closed transactions we handle and verify, not from asking prices. Typical valuations land within 5% of the eventual sale price when documents are clean and the market is stable.',
  },
  {
    id: 'f12',
    category: 'Documents & Legal',
    question: 'Which documents do I need to sell my property?',
    answer:
      'At minimum: fard/inteqal (ownership record), mutation (inteqal) in your name, CNIC, and a recent utility bill. For land, the aks-shajra (map sketch) helps. Our documentation team checks everything for free before listing.',
  },
  {
    id: 'f13',
    category: 'Documents & Legal',
    question: 'Do you handle the transfer (registry) process?',
    answer:
      'Yes. We prepare the sale agreement, coordinate stamp duty and CVT payments, book the sub-registrar appointment, and stay with both parties until the registry is signed and handed over. Our fee already includes this service.',
  },
  {
    id: 'f14',
    category: 'Documents & Legal',
    question: 'Is a NOC required for property in Gilgit-Baltistan?',
    answer:
      'In some cases — for example certain housing schemes and commercial conversions. Our legal team checks NOC status during verification and will never list a property whose documents cannot be transferred cleanly.',
  },
];
