import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function TambahProduk() {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nama || !harga) {
      toast.error("Nama dan Harga wajib diisi!");
      return;
    }

    const isConfirmed = window.confirm("Yakin ingin menambahkan produk ini?");
    if (!isConfirmed) return;

    axios
      .post("http://localhost:3001/produk", { nama, harga })
      .then(() => {
        toast.success("Produk berhasil ditambah!");
        setNama("");
        setHarga("");
      })
      .catch(() => {
        toast.error("Gagal menambah produk!");
      });
  };

  return (
    <div className="mb-4">
      <h2>Tambah Produk</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Nama Produk:</label>
          <input
            type="text"
            className="form-control"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label>Harga:</label>
          <input
            type="number"
            className="form-control"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
          />
        </div>
        <button 
          type="submit" 
          style={{
            backgroundColor: "#001f41", 
            color: "white", 
            border: "none", 
            padding: "10px 15px", 
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Simpan
        </button>
      </form>
    </div>
  );
}

export default TambahProduk;
