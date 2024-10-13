const express = require('express');
const mongoose = require('./config/db'); // Connect to the database
const { authMiddleware, adminMiddleware } = require('./middleware/authMiddleware'); // Import middleware
const bookRoutes = require('./routes/bookRoutes'); // Adjust the path as necessary
const userRoutes = require('./routes/userRoutes'); // Adjust the path as necessary
const borrowRoutes = require('./routes/borrowroutes'); // Adjust the path as necessary

const app = express();

// Middleware
app.use(express.json());

// JWT Secret Key (replace with a secure key in production)
const JWT_SECRET = 'your_jwt_secret_key_here';

// Use routes
app.use('/api/books', authMiddleware, adminMiddleware, bookRoutes); // Protecting book routes
app.use('/api/users', userRoutes); // Just use user routes without passing JWT_SECRET
app.use('/api/borrows', authMiddleware, borrowRoutes); // Protecting borrow routes

// Example route
app.get('/', (req, res) => {
  res.send('MongoDB is connected!');
});

// Start the server
app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
