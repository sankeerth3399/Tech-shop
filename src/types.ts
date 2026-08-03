export interface ServiceItem {
  id: string;
  title: string;
  category: 'printing' | 'online' | 'photo_binding' | 'stationery';
  description: string;
  iconName: string;
  image?: string;
  badge?: string;
  popular?: boolean;
  estimatedTime: string;
  highlights: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'Stationery Essentials' | 'Adhesives & Tapes' | 'Art & Craft' | 'Papers & Files' | 'Tech Accessories';
  price: number;
  originalPrice?: number;
  description: string;
  inStock: boolean;
  rating: number;
  image: string;
  tags: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Xerox & Print' | 'Aadhar & PAN' | 'Orders';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Store' | 'Services' | 'Printing';
  image: string;
  caption: string;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  phone: string;
  phoneFormatted: string;
  whatsappNumber: string;
  email: string;
  address: {
    plot: string;
    colony: string;
    area: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
    full: string;
  };
  hours: {
    weekdays: string;
    sunday: string;
    status: string;
  };
  whatsappUrl: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isError?: boolean;
}
