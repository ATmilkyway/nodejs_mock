const express = require("express");

const router = express.Router();

const Book = require("../models/Book");
const {
  getAllBooks,
  getSingleBook,
  createSingleBook,
  deleteSingleBook,
} = require("../controller/bookController");

// GET all books
router.get("/", getAllBooks);

// GET book by ID
router.get("/:id", getSingleBook);

// CREATE a book
router.post("/", createSingleBook);

// DELETE a book by ID
router.delete("/:id", deleteSingleBook);

// UPDATE a book by ID

module.exports = router;
