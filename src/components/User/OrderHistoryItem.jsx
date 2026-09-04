import React from "react";
import styles from "./OrderHistoryItem.module.css"; // Ensure the CSS module exists

const OrderHistoryItem = ({ item }) => {
    console.log(item)
  return (
    <div className="card-body">
      {/* Order Item */}
      <div className={`order-item mb-3 ${styles.orderItem}`}>
        <div className="row">
          {/* Product Image */}
          <div className="col-md-2">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="img-fluid"
              style={{ borderRadius: "5px" }}
            />
          </div>

          {/* Product Details */}
          <div className="col-md-6">
            <h6>{item.product.name}</h6>
            <p>{`Order Date: ${item.order_date}`}</p>
            <p>{`Order ID: ${item.order_id}`}</p>
          </div>

          {/* Quantity */}
          <div className="col-md-2 text-center">
            <h6 className="text-muted">{`Quantity: ${item.quantity}`}</h6>
          </div>

          {/* Price */}
          <div className="col-md-2 text-center">
            <h6 className="text-muted">{`$${item.product.price}`}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryItem;
