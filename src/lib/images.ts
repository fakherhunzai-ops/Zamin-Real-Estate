/**
 * Curated image catalog (Unsplash CDN, hot-linked).
 * Landscape hero/valley imagery evokes Gilgit-Baltistan scenery.
 */
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  // Hero / scenery
  heroValley: u('photo-1506905925346-21bda4d32df4', 1920),
  valleyRiver: u('photo-1482938289607-e9573fc25ebb', 1920),
  mistyPeaks: u('photo-1454496522488-7a8e488e8606', 1920),
  peaksSunrise: u('photo-1464822759023-fed622ff2c3b', 1920),
  alpineLake: u('photo-1501785888041-af3ef285b470', 1920),
  mountainTrail: u('photo-1483728642387-6c3bdd6c93e5', 1600),
  forestLight: u('photo-1447752875215-b2761acb3c5d', 1600),
  starryPeaks: u('photo-1519681393784-d120267933ba', 1920),
  fieldsSunset: u('photo-1500530855697-b586d89ba3ee', 1600),
  sunlitHills: u('photo-1469474968028-56623f02e42e', 1600),
  greenHills: u('photo-1470071459604-3b5ec3a7fe05', 1600),

  // Homes — exteriors
  houseModernWhite: u('photo-1600585154340-be6161a56a0c'),
  houseVillaPool: u('photo-1600596542815-ffad4c1539a9'),
  houseLuxuryDusk: u('photo-1512917774080-9991f1c4c750'),
  houseFrontYard: u('photo-1568605114967-8130f3a36994'),
  houseSuburban: u('photo-1570129477492-45c003edd2be'),
  houseContemporary: u('photo-1580587771525-78b9dba3b914'),
  houseGardenLawn: u('photo-1583608205776-bfd35f0d9f83'),
  villaNight: u('photo-1613490493576-7fde63acd811'),
  villaPoolside: u('photo-1613977257363-707ba9348227'),
  houseEvening: u('photo-1564013799919-ab600027ffc6'),
  houseBrick: u('photo-1523217582562-09d0def993a6'),
  houseClassic: u('photo-1416331108676-a22ccb276e35'),
  houseCountry: u('photo-1494526585095-c41746248156'),
  housePorch: u('photo-1480074568708-e7b720bb3f09'),

  // Interiors
  interiorLiving: u('photo-1600607687939-ce8a6c25118c'),
  interiorBright: u('photo-1493809842364-78817add7ffb'),
  interiorKitchen: u('photo-1484154218962-a197022b5858'),
  interiorKitchenWood: u('photo-1556912167-f556f1f39fdf'),
  interiorLounge: u('photo-1554995207-c18c203602cb'),
  interiorBedroom: u('photo-1512918728675-ed5a9ecdebfd'),
  interiorBedroomCozy: u('photo-1540518614846-7eded433c457'),
  interiorBath: u('photo-1584622650111-993a426fbf0a'),

  // Apartments
  apartmentBright: u('photo-1560448204-e02f11c3d0e2'),
  apartmentCozy: u('photo-1522708323590-d24dbb6b0267'),
  apartmentCompact: u('photo-1502672260266-1c1ef2d93688'),

  // Land / plots
  landMeadow: u('photo-1500382017468-9049fed747ef'),
  landField: u('photo-1464226184884-fa280b87c399'),
  landSunbeams: u('photo-1472214103451-9374bd1c798e'),

  // Commercial
  shopFront: u('photo-1441986300917-64674bd600d8'),
  officeSpace: u('photo-1497366216548-37526070297c'),
  officeInterior: u('photo-1497366811353-6870744d04b2'),
  officeTower: u('photo-1486406146926-c627a92ad1ab'),

  // Guest houses / hotels
  hotelResortPool: u('photo-1566073771259-6a8506099945'),
  hotelResortGarden: u('photo-1520250497591-112f2f40a3f4'),
  hotelLobby: u('photo-1445019980597-93fa8acb246c'),
  hotelSuite: u('photo-1582719508461-905c673771fd'),
  hotelRoom: u('photo-1571896349842-33c89424de2d'),
  hotelExterior: u('photo-1564501049412-61c2a3083791'),

  // People / team
  teamFounder: u('photo-1560250097-0b93528c311a', 800),
  teamSales: u('photo-1507003211169-0a1dd7228f2d', 800),
  teamRentals: u('photo-1573496359142-b8d87734a5a2', 800),
  teamLegal: u('photo-1519085360753-af0119f7cbe7', 800),

  // Business / blog
  contractSigning: u('photo-1450101499163-c8848c66ca85'),
  deskPlanning: u('photo-1454165804606-c3d57bc86b40'),
  calculatorFinance: u('photo-1554224155-6726b3ff858f'),
  houseKeys: u('photo-1560518883-ce09059eeffa'),
  writingNotes: u('photo-1434030216411-0b793f4b4173'),
} as const;
