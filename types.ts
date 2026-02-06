
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage: string;
  category: string;
}

export interface Bundle {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  description: string;
  image: string;
}

export interface SocialPost {
  id: string;
  username: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
