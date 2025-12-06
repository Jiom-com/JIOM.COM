import { Product, Category, User, Order } from './types';

// Helper to generate thousands of products for performance testing
const generateMockProducts = (count: number): Product[] => {
  const products: Product[] = [];
  const categories = Object.values(Category);
  
  for (let i = 1; i <= count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const price = Math.floor(Math.random() * 50000) + 500;
    const rating = (Math.random() * 2) + 3; // Rating between 3.0 and 5.0
    
    products.push({
      id: `gen-${i}`,
      title: `${category} Item - Premium Series Model ${1000 + i}`,
      description: `High quality ${category.toLowerCase()} product with premium features. Durable, stylish and comes with a 1-year warranty. Perfect for daily use.`,
      price: price,
      originalPrice: Math.floor(price * 1.2),
      rating: parseFloat(rating.toFixed(1)),
      reviewCount: Math.floor(Math.random() * 5000),
      image: `https://picsum.photos/400/400?random=${i + 10}`,
      category: category,
      inStock: Math.random() > 0.1,
      isPrime: Math.random() > 0.3,
    });
  }
  return products;
};

const STATIC_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    description: 'Industry-leading noise cancellation, exceptional sound quality, and crystal-clear hands-free calling. Up to 30-hour battery life with quick charging.',
    price: 29999,
    originalPrice: 34990,
    rating: 4.8,
    reviewCount: 2450,
    image: 'https://picsum.photos/400/400?random=1',
    category: Category.ELECTRONICS,
    inStock: true,
    isPrime: true,
  },
  {
    id: '2',
    title: 'Apple iPhone 15 (128 GB) - Black',
    description: 'Dynamic Island, 48MP Main Camera, USB-C, and A16 Bionic chip. The latest innovation from Apple tailored for performance.',
    price: 79900,
    rating: 4.7,
    reviewCount: 1200,
    image: 'https://picsum.photos/400/400?random=2',
    category: Category.ELECTRONICS,
    inStock: true,
    isPrime: true,
  },
  {
    id: '3',
    title: 'Men\'s Slim Fit Cotton Blend Formal Shirt',
    description: 'Premium cotton blend material, perfect for office wear and formal occasions. Breathable fabric ensuring comfort all day long.',
    price: 899,
    originalPrice: 1999,
    rating: 4.2,
    reviewCount: 856,
    image: 'https://picsum.photos/400/400?random=3',
    category: Category.FASHION,
    inStock: true,
    isPrime: false,
  },
  {
    id: '4',
    title: 'Atomic Habits by James Clear',
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones. The #1 New York Times bestseller.',
    price: 450,
    originalPrice: 799,
    rating: 4.9,
    reviewCount: 15000,
    image: 'https://picsum.photos/400/400?random=4',
    category: Category.BOOKS,
    inStock: true,
    isPrime: true,
  },
  {
    id: '5',
    title: 'Philips Air Fryer HD9200/90',
    description: 'Great tasting fries with up to 90% less fat! Rapid Air Technology, adjustable time and temperature control.',
    price: 6999,
    originalPrice: 9999,
    rating: 4.5,
    reviewCount: 3200,
    image: 'https://picsum.photos/400/400?random=5',
    category: Category.HOME,
    inStock: true,
    isPrime: true,
  },
  {
    id: '6',
    title: 'Samsung 108cm (43 inches) Crystal iSmart 4K Ultra HD Smart LED TV',
    description: 'Experience 4K resolution with Crystal Processor 4K. Smart features include Screen Mirroring, Universal Guide, and more.',
    price: 28990,
    originalPrice: 52900,
    rating: 4.4,
    reviewCount: 540,
    image: 'https://picsum.photos/400/400?random=6',
    category: Category.ELECTRONICS,
    inStock: true,
    isPrime: true,
  },
  {
    id: '7',
    title: 'Lakmé Absolute Blur Perfect Makeup Primer',
    description: 'The perfect start for a flawless, professional makeup finish. Creates the perfect base for makeup and helps it stay on for longer.',
    price: 550,
    rating: 4.3,
    reviewCount: 890,
    image: 'https://picsum.photos/400/400?random=7',
    category: Category.BEAUTY,
    inStock: true,
    isPrime: false,
  },
  {
    id: '8',
    title: 'Puma Men\'s Running Shoes',
    description: 'Style meets performance. High quality mesh upper for breathability and rubber outsole for traction.',
    price: 2499,
    originalPrice: 4999,
    rating: 4.1,
    reviewCount: 340,
    image: 'https://picsum.photos/400/400?random=8',
    category: Category.FASHION,
    inStock: true,
    isPrime: true,
  },
];

// Combine Static products with 2000 generated products to test performance
export const MOCK_PRODUCTS: Product[] = [...STATIC_PRODUCTS, ...generateMockProducts(2000)];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Aditya Kumar',
  email: 'aditya@example.com',
  isAdmin: true,
};

export const MOCK_ORDERS: Order[] = [
  {
    id: '404-3928392-1928391',
    date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    total: 29999,
    status: 'Delivered',
    shippingAddress: 'Aditya Kumar, 123 Tech Park, Bangalore, KA',
    estimatedDelivery: new Date(Date.now() - 86400000).toISOString(),
    items: [
       { ...MOCK_PRODUCTS[0], quantity: 1 }
    ]
  },
  {
    id: '404-7621892-8273612',
    date: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
    total: 450,
    status: 'Shipped',
    shippingAddress: 'Aditya Kumar, 123 Tech Park, Bangalore, KA',
    estimatedDelivery: new Date(Date.now() + 86400000).toISOString(),
    items: [
       { ...MOCK_PRODUCTS[3], quantity: 1 }
    ]
  }
];