const mongoose = require("mongoose");
const Book = require("../models/Book");

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

// Create book
const createSingleBook = async (req, res) => {
  try {
    const bookData = req.body;

    // Validate incoming data
    if (!bookData || Object.keys(bookData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please fill the required book data",
        data: null,
      });
    }

    // Create book
    const newBook = await Book.create(bookData);

    return res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: { book: newBook },
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const fieldMessages = Object.values(error.errors).map(
        (err) => err.properties.message
      );

      return res.status(400).json({
        success: false,
        message: "Invalid book data",
        errors: {
          type: "ValidationError",
          fieldMessages,
        },
        data: null,
      });
    }

    // Handle other errors
    return res.status(500).json({
      success: false,
      message: "Error while creating a book",
      data: null,
      error: error._message || error.message || "Unknown error",
    });
  }
};

// Delete book
const deleteSingleBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID",
        data: null,
      });
    }

    // Find and delete book
    const book = await Book.findOneAndDelete({ _id: id });

    // Not found
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
    }

    // Successfully deleted
    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      data: null,
      error: error.message,
    });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  createSingleBook,
  deleteSingleBook,
};
