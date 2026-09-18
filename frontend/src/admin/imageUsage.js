/**
 * Image usage map — tracks where each static image is used across the frontend.
 * This is maintained manually based on code inspection.
 * Key = image filename, Value = array of { page, section, type }
 */
export const IMAGE_USAGE = {
  'logo.png': [
    { page: 'Header', section: 'Logo', type: 'logo' },
    { page: 'Admin', section: 'Login', type: 'logo' },
    { page: 'Admin', section: 'Sidebar', type: 'logo' },
    { page: 'Footer', section: 'Social/OG', type: 'meta' },
  ],
  'IMG_0212.jpg': [
    { page: 'Home', section: 'Triad — Bathrooms card', type: 'card' },
    { page: 'Services', section: 'Areas — Commercial', type: 'area' },
  ],
  'IMG_0308.jpg': [
    { page: 'Home', section: 'Triad — Kitchens card', type: 'card' },
    { page: 'Home', section: 'Kitchens category', type: 'category-image' },
    { page: 'Services', section: 'Intro image', type: 'intro' },
    { page: 'Residential', section: 'Work — Kitchen', type: 'work-item' },
  ],
  'IMG_0383.jpg': [
    { page: 'Home', section: 'Tiles category background', type: 'category-bg' },
  ],
  'IMG_0447.jpg': [
    { page: 'Home', section: 'Residential category background', type: 'category-bg' },
    { page: 'Home', section: 'Kitchens category — image', type: 'category-image' },
    { page: 'Residential', section: 'Work — Bathroom', type: 'work-item' },
    { page: 'About', section: 'Project image', type: 'image' },
  ],
  'IMG_0455.jpg': [
    { page: 'Home', section: 'Triad — Residential card', type: 'card' },
    { page: 'Home', section: 'Kitchens category background', type: 'category-bg' },
    { page: 'About', section: 'Hero background', type: 'hero-bg' },
  ],
  'IMG_0460.jpg': [
    { page: 'Residential', section: 'Work — Custom Shower', type: 'work-item' },
  ],
  'IMG_0572.JPG.jpeg': [],
  'IMG_0573.JPG.jpeg': [
    { page: 'Home', section: 'Bathrooms — Modern bathroom', type: 'category-image' },
    { page: 'Home', section: 'Bathrooms — Double vanity', type: 'category-image' },
  ],
  'IMG_0574.JPG.jpeg': [],
  'IMG_0578.JPG.jpeg': [],
  'IMG_0581.JPG.jpeg': [
    { page: 'Home', section: 'Showers — Glass enclosure', type: 'category-image' },
  ],
  'IMG_0595.JPG.jpeg': [
    { page: 'Home', section: 'Kitchens — Full kitchen renovation', type: 'category-image' },
    { page: 'Home', section: 'Kitchens — Marble backsplash', type: 'category-image' },
  ],
  'IMG_0604.jpg': [
    { page: 'Home', section: 'Showers — Tub & shower', type: 'category-image' },
  ],
  'IMG_0608.JPG.jpeg': [
    { page: 'Home', section: 'Bathrooms — Full modern bathroom', type: 'category-image' },
  ],
  'IMG_0609.JPG.jpeg': [],
  'IMG_0618.JPG.jpeg': [
    { page: 'Home', section: 'Showers category background', type: 'category-bg' },
  ],
  'IMG_0634.JPG.jpeg': [],
  'IMG_0635.JPG.jpeg': [
    { page: 'Home', section: 'Bathrooms category background', type: 'category-bg' },
  ],
  'IMG_8818.jpg': [
    { page: 'Home', section: 'Bathrooms — Complete bathroom', type: 'category-image' },
  ],
  'IMG_8820.jpg': [],
  'IMG_9381.jpg': [
    { page: 'Services', section: 'Specialty — 45° Angles', type: 'specialty' },
  ],
  'IMG_9389.jpg': [
    { page: 'Home', section: 'Tiles — Patterned hallway', type: 'category-image' },
    { page: 'Services', section: 'Specialty — All Tile Formats', type: 'specialty' },
  ],
  'IMG_9415.jpg': [
    { page: 'Home', section: 'Tiles — Large-format floor', type: 'category-image' },
    { page: 'About', section: 'Commercial project', type: 'image' },
  ],
  'IMG_9437.jpg': [],
  'IMG_9446.jpg': [
    { page: 'Services', section: 'Specialty — Custom Finishes', type: 'specialty' },
  ],
  'IMG_9543.jpg': [],
  'IMG_9545.jpg': [
    { page: 'Home', section: 'Showers — Recessed niche', type: 'category-image' },
    { page: 'About', section: 'Tile detail', type: 'image' },
  ],
  'IMG_9546.jpg': [],
  'IMG_9564.jpg': [
    { page: 'Home', section: 'Tiles — Geometric floor', type: 'category-image' },
  ],
  'IMG_9662.jpg': [],
  'IMG_9687.jpg': [
    { page: 'Home', section: 'About section', type: 'image' },
    { page: 'Residential', section: 'Intro image', type: 'intro' },
    { page: 'Residential', section: 'Work — Living Space', type: 'work-item' },
    { page: 'Services', section: 'Areas — Residential', type: 'area' },
    { page: 'About', section: 'Residential project', type: 'image' },
    { page: 'Philosophy', section: 'Interior detail', type: 'image' },
  ],
  'md-contact.jpg': [
    { page: 'Home', section: 'Hero background', type: 'hero-bg' },
    { page: 'Contact', section: 'Hero background', type: 'hero-bg' },
  ],
  'md-residential.jpg': [
    { page: 'Residential', section: 'Hero background', type: 'hero-bg' },
  ],
  'md-services.jpg': [
    { page: 'Services', section: 'Hero background', type: 'hero-bg' },
  ],
};

/** External images used in CSS (Unsplash) */
export const EXTERNAL_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80&auto=format&fit=crop', page: 'Residential', section: 'Statement background', type: 'bg' },
  { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80&auto=format&fit=crop', page: 'Philosophy', section: 'Hero background', type: 'hero-bg' },
  { url: 'https://images.unsplash.com/photo-1774429145093-3e813eedcd7a?w=1920&q=80&auto=format&fit=crop', page: 'Philosophy', section: 'Statement background', type: 'bg' },
];

/** Get usage info for a filename */
export function getUsage(filename) {
  return IMAGE_USAGE[filename] || [];
}

/** Check if an image is currently used */
export function isUsed(filename) {
  const usage = getUsage(filename);
  return usage.length > 0;
}
