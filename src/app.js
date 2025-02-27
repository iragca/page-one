import express from 'express';
import { connectDB } from './config/db.js';

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

// Connect to DB
try {
  connectDB();
} catch (error) {
  console.error(`No DB connection: ${error.message}`);
  process.exit(1);
}


export default app;
