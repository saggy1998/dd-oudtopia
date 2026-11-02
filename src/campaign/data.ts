// Copy matches oudtopia.co.uk product pages (checked 2 Nov 2026).
export const SITE = 'https://www.oudtopia.co.uk'
export const TIKTOK = 'https://www.tiktok.com/@oudtopia'
export const PHONES = [
  { label: '07482 228428', href: 'tel:+447482228428' },
  { label: '+44 7400 666885', href: 'tel:+447400666885' },
]

export const PERFUMES = [
  { name: 'Purple Drip', spec: 'Extrait de Parfum', liquid: '#b5179e', url: `${SITE}/products/purple-drip-perfume` },
  { name: 'Crème Vanille Elixir', spec: 'Elixir', liquid: '#e2b13c', url: `${SITE}/products/vanilla-elixir` },
]

const GOLD = '#c9a24e'

export const SHOTS = [
  {
    src: '/campaign/couple-studio.webp', w: 1080, h: 1350, tint: GOLD,
    title: 'The pairing', note: 'Lila & Hashim with Purple Drip and Crème Vanille Elixir',
    alt: 'Lila and Hashim in silver and ivory wedding wear, standing behind bottles of Purple Drip and Vanilla Elixir on gold satin',
  },
  {
    src: '/campaign/purple-berries.webp', w: 1086, h: 1448, tint: PERFUMES[0].liquid,
    title: 'Purple Drip', note: 'Strawberry, blackcurrant, red apple and citrus',
    alt: 'Purple Drip bottle with strawberries, blackcurrants, apple and orange on blush satin',
  },
  {
    src: '/campaign/vanilla-oud.webp', w: 1024, h: 1536, tint: PERFUMES[1].liquid,
    title: 'Crème Vanille Elixir', note: 'Vanilla, soft custard and caramel over sandalwood',
    alt: 'Vanilla Elixir bottle on cream satin with vanilla pods and oud wood',
  },
  {
    src: '/campaign/couple-garden.webp', w: 1080, h: 1350, tint: GOLD,
    title: 'Golden hour', note: 'Hashim and Lila in the garden, both drops in hand',
    alt: 'Hashim and Lila in ivory and silver wedding wear in a garden at golden hour, with both perfumes',
  },
  {
    src: '/campaign/purple-marble.webp', w: 1024, h: 1536, tint: PERFUMES[0].liquid,
    title: 'Purple Drip', note: 'Playful, fresh and unforgettable',
    alt: 'Purple Drip bottle on a marble plinth with red apples and strawberries on pink satin',
  },
  {
    src: '/campaign/vanilla-silk.webp', w: 1024, h: 1536, tint: PERFUMES[1].liquid,
    title: 'Crème Vanille Elixir', note: 'Warm. Creamy. Indulgent.',
    alt: 'Vanilla Elixir bottle resting in folds of ivory silk',
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
