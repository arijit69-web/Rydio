const express = require('express');
const { createBooking, confirmBooking } = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddlewares');

const router = express.Router();

module.exports = (io) => {
  router.post('/', authMiddleware, createBooking(io));
  router.post('/confirm', authMiddleware, confirmBooking(io));

  return router;
};
