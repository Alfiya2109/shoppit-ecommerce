import React, { useState } from 'react';
import styles from './PaymentSection.module.css'; // Assuming you have a CSS module for styles
import api from '../../api';

const PaymentSection = () => {

    const cart_code = localStorage.getItem("cart_code");
    const [loading, setLoading] = useState(false);

    function makePayment() {
        setLoading(true);
        api.post("initiate_payment/", {
            cart_code: cart_code
        })
        .then(res => {
            console.log(res.data);
            window.location.href = res.data.data.link
            setLoading(false);
        })
        .catch(err => {
            console.log(err.message);
            setLoading(false);
        });
    }

    function makePayPalPayment() {
        setLoading(true);
        api.post("initiate_paypal_payment/", {
            cart_code: cart_code
        })
        .then(res => {
            console.log(res.data);
            setLoading(false);
             if(res.data.approval_url){
                 window.location.href = res.data.approval_url;
            }
         }
        )
        .catch(err => {
            console.log(err.message);
            setLoading(false);
        });
    }





    return (
        <div className="col-md-4">
            <div className={`card ${styles.card}`}>
                <div className="card-header" style={{ backgroundColor: '#6050DC', color: "white" }}>
                    <h5>Payment Options</h5>
                </div>
                <div className="card-body">
                    {/* PayPal Button */}
                    <button className={`btn btn-primary w-100 mb-3 ${styles.paypalButton}`}onClick={makePayPalPayment} id="paypal-button">
                        <i className="bi bi-paypal"></i> Pay with PayPal
                    </button>

                    {/* Flutterwave Button */}
                    <button className={`btn btn-warning w-100 ${styles.flutterwaveButton}`} onClick={makePayment} id="flutterwave-button">
                        <i className="bi bi-credit-card"></i> Pay with Flutterwave
                    </button>
                </div>
            </div>
        </div>
)}

export default PaymentSection; // Added export statement