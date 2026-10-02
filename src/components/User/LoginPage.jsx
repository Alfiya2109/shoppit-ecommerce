import React, { useContext, useState } from 'react';
import NavBar from '../ui/NavBar';
import Footer from '../ui/Footer';
import './LoginPage.css';
import api from '../../api';
import Error from '../ui/Error';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {

    const { setIsAuthenticated } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    
    // Pre-fill demo credentials so users can log in effortlessly
    const [username, setUserName] = useState("admin");
    const [password, setPassword] = useState("admin123");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const userInfo = { username, password };

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        api.post("token/", userInfo)
            .then(res => {
                console.log("Login Success:", res.data);
                localStorage.setItem("access", res.data.access);
                localStorage.setItem("refresh", res.data.refresh);
                setUserName("");
                setPassword("");

                setLoading(false);
                setIsAuthenticated(true);
                setError("");

                const from = location?.state?.from.pathname || "/";
                navigate(from);
            })
            .catch(err => {
                console.error("Login Error:", err.message);
                setError("Invalid credentials or server error");
                setLoading(false);
            });
    }

    return (
        <>
            <NavBar />
            <div className="login-container my-5">
                <div className="login-card shadow">
                    {error && <Error error={error}/>}
                    <h2 className="login-title">Welcome Back</h2>
                    <p className="login-subtitle">Please login to your account</p>

                    <div className="demo-badge-box">
                        <div className="demo-badge-title">🔑 Demo Credentials:</div>
                        <div className="demo-badge-text">Username: <code>admin</code> &nbsp;|&nbsp; Password: <code>admin123</code></div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input 
                                type="text"  
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                className="form-control" 
                                id="username" 
                                placeholder="Enter your username" 
                                required 
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                type="password"  
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control" 
                                id="password" 
                                placeholder="Enter your password" 
                                required 
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p><a href="#">Forgot Password?</a></p>
                        <p>Don't have an account? <a href="#">Sign up</a></p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LoginPage;
