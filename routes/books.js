const express = require("express");

const router = express.Router();

// GET all books
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      books: [
        { id: 1, title: "One" },
        { id: 2, title: "Two" },
      ],
    },
  });
});

// GET book by ID

// CREATE a book

// DELETE a book by ID

// UPDATE a book by ID

module.exports = router;
