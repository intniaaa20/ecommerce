// src/components/ProdukList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProdukList() {
    const [produk, setProduk] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/produk')
            .then((response) => setProduk(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleDelete = (id) => {
        // Tampilkan konfirmasi sebelum menghapus
        const isConfirmed = window.confirm('Apakah Anda yakin ingin menghapus produk ini?');
        if (!isConfirmed) {
            return; // Jika pengguna membatalkan, hentikan proses penghapusan
        }
    
        // Lanjutkan proses penghapusan jika pengguna mengonfirmasi
        axios.delete(`http://localhost:3001/produk/${id}`)
            .then(() => {
                setProduk(produk.filter((p) => p.id !== id));
            })
            .catch((err) => console.error(err));
    };

    const openEditModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        const updatedData = {
            nama: e.target.nama.value,
            harga: e.target.harga.value,
        };

        axios.put(`http://localhost:3001/produk/${selectedProduct.id}`, updatedData)
            .then(() => {
                setProduk(produk.map((p) => 
                    p.id === selectedProduct.id ? { ...p, ...updatedData } : p
                ));
                closeEditModal();
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <h2>Daftar Produk</h2>
            <ul>
                {produk.map((item) => (
                    <li key={item.id}>
                        {item.nama} - Rp{item.harga}
                        <button onClick={() => openEditModal(item)}>Edit</button>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {/* Modal untuk Edit Produk */}
            {isModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h3>Edit Produk</h3>
                        <form onSubmit={handleEdit}>
                            <div>
                                <label>Nama Produk:</label>
                                <input type="text" name="nama" defaultValue={selectedProduct?.nama} required />
                            </div>
                            <div>
                                <label>Harga Produk:</label>
                                <input type="number" name="harga" defaultValue={selectedProduct?.harga} required />
                            </div>
                            <div>
                                <button type="submit">Simpan</button>
                                <button type="button" onClick={closeEditModal}>Batal</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '300px',
    },
};

export default ProdukList;