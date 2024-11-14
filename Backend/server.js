const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB with retry logic
const connectToDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB connected'))
        .catch(err => {
            console.error('MongoDB connection error:', err);
            setTimeout(connectToDatabase, 5000); // Retry after 5 seconds
        });
};
connectToDatabase();

// Middleware
app.use(cors({
    origin: 'https://grocery-website-1.onrender.com',
    credentials: true,
}));
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth.js');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Central error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log("Shutting down gracefully...");
    mongoose.connection.close().then(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
    });
});



const PORT = process.env.PORT_B || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
