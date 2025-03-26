import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function TambahProduk() {
  const [nama, setNama] = useState("");
  const [Price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nama || !Price) {
      toast.error("Nama dan Price wajib diisi!");
      return;
    }

    const isConfirmed = window.confirm("Yakin ingin menambahkan produk ini?");
    if (!isConfirmed) return;

    axios
      .post("http://localhost:3001/produk", { nama, Price })
      .then(() => {
        toast.success("Produk berhasil ditambah!");
        setNama("");
        setPrice("");
      })
      .catch(() => {
        toast.error("Gagal menambah produk!");
      });
  };

  return (
    <div className="mb-4">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Product Name:</label>
          <input
            type="text"
            className="form-control"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label>Price:</label>
          <input
            type="number"
            className="form-control"
            value={Price}
            onChange={(e) => setPrice(e.target.value)}
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
