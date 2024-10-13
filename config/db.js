const mongoose = require('mongoose');

// Replace <db_password> with your actual database password
const MONGO_URI = "mongodb+srv://riazmohib:Qbz6KG0cuwa9RiyT@library-cluster.2mmuz.mongodb.net/library?retryWrites=true&w=majority&appName=library-cluster";

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Mongoose connected successfully to the 'library' database!");
  })
  .catch(err => {
    console.error("Mongoose connection failed:", err.message);
  });

// Export the mongoose connection
module.exports = mongoose;
