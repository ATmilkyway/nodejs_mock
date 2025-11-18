const express = require("express");
const router = express.Router();

// GET all books
router.get("/", (req, res) => {});

// GET single book by ID
router.get("/:id", (req, res) => {});

// POST new book
router.post("/", (req, res) => {});

// PATCH update a book by ID
router.patch("/:id", (req, res) => {});

// DELETE a book by ID
router.delete("/:id", (req, res) => {});

module.exports = router;
