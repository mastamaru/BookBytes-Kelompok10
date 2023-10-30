const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController'); // Asumsikan path relatif ini sesuai dengan struktur direktori Anda

//menambahkan buku
router.post('/', bookController.addBook);

// Mendapatkan semua buku
router.get('/', bookController.getAllBooks);

// Sort by genre
router.get('/sort/genre', bookController.getAllBooksSortedByGenre);

// search
router.get('/search', bookController.searchBook);

// Mendapatkan buku berdasarkan bookID
router.get('/:idBuku', bookController.getBookById);

// Menghapus buku berdasarkan idBuku
router.delete('/:idBuku', bookController.deleteBook);

// Update buku
router.put('/:idBuku', bookController.updateBook);

//filter by genre
router.get('/genre/:genre', bookController.filterByGenre);

module.exports = router;
