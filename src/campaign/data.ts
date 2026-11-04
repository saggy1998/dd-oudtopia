// Copy and notes match oudtopia.co.uk product pages (checked 2 Nov 2026).
export const SITE = 'https://www.oudtopia.co.uk'
export const TIKTOK = 'https://www.tiktok.com/@oudtopia'
export const INSTAGRAM = 'https://www.instagram.com/oudtopia1/'
export const SHOP = `${SITE}/collections/perfumes`
export const PHONES = [
  { label: '07482 228428', href: 'tel:+447482228428' },
  { label: '+44 7400 666885', href: 'tel:+447400666885' },
]

// pos: where a cropped photo keeps its focus

// Purple Drip is his (Hashim), Crème Vanilla is hers (Lila). Array order = photo order: left/top first.
// portrait: the model photo on the page. shots: [main bottle photo, still life] for the pop-up.
export const PERFUMES = [
  {
    id: 'purple', who: 'His', model: 'Hashim',
    name: 'Purple Drip', spec: 'Extrait de Parfum · 50ml', liquid: '#b5179e',
    url: `${SITE}/products/purple-drip-perfume`,
    portrait: { src: '/campaign/couple-studio.webp', w: 1080, h: 1350, pos: '50% 40%', alt: 'Lila and Hashim in silver and ivory wedding wear, with Purple Drip in front of Lila' },
    line: 'Playful, fresh and unforgettable.',
    about: 'A vibrant floral fruity fragrance bursting with sweetness, elegance and confidence.',
    story: 'He opens bright: juicy strawberry, rich blackcurrant, crisp red apple and citrus. Then the bouquet softens into sweet pea, freesia, jasmine and velvety rose, leaving a sweet trail that turns heads.',
    notes: [
      ['Top', 'Strawberry, blackcurrant, red apple, citrus'],
      ['Heart', 'Sweet pea, freesia, jasmine, rose'],
      ['Base', 'Raspberry, musk, sandalwood, amber'],
    ],
    shots: [
      { src: '/campaign/purple-spray.webp', w: 1024, h: 1536, alt: 'Purple Drip bottle misting a spray of scent, on dark glass with rose petals' },
      { src: '/campaign/purple-berries.webp', w: 1086, h: 1448, alt: 'Purple Drip bottle with strawberries, blackcurrants, apple and orange on blush satin' },
    ],
  },
  {
    id: 'vanilla', who: 'Hers', model: 'Lila',
    name: 'Crème Vanilla Elixir', spec: 'Elixir · 50ml', liquid: '#e2b13c',
    url: `${SITE}/products/vanilla-elixir`,
    portrait: { src: '/campaign/couple-vanilla.webp', w: 1024, h: 1536, pos: '50% 30%', alt: 'Lila and Hashim in silver and ivory wedding wear, holding a bottle of Crème Vanilla Elixir together' },
    line: 'Warm. Creamy. Indulgent.',
    about: 'A rich crème vanilla fragrance built around warmth, softness and pure indulgence.',
    story: 'She settles warm: a light, fresh sweetness first, then a velvety vanilla of whipped cream, soft custard and caramel, grounded by sandalwood, amber and soft musk that linger on the skin.',
    notes: [
      ['Opening', 'A light, slightly fresh sweetness'],
      ['Heart', 'Whipped cream, soft custard, caramel'],
      ['Base', 'Sandalwood, amber, soft musk'],
    ],
    shots: [
      { src: '/campaign/vanilla-silk.webp', w: 1024, h: 1536, alt: 'Crème Vanilla Elixir bottle resting in folds of ivory silk' },
      { src: '/campaign/vanilla-oud.webp', w: 1024, h: 1536, alt: 'Crème Vanilla Elixir bottle on cream satin with vanilla pods and oud wood' },
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
