const express = require('express');
const router = express.Router();
const { protect, requireRole } = require('../middleware/authMiddleware');
const { getStudents } = require('../controllers/userController');

router.get('/', protect, requireRole('Admin'), getStudents);

module.exports = router;

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of all students
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               studentId:
 *                 type: string
 *               email:
 *                 type: string
 *               course:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Bad request
 *
 * /api/students/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student found
 *       404:
 *         description: Student not found
 *   put:
 *     summary: Update a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               course:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Student updated
 *       404:
 *         description: Student not found
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted
 *       404:
 *         description: Student not found
 */