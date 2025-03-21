// index.js (gabungan)
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
    res.send('Hello World from Express.js!');
});

// Contoh POST endpoint
app.post('/data', (req, res) => {
    const { nama } = req.body;
    res.send(`Data diterima: ${nama}`);
});

// CREATE - Tambah produk baru
app.post('/produk', async (req, res) => {
    const { nama, harga } = req.body;
    try {
        const newProduk = await pool.query(
            'INSERT INTO produk (nama, harga) VALUES ($1, $2) RETURNING *',
            [nama, harga]
        );
        res.json(newProduk.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// READ - Ambil semua produk
app.get('/produk', async (req, res) => {
    try {
        const allProduk = await pool.query('SELECT * FROM produk');
        res.json(allProduk.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// UPDATE - Perbarui produk berdasarkan ID
app.put('/produk/:id', async (req, res) => {
    const { id } = req.params;
    const { nama, harga } = req.body;
    try {
        const updateProduk = await pool.query(
            'UPDATE produk SET nama = $1, harga = $2 WHERE id = $3 RETURNING *',
            [nama, harga, id]
        );
        if (updateProduk.rows.length === 0) {
            return res.status(404).json({ error: 'Produk tidak ditemukan' });
        }
        res.json(updateProduk.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE - Hapus produk berdasarkan ID
app.delete('/produk/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProduk = await pool.query('DELETE FROM produk WHERE id = $1 RETURNING *', [id]);
        if (deleteProduk.rows.length === 0) {
            return res.status(404).json({ error: 'Produk tidak ditemukan' });
        }
        res.json({ message: 'Produk dihapus' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});