const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/dbConfig');
const categoryRoutes = require('./routes/categoriesRoutes');
const requestRoutes = require('./routes/requestsRoutes')
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(helmet()); // Security middleware
app.use(morgan('combined')); // Logging middleware
app.use(cors());

// Connect to MongoDB Atlas
connectDB();

// Routes
app.use('/api', categoryRoutes);
app.use('/api', requestRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
