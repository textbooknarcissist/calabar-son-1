
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
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=800&auto=format&fit=crop',
    category: 'Signature'
  },
  {
    id: '2',
    name: 'URBAN NOMAD TRUCKER',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=800&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1575435462410-6c7031910629?q=80&w=800&auto=format&fit=crop',
    category: 'Limited'
  },
  {
    id: '3',
    name: 'CHARCOAL MERINO WOOL',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1521335629791-ce4aec67dd15?q=80&w=800&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
    category: 'Premium'
  }
];

export const ALL_PRODUCTS: Product[] = [
  ...SIGNATURE_PRODUCTS,
  {
    id: '4',
    name: 'MIDNIGHT BEANIE',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1576871333020-04099436113b?q=80&w=800&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1629135338245-c33190860528?q=80&w=800&auto=format&fit=crop',
    category: 'Fall/Winter'
  },
  {
    id: '5',
    name: 'STREET BUCKET CAP',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=800&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1490130282470-3d7759a2243d?q=80&w=800&auto=format&fit=crop',
    category: 'Summer'
  },
  {
    id: '6',
    name: 'VINTAGE CORDUROY',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=800&auto=format&fit=crop',
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
