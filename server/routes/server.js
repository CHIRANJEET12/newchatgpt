import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/server.js'; // Ensure the path is correct for your User model
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

const router = express.Router();

// Middleware to authenticate tokens
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from the header

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

// Sample protected route handler
const protectedRouteHandler = (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
};

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword, // Store hashed password
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log('Retrieved user:', user);

        // Log the hashed password for debugging
        console.log('Hashed password from database:', user.password);
        console.log('Entered password:', password); // Log the entered password


        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match result:', isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Add the protected route for demonstration purposes
router.get('/protected', authenticateToken, protectedRouteHandler);

export default router;
