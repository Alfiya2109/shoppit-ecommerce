import axios from "axios";
import { jwtDecode } from "jwt-decode";
import mockProducts from "./products_data.json";

export const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8001";

const api = axios.create({
    baseURL: BASE_URL
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const expiry_date = decoded.exp;
                const current_time = Date.now() / 1000;

                if (expiry_date > current_time) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch (e) {
                // Invalid token ignore
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Helper for local cart mock
function getLocalCart() {
    try {
        return JSON.parse(localStorage.getItem("shoppit_cart") || "[]");
    } catch {
        return [];
    }
}

function setLocalCart(cart) {
    localStorage.setItem("shoppit_cart", JSON.stringify(cart));
}

// Fallback interceptor when backend is offline or on hosted static Vercel
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const url = error.config?.url || "";
        const method = (error.config?.method || "get").toLowerCase();

        console.warn(`[Shoppit Fallback Mode] Backend unavailable for ${method.toUpperCase()} ${url}. Serving local data.`);

        // 1. Get products list
        if (url.includes("products/") || url === "products") {
            return Promise.resolve({
                data: mockProducts,
                status: 200,
                statusText: "OK",
                headers: {},
                config: error.config
            });
        }

        // 2. Get product detail
        if (url.includes("product_detail/")) {
            const slug = url.split("product_detail/")[1]?.split("?")[0]?.replace(/\/$/, "");
            const product = mockProducts.find(p => p.slug === slug) || mockProducts[0];
            const similar_products = mockProducts.filter(p => p.id !== product.id && p.category === product.category);
            return Promise.resolve({
                data: {
                    ...product,
                    similar_products: similar_products.length > 0 ? similar_products : mockProducts.filter(p => p.id !== product.id).slice(0, 4)
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config: error.config
            });
        }

        // 3. Product in cart check
        if (url.includes("product_in_cart")) {
            const urlParams = new URLSearchParams(url.split("?")[1] || "");
            const productId = parseInt(urlParams.get("product_id") || "0");
            const cart = getLocalCart();
            const inCart = cart.some(item => item.product?.id === productId);
            return Promise.resolve({
                data: { product_in_cart: inCart },
                status: 200,
                statusText: "OK",
                headers: {},
                config: error.config
            });
        }

        // 4. Add item to cart
        if (url.includes("add_item")) {
            let data = error.config?.data;
            if (typeof data === "string") {
                try { data = JSON.parse(data); } catch {}
            }
            const productId = data?.product_id;
            const product = mockProducts.find(p => p.id === productId);
            if (product) {
                const cart = getLocalCart();
                const existing = cart.find(i => i.product.id === productId);
                if (existing) {
                    existing.quantity += 1;
                    existing.total = existing.quantity * parseFloat(existing.product.price);
                } else {
                    cart.push({
                        id: Date.now(),
                        quantity: 1,
                        product: product,
                        total: parseFloat(product.price)
                    });
                }
                setLocalCart(cart);
            }
            return Promise.resolve({
                data: { message: "Item added successfully!" },
                status: 200,
                statusText: "OK",
                headers: {},
                config: error.config
            });
        }

        // 5. Get cart
        if (url.includes("get_cart") || url.includes("/get_cart/")) {
            const cart = getLocalCart();
            const total = cart.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);
            const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
            return Promise.resolve({
                data: {
                    items: cart,
                    sum_total: total,
                    num_of_items: count
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config: error.config
            });
        }

        // 6. Delete cart item
        if (url.includes("delete_cartitem")) {
            let data = error.config?.data;
            if (typeof data === "string") {
                try { data = JSON.parse(data); } catch {}
            }
            const itemId = data?.item_id;
            let cart = getLocalCart();
            cart = cart.filter(i => i.id !== itemId);
            setLocalCart(cart);
            return Promise.resolve({
                data: { message: "Deleted successfully" },
                status: 200,
                statusText: "OK",
                headers: {},
                config: error.config
            });
        }

        // 7. Update quantity
        if (url.includes("update_quantity")) {
            let data = error.config?.data;
            if (typeof data === "string") {
                try { data = JSON.parse(data); } catch {}
            }
            const itemId = data?.item_id;
            const qty = parseInt(data?.quantity || 1);
            const cart = getLocalCart();
            const item = cart.find(i => i.id === itemId);
            if (item) {
                item.quantity = qty;
                item.total = qty * parseFloat(item.product.price);
                setLocalCart(cart);
            }
            return Promise.resolve({
                data: { message: "Updated", data: item },
                status: 200,
                statusText: "OK",
                headers: {},
                config: error.config
            });
        }

        return Promise.reject(error);
    }
);

export default api;
