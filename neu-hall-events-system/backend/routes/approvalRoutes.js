const express = require('express');
const mongoose = require('mongoose');
const { protect, requireRole } = require('../middleware/authMiddleware');
const Reservation = require('../models/Reservation');
const router = express.Router();

const buildApprovalQuery = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return { $or: [{ requestId: id }, { _id: id }] };
  }

  return { requestId: id };
};

const updateStatus = async (req, res, status) => {
  try {
    const { id } = req.params;
    const query = buildApprovalQuery(id);
    const reservation = await Reservation.findOneAndUpdate(query, { status }, { returnDocument: 'after' });

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found.' });
    }

    return res.json(reservation);
  } catch (error) {
    console.error('Update reservation status error:', error);
    return res.status(500).json({ error: 'Unable to update reservation status.' });
  }
};

// Approve reservation
router.put('/:id/approve', protect, requireRole('Admin'), async (req, res) => updateStatus(req, res, 'Approved'));

// Reject reservation
router.put('/:id/reject', protect, requireRole('Admin'), async (req, res) => updateStatus(req, res, 'Rejected'));

module.exports = router;

// Get all approvals
router.get('/', protect, requireRole('Admin'), async (req, res) => {
  try {
    const reservations = await Reservation.find({ status: { $in: ['Pending', 'Approved', 'Rejected'] } });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch approvals.' });
  }
});

// approvalRoutes.js
/**
 * @swagger
 * /api/approvals:
 *   get:
 *     summary: Get all approval requests
 *     tags: [Approvals]
 *     responses:
 *       200:
 *         description: List of approvals
 *
 * /api/approvals/{id}/approve:
 *   put:
 *     summary: Approve a reservation
 *     tags: [Approvals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Approved successfully
 *
 * /api/approvals/{id}/reject:
 *   put:
 *     summary: Reject a reservation
 *     tags: [Approvals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rejected successfully
 */