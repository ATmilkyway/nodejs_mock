const Book = require("../models/Book");
const mongoose = require("mongoose");

// GET all books
const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();
    if (allBooks.length === 0) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "Books not found",
      });
    }
    res.status(200).json({
      success: true,
      data: allBooks,
      message: "Books fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// GET single book
const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Invalid book ID",
      });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
      message: "Book fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

module.exports = { getAllBooks, getSingleBook };
