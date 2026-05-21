const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { validateReservation } = require('../middleware/validateReservation');
const {
  createReservation,
  getReservations,
  deleteReservation,
  updateReservation,
} = require('../controllers/reservationController');

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: List of reservations
 *   post:
 *     summary: Create a reservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventName
 *               - hall
 *               - date
 *               - startTime
 *               - endTime
 *               - attendees
 *               - organization
 *             properties:
 *               eventName:
 *                 type: string
 *                 example: NEU Foundation Day
 *               hall:
 *                 type: string
 *                 example: Events Hall Main
 *               date:
 *                 type: string
 *                 example: "2026-05-24"
 *               startTime:
 *                 type: string
 *                 example: "09:00"
 *               endTime:
 *                 type: string
 *                 example: "17:00"
 *               attendees:
 *                 type: integer
 *                 example: 100
 *               organization:
 *                 type: string
 *                 example: NEU Student Council
 *     responses:
 *       201:
 *         description: Reservation created
 *       400:
 *         description: Validation failed
 *
 * /api/reservations/{id}:
 *   put:
 *     summary: Update a reservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation updated
 *   delete:
 *     summary: Delete a reservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation deleted
 */

router.post('/',     protect, validateReservation, createReservation);
router.get('/',      protect, getReservations);
router.put('/:id',   protect, validateReservation, updateReservation);
router.delete('/:id', protect, deleteReservation);

module.exports = router;