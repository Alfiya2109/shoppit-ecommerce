import React from "react"; // ✅ Import React to fix the error
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min"; // ✅ Import Bootstrap JS
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
