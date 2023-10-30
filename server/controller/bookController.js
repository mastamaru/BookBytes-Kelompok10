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
  //filter berdasarkan genre
  filterByGenre: async (req, res) => {
    const genre = req.params.genre;

    if (!genre) {
        return res.status(400).json({ message: "Please provide a genre to filter by." });
    }

    try {
        const booksByGenre = await Book.find({ genre: { $regex: new RegExp("^" + genre + "$", "i") } });

        if (booksByGenre.length === 0) {
            res.status(404).json({ message: `No books found for the genre: ${genre}` });
        } else {
            res.json(booksByGenre);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.error("Error in filterByGenre:", err.message, req.params);
    }
},
//mencari buku berdasarkan judul contoh "naga" maka buku yang mengandung judul naga akan tertampil
  searchBook: async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Please provide a book title to search." });
    }

    try {
        const getSpecificBooks = await Book.find({ title: { $regex: new RegExp(title, "i") } });

        if (getSpecificBooks.length === 0) {
            res.status(404).json({ message: `No books found with the title: ${title}` });
        } else {
            res.json(getSpecificBooks);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.error("Error in searchBook:", err.message, req.body);
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

  //menghapus satu buku berdasarkan id yang dipilih
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
