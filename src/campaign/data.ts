// Copy and notes match oudtopia.co.uk product pages (checked 4 Nov 2026).
export const SITE = 'https://www.oudtopia.co.uk'
export const TIKTOK = 'https://www.tiktok.com/@oudtopia'
export const INSTAGRAM = 'https://www.instagram.com/oudtopia1/'
// The Dulhan Diaries duo page isn't live yet. Paste its URL here and the "Shop the duo" button becomes a link.
export const DUO_SHOP = ''
export const PHONES = [
  { label: '07482 228428', href: 'tel:+447482228428' },
  { label: '+44 7400 666885', href: 'tel:+447400666885' },
]

// pos: where a cropped photo keeps its focus

// Purple Drip is his (Hashim), Arabian Tonka is hers (Lila). accords: the client's scent accords. Array order = photo order: left/top first.
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
    accords: ['Fruity', 'Sweet', 'Floral', 'White floral', 'Musky', 'Woody', 'Amber', 'Fresh', 'Powdery'],
    shots: [
      { src: '/campaign/purple-spray.webp', w: 1024, h: 1536, alt: 'Purple Drip bottle misting a spray of scent, on dark glass with rose petals' },
      { src: '/campaign/purple-berries.webp', w: 1086, h: 1448, alt: 'Purple Drip bottle with strawberries, blackcurrants, apple and orange on blush satin' },
    ],
  },
  {
    id: 'tonka', who: 'Hers', model: 'Lila',
    name: 'Arabian Tonka', spec: 'Extrait de Parfum · 50ml', liquid: '#e2b13c',
    url: `${SITE}/products/arabians-tonka-perfume`,
    portrait: { src: '/campaign/couple-vanilla.webp', w: 1024, h: 1536, pos: '50% 30%', alt: 'Lila and Hashim in silver and ivory wedding wear, holding a bottle of Arabian Tonka together' },
    line: 'Bold. Sensual. Captivating.',
    about: 'A rich, indulgent fragrance blending warm tonka bean and smooth vanilla with deep amber and subtle oud.',
    story: 'She leaves a trail of oriental sweetness and dark resins: warm and addictive, powerful yet refined, settling into the skin from day to night.',
    // The site gives no top/heart/base for this one; these come from its product description.
    notes: [
      ['Heart', 'Warm tonka bean, smooth vanilla'],
      ['Base', 'Deep amber, subtle oud, dark resins'],
    ],
    accords: ['Sweet', 'Vanilla', 'Amber', 'Warm spicy', 'Oud', 'Rose', 'Musky', 'Aromatic', 'Metallic', 'Powdery'],
    shots: [
      { src: '/campaign/vanilla-silk.webp', w: 1024, h: 1536, alt: 'Arabian Tonka bottle resting in folds of ivory silk' },
      { src: '/campaign/vanilla-oud.webp', w: 1024, h: 1536, alt: 'Arabian Tonka bottle on cream satin with vanilla pods and oud wood' },
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
