const Book = require("../models/bookModel");

const bookController = {
  addBook: async (req, res) => {
    try {
      const { bookID, author, title, isbn, price, year, publisher, genre } =
        req.body;

      const newBook = await Book.create({
        bookID,
        author,
        title,
        isbn,
        price,
        year,
        publisher,
        genre,
      });

      res.status(201).json(newBook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error", error });
    }
  },

  //mendapatkan semua buku
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  },

  //mendapatkan buku berdasarkan bookID
  getBookById: async (req, res) => {
    try {
      const idBuku = req.params.idBuku;
      const book = await Book.findOne({ bookID: idBuku });

      if (!book) {
        return res
          .status(404)
          .json({ success: false, message: "Book not found" });
      }

      res.status(200).json({ success: true, data: book });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  //diurutkan by genre
  getAllBooksSortedByGenre: async (req, res) => {
    try {
      const books = await Book.find().sort({ genre: 1 }); //mengurutkan genre secara ascending A ke Z
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  },

  searchBook: async (req, res) => {
    const { title } = req.body;
    try {
      const getSpecificBooks = await Book.find({ title: title });

      if (getSpecificBooks.length === 0) {
        res.status(404).json({ message: `No books found. ${title}` });
      } else {
        res.json(getSpecificBooks);
      }
    } catch (err) {
      res.json(err.message);
      console.log(err.message, req.query);
    }
  },

  //update buku berdasarkan ID
  updateBook: async (req, res) => {
    const { idBuku } = req.params;
    const updatedBookData = req.body;

    try {
      const updatedBook = await Book.findOneAndUpdate(
        { bookID: idBuku },
        updatedBookData,
        { new: true }
      );

      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.json(updatedBook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  //menghapus satu buku
  deleteBook: async (req, res) => {
    try {
      const id = req.params.idBuku;
      const book = await Book.findOneAndDelete({ bookID: id });
      if (!book) return res.status(404).json({ message: "Book not found" });
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  },
};

module.exports = bookController;
