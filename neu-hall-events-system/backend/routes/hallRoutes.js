const express = require("express");
const router = express.Router();

// View halls
router.get("/", (req, res) => {
  res.json({ message: "Get halls" });
});

// Create hall
router.post("/", (req, res) => {
  res.json({ message: "Create hall" });
});

module.exports = router;

/**
 * @swagger
 * /api/halls:
 *   get:
 *     summary: Get all halls
 *     tags: [Halls]
 *     responses:
 *       200:
 *         description: List of halls
 *   post:
 *     summary: Create a new hall
 *     tags: [Halls]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Hall created
 *
 * /api/halls/{id}:
 *   get:
 *     summary: Get hall by ID
 *     tags: [Halls]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hall found
 *       404:
 *         description: Hall not found
 *   put:
 *     summary: Update a hall
 *     tags: [Halls]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hall updated
 *   delete:
 *     summary: Delete a hall
 *     tags: [Halls]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hall deleted
 */