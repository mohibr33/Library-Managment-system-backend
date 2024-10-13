const express = require('express');
const { addBook, getAllBooks, updateBook, deleteBook } = require('../controllers/bookController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware'); // Ensure both middleware are imported

const router = express.Router();

// Add a new book (Only accessible by admin)
router.post('/', authMiddleware, adminMiddleware, addBook);

// Get all books
router.get('/', authMiddleware, getAllBooks);

// Update a book by ID (Only accessible by admin)
router.put('/:id', authMiddleware, adminMiddleware, updateBook);

// Delete a book by ID (Only accessible by admin)
router.delete('/:id', authMiddleware, adminMiddleware, deleteBook);

// Export the router
module.exports = router;
