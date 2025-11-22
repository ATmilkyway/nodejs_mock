const express = require("express");

const router = express.Router();

const Book = require("../models/Book");
const {
  getAllBooks,
  getSingleBook,
  createSingleBook,
} = require("../controller/bookController");

// GET all books
router.get("/", getAllBooks);

// GET book by ID
router.get("/:id", getSingleBook);

// CREATE a book
router.post("/", createSingleBook);

// DELETE a book by ID

// UPDATE a book by ID

module.exports = router;
