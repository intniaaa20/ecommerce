import React, { useState } from "react";
import TambahProduk from "./components/TambahProduk";
import ProdukList from "./components/ProdukList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  // State untuk menu yang aktif
  const [activeMenu, setActiveMenu] = useState("Admin Panel");

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <h2 className="logo">Intaristaurant</h2>
          <ul className="menu">
            {["Admin Panel", "Home", "About", "Order Now", "Contact"].map((menu) => (
              <li key={menu}>
                <a
                  href="#"
                  className={activeMenu === menu ? "active" : ""}
                  onClick={() => setActiveMenu(menu)}
                >
                  {menu}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h1>Welcome to Intaristaurant</h1>
        <p>Savor delicious flavors at the best prices!</p>
      </header>

      {/* Konten */}
      <div className="container mt-4">
        <div className="content-grid">
          <TambahProduk />
          <ProdukList />
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}

export default App;
