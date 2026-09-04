import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../ui/NavBar";
import Footer from "../ui/Footer";
import api from "../../api";
import "./Registerpage.css";  

const RegisterPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    state: "",
    address: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
        alert("⚠️ Passwords do not match!");
        setLoading(false);
        return;
    }

    try {
        const response = await api.post("register/", {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            password2: formData.confirmPassword,
            city: formData.city,
            state: formData.state,
            address: formData.address,
            phone: formData.phone,
        });

        setSuccess(response.data.message);
        setError("");
        setLoading(false);

        setTimeout(() => {
            navigate("/login"); // ✅ Redirect to login page after success
        }, 2000);
    } catch (err) {
        if (err.response) {
            const errorData = err.response.data;
            let errorMessage = "";

            // ✅ Handle specific errors from backend
            if (errorData.username) {
                errorMessage += `⚠️ ${errorData.username[0]}\n`;
            }
            if (errorData.phone) {
                errorMessage += `⚠️ ${errorData.phone[0]}\n`;
            }
            if (errorData.email) {
                errorMessage += `⚠️ ${errorData.email[0]}\n`;
            }

            alert(errorMessage || "⚠️ Registration failed! Try again.");
        } else {
            alert("⚠️ Server error! Please try again later.");
        }
        setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="register-container">
        <div className="register-card">
          {success && <p className="success-message">{success}</p>}

          <h2 className="register-title">Create an Account</h2>
          <p className="register-subtitle">Sign up to continue</p>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group-container">
              <div className="form-group">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group-container">
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input type="password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group-container">
              <div className="form-group">
                <label className="form-label">City</label>
                <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className="form-label">State</label>
                <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group-container">
              <div className="form-group half-width">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
              </div>

              <div className="form-group half-width">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="register-footer">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
