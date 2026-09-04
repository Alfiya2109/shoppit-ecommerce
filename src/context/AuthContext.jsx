import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Ensure this is installed: npm install jwt-decode
import api from "../api";

// Create the AuthContext
const AuthContext = createContext(false);


function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username,SetUsername] = useState("")

  const handleAuth = () => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const expiry_date = decoded.exp;
        const current_time = Date.now() / 1000; // Convert to seconds

        if (expiry_date >= current_time) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("access"); // Remove expired token
        }
      } catch (error) {
        console.error("Invalid token", error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  function get_username(){
    api.get("get_username")
    .then(res => 
        SetUsername(res.data.username)
    )
    .catch(err => {
        console.error(err.message);
    });
  }

  useEffect(() => {
    handleAuth(); // Check authentication on mount
    get_username()
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated,username, setIsAuthenticated, get_username }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
