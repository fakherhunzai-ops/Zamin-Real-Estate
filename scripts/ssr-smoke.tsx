import './ssr-shims';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from '../src/App';

const ROUTES = [
  '/',
  '/properties-for-sale',
  '/properties-for-rent',
  '/property/hunza-view-villa',
  '/property/danyore-kanal-plot',
  '/property/gilgit-furnished-flat',
  '/property/does-not-exist',
  '/sell-your-property',
  '/services',
  '/about',
  '/faq',
  '/contact',
  '/valuation',
  '/blog',
  '/blog/gilgit-baltistan-market-outlook-2026',
  '/blog/how-to-buy-land-in-hunza',
  '/blog/unknown-slug',
  '/tools',
  '/tools/mortgage-calculator',
  '/tools/rental-yield-calculator',
  '/tools/stamp-duty-calculator',
  '/shortlist',
  '/no-such-page',
];

let failed = 0;
for (const r of ROUTES) {
  try {
    const html = renderToString(
      <StaticRouter location={r}>
        <App />
      </StaticRouter>
    );
    if (!html || html.length < 300) throw new Error(`rendered only ${html.length} chars`);
    console.log(`OK   ${r} (${html.length} chars)`);
  } catch (err) {
    failed++;
    console.error(`FAIL ${r}: ${(err as Error).message}`);
  }
}
console.log(failed === 0 ? '\nALL ROUTES RENDER OK' : `\n${failed} ROUTES FAILED`);
process.exit(failed === 0 ? 0 : 1);
