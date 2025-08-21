const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/recipes', require('./routes/recipeRoutes'));
app.use('/api/categories', require('./routes/categories'));

module.exports = app;