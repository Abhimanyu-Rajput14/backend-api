const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields (username, email, password) are required' });
    }

    try {
        // Check if the email is already registered
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Email is already in use. Please choose a different email.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: 'User created successfully', user: result.rows[0] });
    } catch (error) {
        console.error('Signup error: ', error);
        if (error.code === '23505') {
            // This handles duplicate entries if any unique constraint fails (e.g., email)
            return res.status(400).json({ message: 'Duplicate entry detected, please try again.' });
        }
        res.status(500).json({ message: 'Internal server error during signup', error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Both email and password are required' });
    }

    try {
        // Check if the user exists
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password. Please check your credentials.' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password. Please check your credentials.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error: ', error);
        if (error instanceof SyntaxError) {
            return res.status(400).json({ message: 'Bad request, invalid input' });
        }
        res.status(500).json({ message: 'Internal server error during login', error: error.message });
    }
};

module.exports = { signup, login };
