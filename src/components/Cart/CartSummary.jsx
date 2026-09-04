import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const CartSummary = ({cartTotal,tax}) => {
    console.log(cartTotal)
    const subTotal = cartTotal.toFixed(2); // Subtotal (rounded to 2 decimal places)
const carttax = (cartTotal * (tax / 100)).toFixed(2); // Calculate tax correctly
const total = (parseFloat(subTotal) + parseFloat(carttax)).toFixed(2); // Calculate total correctly





    return (
        <div className="col-md-4 align-self-start">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Cart Summary</h5>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <span>Subtotal:</span>
                        <span>{`$${subTotal}`}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Tax (5%):</span>
                        <span>{`$${carttax}`}</span> {/* Corrected the tax value */}
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Total:</span>
                        <strong>{`$${total}`}</strong>
                    </div>
                    <Link to="/checkout"> {/* Corrected the Link syntax */}
                        <button
                            className="btn btn-primary w-100"
                            style={{ backgroundColor: '#605e0C', borderColor: '#6058DC' }}
                        >
                            Proceed to Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartSummary; // Corrected the export statement