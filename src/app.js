import express from 'express';

// Import routes
import index from './routes/index.js';
import fallback from './routes/fallback.js';
import books from './routes/books.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/', index);

app.post("/postbook", (req, res) => {});

app.use('/books', books);

// 404 Fallback route - Add this before error handler but after all other routes
app.use('*', fallback);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
