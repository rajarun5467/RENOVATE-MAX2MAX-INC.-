/**
 * Frontend Data — REAL content extracted from the actual frontend code.
 * This is NOT fake/demo data. Every record here comes from inspecting
 * the actual JSX/HTML that the website renders.
 *
 * Sources:
 * - Home.jsx (services section, selected work sections, about section)
 * - Services.jsx (services grid, specialty cards, areas)
 * - Residential.jsx (services grid, work items)
 * - About.jsx (founder, values, areas)
 * - Philosophy.jsx (principles, approach)
 *
 * This data is used by the admin panel to show what the website ACTUALLY contains,
 * merged with any backend-managed records (services/projects/testimonials).
 */

/* ============================================================
   REAL SERVICES (from Home.jsx + Services.jsx + Residential.jsx)
   ============================================================ */
export const FRONTEND_SERVICES = [
  {
    id: 'fe-svc-01',
    title: 'Tile & Flooring',
    summary: 'Professional installation for all tile formats and flooring applications.',
    description: 'We install porcelain, ceramic and stone tiles with clean grout lines, level surfaces and finishes that feel solid underfoot for years.',
    image: '/images/IMG_9389.jpg',
    icon: '01',
    order: 1,
    published: true,
    source: 'frontend',
    pages: ['Home', 'Services', 'Residential'],
  },
  {
    id: 'fe-svc-02',
    title: 'Bathroom Upgrades',
    summary: 'Complete bathroom improvements with quality finishes and detailed execution.',
    description: 'Complete bathroom transformations — new tile walls, floors, fixtures and waterproofing that turn an ordinary room into a calm, durable retreat.',
    image: '/images/IMG_0608.JPG.jpeg',
    icon: '02',
    order: 2,
    published: true,
    source: 'frontend',
    pages: ['Home', 'Services', 'Residential'],
  },
  {
    id: 'fe-svc-03',
    title: 'Custom Showers',
    summary: 'Custom shower installations with detailed tile work and waterproofing.',
    description: 'Built from the waterproofing layer up, with custom tile layouts, niche details and mitered edges that look as good as they perform.',
    image: '/images/IMG_9545.jpg',
    icon: '03',
    order: 3,
    published: true,
    source: 'frontend',
    pages: ['Home', 'Services', 'Residential'],
  },
  {
    id: 'fe-svc-04',
    title: 'Kitchen Backsplash',
    summary: 'Custom backsplash installation designed to complement your kitchen.',
    description: 'Backsplashes that frame the kitchen with texture and colour, installed with precision around outlets, corners and cabinets.',
    image: '/images/IMG_0308.jpg',
    icon: '04',
    order: 4,
    published: true,
    source: 'frontend',
    pages: ['Home', 'Services'],
  },
  {
    id: 'fe-svc-05',
    title: 'Waterproofing',
    summary: 'Reliable waterproofing solutions designed for long-lasting performance.',
    description: 'Solid waterproofing for showers, bathrooms and wet areas so the beauty on the surface is backed by protection underneath.',
    image: '/images/IMG_0581.JPG.jpeg',
    icon: '05',
    order: 5,
    published: true,
    source: 'frontend',
    pages: ['Home', 'Services', 'Residential'],
  },
  {
    id: 'fe-svc-06',
    title: 'Fireplace Tile',
    summary: 'Custom fireplace tile work and feature installations.',
    description: 'A tiled fireplace becomes the room\'s anchor. We handle layout, heat-safe materials and crisp edges for a refined focal point.',
    image: '/images/IMG_9446.jpg',
    icon: '06',
    order: 6,
    published: true,
    source: 'frontend',
    pages: ['Home', 'Services'],
  },
  {
    id: 'fe-svc-07',
    title: '45° Mitered Finishes',
    summary: 'Premium 45-degree tile cuts and mitered edges for a custom, high-end look.',
    description: 'Premium 45-degree tile cuts and mitered edges that create clean corners, seamless steps and a custom, high-end look.',
    image: '/images/IMG_9381.jpg',
    icon: '07',
    order: 7,
    published: true,
    source: 'frontend',
    pages: ['Home'],
  },
  {
    id: 'fe-svc-08',
    title: 'Home Repairs',
    summary: 'Practical repairs and improvements for residential spaces.',
    description: 'Thoughtful repairs and improvements that bring older rooms back to life without cutting corners on quality or finish.',
    image: '',
    icon: '08',
    order: 8,
    published: true,
    source: 'frontend',
    pages: ['Home', 'Services'],
  },
  {
    id: 'fe-svc-09',
    title: 'Appliance Installation',
    summary: 'Professional appliance installation and related home improvements.',
    description: 'Professional installation support for appliances during your renovation, ensuring everything fits, sits level and functions safely.',
    image: '',
    icon: '09',
    order: 9,
    published: true,
    source: 'frontend',
    pages: ['Home', 'Services'],
  },
];

