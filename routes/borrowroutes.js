const express = require('express');
const { borrowBook, returnBook, getUserBorrows } = require('../controllers/borrowController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Borrow a book
router.post('/', authMiddleware, borrowBook);

// Return a book
router.put('/:id', authMiddleware, returnBook);

// Get all borrow records for a user
router.get('/:userId', authMiddleware, getUserBorrows);

module.exports = router;
