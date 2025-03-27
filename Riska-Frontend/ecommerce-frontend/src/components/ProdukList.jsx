import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

function ProdukList() {
  const [produk, setProduk] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({ nama: "", harga: "" });

  useEffect(() => {
    axios
      .get("http://localhost:3001/produk")
      .then((response) => setProduk(response.data))
      .catch(() => toast.error("Gagal mengambil data produk!"));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;

    axios
      .delete(`http://localhost:3001/produk/${id}`)
      .then(() => {
        setProduk(produk.filter((p) => p.id !== id));
        toast.success("Produk berhasil dihapus!");
      })
      .catch(() => toast.error("Gagal menghapus produk!"));
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedProduct({ nama: "", harga: "" });
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm("Apakah Anda yakin ingin menyimpan perubahan ini?");
    if (!isConfirmed) return;

    const updatedData = {
      nama: e.target.nama.value,
      harga: e.target.harga.value,
    };

    axios
      .put(`http://localhost:3001/produk/${selectedProduct.id}`, updatedData)
      .then(() => {
        setProduk(produk.map((p) => (p.id === selectedProduct.id ? { ...p, ...updatedData } : p)));
        closeEditModal();
        toast.success("Produk berhasil diperbarui!");
      })
      .catch(() => toast.error("Gagal memperbarui produk!"));
  };

  return (
    <div className="mt-4">
      <div className="card p-3 shadow-sm">
        <h2 className="mb-3 text-center">Product List</h2>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-primary text-center">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {produk.map((item) => (
                <tr key={item.id}>
                  <td className="align-middle">{item.nama}</td>
                  <td className="align-middle">Rp{item.harga}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => openEditModal(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Produk</h5>
                <button type="button" className="btn-close" onClick={closeEditModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEdit}>
                  <div className="mb-3">
                    <label className="form-label">Nama Produk:</label>
                    <input type="text" name="nama" className="form-control" defaultValue={selectedProduct.nama} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Harga Produk:</label>
                    <input type="number" name="harga" className="form-control" defaultValue={selectedProduct.harga} required />
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-success">Simpan</button>
                    <button type="button" className="btn btn-secondary" onClick={closeEditModal}>Batal</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProdukList;
