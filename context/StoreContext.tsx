import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, User, Order } from '../types';
import { MOCK_USER, MOCK_ORDERS } from '../constants';

interface StoreContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  orders: Order[];
  placeOrder: (shippingAddress: string) => void;
  cancelOrder: (orderId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load User, Cart, and Orders
  useEffect(() => {
    const savedCart = localStorage.getItem('jiom_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    // Auto-login for demo purposes
    const savedUser = localStorage.getItem('jiom_user');
    if(savedUser) {
        setUser(JSON.parse(savedUser));
    }

    const savedOrders = localStorage.getItem('jiom_orders');
    if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
    } else {
        setOrders(MOCK_ORDERS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jiom_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('jiom_orders', JSON.stringify(orders));
  }, [orders]);

  const login = () => {
    setUser(MOCK_USER);
    localStorage.setItem('jiom_user', JSON.stringify(MOCK_USER));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jiom_user');
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const placeOrder = (shippingAddress: string) => {
    const newOrder: Order = {
        id: `${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000000 + Math.random() * 9000000)}-${Math.floor(1000000 + Math.random() * 9000000)}`,
        date: new Date().toISOString(),
        total: cartTotal,
        status: 'Processing',
        items: [...cart],
        shippingAddress,
        estimatedDelivery: new Date(Date.now() + 86400000 * 3).toISOString() // 3 days later
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: 'Cancelled' } : order
      )
    );
  };

  return (
    <StoreContext.Provider
      value={{
        user,
        login,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        orders,
        placeOrder,
        cancelOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};