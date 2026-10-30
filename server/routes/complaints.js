const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await prisma.complaint.findMany({
      orderBy: { timestamp: 'desc' }
    });
    res.json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Submit a new complaint
router.post('/', async (req, res) => {
  try {
    const { headline, excerpt, category, classification, type } = req.body;
    
    const complaint = await prisma.complaint.create({
      data: {
        type: type || "Umum",
        headline,
        excerpt,
        category: category || "Umum",
        classification: classification || "Biasa",
        status: "Terkirim" // Default status
      }
    });
    
    res.status(201).json(complaint);
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update complaint status (for Admin)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const complaint = await prisma.complaint.update({
      where: { id: parseInt(id) },
      data: { status }
    });
    
    res.json(complaint);
  } catch (error) {
    console.error("Error updating complaint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
