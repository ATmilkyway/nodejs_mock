const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title required"],
      minlength: [2, "Book title must be at least 2 characters"],
      maxlength: [100, "Book title must be at most 100 characters"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author required"],
      trim: true,
    },
    publishedYear: {
      type: Number,
      required: [true, "Published year required"],
      min: [0, "Year must be greater than 0"],
      max: [
        new Date().getFullYear(),
        `Year must be less than ${new Date().getFullYear()}`,
      ],
    },
    genre: {
      type: [String],
    },
    pages: {
      type: Number,
      required: [true, "Pages required"],
      min: [1, "Minimum page is 1"],
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

// Log schema info
// console.log("Book model:", Book);
// console.log("Title validators:", bookSchema.path("title").validators);
// console.log("Genre validators:", bookSchema.path("genre").validators);

module.exports = Book;
