import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode"; // ✅ Added missing import
import { Navigate, useLocation } from 'react-router-dom';
import api from '../../api';
import Spinner from './Spinner';
import NavBar from './NavBar';
import Footer from './Footer';

const ProtectedRoute = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const location = useLocation();

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    async function refreshToken() {
        const refreshToken = localStorage.getItem("refresh");

        if (!refreshToken) {
            setIsAuthorized(false);
            return;
        }

        try {
            const res = await api.post("/token/refresh/", { refresh: refreshToken });

            if (res.status === 200) {
                localStorage.setItem("access", res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            setIsAuthorized(false);
        }
    }

    async function auth() {
        const token = localStorage.getItem("access");

        if (!token) {
            setIsAuthorized(false);
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const expiry_date = decoded.exp;
            const current_time = Date.now() / 1000;

            if (current_time > expiry_date) {
                await refreshToken();
            } else {
                setIsAuthorized(true);
            }
        } catch (error) {
            console.error("Error decoding token:", error);
            setIsAuthorized(false);
        }
    }

    if (isAuthorized === null) {
        return <Spinner />;
    }

    return (
        <>
            {/* <NavBar /> */}
            {isAuthorized ? children : <Navigate to="/login" state={{ from: location }} replace />}
            {/* <Footer /> */}
        </>
    );
};

export default ProtectedRoute;
