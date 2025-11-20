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
        message: "No books were found",
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

// GET single book by ID
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

// POST new book
const addNewBook = async (req, res) => {
  try {
    const book = req.body;
    if (!book || Object.keys(book).length === 0) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Please provide book data",
      });
    }

    const newBook = await Book.create(book);

    res.status(201).json({
      success: true,
      data: newBook,
      message: "Book added successfully",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Collect all validation error messages
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        data: null,
        message: messages,
      });
    }
    res.status(500).json({
      success: false,
      data: null,
      message: error.message || "Server Error",
    });
  }
};

// Delete book by ID
const deleteSingleBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Invalid book ID",
      });
    }

    const book = await Book.findByIdAndDelete({ _id: id });
    if (!book) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

module.exports = { getAllBooks, getSingleBook, addNewBook, deleteSingleBook };
