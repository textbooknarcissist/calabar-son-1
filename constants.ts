
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
    image: '/assets/images/products/onyx-stealth-main.jpg',
    hoverImage: '/assets/images/products/onyx-stealth-hover.jpg',
    category: 'Signature'
  },
  {
    id: '2',
    name: 'URBAN NOMAD TRUCKER',
    price: 35000,
    image: '/assets/images/products/urban-nomad-main.jpg',
    hoverImage: '/assets/images/products/urban-nomad-hover.jpg',
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
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'b2',
    title: 'CORE COLLECTION SET',
    price: 65000,
    originalPrice: 80000,
    description: 'The Stealth and The Nomad in a custom dual pack.',
    image: 'https://images.unsplash.com/photo-1572451479139-6a308211d8be?q=80&w=1000&auto=format&fit=crop'
  }
];

export const SOCIAL_POSTS: SocialPost[] = [
  { id: 's1', username: '@marcus_urban', image: 'https://images.unsplash.com/photo-1523395243481-163f8f27df54?q=80&w=600&auto=format&fit=crop' },
  { id: 's2', username: '@lea.fits', image: 'https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=600&auto=format&fit=crop' },
  { id: 's3', username: '@dre_styles', image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=600&auto=format&fit=crop' },
  { id: 's4', username: '@street_shutter', image: 'https://images.unsplash.com/photo-1514332930284-8e753cd129ef?q=80&w=600&auto=format&fit=crop' },
  { id: 's5', username: '@calabar_fan', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=600&auto=format&fit=crop' },
  { id: 's6', username: '@vibe_check', image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=600&auto=format&fit=crop' }
];
