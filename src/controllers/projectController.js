const pool = require('../config/db');

const addProject = async (req, res) => {
    const { title, description, start_date, end_date } = req.body;

    if (!title || !description || !start_date || !end_date) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO projects (title, description, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, description, start_date, end_date]
        );

        res.status(201).json({ message: 'Project added successfully', project: result.rows[0] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addProject };

const getProjects = async (req, res) => {
    const { start_date, end_date } = req.query;

    try {
        let query = 'SELECT * FROM projects';
        const queryParams = [];

        if (start_date) {
            queryParams.push(start_date);
            query += ` WHERE start_date >= $${queryParams.length}`;
        }

        if (end_date) {
            queryParams.push(end_date);
            query += queryParams.length === 1 ? ` WHERE ` : ` AND `;
            query += `end_date <= $${queryParams.length}`;
        }

        const result = await pool.query(query, queryParams);

        res.status(200).json({ projects: result.rows });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addProject, getProjects };

const getProjectById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ project: result.rows[0] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addProject, getProjects, getProjectById };