/* ============================================================
   REAL PROJECTS / SELECTED WORK (from Home.jsx + Residential.jsx)
   ============================================================ */
export const FRONTEND_PROJECTS = [
  // Home → Selected Work — Residential
  {
    id: 'fe-proj-01',
    title: 'Modern Bathroom',
    category: 'Bathroom',
    description: 'A complete modern bathroom with marble-look floor, double vanity and a clean, glass shower.',
    image: '/images/IMG_0573.JPG.jpeg',
    featured: true,
    published: true,
    source: 'frontend',
    page: 'Home',
    section: 'Selected Work — Residential',
  },
  {
    id: 'fe-proj-02',
    title: 'Open Kitchen',
    category: 'Kitchen',
    description: 'A bright open kitchen and living area finished with large-format tile, warm cabinetry and clean sightlines.',
    image: '/images/IMG_0595.JPG.jpeg',
    featured: true,
    published: true,
    source: 'frontend',
    page: 'Home',
    section: 'Selected Work — Residential',
  },
  {
    id: 'fe-proj-03',
    title: 'Custom Shower',
    category: 'Shower',
    description: 'Frameless glass and a recessed tile niche, finished with mitered edges for a precise, high-end look.',
    image: '/images/IMG_9545.jpg',
    featured: true,
    published: true,
    source: 'frontend',
    page: 'Home',
    section: 'Selected Work — Residential',
  },
  // Home → Selected Work — Tiles
  {
    id: 'fe-proj-04',
    title: 'Patterned Hallway',
    category: 'Tile & Flooring',
    description: 'Hexagon tile flooring laid in a hallway, creating visual rhythm and long-term durability.',
    image: '/images/IMG_9389.jpg',
    featured: true,
    published: true,
    source: 'frontend',
    page: 'Home',
    section: 'Selected Work — Tiles',
  },
  {
    id: 'fe-proj-05',
    title: 'Large-Format Floor',
    category: 'Tile & Flooring',
    description: 'Large-format grey tile flooring with clean grout lines and a professional finish.',
    image: '/images/IMG_9415.jpg',
    featured: true,
    published: true,
    source: 'frontend',
    page: 'Home',
    section: 'Selected Work — Tiles',
  },
  {
    id: 'fe-proj-06',
    title: 'Geometric Floor',
    category: 'Tile & Flooring',
    description: 'Patterned hexagon tiles arranged with precision for visual rhythm in wet areas and entries.',
    image: '/images/IMG_9564.jpg',
    featured: true,
    published: true,
    source: 'frontend',
    page: 'Home',
    section: 'Selected Work — Tiles',
  },
  // Home → Selected Work — Bathrooms
  {
    id: 'fe-proj-07',
    title: 'Modern Bathroom (Full)',
    category: 'Bathroom',
    description: 'A full bathroom with floor-to-ceiling tile, modern fixtures and a clean, bright finish.',
    image: '/images/IMG_0608.JPG.jpeg',
    featured: true,
    published: true,
    source: 'frontend',
    page: 'Home',
    section: 'Selected Work — Bathrooms',
  },
  {
    id: 'fe-proj-08',
    title: 'Double Vanity',
    category: 'Bathroom',
    description: 'His and hers vanities, LED mirrors and soft storage in a bright, modern bathroom.',
    image: '/images/IMG_0573.JPG.jpeg',
    featured: false,
    published: true,
    source: 'frontend',
    page: 'Home',
    section: 'Selected Work — Bathrooms',
  },
  {
    id: 'fe-proj-09',
    title: 'Complete Bathroom',
    category: 'Bathroom',
    description: 'A full bathroom with freestanding tub, vanity and floor-to-ceiling tile for a refined finish.',
    image: '/images/IMG_8818.jpg',
    featured: false,
    published: true,
    source: 'frontend',
    page: 'Home',
    section: 'Selected Work — Bathrooms',
  },
  // Home → Selected Work — Showers
  {
    id: 'fe-proj-10',
    title: 'Glass Enclosure',
    category: 'Shower',
    description: 'Frameless glass and neutral tile create a spacious, spa-like shower.',
    image: '/images/IMG_0581.JPG.jpeg',
    featured: true,
    published: true,
    source: 'frontend',
    page: 'Home',
    section: 'Selected Work — Showers',
  },
  {
    id: 'fe-proj-11',
    title: 'Recessed Niche',
    category: 'Shower',
    description: 'A built-in niche finished with accent tile for toiletries and clean styling.',
    image: '/images/IMG_9545.jpg',
    featured: false,
    published: true,
    source: 'frontend',
    page: 'Home',
    section: 'Selected Work — Showers',
  },
  {
    id: 'fe-proj-12',
    title: 'Tub & Shower',
    category: 'Shower',
    description: 'A tub and shower surround finished in marble-look tile for a calm, refined wet area.',
    image: '/images/IMG_0604.jpg',
    featured: false,
    published: true,
    source: 'frontend',
    page: 'Home',
    section: 'Selected Work — Showers',
  },
  // Home → Selected Work — Kitchens
  {
    id: 'fe-proj-13',
    title: 'Subway Backsplash',
    category: 'Kitchen',
    description: 'A clean white subway tile backsplash that brightens the kitchen and complements the cabinets.',
    image: '/images/IMG_0308.jpg',
    featured: true,
    published: true,
    source: 'frontend',
    page: 'Home',
    section: 'Selected Work — Kitchens',
  },
  {
    id: 'fe-proj-14',
    title: 'Warm Kitchen',
    category: 'Kitchen',
    description: 'A spacious open kitchen finished with marble-look flooring and warm natural light.',
    image: '/images/IMG_0447.jpg',
    featured: false,
    published: true,
    source: 'frontend',
    page: 'Home',
    section: 'Selected Work — Kitchens',
  },
  {
    id: 'fe-proj-15',
    title: 'Marble Backsplash',
    category: 'Kitchen',
    description: 'Marble-look tile backsplash that brings quiet luxury behind the range.',
    image: '/images/IMG_0595.JPG.jpeg',
    featured: false,
    published: true,
    source: 'frontend',
    page: 'Home',
    section: 'Selected Work — Kitchens',
  },
  // Residential → Work Items
  {
    id: 'fe-proj-16',
    title: 'Kitchen (Residential)',
    category: 'Kitchen',
    description: 'Kitchen renovation project from residential portfolio.',
    image: '/images/IMG_0308.jpg',
    featured: false,
    published: true,
    source: 'frontend',
    page: 'Residential',
    section: 'Residential Work',
  },
  {
    id: 'fe-proj-17',
    title: 'Bathroom (Residential)',
    category: 'Bathroom',
    description: 'Bathroom renovation project from residential portfolio.',
    image: '/images/IMG_0447.jpg',
    featured: false,
    published: true,
    source: 'frontend',
    page: 'Residential',
    section: 'Residential Work',
  },
  {
    id: 'fe-proj-18',
    title: 'Custom Shower (Residential)',
    category: 'Shower',
    description: 'Custom shower project from residential portfolio.',
    image: '/images/IMG_0460.jpg',
    featured: false,
    published: true,
    source: 'frontend',
    page: 'Residential',
    section: 'Residential Work',
  },
  {
    id: 'fe-proj-19',
    title: 'Living Space (Residential)',
    category: 'Residential',
    description: 'Living space renovation from residential portfolio.',
    image: '/images/IMG_9687.jpg',
    featured: false,
    published: true,
    source: 'frontend',
    page: 'Residential',
    section: 'Residential Work',
  },
];

