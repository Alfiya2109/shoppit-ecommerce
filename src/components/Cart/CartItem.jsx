import React, { useState } from 'react';
import api, { BASE_URL } from '../../api';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import NavBar from '../ui/NavBar';

const CartItem = ({ item, setCartTotal,setCartItems, cartItems, setNumCartItems }) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const [loading, setLoading] = useState(false);
    const itemData = { quantity: quantity, item_id: item.id };
    const itemID = { item_id: item.id };

    function deleteCartItem() {
        const confirmDelete = window.confirm("Are you sure you want to delete this cart item?");
        toast.success("CartItem deleted successfully");      
           if (confirmDelete) {
            api.post("delete_cartitem/", itemID)
                .then(res => {

                    console.log(res.data);
                    setCartItems(cartItems.filter(CartItem => CartItem.id != item.id));
                    setCartTotal(cartItems.filter(CartItem => CartItem.id != item.id)
                    .reduce((acc, curr) => acc + curr.total, 0));

                setNumCartItems(cartItems.filter((cartItem) => cartItem.id != item.id )
                .reduce((acc, curr) => acc + curr.quantity, 0));
                })
                .catch(err => {
                    console.log(err.message);
                });
        }
    }

    function updateCartItem() {
        setLoading(true);
        api.patch("update_quantity/", itemData)
            .then(res => {
                console.log(res.data);
                setLoading(false);
                toast.success("Product updated successfully!");
                console.log("Update function called");

                setCartTotal(cartItems.map((cartItem) => cartItem.id === item.id ? res.data.data : cartItem)
                    .reduce((acc, curr) => acc + curr.total, 0));

                setNumCartItems(cartItems.map((cartItem) => cartItem.id === item.id ? res.data.data : cartItem)
                .reduce((acc, curr) => acc + curr.quantity, 0));

            })
            .catch(err => {
                console.error("Error updating cart item:", err.message);
                setLoading(false);
                toast.error("Error updating product"); // Added toast for error case
            });
    }

    return (
        <>
        {/* <NavBar/> */}
        <div className="col-md-12">
            {/* Cart Item */}
            <div
                className="cart-item d-flex align-items-center mb-3 p-3"
                style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}
            >
                <img
                    src={item.product?.image ? (item.product.image.startsWith('http') ? item.product.image : `${BASE_URL}/${item.product.image}`) : '/default-image.jpg'}
                    alt={item.product?.name || "Product Image"}
                    className="img-fluid"
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }}
                />
                <div className="ms-3 flex-grow-1">
                    <h5 className="mb-1">{item.product.name}</h5>
                    <p className="mb-0 text-muted">{`$${item.product.price}`}</p>
                </div>
                <div className="d-flex align-items-center">
                    <input
                        type="number"
                        min="1"
                        className="form-control me-3"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        style={{ width: '70px' }}
                    />
                    <button className="btn btn-sm mx-2"
                        // onClick={updateCartItem}
                        onClick={() => {
                            updateCartItem();
                            alert('Your cart item has been updated successfully!');
                        }}
                        style={{ backgroundColor: '#007bff', color: '#ffffff' }} disabled={loading}>
                        {loading ? "Updating" : "Update"}
                    </button>

                    <button className="btn btn-danger btn-sm"                         
                    onClick={() => {
                            deleteCartItem();
                            alert('Your cart item has been remove successfully!');
                        }}>Remove</button>
                </div>
            </div>
            {/* Add more cart items here */}
        </div>
        </>
    );
};

export default CartItem; // Ensure CartItem is defined before exporting