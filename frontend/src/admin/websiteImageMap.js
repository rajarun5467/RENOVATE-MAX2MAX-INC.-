/**
 * Complete Website Image Map
 * Generated from actual frontend code inspection.
 * Structure: Page → Section → Image (with position, type, source)
 *
 * This is the source of truth for the admin "Website Images" section.
 */

export const WEBSITE_IMAGE_MAP = [
  {
    page: 'Home',
    route: '#/',
    sections: [
      {
        name: 'Hero',
        id: 'home',
        type: 'hero-bg',
        images: [
          { src: '/images/md-contact.jpg', label: 'Hero Background', position: 1, source: 'static', refType: 'css' },
        ],
      },
      {
        name: 'Philosophy Triad',
        id: 'philosophy',
        type: 'cards',
        images: [
          { src: '/images/IMG_0455.jpg', label: 'Residential Card', position: 1, source: 'static', refType: 'img' },
          { src: '/images/IMG_0212.jpg', label: 'Bathrooms Card', position: 2, source: 'static', refType: 'img' },
          { src: '/images/IMG_0308.jpg', label: 'Kitchens Card', position: 3, source: 'static', refType: 'img' },
        ],
      },
      {
        name: 'Residential Category',
        id: 'residential',
        type: 'category-bg',
        images: [
          { src: '/images/IMG_0447.jpg', label: 'Category Background', position: 1, source: 'static', refType: 'css-inline' },
        ],
      },
      {
        name: 'Selected Work — Residential',
        id: 'work',
        type: 'cards',
        images: [
          { src: '/images/IMG_0573.JPG.jpeg', label: 'Modern Bathroom', position: 1, source: 'static', refType: 'img' },
          { src: '/images/IMG_0595.JPG.jpeg', label: 'Open Kitchen', position: 2, source: 'static', refType: 'img' },
          { src: '/images/IMG_9545.jpg', label: 'Custom Shower', position: 3, source: 'static', refType: 'img' },
        ],
      },
      {
        name: 'Tiles Category',
        id: 'tiles',
        type: 'category-bg',
        images: [
          { src: '/images/IMG_0383.jpg', label: 'Category Background', position: 1, source: 'static', refType: 'css-inline' },
        ],
      },
      {
        name: 'Selected Work — Tiles',
        id: 'work-tiles',
        type: 'cards',
        images: [
          { src: '/images/IMG_9389.jpg', label: 'Patterned Hallway', position: 1, source: 'static', refType: 'img' },
          { src: '/images/IMG_9415.jpg', label: 'Large-Format Floor', position: 2, source: 'static', refType: 'img' },
          { src: '/images/IMG_9564.jpg', label: 'Geometric Floor', position: 3, source: 'static', refType: 'img' },
        ],
      },
      {
        name: 'Bathrooms Category',
        id: 'bathrooms',
        type: 'category-bg',
        images: [
          { src: '/images/IMG_0635.JPG.jpeg', label: 'Category Background', position: 1, source: 'static', refType: 'css-inline' },
        ],
      },
      {
        name: 'Selected Work — Bathrooms',
        id: 'work-bathrooms',
        type: 'cards',
        images: [
          { src: '/images/IMG_0608.JPG.jpeg', label: 'Modern Bathroom', position: 1, source: 'static', refType: 'img' },
          { src: '/images/IMG_0573.JPG.jpeg', label: 'Double Vanity', position: 2, source: 'static', refType: 'img' },
          { src: '/images/IMG_8818.jpg', label: 'Complete Bathroom', position: 3, source: 'static', refType: 'img' },
        ],
      },
      {
        name: 'Showers Category',
        id: 'showers',
        type: 'category-bg',
        images: [
          { src: '/images/IMG_0618.JPG.jpeg', label: 'Category Background', position: 1, source: 'static', refType: 'css-inline' },
        ],
      },
      {
        name: 'Selected Work — Showers',
        id: 'work-showers',
        type: 'cards',
        images: [
          { src: '/images/IMG_0581.JPG.jpeg', label: 'Glass Enclosure', position: 1, source: 'static', refType: 'img' },
          { src: '/images/IMG_9545.jpg', label: 'Recessed Niche', position: 2, source: 'static', refType: 'img' },
          { src: '/images/IMG_0604.jpg', label: 'Tub & Shower', position: 3, source: 'static', refType: 'img' },
        ],
      },
      {
        name: 'Kitchens Category',
        id: 'kitchens',
        type: 'category-bg',
        images: [
          { src: '/images/IMG_0455.jpg', label: 'Category Background', position: 1, source: 'static', refType: 'css-inline' },
        ],
      },
      {
        name: 'Selected Work — Kitchens',
        id: 'work-kitchens',
        type: 'cards',
        images: [
          { src: '/images/IMG_0308.jpg', label: 'Subway Backsplash', position: 1, source: 'static', refType: 'img' },
          { src: '/images/IMG_0447.jpg', label: 'Warm Kitchen', position: 2, source: 'static', refType: 'img' },
          { src: '/images/IMG_0595.JPG.jpeg', label: 'Marble Backsplash', position: 3, source: 'static', refType: 'img' },
        ],
      },
      {
        name: 'About Section',
        id: 'about',
        type: 'image',
        images: [
          { src: '/images/IMG_9687.jpg', label: 'About Image', position: 1, source: 'static', refType: 'img' },
        ],
      },
      {
        name: 'Testimonials',
        id: 'testimonials',
        type: 'dynamic',
        images: [
          { src: null, label: 'Testimonial images (from backend)', position: 1, source: 'database', refType: 'api' },
        ],
      },
    ],
  },
  {
    page: 'Services',
    route: '#/services',
    sections: [
      {
        name: 'Hero',
        id: 'ser-hero',
        type: 'hero-bg',
        images: [
          { src: '/images/md-services.jpg', label: 'Hero Background', position: 1, source: 'static', refType: 'css' },
        ],
      },
      {
        name: 'Intro',
        id: 'ser-intro',
        type: 'image',
        images: [
          { src: '/images/IMG_0308.jpg', label: 'Intro Image', position: 1, source: 'static', refType: 'img' },
        ],
      },
      {
        name: 'Services Grid',
        id: 'ser-main',
        type: 'dynamic',
        images: [
          { src: null, label: 'Service images (from backend)', position: 1, source: 'database', refType: 'api' },
        ],
      },
      {
        name: 'Specialty — The Details Matter',
        id: 'ser-specialty',
        type: 'cards',
        images: [
          { src: '/images/IMG_9381.jpg', label: '45° Angles', position: 1, source: 'static', refType: 'img' },
          { src: '/images/IMG_9389.jpg', label: 'All Tile Formats', position: 2, source: 'static', refType: 'img' },
          { src: '/images/IMG_9446.jpg', label: 'Custom Finishes', position: 3, source: 'static', refType: 'img' },
        ],
      },
      {
        name: 'Areas — Residential & Commercial',
        id: 'ser-areas',
        type: 'cards',
        images: [
          { src: '/images/IMG_9687.jpg', label: 'Residential', position: 1, source: 'static', refType: 'img' },
          { src: '/images/IMG_0212.jpg', label: 'Commercial', position: 2, source: 'static', refType: 'img' },
        ],
      },
    ],
  },
  {
    page: 'Residential',
    route: '#/residential',
    sections: [
      {
        name: 'Hero',
        id: 'res-hero',
        type: 'hero-bg',
        images: [
          { src: '/images/md-residential.jpg', label: 'Hero Background', position: 1, source: 'static', refType: 'css' },
          { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80&auto=format&fit=crop', label: 'Hero Background (Unsplash, fixed)', position: 2, source: 'external', refType: 'css' },
        ],
      },
      {
        name: 'Intro',
        id: 'res-intro',
        type: 'image',
        images: [
          { src: '/images/IMG_9687.jpg', label: 'Intro Image', position: 1, source: 'static', refType: 'img' },
        ],
      },
      {
        name: 'Residential Work',
        id: 'res-work',
        type: 'dynamic',
        images: [
          { src: '/images/IMG_0308.jpg', label: 'Kitchen (fallback)', position: 1, source: 'static', refType: 'img' },
          { src: '/images/IMG_0447.jpg', label: 'Bathroom (fallback)', position: 2, source: 'static', refType: 'img' },
          { src: '/images/IMG_0460.jpg', label: 'Custom Shower (fallback)', position: 3, source: 'static', refType: 'img' },
          { src: '/images/IMG_9687.jpg', label: 'Living Space (fallback)', position: 4, source: 'static', refType: 'img' },
        ],
      },
      {
        name: 'Statement',
        id: 'res-statement',
        type: 'bg',
        images: [
          { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80&auto=format&fit=crop', label: 'Statement Background (Unsplash)', position: 1, source: 'external', refType: 'css' },
        ],
      },
    ],
  },
  {
    page: 'About',
    route: '#/about',
    sections: [
      {
        name: 'Hero',
        id: 'abt-hero',
        type: 'hero-bg',
        images: [
          { src: '/images/IMG_0455.jpg', label: 'Hero Background', position: 1, source: 'static', refType: 'css' },
        ],
      },
      {
        name: 'Who We Are',
        id: 'abt-who',
        type: 'image',
        images: [
          { src: '/images/IMG_9687.jpg', label: 'Interior Image', position: 1, source: 'static', refType: 'img' },
        ],
      },
      {
        name: 'Meet Gurdeep',
        id: 'abt-founder',
        type: 'image',
        images: [
          { src: '/images/IMG_9545.jpg', label: 'Tile Detail', position: 1, source: 'static', refType: 'img' },
        ],
      },
      {
        name: 'Areas — Residential & Commercial',
        id: 'abt-areas',
        type: 'cards',
        images: [
          { src: '/images/IMG_0447.jpg', label: 'Residential', position: 1, source: 'static', refType: 'img' },
          { src: '/images/IMG_9415.jpg', label: 'Commercial', position: 2, source: 'static', refType: 'img' },
        ],
      },
    ],
  },
  {
    page: 'Philosophy',
    route: '#/philosophy',
    sections: [
      {
        name: 'Hero',
        id: 'ph-hero',
        type: 'hero-bg',
        images: [
          { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80&auto=format&fit=crop', label: 'Hero Background (Unsplash)', position: 1, source: 'external', refType: 'css' },
        ],
      },
      {
        name: 'Statement',
        id: 'ph-statement',
        type: 'bg',
        images: [
          { src: 'https://images.unsplash.com/photo-1774429145093-3e813eedcd7a?w=1920&q=80&auto=format&fit=crop', label: 'Statement Background (Unsplash)', position: 1, source: 'external', refType: 'css' },
        ],
      },
      {
        name: 'Built Around People',
        id: 'ph-human',
        type: 'image',
        images: [
          { src: '/images/IMG_9687.jpg', label: 'Interior Image', position: 1, source: 'static', refType: 'img' },
        ],
      },
    ],
  },
  {
    page: 'Contact',
    route: '#/contact',
    sections: [
      {
        name: 'Hero',
        id: 'ct-hero',
        type: 'hero-bg',
        images: [
          { src: '/images/md-contact.jpg', label: 'Hero Background', position: 1, source: 'static', refType: 'css' },
        ],
      },
    ],
  },
  {
    page: 'Header (Global)',
    route: 'global',
    sections: [
      {
        name: 'Logo',
        id: 'header-logo',
        type: 'logo',
        images: [
          { src: '/images/logo.png', label: 'Company Logo', position: 1, source: 'static', refType: 'img' },
        ],
      },
    ],
  },
];

/** Flatten all images from the map */
export function getAllMappedImages() {
  const all = [];
  WEBSITE_IMAGE_MAP.forEach((page) => {
    page.sections.forEach((section) => {
      section.images.forEach((img) => {
        if (img.src) all.push({ ...img, page: page.page, section: section.name, sectionId: section.id, sectionType: section.type });
      });
    });
  });
  return all;
}

/** Find all usages of a specific image src */
export function findUsages(src) {
  return getAllMappedImages().filter((img) => img.src === src);
}

/** Get all unique static image paths from the map */
export function getAllStaticImagePaths() {
  return [...new Set(getAllMappedImages().filter((i) => i.source === 'static').map((i) => i.src))];
}
