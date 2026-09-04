import React, { useContext, useState } from 'react';
import NavBar from '../ui/NavBar';
import Footer from '../ui/Footer';
import './LoginPage.css';
import api from '../../api';
import Error from '../ui/Error';
import { replace, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
const LoginPage = () => {

    const { isAuthenticated, setIsAuthenticated,get_username } = useContext(AuthContext);

    const location = useLocation()
    const navigate = useNavigate()
    
    const [username, setUserName] = useState("");
     const [password, setPassword] = useState("");
    const [loading,setLoading] = useState(false)
    const [error, setError] = useState("")

    const userInfo = { username, password };

    function handleSubmit(e) { // ✅ Fixed function name
        e.preventDefault(); // ✅ Prevent page refresh
        setLoading(true)

        api.post("token/", userInfo)
            .then(res => {
                console.log(res.data);
                localStorage.setItem("access", res.data.access); // ✅ Updated localStorage key
                localStorage.setItem("refresh", res.data.refresh); // ✅ Updated localStorage key
                setUserName("")
                setPassword("")

                setLoading(false)
                setIsAuthenticated(true)
                setError("")

                const from = location?.state?.from.pathname || "/";
                navigate(from); // ✅ Updated navigation function
                console.log(from)
            })
            .catch(err => {
                console.log(err.message);
                setError(err.message) // ✅ Added error handling
                setLoading(false)
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

                    <form onSubmit={handleSubmit}> {/* ✅ Removed () */}
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

                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>Login</button>
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
