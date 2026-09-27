import { IMG } from '../lib/images';
import PageHero from '../components/ui/PageHero';
import PropertyListings from '../components/properties/PropertyListings';
import AlertBand from '../components/ui/AlertBand';
import CtaBand from '../components/ui/CtaBand';
import { usePageMeta } from '../hooks/usePageMeta';

export default function PropertiesForRentPage() {
  usePageMeta(
    'Properties for Rent in Gilgit-Baltistan | Zamin Real Estate',
    'Rent houses, apartments, shops and seasonal lodges across Gilgit, Hunza, Skardu and beyond — documented tenancies, transparent terms.'
  );

  return (
    <>
      <PageHero
        eyebrow="Properties for Rent"
        title="Rentals Across the Valleys"
        subtitle="Family homes, furnished apartments, commercial shops and seasonal tourism leases — with documented agreements and fair terms for tenants and landlords alike."
        image={IMG.apartmentBright}
      />
      <PropertyListings purpose="rent" />
      <AlertBand idPrefix="rent-alert" title="Get rental alerts" subtitle="New rental listings from across Gilgit-Baltistan, in your inbox as soon as they go live." />
      <CtaBand
        title="Have a property to rent out?"
        subtitle="We screen tenants, draft the agreement and manage the tenancy. Commission is one month’s rent — charged once, clearly."
        primaryLabel="List Your Rental"
        primaryTo="/sell-your-property"
      />
    </>
  );
}
