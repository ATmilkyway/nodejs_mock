const express = require("express");
const router = express.Router();
const { getAllBooks, getSingleBook } = require("../controllers/bookController");

// GET all books
router.get("/", getAllBooks);

// GET single book by ID
router.get("/:id", getSingleBook);

// POST new book
router.post("/", (req, res) => {});

// PATCH update a book by ID
router.patch("/:id", (req, res) => {});

// DELETE a book by ID
router.delete("/:id", (req, res) => {});

module.exports = router;
