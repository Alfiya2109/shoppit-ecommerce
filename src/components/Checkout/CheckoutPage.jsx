import React from 'react';
import OrderSummary from './OrderSummary'; // Ensure correct import
import PaymentSection from './PaymentSection';
import NavBar from '../ui/NavBar';
import Footer from '../ui/Footer';
import userCartData from '../../Hooks/useCartData';
const CheckoutPage = () => {
    const {cartItems,setCartItems,cartTotal,setCartTotal,loading,tax } = userCartData()

  return (
    <>
    <NavBar/>
    <div className="container my-3">
      <div className="row">
        <OrderSummary cartItems={cartItems} cartTotal={cartTotal} tax={tax}/>
        <PaymentSection />
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CheckoutPage;
