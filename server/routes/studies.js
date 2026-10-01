const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all studies
router.get('/', async (req, res) => {
  try {
    const studies = await prisma.study.findMany({
      orderBy: { timestamp: 'desc' }
    });
    res.json(studies);
  } catch (error) {
    console.error("Error fetching studies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new study
router.post('/', async (req, res) => {
  try {
    const { title, excerpt, content, category, author, classification, tags } = req.body;
    
    // In MVP, we just create the study without authentication
    const study = await prisma.study.create({
      data: {
        title,
        excerpt,
        content: content || "",
        category: category || "Umum",
        author: author || "Admin Kastrat",
        classification: classification || "Terbuka",
        tags: tags || "[]"
      }
    });
    
    res.status(201).json(study);
  } catch (error) {
    console.error("Error creating study:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
