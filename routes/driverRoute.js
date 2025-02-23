const express = require('express');
const authMiddleware = require('../middlewares/authMiddlewares');
const { getDriverBookings, updateLocation } = require('../controllers/driverController');

const router = express.Router();

router.get('/bookings', authMiddleware, getDriverBookings);

router.post('/location', authMiddleware, updateLocation);

module.exports = router;
