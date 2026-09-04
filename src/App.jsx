import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import HomePage from './components/Home/HomePage';
import NotFoundPage from './components/ui/NotFoundPage';
import React, { useEffect, useState } from 'react';
import ProductPage from './components/Product/ProductPage';
import api from './api'; // Importing the api module
import CartPage from './components/Cart/CartPage';
import { ToastContainer, toast } from 'react-toastify';
import CheckoutPage from './components/Checkout/CheckoutPage';
import LoginPage from './components/User/LoginPage';
import ProtectedRoute from './components/ui/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import UserProfilePage from './components/User/UserProfilePage';
import PaymentStatusPage from './components/Payment/paymentStatusPage';
import RegisterPage from './components/User/RegisterPage';

const App = () => {
  const [numCartItems, setNumCartItems] = useState(0);
  const cart_code = localStorage.getItem('cart_code');

  useEffect(() => {
    if (cart_code) {
      api.get(`/get_cart_stat/?cart_code=${cart_code}`)
        .then(res => {
          console.log(res.data); // Assuming the response contains numItems
          setNumCartItems(res.data.num_of_items); // Assuming the response contains numItems
        })
        .catch(err => {
          console.log(err.message);
        });
    } 
  }, [cart_code]); // Added cart_code as a dependency

  return (
     <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}/>
        <Route index element={<HomePage />} />
        <Route path="products/:slug" element={<ProductPage setNumCartItems={setNumCartItems} />} />
        <Route path="cart" element={<CartPage setNumCartItems={setNumCartItems}/>} />
        <Route path="checkout" element={
        <ProtectedRoute> 
          <CheckoutPage /> 
        </ProtectedRoute>} />
        <Route path="login" element={<LoginPage/>} />
        <Route path="profile" element={<UserProfilePage/>}/>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="payment-status" element={<PaymentStatusPage setNumCartItems={setNumCartItems} />} />
        <Route path="/register" element={<RegisterPage/>} /> {/* ✅ Ensure this exists */}
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