/* ============================================================
   REAL GALLERY (all images used in project/work sections)
   ============================================================ */
export const FRONTEND_GALLERY = [
  { id: 'fe-gal-01', image: '/images/IMG_0573.JPG.jpeg', title: 'Modern Bathroom', category: 'Bathroom', page: 'Home', section: 'Selected Work — Residential' },
  { id: 'fe-gal-02', image: '/images/IMG_0595.JPG.jpeg', title: 'Open Kitchen', category: 'Kitchen', page: 'Home', section: 'Selected Work — Residential' },
  { id: 'fe-gal-03', image: '/images/IMG_9545.jpg', title: 'Custom Shower', category: 'Shower', page: 'Home', section: 'Selected Work — Residential' },
  { id: 'fe-gal-04', image: '/images/IMG_9389.jpg', title: 'Patterned Hallway', category: 'Tile & Flooring', page: 'Home', section: 'Selected Work — Tiles' },
  { id: 'fe-gal-05', image: '/images/IMG_9415.jpg', title: 'Large-Format Floor', category: 'Tile & Flooring', page: 'Home', section: 'Selected Work — Tiles' },
  { id: 'fe-gal-06', image: '/images/IMG_9564.jpg', title: 'Geometric Floor', category: 'Tile & Flooring', page: 'Home', section: 'Selected Work — Tiles' },
  { id: 'fe-gal-07', image: '/images/IMG_0608.JPG.jpeg', title: 'Modern Bathroom (Full)', category: 'Bathroom', page: 'Home', section: 'Selected Work — Bathrooms' },
  { id: 'fe-gal-08', image: '/images/IMG_0573.JPG.jpeg', title: 'Double Vanity', category: 'Bathroom', page: 'Home', section: 'Selected Work — Bathrooms' },
  { id: 'fe-gal-09', image: '/images/IMG_8818.jpg', title: 'Complete Bathroom', category: 'Bathroom', page: 'Home', section: 'Selected Work — Bathrooms' },
  { id: 'fe-gal-10', image: '/images/IMG_0581.JPG.jpeg', title: 'Glass Enclosure', category: 'Shower', page: 'Home', section: 'Selected Work — Showers' },
  { id: 'fe-gal-11', image: '/images/IMG_9545.jpg', title: 'Recessed Niche', category: 'Shower', page: 'Home', section: 'Selected Work — Showers' },
  { id: 'fe-gal-12', image: '/images/IMG_0604.jpg', title: 'Tub & Shower', category: 'Shower', page: 'Home', section: 'Selected Work — Showers' },
  { id: 'fe-gal-13', image: '/images/IMG_0308.jpg', title: 'Subway Backsplash', category: 'Kitchen', page: 'Home', section: 'Selected Work — Kitchens' },
  { id: 'fe-gal-14', image: '/images/IMG_0447.jpg', title: 'Warm Kitchen', category: 'Kitchen', page: 'Home', section: 'Selected Work — Kitchens' },
  { id: 'fe-gal-15', image: '/images/IMG_0595.JPG.jpeg', title: 'Marble Backsplash', category: 'Kitchen', page: 'Home', section: 'Selected Work — Kitchens' },
  { id: 'fe-gal-16', image: '/images/IMG_0308.jpg', title: 'Kitchen (Residential)', category: 'Kitchen', page: 'Residential', section: 'Residential Work' },
  { id: 'fe-gal-17', image: '/images/IMG_0447.jpg', title: 'Bathroom (Residential)', category: 'Bathroom', page: 'Residential', section: 'Residential Work' },
  { id: 'fe-gal-18', image: '/images/IMG_0460.jpg', title: 'Custom Shower (Residential)', category: 'Shower', page: 'Residential', section: 'Residential Work' },
  { id: 'fe-gal-19', image: '/images/IMG_9687.jpg', title: 'Living Space (Residential)', category: 'Residential', page: 'Residential', section: 'Residential Work' },
  // Category background images
  { id: 'fe-gal-20', image: '/images/IMG_0447.jpg', title: 'Residential Category Background', category: 'Residential', page: 'Home', section: 'Residential Category' },
  { id: 'fe-gal-21', image: '/images/IMG_0383.jpg', title: 'Tiles Category Background', category: 'Tile & Flooring', page: 'Home', section: 'Tiles Category' },
  { id: 'fe-gal-22', image: '/images/IMG_0635.JPG.jpeg', title: 'Bathrooms Category Background', category: 'Bathroom', page: 'Home', section: 'Bathrooms Category' },
  { id: 'fe-gal-23', image: '/images/IMG_0618.JPG.jpeg', title: 'Showers Category Background', category: 'Shower', page: 'Home', section: 'Showers Category' },
  { id: 'fe-gal-24', image: '/images/IMG_0455.jpg', title: 'Kitchens Category Background', category: 'Kitchen', page: 'Home', section: 'Kitchens Category' },
  // Triad cards
  { id: 'fe-gal-25', image: '/images/IMG_0455.jpg', title: 'Residential Card', category: 'Residential', page: 'Home', section: 'Philosophy Triad' },
  { id: 'fe-gal-26', image: '/images/IMG_0212.jpg', title: 'Bathrooms Card', category: 'Bathroom', page: 'Home', section: 'Philosophy Triad' },
  { id: 'fe-gal-27', image: '/images/IMG_0308.jpg', title: 'Kitchens Card', category: 'Kitchen', page: 'Home', section: 'Philosophy Triad' },
  // About page
  { id: 'fe-gal-28', image: '/images/IMG_9687.jpg', title: 'About Interior', category: 'Residential', page: 'About', section: 'Who We Are' },
  { id: 'fe-gal-29', image: '/images/IMG_9545.jpg', title: 'About Tile Detail', category: 'Shower', page: 'About', section: 'Meet Gurdeep' },
  { id: 'fe-gal-30', image: '/images/IMG_0447.jpg', title: 'About Residential', category: 'Residential', page: 'About', section: 'Areas' },
  { id: 'fe-gal-31', image: '/images/IMG_9415.jpg', title: 'About Commercial', category: 'Commercial', page: 'About', section: 'Areas' },
  // Services page
  { id: 'fe-gal-32', image: '/images/IMG_9381.jpg', title: '45° Angles', category: 'Specialty', page: 'Services', section: 'Specialty' },
  { id: 'fe-gal-33', image: '/images/IMG_9389.jpg', title: 'All Tile Formats', category: 'Specialty', page: 'Services', section: 'Specialty' },
  { id: 'fe-gal-34', image: '/images/IMG_9446.jpg', title: 'Custom Finishes', category: 'Specialty', page: 'Services', section: 'Specialty' },
  { id: 'fe-gal-35', image: '/images/IMG_9687.jpg', title: 'Residential Area', category: 'Residential', page: 'Services', section: 'Areas' },
  { id: 'fe-gal-36', image: '/images/IMG_0212.jpg', title: 'Commercial Area', category: 'Commercial', page: 'Services', section: 'Areas' },
  // Philosophy
  { id: 'fe-gal-37', image: '/images/IMG_9687.jpg', title: 'Built Around People', category: 'Residential', page: 'Philosophy', section: 'Built Around People' },
  // Hero backgrounds
  { id: 'fe-gal-38', image: '/images/md-contact.jpg', title: 'Home Hero Background', category: 'Hero', page: 'Home', section: 'Hero' },
  { id: 'fe-gal-39', image: '/images/md-services.jpg', title: 'Services Hero Background', category: 'Hero', page: 'Services', section: 'Hero' },
  { id: 'fe-gal-40', image: '/images/md-residential.jpg', title: 'Residential Hero Background', category: 'Hero', page: 'Residential', section: 'Hero' },
  { id: 'fe-gal-41', image: '/images/IMG_0455.jpg', title: 'About Hero Background', category: 'Hero', page: 'About', section: 'Hero' },
  // Logo
  { id: 'fe-gal-42', image: '/images/logo.png', title: 'Company Logo', category: 'Logo', page: 'Header', section: 'Logo' },
];

