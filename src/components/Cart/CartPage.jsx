import React, { useEffect , useState} from 'react';
import CartItem from './CartItem'; // Ensure to import CartItem
import CartSummary from './CartSummary'; // Ensure to import CartSummary
import api from '../../api';
import NavBar from '../ui/NavBar';
import Footer from '../ui/Footer';
import Spinner from '../ui/Spinner';
import userCartData from '../../Hooks/useCartData';

const CartPage = ({setNumCartItems}) => {

    


   const tax = 5


   const {cartItems,setCartItems,cartTotal,setCartTotal,loading } = userCartData()
    console.log(cartTotal)
    if(loading){
        return <Spinner loading={loading}/>
    }
    
    if(cartItems.length < 1){
        return (
            <>
            <NavBar/>
            <div className="alert alert-primary rounded-3 p-3 text-center my-5" role="alert" style={{ marginTop: '20px' }}>
                You haven't added any item to your cart.
            </div>
            <Footer/>
            </>
        );
    }
    





    return (
        <>
        <NavBar/>
        <div className="container my-3 py-3" style={{ height: "80vh", overflow: "scroll" }}>
            <h5 className="mb-4">Shopping Cart</h5>
            <div className="row">
                <div className="col-md-8">
                    {cartItems.map(item => <CartItem key={item.id} item={ item } 
                    cartItems={cartItems} 
                    setCartTotal={setCartTotal}
                    setNumCartItems={setNumCartItems}
                    setCartItems={setCartItems}
                    />)}
                    {/* <CartItem /> */}
                    
                </div>
                <CartSummary cartTotal={cartTotal} tax={tax} />
              </div>
        </div>
        <Footer/>
        </>
    );
};

export default CartPage;