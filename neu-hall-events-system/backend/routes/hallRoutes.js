const express = require("express");
const router = express.Router(); // ← must be first

const halls = [
  { id: "1", name: "Events Hall Main", capacity: 500, location: "Building A, Ground Floor" },
  { id: "2", name: "Conference Room 1", capacity: 50, location: "Building B, 2nd Floor" },
  { id: "3", name: "Audio Visual Room", capacity: 80, location: "Building C, 3rd Floor" },
];

// View halls
router.get("/", (req, res) => {
  res.json(halls);
});

// rest of your routes...

module.exports = router;
// View halls
router.get("/", (req, res) => {
  res.json(halls);
});

// Get hall by ID
router.get("/:id", (req, res) => {
  const hall = halls.find(h => h.id === req.params.id);
  if (!hall) return res.status(404).json({ message: "Hall not found" });
  res.json(hall);
});

// Create hall
router.post("/", (req, res) => {
  const { name, capacity, location } = req.body;
  const newHall = { id: String(halls.length + 1), name, capacity, location };
  halls.push(newHall);
  res.status(201).json(newHall);
});