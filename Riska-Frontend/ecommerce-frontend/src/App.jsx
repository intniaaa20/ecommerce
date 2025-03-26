import React from "react";
import TambahProduk from "./components/TambahProduk";
import ProdukList from "./components/ProdukList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <h2 className="logo">Intaris</h2>
          <ul className="menu">
            <li><a href="#" className="active">Beranda</a></li>
            <li><a href="#">Produk</a></li>
            <li><a href="#">Tentang</a></li>
            <li><a href="#">Kontak</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h1>Selamat Datang di Intaris Shop</h1>
        <p>Temukan produk berkualitas dengan harga terbaik</p>
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
