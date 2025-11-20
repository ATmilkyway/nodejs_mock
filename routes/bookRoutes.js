const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getSingleBook,
  addNewBook,
  deleteSingleBook,
  updateSingleBook,
} = require("../controllers/bookController");

// GET all books
router.get("/", getAllBooks);

// GET single book by ID
router.get("/:id", getSingleBook);

// POST new book
router.post("/", addNewBook);

// PATCH update a book by ID
router.patch("/:id", updateSingleBook);

// DELETE a book by ID
router.delete("/:id", deleteSingleBook);

module.exports = router;
