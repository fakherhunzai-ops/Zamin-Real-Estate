import { IMG } from '../lib/images';

export interface BlogSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string; // ISO
  readMinutes: number;
  image: string;
  financeRelated: boolean;
  sections: BlogSection[];
}

export const BLOG_CATEGORIES = [
  'Market Insights',
  'Buying Guides',
  'Selling Guides',
  'Renting Guides',
  'Investment',
  'Legal & Documents',
  'Area Guides',
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: 'gilgit-baltistan-market-outlook-2026',
    title: 'Gilgit-Baltistan Property Market Outlook 2026',
    excerpt:
      'Tourism numbers, road upgrades and new flight capacity are reshaping property demand across the region. Here is what the data tells us about prices in 2026.',
    category: 'Market Insights',
    author: 'Ali Karim',
    date: '2026-09-15',
    readMinutes: 8,
    image: IMG.heroValley,
    financeRelated: true,
    sections: [
      {
        id: 'state-of-play',
        heading: 'The state of play in 2026',
        paragraphs: [
          'Gilgit-Baltistan’s property market has moved from a seasonal, word-of-mouth affair into a genuinely data-driven one. Over the past three years we have handled hundreds of transactions across every valley, and the pattern is clear: demand is widening beyond Gilgit city into Hunza, Skardu and even Ghizer.',
          'Three forces are driving this. First, domestic tourism keeps setting records, and visitors increasingly want to own a foothold in the region. Second, road and flight upgrades have shortened the distance between Islamabad and the valleys — both physically and psychologically. Third, diaspora buyers from the Gulf, UK and North America now treat GB property as a credible alternative to plots in Lahore or Karachi.',
        ],
      },
      {
        id: 'price-movement',
        heading: 'Where prices moved this year',
        paragraphs: [
          'Based on closed deals through our office, residential plots in Danyore appreciated roughly 18–22% year on year, while finished houses in Gilgit city moved 10–14%. Skardu is the standout performer: serviced plots near the airport corridor rose by as much as 30% in two years as hospitality investors chased limited supply.',
          'Hunza behaves differently. Land in Karimabad and Altit is scarce and mostly family-held, so transactions are rare but command premiums. Aliabad remains the practical centre with steadier, more liquid movement.',
        ],
        bullets: [
          'Danyore plots: +18–22% year on year',
          'Gilgit city houses: +10–14%',
          'Skardu airport corridor plots: up to +30%',
          'Hunza: scarce supply, premium pricing, low volume',
        ],
      },
      {
        id: 'rental-yields',
        heading: 'Rental yields are the quiet story',
        paragraphs: [
          'Everyone watches plot appreciation, but the more sustainable story in 2026 is rental income. Commercial shops on the Karakoram Highway corridor yield 5–6% gross annually, and furnished apartments in Gilgit city rent within days of listing.',
          'Tourism assets are the highest-yield category: well-run guest houses in Hunza and Skardu can clear 8–12% on capital in peak years, though with more management effort and seasonality risk. Use our rental yield calculator to model any asset you are considering.',
        ],
      },
      {
        id: 'what-we-expect',
        heading: 'What we expect next',
        paragraphs: [
          'We expect steady rather than spectacular appreciation through the rest of 2026 — roughly 10–15% for good residential assets, with Skardu continuing to outperform on hospitality demand. The main risks are construction-cost inflation and any delay in energy upgrades that constrain hotel development.',
          'For buyers, the practical advice is unchanged: verify documents first, price from real transactions rather than asking prices, and buy for a horizon of five years or more. The region rewards patience.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-buy-land-in-hunza',
    title: 'How to Buy Land in Hunza: A Step-by-Step Guide',
    excerpt:
      'Hunza land is scarce, family-held and rarely straightforward. This guide walks through verification, community consent and the paperwork that protects you.',
    category: 'Buying Guides',
    author: 'Karim Shah',
    date: '2026-09-02',
    readMinutes: 9,
    image: IMG.houseVillaPool,
    financeRelated: false,
    sections: [
      {
        id: 'why-hunza',
        heading: 'Why Hunza land is different',
        paragraphs: [
          'Hunza is not a typical property market. Much of the land is ancestral, held by extended families, and transfers often depend on community consent as much as paperwork. Outsiders — even other Gilgit-Baltistan residents — should approach purchases with extra diligence and respect for local norms.',
          'The reward is real: Hunza is the region’s strongest tourism brand, and well-located land in Karimabad, Altit or along the valley road holds value exceptionally well.',
        ],
      },
      {
        id: 'verification',
        heading: 'Step 1: Verify ownership properly',
        paragraphs: [
          'Ask for the fard (record of rights) and trace the chain of mutations back at least two transfers. Confirm the seller’s name matches current records, and check for inherited shares — a common trap is buying from one heir when several have rights.',
          'Engage a local lawyer to pull the record from the revenue office. Our documentation team does this for every Hunza purchase we handle, and it is the single most valuable step in the process.',
        ],
        bullets: [
          'Obtain current fard and mutation chain',
          'Confirm all heirs are party to the sale',
          'Check for mortgages or court stays',
          'Verify road access rights on the map sketch',
        ],
      },
      {
        id: 'community-consent',
        heading: 'Step 2: Understand community considerations',
        paragraphs: [
          'In several Hunza villages, sales to outsiders are informally reviewed by the community before they proceed. This is not a legal barrier but a social one, and ignoring it causes problems later — from access disputes to difficulty getting construction labour.',
          'A trusted local agency bridges this gap. We introduce buyers, attend jirga-style discussions when needed, and make sure the purchase is welcomed, not merely legal.',
        ],
      },
      {
        id: 'documentation',
        heading: 'Step 3: Documents and transfer',
        paragraphs: [
          'Once verified, the process mirrors the rest of Gilgit-Baltistan: sale agreement, token money (usually 5–10%), stamp duty and CVT payment, then registry at the sub-registrar. Budget government charges at roughly 4–6% of the declared value.',
          'For buyers abroad, a carefully drafted power of attorney lets a representative sign on your behalf. We supervise such transfers end to end and send you every document as it is executed.',
        ],
      },
      {
        id: 'common-mistakes',
        heading: 'Common mistakes to avoid',
        paragraphs: [
          'The three most common mistakes we see: paying a large token before verification, accepting verbal promises about road access, and skipping the aks-shajra (map sketch) which shows exactly which parcel you are buying. Each of these is avoidable with a disciplined process.',
        ],
        bullets: [
          'Never pay a token before documents are checked',
          'Get road access in writing, on the map sketch',
          'Insist on a written sale agreement with terms',
          'Do not rely on asking prices for valuation',
        ],
      },
    ],
  },
  {
    slug: 'understanding-property-valuation',
    title: 'Understanding Property Valuation in Northern Pakistan',
    excerpt:
      'Asking prices and asking reality are different things. Learn how professional valuation works in Gilgit-Baltistan and what drives a property’s true value.',
    category: 'Market Insights',
    author: 'Muhammad Baqir',
    date: '2026-08-20',
    readMinutes: 7,
    image: IMG.calculatorFinance,
    financeRelated: true,
    sections: [
      {
        id: 'why-valuing-is-hard',
        heading: 'Why valuing property here is hard',
        paragraphs: [
          'Gilgit-Baltistan has no centralised transaction registry, so there is no public “sold prices” database. Much of what circulates as market information is seller aspiration. Professional valuation here depends on knowing actual closed deals — which is exactly the record an active agency accumulates.',
          'Our valuation method is simple: find recent, comparable, closed transactions in the same mohalla or village, adjust for frontage, access, view and documentation quality, and arrive at a defensible figure.',
        ],
      },
      {
        id: 'what-drives-value',
        heading: 'What drives value in the valleys',
        paragraphs: [
          'Five factors dominate valuation outcomes in our region: road access (width and all-season usability), water availability, view and orientation, document clarity, and proximity to a commercial centre. A documented plot with 40-foot frontage on a jeepable road can be worth double an undocumented one of the same size ten minutes away.',
        ],
        bullets: [
          'Road access: the biggest single driver',
          'Water rights or line availability',
          'View & sun orientation (south-facing premiums)',
          'Clean, transferable documents',
          'Distance to bazaar, schools, hospital',
        ],
      },
      {
        id: 'valuation-vs-asking',
        heading: 'Valuation vs asking price',
        paragraphs: [
          'Sellers routinely test the market 15–25% above true value. Some of this is negotiation room; some is simple over-optimism. Buyers should treat every asking price as a starting point and anchor to recent closed deals.',
          'If you are selling, honest pricing is the fastest route to a sale. Overpriced listings grow stale, and stale listings sell below what they would have made if priced correctly from day one.',
        ],
      },
      {
        id: 'free-valuation',
        heading: 'Get a free valuation',
        paragraphs: [
          'We provide free, evidence-based valuations for any property in Gilgit-Baltistan — owners use them for pricing, inheritance settlements and listing decisions. Request one on our valuation page and we will respond within two working days with a written note.',
        ],
      },
    ],
  },
  {
    slug: 'top-areas-to-invest',
    title: 'Top 5 Areas to Invest in Gilgit-Baltistan Right Now',
    excerpt:
      'From Skardu’s airport corridor to Ghizer’s untapped lakes, we rank the five investment zones offering the best blend of growth, yield and risk.',
    category: 'Investment',
    author: 'Ali Karim',
    date: '2026-08-05',
    readMinutes: 10,
    image: IMG.alpineLake,
    financeRelated: true,
    sections: [
      {
        id: 'how-we-rank',
        heading: 'How we rank investment areas',
        paragraphs: [
          'We score every zone on four factors: appreciation momentum (recent closed-deal growth), rental or operating yield, document liquidity (how easily you can exit), and infrastructure outlook. No area wins on every factor — the rankings reflect balance.',
        ],
      },
      {
        id: 'the-five',
        heading: 'The five zones',
        paragraphs: [
          'Skardu’s airport corridor takes first place: hospitality demand, airport upgrades and limited serviced plots create the strongest momentum in the region. Danyore in Gilgit is second — the university corridor keeps absorbing residential demand with clean, liquid plots.',
          'Third is the Karakoram Highway commercial strip around Chilas, where stopover traffic supports tenanted shops yielding 5–6%. Fourth is Aliabad, Hunza’s practical centre, offering rental apartments and trading plots. Fifth is Ghizer — highest risk, but the least-serviced tourism valley means early hospitality assets face almost no competition.',
        ],
        bullets: [
          '1. Skardu airport corridor — momentum leader',
          '2. Danyore university corridor — liquid residential',
          '3. Chilas KKH strip — tenanted income',
          '4. Aliabad Hunza — rental apartments',
          '5. Ghizer valleys — early-mover tourism play',
        ],
      },
      {
        id: 'risk-notes',
        heading: 'Risk notes',
        paragraphs: [
          'Every upside carries a caveat. Skardu’s momentum depends on continued flight and road investment. Ghizer requires genuine hospitality expertise — location alone does not fill beds. And everywhere, document quality is the ultimate risk control: an illiquid title erases any paper gain.',
          'Model the numbers before you commit — our rental yield and stamp duty calculators take five minutes and save expensive mistakes.',
        ],
      },
    ],
  },
  {
    slug: 'selling-your-property-faster',
    title: 'Selling Your Property Faster: Pricing, Photos and Presentation',
    excerpt:
      'Most properties that fail to sell are not bad properties — they are badly presented or badly priced. Here is our field-tested playbook.',
    category: 'Selling Guides',
    author: 'Fatima Bibi',
    date: '2026-07-22',
    readMinutes: 6,
    image: IMG.houseEvening,
    financeRelated: false,
    sections: [
      {
        id: 'price-right',
        heading: 'Price right from day one',
        paragraphs: [
          'The first three weeks of a listing generate the majority of its viewings. Price 10% above market and you will miss that window; the property becomes “the one that’s been sitting”. Our advice: value from closed comparables, set a realistic price, and hold firm on it.',
          'Sellers who price correctly typically receive offers within 4–6 weeks in Gilgit city and 6–10 weeks for land and tourism assets.',
        ],
      },
      {
        id: 'photography',
        heading: 'Photography sells before words do',
        paragraphs: [
          'Dark, cluttered phone photos are the most common self-inflicted wound in private listings. Professional photography — shot in daylight, wide-angled, ordered — routinely doubles enquiry rates. It is free with every Zamin listing.',
          'For land and plots, we add drone-style wide shots and a marked map sketch so buyers immediately understand shape, frontage and access.',
        ],
      },
      {
        id: 'presentation',
        heading: 'Present the property honestly',
        paragraphs: [
          'Fix what is cheap to fix: paint touch-ups, working taps, clear drains. Disclose what you must disclose — a known defect discovered later kills deals and trust. We would rather lose a sale than misrepresent a property; that policy is why buyers keep coming back.',
        ],
        bullets: [
          'Fix small defects before photos',
          'Declutter rooms; open curtains',
          'Gather documents before listing',
          'Disclose known issues up front',
        ],
      },
      {
        id: 'viewings',
        heading: 'Handle viewings like a professional',
        paragraphs: [
          'Accompanied viewings outperform “call the owner” viewings because a trained consultant can answer price, document and neighbourhood questions on the spot and read buyer intent. We accompany every viewing, collect feedback, and adjust strategy if the market tells us to.',
        ],
      },
    ],
  },
  {
    slug: 'renting-in-gilgit-guide',
    title: 'Renting in Gilgit: What Tenants and Landlords Must Know',
    excerpt:
      'Rental culture in Gilgit-Baltistan is shifting from handshake deals to documented agreements. Here is how both sides protect themselves.',
    category: 'Renting Guides',
    author: 'Fatima Bibi',
    date: '2026-07-08',
    readMinutes: 7,
    image: IMG.apartmentCozy,
    financeRelated: true,
    sections: [
      {
        id: 'market-overview',
        heading: 'The rental market at a glance',
        paragraphs: [
          'Gilgit city’s rental market is the most active in the region: a family 3-bed in Danyore rents for PKR 30–40k, while furnished executive flats in the city centre reach PKR 45–60k. Skardu’s market is smaller but tightening as development-sector staff arrive.',
          'Seasonal tourism leases are a distinct category — lodges in Hunza rent by the season rather than the month, and the structure needs different terms entirely.',
        ],
      },
      {
        id: 'for-tenants',
        heading: 'For tenants: what to insist on',
        paragraphs: [
          'Always insist on a written agreement covering rent, advance, notice period and repair responsibilities. Confirm who pays utility bills and how the advance is returned. View the property in person (or by live video) before paying anything.',
        ],
        bullets: [
          'Written agreement, signed by both sides',
          'Advance refund terms in writing',
          'Utility responsibility defined',
          'Move-in condition photos shared with landlord',
        ],
      },
      {
        id: 'for-landlords',
        heading: 'For landlords: screen and document',
        paragraphs: [
          'Screen tenants properly: employment or business reference, family details and a clear agreement. A month of vacancy costs less than a bad tenant. Charge one month’s advance plus security deposit, and register the tenancy with local police as required — we handle this paperwork for every letting we arrange.',
        ],
      },
      {
        id: 'commissions',
        heading: 'Commissions and costs',
        paragraphs: [
          'The market norm is one month’s rent as agency commission, paid once at signing — that is also Zamin’s rate, with no renewal charges. Beware of agents demanding “annual fees”; they are not standard practice in this region.',
        ],
      },
    ],
  },
  {
    slug: 'property-transfer-noc-checklist',
    title: 'The Property Transfer & NOC Checklist for Gilgit-Baltistan',
    excerpt:
      'Stamp duty, CVT, mutation, NOCs — a plain-language checklist of every document and payment in a GB property transfer.',
    category: 'Legal & Documents',
    author: 'Karim Shah',
    date: '2026-06-25',
    readMinutes: 8,
    image: IMG.contractSigning,
    financeRelated: true,
    sections: [
      {
        id: 'transfer-overview',
        heading: 'The transfer process at a glance',
        paragraphs: [
          'A property transfer in Gilgit-Baltistan moves through four stages: verification of title, sale agreement with token money, payment of government charges (stamp duty and CVT), and final registration at the sub-registrar. Done properly, the whole process takes two to six weeks.',
        ],
      },
      {
        id: 'documents-checklist',
        heading: 'Documents checklist',
        paragraphs: [
          'Keep this list in front of you for any transaction. Missing documents are the most common cause of delays and, worse, of disputes years later.',
        ],
        bullets: [
          'Fard / record of rights (current)',
          'Mutation (inteqal) in the seller’s name',
          'Aks-shajra (map sketch) for land',
          'CNIC of all parties & two witnesses',
          'No-objection certificates where applicable',
          'Utility bill for address verification',
          'Sale agreement on stamp paper',
        ],
      },
      {
        id: 'government-charges',
        heading: 'Government charges',
        paragraphs: [
          'Budget roughly 4–6% of the declared value for government charges: stamp duty, CVT (capital value tax) and registration fees. These are paid against official challans — never hand these amounts in cash to any individual.',
          'Use our stamp duty calculator to estimate the full cost of transfer for any deal value before you negotiate.',
        ],
      },
      {
        id: 'noc',
        heading: 'When is a NOC required?',
        paragraphs: [
          'NOCs apply mainly to housing schemes, commercial conversions and some sensitive areas. Our documentation team checks NOC requirements during verification and will not progress a listing whose approvals cannot be produced. If an agent cannot show you the NOC, treat that as your answer.',
        ],
      },
    ],
  },
  {
    slug: 'skardu-vs-hunza-investment',
    title: 'Skardu vs Hunza: Where Should You Invest?',
    excerpt:
      'The region’s two flagship destinations offer very different investment profiles. We compare growth, yield, liquidity and risk.',
    category: 'Area Guides',
    author: 'Ali Karim',
    date: '2026-06-10',
    readMinutes: 9,
    image: IMG.valleyRiver,
    financeRelated: true,
    sections: [
      {
        id: 'the-question',
        heading: 'The question every investor asks',
        paragraphs: [
          'Skardu and Hunza are Gilgit-Baltistan’s two strongest tourism brands, but they behave like different asset classes. Skardu is a growth play with liquid land; Hunza is a scarcity play with premium pricing and low volume.',
        ],
      },
      {
        id: 'skardu-case',
        heading: 'The case for Skardu',
        paragraphs: [
          'Skardu offers the widest selection of serviced plots, an expanding airport corridor, and rising hospitality demand that outpaces bed supply. Appreciation in the airport corridor has reached 30% over two years in the best micro-markets.',
          'The trade-off: more supply means more competition among guest houses, and yields depend heavily on location and operating quality.',
        ],
      },
      {
        id: 'hunza-case',
        heading: 'The case for Hunza',
        paragraphs: [
          'Hunza’s land supply is effectively fixed — ancestral holdings, village consent norms and geography all limit new parcels. Well-located assets in Karimabad and Altit are resilient stores of value, and the tourism brand is the strongest in Pakistan.',
          'The trade-off: transactions are rare, premiums are high, and community considerations require local navigation. Entry prices start significantly above Skardu for comparable views.',
        ],
      },
      {
        id: 'verdict',
        heading: 'Our verdict',
        paragraphs: [
          'For capital growth over 3–5 years: Skardu. For long-term wealth preservation with tourism income: Hunza. For pure rental yield: neither — look at Gilgit city apartments and KKH commercial assets instead.',
          'Wherever you lean, run the numbers first. Our rental yield calculator and stamp duty estimator are free and take five minutes.',
        ],
      },
    ],
  },
  {
    slug: 'guest-house-economics',
    title: 'Guest House Economics: Does Tourism Real Estate Pay in GB?',
    excerpt:
      'We break down the real numbers behind operating a guest house in Gilgit-Baltistan — occupancy, costs, seasonality and honest returns.',
    category: 'Investment',
    author: 'Muhammad Baqir',
    date: '2026-05-28',
    readMinutes: 11,
    image: IMG.hotelResortGarden,
    financeRelated: true,
    sections: [
      {
        id: 'boom',
        heading: 'The tourism boom is real — but seasonal',
        paragraphs: [
          'Gilgit-Baltistan now welcomes millions of domestic visitors annually, concentrated between May and October. Peak-season occupancy for a well-run guest house in Hunza or Skardu routinely exceeds 70%, while winter occupancy can fall below 15%.',
          'Any honest investment analysis must model this seasonality: roughly eight good months, two transition months, and two slow ones.',
        ],
      },
      {
        id: 'unit-economics',
        heading: 'Unit economics of a typical guest house',
        paragraphs: [
          'Consider a ten-room guest house bought at PKR 6–7 crore. In peak season, average room rates of PKR 8–12k with breakfast can produce PKR 25–35 lakh in gross monthly revenue. Annual gross revenue for a competent operator typically lands between PKR 1.5 and 2.2 crore.',
          'Operating costs — staff, utilities, maintenance, food costs, booking commissions — consume 45–55% of revenue. Net operating income of PKR 70 lakh to 1 crore on a PKR 6.5 crore asset implies a net yield of 10–15% in a good year.',
        ],
        bullets: [
          'Gross revenue: PKR 1.5–2.2 Cr/year (10 rooms)',
          'Operating costs: 45–55% of revenue',
          'Net yield: 10–15% in good years',
          'Seasonality: 8 strong months, 2 slow',
        ],
      },
      {
        id: 'risks',
        heading: 'The risks nobody markets',
        paragraphs: [
          'Guest house investing is operationally intensive. Poor management, weak reviews or a bad location can halve the numbers above. Energy costs and generator fuel squeeze winter margins, and new supply is rising in popular corridors.',
          'Our advice: buy operating businesses with verifiable history wherever possible, or budget for professional management from day one. We share real occupancy and revenue data with serious buyers — ask us for the file on any asset we list.',
        ],
      },
      {
        id: 'getting-started',
        heading: 'Getting started',
        paragraphs: [
          'If you are serious about tourism real estate, start with our rental yield calculator to model a target asset, then request the due-diligence file on our listed guest houses. We would rather talk you out of a bad deal than close a regrettable one.',
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

export const relatedPosts = (post: BlogPost, limit = 3) =>
  blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const sa = (a.category === post.category ? 0 : 1) + Math.abs(new Date(b.date).getTime() - new Date(post.date).getTime()) / 1e12;
      const sb = (b.category === post.category ? 0 : 1) + Math.abs(new Date(a.date).getTime() - new Date(post.date).getTime()) / 1e12;
      return sa - sb;
    })
    .slice(0, limit);
