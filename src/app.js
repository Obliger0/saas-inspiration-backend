const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const inspirationRoutes = require('./routes/inspirationRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const loggerMiddleware = require('./middlewares/loggerMiddleware');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(loggerMiddleware);

// Routes
app.use('/api/inspirations', inspirationRoutes);

// 404 Handler
app.use(notFound);

// Error Handler
app.use(errorHandler);

module.exports = app;
