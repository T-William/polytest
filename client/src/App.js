import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box, Container, CssBaseline } from '@mui/material';

// Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Footer from './components/Footer';

// Mock data
import { mockProducts } from './data/mockData';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Navbar cartCount={cart.reduce((count, item) => count + item.quantity, 0)} />
      
      {isHomePage && <HeroSection />}
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          backgroundColor: 'background.default',
          pt: isHomePage ? 0 : 4,
          pb: 8
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <ProductList addToCart={addToCart} />
            }
          />
          <Route
            path="/store"
            element={
              <ProductList addToCart={addToCart} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                clearCart={clearCart}
              />
            }
          />
          <Route
            path="/order-confirmation"
            element={
              <OrderConfirmation />
            }
          />
        </Routes>
      </Box>
      
      <Footer />
    </Box>
  );
}

export default App;
