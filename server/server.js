import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken'; // Import the JWT library
import authRoutes from './routes/server.js'; 
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json()); // Using body-parser to parse JSON requests
app.use(express.json()); // Body parser for JSON in request body

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { // Use environment variable for the connection string
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB Atlas connected"); // Log success message on connection
})
.catch(err => {
    console.error("MongoDB connection error:", err); // Log error if connection fails
});

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from header

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user; // Attach the user to the request object
        next(); // Call the next middleware
    });
};

// Define a sample protected route handler
const protectedRouteHandler = (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
};

// Use this middleware in your protected routes
app.get('/api/protected-route', authenticateToken, protectedRouteHandler); // Changed to GET for consistency

// Use the authentication routes
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
