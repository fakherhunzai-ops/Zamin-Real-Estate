import { IMG } from '../lib/images';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export const team: TeamMember[] = [
  {
    id: 'baqir',
    name: 'Muhammad Baqir',
    role: 'Founder & Principal Consultant',
    image: IMG.teamFounder,
    bio: 'Born in Danyore and trading property across Gilgit-Baltistan for over 15 years, Baqir built Zamin on one rule: never take a commission that wasn’t honestly earned.',
  },
  {
    id: 'karim',
    name: 'Ali Karim',
    role: 'Head of Sales',
    image: IMG.teamSales,
    bio: 'Ali has closed more than 400 sales across every valley in the region. He leads pricing strategy and negotiates on behalf of both buyers and sellers with total transparency.',
  },
  {
    id: 'fatima',
    name: 'Fatima Bibi',
    role: 'Rentals & Client Relations',
    image: IMG.teamRentals,
    bio: 'Fatima runs our lettings desk — screening tenants, drafting agreements and keeping landlords informed. She is the first voice you hear when you call Zamin.',
  },
  {
    id: 'shah',
    name: 'Karim Shah',
    role: 'Legal & Documentation Officer',
    image: IMG.teamLegal,
    bio: 'A documentation specialist with deep experience in GB land records, Karim verifies every title, fard and NOC before a property is ever listed.',
  },
];
