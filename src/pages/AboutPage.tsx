import { Link } from 'react-router-dom';
import { Award, Compass, HeartHandshake, MapPin, Mountain, Target, Users } from 'lucide-react';
import { IMG } from '../lib/images';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import CtaBand from '../components/ui/CtaBand';
import { team } from '../mocks/team';
import { AREAS_SERVED } from '../lib/constants';
import { usePageMeta } from '../hooks/usePageMeta';
import { onImgError } from '../lib/imgFallback';

const BADGES = [
  { icon: Award, label: '15+ Years', sub: 'Trading in GB property' },
  { icon: Users, label: '900+ Deals', sub: 'Closed & transferred' },
  { icon: HeartHandshake, label: 'Zero Hidden Fees', sub: 'Commission in writing' },
  { icon: Mountain, label: '6 Valleys', sub: 'Consultants on the ground' },
];

export default function AboutPage() {
  usePageMeta(
    'About Us | Zamin Real Estate & Consultants',
    'The story, mission and team behind Gilgit-Baltistan’s most trusted property agency — serving Hunza, Skardu, Gilgit, Chilas, Nagar and Ghizer.'
  );

  return (
    <>
      <PageHero
        eyebrow="About Zamin"
        title="Built in the Valleys, for the Valleys"
        subtitle="We are a Gilgit-Baltistan agency, run by people who grew up here — and we treat every deal as a promise to our own community."
        image={IMG.peaksSunrise}
      />

      {/* Story */}
      <section className="wrap grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <SectionHeading align="left" eyebrow="Our Story" title="From One Desk in Danyore to Six Valleys" />
          <div className="space-y-4 leading-relaxed text-foreground-600">
            <p>
              Zamin began fifteen years ago with a single desk in Sultanabad, Danyore, and a conviction that property deals in
              Gilgit-Baltistan could be honest. At the time, buyers relied on word of mouth and handshake terms; documents were
              checked afterwards — if at all.
            </p>
            <p>
              We did things in the opposite order. Verify the documents first. Price from real closed deals, not rumours. Put the
              commission in writing before any work begins. It was slower, and for a while it cost us deals. Then it made us the
              agency people trusted with their life savings.
            </p>
            <p>
              Today our consultants work across Hunza, Skardu, Gilgit, Chilas, Nagar and Ghizer, serving families, farmers,
              investors and a growing diaspora — but the founding rule is unchanged: <strong className="text-primary-900">never
              take a commission that wasn’t honestly earned.</strong>
            </p>
          </div>
        </div>
        <div className="relative">
          <img src={IMG.forestLight} alt="Morning light over a Gilgit-Baltistan valley" onError={onImgError} className="rounded-3xl object-cover shadow-2xl" loading="lazy" />
          <div className="absolute -bottom-6 -left-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-background-200 shadow-xl md:-left-8">
            {BADGES.map((b) => (
              <div key={b.label} className="flex items-center gap-3 bg-white px-5 py-4">
                <b.icon className="h-6 w-6 shrink-0 text-accent-600" />
                <div>
                  <p className="text-sm font-extrabold text-primary-950">{b.label}</p>
                  <p className="text-[11px] text-foreground-400">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-primary-950 py-16 md:py-20">
        <div className="wrap grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/15 text-accent-400">
              <Target className="h-6 w-6" />
            </span>
            <h2 className="font-heading mt-5 text-2xl font-bold text-white">Our Mission</h2>
            <p className="mt-3 leading-relaxed text-white/70">
              To make property in Gilgit-Baltistan safe, documented and fair for everyone — the farmer selling ancestral land, the
              family buying a first home, and the diaspora investor thousands of miles away.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/15 text-accent-400">
              <Compass className="h-6 w-6" />
            </span>
            <h2 className="font-heading mt-5 text-2xl font-bold text-white">Our Vision</h2>
            <p className="mt-3 leading-relaxed text-white/70">
              A region where every transaction is verified, every price is anchored in real data, and tourism investment lifts
              local communities — with Zamin as the standard that clients measure every agency against.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="wrap py-16 md:py-24">
        <SectionHeading eyebrow="The People" title="Meet the Team Behind Zamin" subtitle="Specialists in sales, rentals, documentation and valuation — all rooted in Gilgit-Baltistan." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div key={m.id} className="card card-hover group">
              <div className="overflow-hidden">
                <img src={m.image} alt={m.name} loading="lazy" onError={onImgError} className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-bold text-primary-950">{m.name}</h3>
                <p className="text-xs font-extrabold uppercase tracking-wider text-accent-600">{m.role}</p>
                <p className="mt-2.5 text-sm leading-relaxed text-foreground-500">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community + areas served */}
      <section className="bg-background-100 py-16 md:py-20">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Community First"
              title="Where We Serve, We Give Back"
              subtitle="Part of our commission fund supports local initiatives in the valleys we work in."
            />
            <ul className="space-y-3">
              {[
                'Free valuation camps for inheritance partition cases',
                'Document-verification support for low-income sellers',
                'Sponsorship of local sports and cultural festivals',
                'Honest guidance — even when it means no deal for us',
              ].map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm font-semibold text-foreground-700">
                  <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" /> {c}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn-primary mt-8">Talk to Our Team</Link>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-lg md:p-10">
            <h3 className="font-heading flex items-center gap-2 text-2xl font-bold text-primary-950">
              <MapPin className="h-6 w-6 text-accent-600" /> Areas We Serve
            </h3>
            <p className="mt-2 text-sm text-foreground-500">
              Dedicated consultants in every district of Gilgit-Baltistan — visit us, or we’ll come to you.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {AREAS_SERVED.map((a) => (
                <Link key={a} to="/properties-for-sale" className="flex items-center justify-center rounded-xl bg-primary-50 px-4 py-4 font-bold text-primary-800 transition hover:bg-primary-100">
                  {a}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Work With People Who Know Every Valley" primaryLabel="Browse Properties" primaryTo="/properties-for-sale" />
    </>
  );
}
