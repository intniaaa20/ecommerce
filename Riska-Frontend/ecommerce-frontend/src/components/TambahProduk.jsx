import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

function TambahProduk() {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nama || !harga) {
      toast.error("Nama dan harga wajib diisi!");
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
      .catch(() => toast.error("Gagal menambah produk!"));
  };

  return (
    <div className="container mt-4">
      {/* Tabel Add Product dengan tampilan mirip Product List */}
      <table className="table table-bordered">
        <thead className="table-primary text-center">
          <tr>
            <th colSpan="3" className="fs-5">Add Product</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Product Name"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
              />
            </td>
            <td className="text-center">
              <button
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Simpan
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TambahProduk;
