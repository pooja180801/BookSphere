import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Cart from '../components/Cart';
import Footer from '../components/Footer';
import AppHeader from '../components/AppHeader';
import ViewProducts from '../components/ViewProducts';
import ProductDetails from '../components/ProductDetails';
import Checkout from '../components/Checkout';
import Login from '../auth/Login';
import Register from '../auth/Register';
import UserProfile from '../components/Profile';
import DeliveryAddressForm from '../components/Checkout';
import OrderSummary from '../components/OrderSummary';
import Search from '../components/Search';
import OrderConfirmation from '../components/OrderConfirmation';
import ProductRender from '../components/ProductRender';

const CustomerRoute = () => {
  const location = useLocation();

  const showHomePage = location.pathname !== '/checkout' && !location.pathname.startsWith('/checkout') 
  && !location.pathname.startsWith('/search') && !location.pathname.startsWith('/products');


  return (
    <div>
      <AppHeader />
      {showHomePage && <HomePage />}

      <Routes>

        <Route path="products" element={<ProductRender />} />
        <Route path="/register" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/viewProduct/:productId" element={<ProductDetails />} />
        <Route path="/checkout" element={<DeliveryAddressForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/checkout/orderSummary/:orderId" element={<OrderSummary />} />
        <Route path="/search" element={<Search />} />
        <Route path="/checkout/orderSummary/:orderId/orderConfirmation" element={<OrderConfirmation />} />
        

      </Routes>
      <Footer />
    </div>
  );
};

export default CustomerRoute;