/* ============================================================
   REAL TESTIMONIALS — The frontend has NO hardcoded testimonials.
   Testimonials come from the backend API only.
   This is an honest empty state.
   ============================================================ */
export const FRONTEND_TESTIMONIALS = [];

/* ============================================================
   HELPERS
   ============================================================ */

/** Merge frontend services with backend services */
export function mergeServices(backendServices) {
  return [...FRONTEND_SERVICES, ...(backendServices || []).map((s) => ({ ...s, source: 'database' }))];
}

/** Merge frontend projects with backend projects */
export function mergeProjects(backendProjects) {
  return [...FRONTEND_PROJECTS, ...(backendProjects || []).map((p) => ({ ...p, source: 'database' }))];
}

/** Merge frontend testimonials with backend testimonials */
export function mergeTestimonials(backendTestimonials) {
  return [...FRONTEND_TESTIMONIALS, ...(backendTestimonials || []).map((t) => ({ ...t, source: 'database' }))];
}

/** Get all gallery images (frontend + any backend project images) */
export function getAllGalleryImages(backendProjects) {
  const fromBackend = (backendProjects || []).filter((p) => p.image).map((p) => ({
    id: `db-gal-${p.id}`,
    image: p.image,
    title: p.title,
    category: p.category || 'Project',
    page: 'Projects (Database)',
    section: 'Backend Project',
    source: 'database',
  }));
  return [...FRONTEND_GALLERY, ...fromBackend];
}

/** Get gallery images grouped by category */
export function getGalleryByCategory(gallery) {
  const groups = {};
  gallery.forEach((img) => {
    const cat = img.category || 'Other';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(img);
  });
  return groups;
}

/** Get gallery images grouped by page */
export function getGalleryByPage(gallery) {
  const groups = {};
  gallery.forEach((img) => {
    const page = img.page || 'Other';
    if (!groups[page]) groups[page] = [];
    groups[page].push(img);
  });
  return groups;
}
