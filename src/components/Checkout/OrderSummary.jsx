import React from 'react';
import OrderItem from './OrderItem';
import styles from './OrderSummary.module.css'
import CartItem from '../Cart/CartItem';

const OrderSummary = ({cartItems,cartTotal,tax}) => {

     const total = cartTotal + tax


    return (
        <div className="col-md-8">
            <div className={`card mb-4 ${styles.card}`}>
                <div className="card-header" style={{ backgroundColor: '#6050DC', color: "white" }}>
                    <h5>Cart Summary</h5>
                </div>
                <div className="card-body">
                    <div className='px-3' style={{ height: "300px", overflow: "auto" }}>

                        {cartItems.map(CartItem => <OrderItem  key={CartItem.id} CartItem={CartItem}/>)}
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <h6>Total</h6>
                        <h6>{`$${total}`}</h6>
                    </div>
                </div>
            </div>
        </div>
        
)}    
        
export default OrderSummary; // Corrected the comment to indicate the end of the selection