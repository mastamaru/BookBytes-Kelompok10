const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookID: {
        type: String,
        ref: 'Book'
    },
    quantity: {
        type: Number,
        required: true
    }
});

const transactionSchema = new mongoose.Schema({
    idTransaction: {
        type: String,
        unique: true, // Pastikan ID transaksi unik
    },
    books: [bookSchema],
    totalPrice: {
        type: Number,
        required: true
    },
    employeeID: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Tambahkan hook pre('save') untuk menghasilkan ID transaksi dengan format yang diinginkan
transactionSchema.pre('save', async function (next) {
    if (!this.idTransaction) {
        try {
            const count = await this.constructor.countDocuments();
            this.idTransaction = `TRX${count + 1}`;
            next();
        } catch (err) {
            return next(err);
        }
    } else {
        next();
    }
});


module.exports = mongoose.model('Transaction', transactionSchema);
