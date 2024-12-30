const pool = require('../config/db');

const submitContactForm = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO contact_submissions (name, email, message) VALUES ($1, $2, $3) RETURNING *',
            [name, email, message]
        );

        res.status(201).json({ message: 'Message submitted successfully', contact: result.rows[0] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { submitContactForm };
