const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes will be mounted here
app.use('/api/studies', require('./routes/studies'));
app.use('/api/complaints', require('./routes/complaints'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
