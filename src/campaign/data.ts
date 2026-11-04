// Copy and notes match oudtopia.co.uk product pages (checked 2 Nov 2026).
export const SITE = 'https://www.oudtopia.co.uk'
export const TIKTOK = 'https://www.tiktok.com/@oudtopia'
export const PHONES = [
  { label: '07482 228428', href: 'tel:+447482228428' },
  { label: '+44 7400 666885', href: 'tel:+447400666885' },
]

export interface Shot { src: string; w: number; h: number; alt: string; dark?: boolean; pos?: string } // dark: white type over it; pos: crop focus

export const COUPLE_STUDIO: Shot = {
  src: '/campaign/couple-studio.webp', w: 1080, h: 1350,
  alt: 'Lila and Hashim in silver and ivory wedding wear, standing behind bottles of Purple Drip and Crème Vanille Elixir on gold satin',
}
export const COUPLE_GARDEN: Shot = {
  src: '/campaign/couple-garden.webp', w: 1080, h: 1350,
  alt: 'Hashim and Lila in ivory and silver wedding wear in a garden at golden hour, with both perfumes',
}

// Hers / His follows the studio shot: Purple Drip in front of Lila, Vanilla in front of Hashim.
export const PERFUMES = [
  {
    id: 'hers', who: 'Hers', model: 'Lila',
    name: 'Purple Drip', spec: 'Extrait de Parfum · 50ml', liquid: '#b5179e',
    url: `${SITE}/products/purple-drip-perfume`,
    line: 'Playful, fresh and unforgettable.',
    about: 'A vibrant floral fruity fragrance bursting with sweetness, elegance and confidence.',
    story: 'She opens bright: juicy strawberry, rich blackcurrant, crisp red apple and citrus. Then the bouquet softens into sweet pea, freesia, jasmine and velvety rose, leaving a sweet trail that turns heads.',
    notes: [
      ['Top', 'Strawberry, blackcurrant, red apple, citrus'],
      ['Heart', 'Sweet pea, freesia, jasmine, rose'],
      ['Base', 'Raspberry, musk, sandalwood, amber'],
    ],
    shots: [
      { src: '/campaign/purple-spray.webp', w: 1024, h: 1536, alt: 'Purple Drip bottle misting a spray of scent, on dark glass with rose petals', dark: true, pos: '50% 28%' },
      { src: '/campaign/purple-berries.webp', w: 1086, h: 1448, alt: 'Purple Drip bottle with strawberries, blackcurrants, apple and orange on blush satin' },
    ],
  },
  {
    id: 'his', who: 'His', model: 'Hashim',
    name: 'Crème Vanille Elixir', spec: 'Elixir · 50ml', liquid: '#e2b13c',
    url: `${SITE}/products/vanilla-elixir`,
    line: 'Warm. Creamy. Indulgent.',
    about: 'A rich crème vanilla fragrance built around warmth, softness and pure indulgence.',
    story: 'He settles warm: a light, fresh sweetness first, then a velvety vanilla of whipped cream, soft custard and caramel, grounded by sandalwood, amber and soft musk that linger on the skin.',
    notes: [
      ['Opening', 'A light, slightly fresh sweetness'],
      ['Heart', 'Whipped cream, soft custard, caramel'],
      ['Base', 'Sandalwood, amber, soft musk'],
    ],
    shots: [
      { src: '/campaign/couple-vanilla.webp', w: 1024, h: 1536, alt: 'Lila and Hashim in silver and ivory wedding wear, holding a bottle of Crème Vanille Elixir together', dark: true, pos: '58% 50%' },
      { src: '/campaign/vanilla-silk.webp', w: 1024, h: 1536, alt: 'Crème Vanille Elixir bottle resting in folds of ivory silk' },
      { src: '/campaign/vanilla-oud.webp', w: 1024, h: 1536, alt: 'Crème Vanille Elixir bottle on cream satin with vanilla pods and oud wood' },
    ],
  },
]

export const CREDITS = [
  { role: 'Photography', name: 'Marta' },
  { role: 'Models', name: 'Lila & Hashim' },
  { role: 'Outfits', name: '@Golu (him) · @Alankar (her)' },
  { role: 'Jewellery', name: 'Alankar' },
  { role: 'Makeup', name: '@Foqia inayat' },
  { role: 'Perfumes', name: 'OudTopia' },
]

// Tap points on COUPLE_STUDIO, as % of the uncropped frame. Bottles read from PERFUMES so a His/Hers swap follows.
export const HOTSPOTS = [
  { x: 34, y: 18, role: 'Makeup', name: '@Foqia inayat' },
  { x: 27.5, y: 32, role: 'Jewellery', name: 'Alankar' },
  { x: 36, y: 47, role: 'Her outfit', name: '@Alankar' },
  { x: 75, y: 43, role: 'His outfit', name: '@Golu' },
  { x: 41, y: 69, role: PERFUMES[0].who, name: PERFUMES[0].name },
  { x: 63, y: 69, role: PERFUMES[1].who, name: PERFUMES[1].name },
]
