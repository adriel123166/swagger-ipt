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

router.post('/',     protect, validateReservation, createReservation);

router.get('/',      protect, getReservations);

router.put('/:id',   protect, validateReservation, updateReservation);

router.delete('/:id', protect, deleteReservation);

module.exports = router;

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
 *             properties:
 *               hallId:
 *                 type: string
 *               eventId:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Reservation created
 *       409:
 *         description: Conflict with existing reservation
 *
 * /api/reservations/{id}:
 *   get:
 *     summary: Get reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation found
 *       404:
 *         description: Not found
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