import React from 'react';
import { BASE_URL } from '../../api';

const OrderItem = ({ CartItem }) => {
    // console.log(CartItem);
  return (
    <div className="d-flex justify-content-between align-items-center mb-3" style={{ padding: '10px' }}>
      <div className="d-flex align-items-center">
        <img
          src={`${BASE_URL}${CartItem.product.image}`}
          alt="Product"
          className="img-fluid"
          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }}
        />
        <div className="ms-3">
          <h6 className="mb-0">{CartItem.product.name}</h6>
          <small>Quantity: {CartItem.quantity}</small>
        </div>
      </div>
      <h6>{`$${CartItem.product.price}`}</h6>
    </div>
  );
};

export default OrderItem;