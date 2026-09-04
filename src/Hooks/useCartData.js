import { useEffect, useState } from "react";
import api from "../api";

function userCartData() {
    const [cart_code, setCartCode] = useState(localStorage.getItem("cart_code") || "");
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0.00);
    const tax = 4.00;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!cart_code) {
            console.warn("No cart_code found in localStorage");
            return; // ✅ Prevent API call if `cart_code` is missing
        }

        console.log("Fetching cart for:", cart_code); // ✅ Debugging log

        setLoading(true);
        api.get(`/get_cart/?cart_code=${cart_code}`) // ✅ Correct API endpoint
            .then(res => {
                console.log("Cart Data:", res.data); // ✅ Debugging log
                setLoading(false);
                setCartItems(res.data.items || []); // ✅ Prevents undefined issues
                setCartTotal(res.data.sum_total || 0); // ✅ Prevents errors if `sum_total` is missing
            })
            .catch(err => {
                console.error("Error fetching cart:", err.response?.data || err.message);
                setLoading(false);
            });
    }, [cart_code]); // ✅ Reacts to `cart_code` changes

    return { cartItems, setCartItems, cartTotal, setCartTotal, loading, tax };
}

export default userCartData;
