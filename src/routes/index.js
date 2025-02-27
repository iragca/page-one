import express from 'express'
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

export default router;