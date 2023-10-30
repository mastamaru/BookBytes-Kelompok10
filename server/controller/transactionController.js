const Transaction = require("../models/transactionModel");
const Book = require("../models/bookModel");

const transactionController = {
  createTransaction: async (req, res) => {
    try {
      const { idTransaction, books, employeeID } = req.body;

      let totalPrice = 0;

      for (let i = 0; i < books.length; i++) {
        const book = await Book.findOne({ bookID: books[i].bookID }); // Cari buku berdasarkan bookID
        if (!book) {
          return res.status(400).json({
            success: false,
            message: `Book with ID ${books[i].bookID} not found`,
          });
        }
        totalPrice += book.price * books[i].quantity;
      }

      const transaction = new Transaction({
        idTransaction,
        books,
        totalPrice,
        employeeID,
      });

      await transaction.save();
      res.status(201).json({ success: true, data: transaction });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  getAllTransactions: async (req, res) => {
    try {
      const transactions = await Transaction.find({});

      // Dapatkan semua bookID dari semua transaksi
      const bookIDs = [];
      transactions.forEach((transaction) => {
        transaction.books.forEach((book) => {
          if (!bookIDs.includes(book.bookID)) {
            bookIDs.push(book.bookID);
          }
        });
      });

      // Dapatkan judul buku dari semua bookID yang unik
      const books = await Book.find({ bookID: { $in: bookIDs } });

      // Map judul buku ke setiap transaksi
      const mappedTransactions = transactions.map((transaction) => {
        const mappedBooks = transaction.books.map((book) => {
          const matchedBook = books.find((b) => b.bookID === book.bookID);
          return {
            ...book._doc,
            title: matchedBook ? matchedBook.title : "Unknown",
          };
        });
        return {
          ...transaction._doc,
          books: mappedBooks,
        };
      });

      res.status(200).json(mappedTransactions);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error retrieving transactions", error: err });
    }
  },
  // Update untuk fungsi updateTransaction
  updateTransaction: async (req, res, next) => {
    // Tambahkan next untuk middleware
    try {
      const { idTransaction } = req.params;
      const updatedData = req.body;

      // Cek apakah transaksi ada
      const transactionExists = await Transaction.findOne({ idTransaction });
      if (!transactionExists) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      // Hitung ulang totalPrice berdasarkan books yang baru
      let updatedTotalPrice = 0;
      for (let i = 0; i < updatedData.books.length; i++) {
        const book = await Book.findOne({
          bookID: updatedData.books[i].bookID,
        });
        if (!book) {
          return res.status(400).json({
            success: false,
            message: `Book with ID ${updatedData.books[i].bookID} not found`,
          });
        }
        updatedTotalPrice += book.price * updatedData.books[i].quantity;
      }

      // Tambahkan updatedTotalPrice ke updatedData
      updatedData.totalPrice = updatedTotalPrice;

      const updatedTransaction = await Transaction.findOneAndUpdate(
        { idTransaction: idTransaction },
        updatedData,
        { new: true }
      );

      res.status(200).json({ success: true, data: updatedTransaction });
    } catch (error) {
      next(error); // Gunakan middleware untuk menangani error
    }
  },

  //delete transaction by id
  deleteTransaction: async (req, res) => {
    try {
      const { idTransaction } = req.params; // Ganti transactionId ke idTransaction untuk konsistensi
      const deletedTransaction = await Transaction.findOneAndDelete({
        idTransaction: idTransaction,
      }); // Ganti ini

      if (!deletedTransaction)
        return res.status(404).json({ message: "Transaction not found" });
      res.status(200).json(deletedTransaction);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = transactionController;
