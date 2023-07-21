require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoute');
const todoRoutes = require('./routes/todoRoute');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    app.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
