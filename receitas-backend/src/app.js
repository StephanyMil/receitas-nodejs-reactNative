const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

app.use(cors());

connectDB();

app.use(express.json({ extended: false }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/recipes', require('./routes/recipeRoutes'));

module.exports = app;