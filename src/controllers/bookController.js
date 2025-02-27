import { Book } from "../models/Book.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();

    return res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Handles the creation of a new book.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing book data.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the book is created.
 */
export const postBook = async (req, res) => {
  try {
    const book = req.body;
    const newBook = new Book(book);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
