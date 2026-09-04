import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const NavBarLink = () => {
  const { isAuthenticated, setIsAuthenticated, username } = useContext(AuthContext);
  const navigate = useNavigate(); // ✅ useNavigate hook

  function logout() {
    localStorage.removeItem("access");
    setIsAuthenticated(false);
  }

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
      {isAuthenticated ? (
        <>
          <li className="nav-item">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"
              }
            >
              {`Hi ${username}`}
            </NavLink>
          </li>

          <li className="nav-item" onClick={logout}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"
              }
            >
              Logout
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li className="nav-item">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"
              }
            >
              Login
            </NavLink>
          </li>

          {/* 🔹 Register Button with Redirect */}
          <li className="nav-item">
            <button
              className="nav-link fw-semibold btn btn-link"
              onClick={() => navigate("/register")} // ✅ Redirect to Register
              style={{ border: "none", background: "none", cursor: "pointer" }}
            >
              Register
            </button>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavBarLink;
