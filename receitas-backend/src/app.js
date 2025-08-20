const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/recipes', require('./routes/recipeRoutes'));

module.exports = app;