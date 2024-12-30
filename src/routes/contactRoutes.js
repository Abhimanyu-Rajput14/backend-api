/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact form routes
 */

const express = require('express');
const { submitContactForm } = require('../controllers/contactController');
const router = express.Router();

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Submit a contact form
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message submitted successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/', submitContactForm);

module.exports = router;
