const Borrow = require('../models/borrow');
const Book = require('../models/book');

// Borrow a book
const borrowBook = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    // Check if the book is available
    const book = await Book.findById(bookId);
    if (!book || !book.available) {
      return res.status(400).json({ message: 'Book is not available' });
    }

    // Create a borrow record
    const borrow = new Borrow({
      user: userId,
      book: bookId,
    });

    // Mark the book as unavailable
    book.available = false;
    await book.save();
    await borrow.save();

    res.status(201).json({ message: 'Book borrowed successfully', borrow });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Return a book
const returnBook = async (req, res) => {
  const { id } = req.params;

  try {
    const borrow = await Borrow.findById(id).populate('book');
    if (!borrow) {
      return res.status(404).json({ message: 'Borrow record not found' });
    }

    // Update the book status to available
    borrow.book.available = true;
    await borrow.book.save();

    // Set the return date
    borrow.returnDate = new Date();
    await borrow.save();

    res.status(200).json({ message: 'Book returned successfully', borrow });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all borrow records for a user
const getUserBorrows = async (req, res) => {
  const { userId } = req.params;

  try {
    const borrows = await Borrow.find({ user: userId }).populate('book');
    res.status(200).json(borrows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { borrowBook, returnBook, getUserBorrows };
