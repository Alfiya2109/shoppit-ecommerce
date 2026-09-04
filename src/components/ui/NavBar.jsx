import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import styles from './NavBar.module.css'; // Ensure you have styles imported
import NavBarLink from './NavBarLink';
const NavBar = ({numCartItems}) => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 ${styles.stivkyNavbar}`}>
      <div className="container">
        {/* Brand Name */}
        <Link className="navbar-brand fw-bold text-uppercase" to="/">SHOPPIT</Link>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent" 
          aria-controls="navbarContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

         
        {/* <div className="collapse navbar-collapse" id="navbarContent">
          <NavLink className="nav-link" to="/products">Products</NavLink>
          <NavLink className="nav-link" to="/about">About</NavLink>
          <NavLink className="nav-link" to="/contact">Contact</NavLink> */}

          <NavBarLink/>
          <Link to="/cart" className={`btn btn-dark ms-3 rounded-pill position-relative ${styles.responsiveCart}`}>
            <FaCartShopping />
            {numCartItems == 0 || 
            <span 
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
              style={{ fontSize: '0.85rem', padding: '0.5em 0.65em', backgroundColor: '#605DDC' }}
            >
            {numCartItems} {/* This should be dynamically updated */}
            </span>
            }
          </Link>
        </div>
      {/* </div> */}
    </nav>
  );
};

export default NavBar;
