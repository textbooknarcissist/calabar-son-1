
import { Product, Bundle, SocialPost } from './types';

export const ACCENT_COLOR = 'text-blue-500';
export const ACCENT_BG = 'bg-blue-500';
export const ACCENT_BORDER = 'border-blue-500';
export const CURRENCY = '₦';

export const SIGNATURE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'ONYX STEALTH SNAPBACK',
    price: 45000,
    image: '/assets/images/products/onyx-stealth-main.avif',
    hoverImage: '/assets/images/products/onyx-stealth-hover.avif',
    category: 'Signature'
  },
  {
    id: '2',
    name: 'URBAN NOMAD TRUCKER',
    price: 35000,
    image: '/assets/images/products/urban-nomad-main.avif',
    hoverImage: '/assets/images/products/urban-nomad-hover.avif',
    category: 'Limited'
  },
  {
    id: '3',
    name: 'CHARCOAL MERINO WOOL',
    price: 55000,
    image: '/assets/images/products/charcoal-merino-main.avif',
    hoverImage: '/assets/images/products/charcoal-merino-hover.avif',
    category: 'Premium'
  }
];

export const ALL_PRODUCTS: Product[] = [
  ...SIGNATURE_PRODUCTS,
  {
    id: '4',
    name: 'MIDNIGHT BEANIE',
    price: 25000,
    image: '/assets/images/products/midnight-beanie-main.avif',
    hoverImage: '/assets/images/products/midnight-beanie-hover.avif',
    category: 'Fall/Winter'
  },
  {
    id: '5',
    name: 'STREET BUCKET CAP',
    price: 38000,
    image: '/assets/images/products/street-bucket-main.avif',
    hoverImage: '/assets/images/products/street-bucket-hover.avif',
    category: 'Summer'
  },
  {
    id: '6',
    name: 'VINTAGE CORDUROY',
    price: 42000,
    image: '/assets/images/products/vintage-corduroy-main.avif',
    hoverImage: '/assets/images/products/vintage-corduroy-hover.avif',
    category: 'Classic'
  }
];

export const HOT_DEALS: Bundle[] = [
  {
    id: 'b1',
    title: 'THE STARTER PACK',
    price: 95000,
    originalPrice: 125000,
    description: '3 Premium Caps of your choice + Signature Case.',
    image: '/assets/images/bundles/starter-pack.webp'
  },
  {
    id: 'b2',
    title: 'CORE COLLECTION SET',
    price: 65000,
    originalPrice: 80000,
    description: 'The Stealth and The Nomad in a custom dual pack.',
    image: '/assets/images/bundles/core-collection.webp'
  }
];

export const SOCIAL_POSTS: SocialPost[] = [
  { id: 's1', username: '@marcus_urban', image: '/assets/images/social/marcus-urban.avif' },
  { id: 's2', username: '@lea.fits', image: '/assets/images/social/lea-fits.avif' },
  { id: 's3', username: '@dre_styles', image: '/assets/images/social/dre-styles.avif' },
  { id: 's4', username: '@street_shutter', image: '/assets/images/social/street-shutter.avif' },
  { id: 's5', username: '@calabar_fan', image: '/assets/images/social/calabar-fan.avif' },
  { id: 's6', username: '@vibe_check', image: '/assets/images/social/vibe-check.avif' }
];
