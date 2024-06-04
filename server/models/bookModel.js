const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookID: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    publisher: {
        type: String,
        required: true
    }, 
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    imgUrl: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Book', bookSchema);