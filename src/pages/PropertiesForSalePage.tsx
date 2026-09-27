import { IMG } from '../lib/images';
import PageHero from '../components/ui/PageHero';
import PropertyListings from '../components/properties/PropertyListings';
import AlertBand from '../components/ui/AlertBand';
import CtaBand from '../components/ui/CtaBand';
import { usePageMeta } from '../hooks/usePageMeta';

export default function PropertiesForSalePage() {
  usePageMeta(
    'Properties for Sale in Gilgit-Baltistan | Zamin Real Estate',
    'Browse verified houses, apartments, plots, guest houses and farms for sale across Hunza, Skardu, Gilgit, Chilas, Nagar and Ghizer.'
  );

  return (
    <>
      <PageHero
        eyebrow="Properties for Sale"
        title="Find Your Place in Gilgit-Baltistan"
        subtitle="Houses, apartments, plots, commercial plazas and tourism assets — every listing physically inspected and document-checked by our team."
        image={IMG.houseVillaPool}
      />
      <PropertyListings purpose="sale" />
      <AlertBand idPrefix="sale-alert" />
      <CtaBand
        title="Can’t find the right property?"
        subtitle="Tell us your budget and requirements — we’ll source verified options for you, including off-market opportunities."
        primaryLabel="Request a Property"
        primaryTo="/contact"
      />
    </>
  );
}
