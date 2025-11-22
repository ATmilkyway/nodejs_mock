const express = require("express");

const router = express.Router();

const Book = require("../models/Book");
const { getAllBooks, getSingleBook } = require("../controller/bookController");

// GET all books
router.get("/", getAllBooks);

// GET book by ID
router.get("/:id", getSingleBook);

// CREATE a book

// DELETE a book by ID

// UPDATE a book by ID

module.exports = router;
