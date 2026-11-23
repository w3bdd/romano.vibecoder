// ---------------------------------------------------------------
// BUSINESS CONFIG — every piece of business information lives here.
// Change anything (email, phone, prices, social links) in this ONE
// file and it updates across the entire website.
// ---------------------------------------------------------------
export const BUSINESS = {
  name: "RomanoGalvan.com",
  tagline: "Premium Web Experiences. Powerful Digital Solutions.",
  subTagline: "Design. Develop. Elevate.",
  // Public-facing contact email (shown on the site). Note: the inquiry
  // form delivers to your Gmail via Web3Forms — that's configured
  // separately by the access key, not by this address.
  email: "info@romanogalvan.com",
  phoneDisplay: "+63 991 684 8388",
  whatsapp:
    "https://wa.me/639916848388?text=Hi%20Romano%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  address: "Bamban, Tarlac — Philippines 2317",
  country: "Philippines",
  siteUrl: "https://romanogalvan.com",
  socials: [
    { name: "Facebook", url: "https://www.facebook.com/romano.vibecoder" },
    { name: "GitHub", url: "https://github.com/w3bdd" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/vibecoder4117" },
  ],
  // USD figures on the pricing page are approximate conversions only,
  // shown for international visitors. Update the rate occasionally.
  phpPerUsd: 58,
};

export const PACKAGES = [
  {
    name: "Starter Website",
    php: 7500,
    note: null,
    features: [
      "Single-page website",
      "Responsive design",
      "Contact form",
      "Social media links",
      "Basic SEO setup",
    ],
    ideal: "Ideal for startups and small businesses.",
  },
  {
    name: "Professional Website",
    php: 15000,
    note: null,
    features: [
      "Up to five pages",
      "Custom website design",
      "Responsive development",
      "Contact and inquiry forms",
      "Google Maps integration",
      "Basic SEO setup",
    ],
    ideal: "Ideal for growing businesses.",
  },
  {
    name: "Premium Website",
    php: 25000,
    note: null,
    features: [
      "Up to eight pages",
      "Advanced visual design",
      "Product or service catalog",
      "Lead capture functionality",
      "Analytics integration",
      "SEO foundations",
    ],
    ideal: "Ideal for established businesses.",
  },
  {
    name: "3D Interactive Experience",
    php: 35000,
    note: "Typical project range: PHP 35,000–60,000.",
    features: [
      "Premium interactive design",
      "Selected 3D elements",
      "Motion and scroll animations",
      "Responsive layouts",
      "Performance optimization",
    ],
    ideal: "Ideal for brands seeking distinctive digital experiences.",
  },
];

// Sample projects — real live sites, clearly labeled as self-initiated
// demonstration work (no invented clients, results, or testimonials).
export const PROJECTS = [
  {
    name: "CleverHouse Philippines",
    category: "Business Website — Smart Home & Solar",
    desc: "Company website for a smart home, CCTV, solar, and electrical engineering provider serving Aurora and Central Luzon.",
    tech: ["React", "Responsive Design", "GitHub Pages"],
    url: "https://w3bdd.github.io/cleverhouse.ph/",
    monogram: "C",
  },
  {
    name: "RenovaLife Dialysis Center",
    category: "Business Website — Healthcare",
    desc: "Website for a PhilHealth-accredited dialysis center focused on dignity, comfort, and human-centered healing.",
    tech: ["React", "Responsive Design", "GitHub Pages"],
    url: "https://w3bdd.github.io/renovalife.ph/",
    monogram: "R",
  },
  {
    name: "Aureon Architecture & Builders",
    category: "Business Website — Architecture & Construction",
    desc: "Website for a family-owned architectural and construction firm serving Central Luzon and beyond since 2016.",
    tech: ["React", "Responsive Design", "GitHub Pages"],
    url: "https://w3bdd.github.io/aureon.ar/",
    monogram: "A",
  },
  {
    name: "CoreGridX Technologies",
    category: "Business Website — IT Infrastructure",
    desc: "Corporate website for a firm designing, deploying, securing, and managing server, network, and data center environments.",
    tech: ["React", "Responsive Design", "GitHub Pages"],
    url: "https://w3bdd.github.io/coregridx.it/",
    monogram: "X",
  },
];
