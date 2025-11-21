const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      minlength: [1, "Title must not be empty"],
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
      minlength: [1, "Author must not be empty"],
      maxlength: [150, "Author cannot exceed 150 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [1, "Description must not be empty"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    pages: {
      type: Number,
      min: [1, "A book must have at least 1 page"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
