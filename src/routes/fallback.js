import express from 'express';
const router = express.Router();

router.use('*', (req, res) => {
    res.status(404).json({
      error: 'Resource not found'
    });
  });

export default router;