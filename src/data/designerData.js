export const DESIGNER_INFO = {
  brandName: "ARPITA MEHTA",
  subBrand: "HAUTE BRIDAL COUTURE",
  curator: "Dulhan Diaries Exclusive Designer Pack",
  edition: "Autumn / Winter Haute Bridal Edition",
  heroSubtitle: "Where centuries-old zardozi meets contemporary red-carpet silhouettes",
  bioBaseline:
    "Crafting timeless bridal elegance, Arpita Mehta blends heritage craftsmanship with contemporary silhouettes. From intricate hand-embroidered zardozi to modern fluid drapes, each piece is tailored for the bride who seeks unforgettable luxury.",
  philosophy:
    "Every bridal ensemble is treated as an architectural canvas — balancing the weight of pure silk and handwoven tissue with the luminescence of micro-cut mirrors and gold kasab wire.",
  stats: [
    { label: "Artisanal Handwork", value: "480+ Hours" },
    { label: "Embroidery Guild", value: "Lucknow & Kashmir" },
    { label: "Silhouette Origin", value: "Mughal & Modern Fusion" }
  ]
};

export const HOTSPOTS_DATA = [
  {
    id: "zardozi",
    title: "Hand-Crafted Zardozi & Kasab Wire",
    category: "METALLIC EMBROIDERY",
    x: 48, // % from left
    y: 44, // % from top
    previewImg: "/assets/curated/detail_embroidery_zoom.jpg",
    shortDesc: "Intricate metallic threadwork using real silver and gilded copper coils.",
    technique: "Dabka & Nakshi Couching",
    hours: "220 hrs",
    description:
      "Crafted with microscopic precision, the gold kasab threads are coiled by master karigars using ancient Persian couching methods, creating tactile relief work that catches the light dynamically from every angle."
  },
  {
    id: "mirrorwork",
    title: "Real Convex Shisha Mirror Facets",
    category: "LIGHT-CATCHING EMBELLISHMENT",
    x: 54, // % from left
    y: 64, // % from top
    previewImg: "/assets/curated/bg_hero_desert_crimson.jpg",
    shortDesc: "Signature mirrorwork framing the bridal bodice and flares.",
    technique: "Hand-Cut Glass Framed in Resham",
    hours: "140 hrs",
    description:
      "Hand-blown, hand-cut convex glass mirrors are anchored with micro-silk chain stitches, creating a radiant celestial gleam designed to illuminate the bride under ceremonial candlelight and stage lighting."
  },
  {
    id: "trousseau",
    title: "Raw Silk Dupatta & Scalloped Zari",
    category: "WEAVE & DRAPE",
    x: 68, // % from left
    y: 32, // % from top
    previewImg: "/assets/curated/detail_veil_jewels.jpg",
    shortDesc: "Feather-light organza veil with hand-cut scalloped borders.",
    technique: "Tilla Jaal & Pearl Moti Finishing",
    hours: "120 hrs",
    description:
      "The translucent veil is woven from whisper-weight silk organza, bordered with scalloped gold bullion wire and genuine freshwater pearl accents to frame the bride's ceremonial entrance."
  }
];

export const COLLECTION_SPECS = {
  name: "The Crimson Noor Lehenga Ensemble",
  referenceCode: "DD-AM-2026-CRIMSON",
  ensembleIncludes: [
    "Hand-embroidered raw silk choli with plunging sweetheart neckline",
    "Flared multi-kalidar lehenga skirt with 5.5-meter royal sweep",
    "Dual dupattas: gossamer head veil + structured velvet shoulder drape"
  ],
  fabricComposition: "100% Pure Mulberry Matka Silk & Silk Organza",
  artisanHours: "480 Hours of Pure Hand Embroidery",
  colorPalette: ["Royal Crimson", "Gilded Ochre", "Burnished Gold", "Desert Sand"],
  pricing: {
    displayPrice: "£5,450 / $6,950 USD",
    startingFrom: "Custom Bridal Orders from £4,200",
    leadTime: "12 to 16 Weeks Bespoke Atelier Tailoring",
    shipping: "Complimentary Global White-Glove Courier & Insurance"
  }
};

export const MEDIA_PAIRS = {
  pair1: {
    id: "pair1",
    bgImage: "/assets/curated/bg_hero_desert_crimson.jpg",
    bgAlt: "Arpita Mehta Bridal Couture Crimson Desert Lookbook",
    heroVideo: "/assets/videos/nikkah_cover_hero.mp4",
    title: "HERITAGE COUTURE"
  },
  pair2: {
    id: "pair2",
    bgImage: "/assets/curated/bg_zardozi_couture_black.jpg",
    bgAlt: "Royal Crimson & Gold Zardozi Haute Bridal Couture",
    title: "CRAFTSMANSHIP & DETAILS"
  },
  pair3: {
    id: "pair3",
    bgImage: "/assets/curated/bg_palace_couture.jpg",
    bgAlt: "Palatial Couple Couture & E-Commerce Atelier",
    title: "ATELIER & ACQUISITION"
  }
};
