const Book = require("../models/Book");
const mongoose = require("mongoose");

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();

    // No books found
    if (allBooks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No books found",
        data: { books: [] },
      });
    }

    // Books found
    return res.status(200).json({
      success: true,
      message: "All books fetched",
      data: { books: allBooks },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
      error: error.message,
    });
  }
};

// Get book by Id
const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid ID",
        data: null,
      });
    }

    // Fetch book
    const book = await Book.findById(id);

    // Not found
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
    }

    // Found
    return res.status(200).json({
      success: true,
      message: "Book found",
      data: { book },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching the book",
      data: null,
      error: error.message,
    });
  }
};

module.exports = { getAllBooks, getSingleBook };
