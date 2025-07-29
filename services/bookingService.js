const locationService = require('./locationService');
const bookingRepository = require('../repositories/bookingRepository');
const { haversineDistance } = require('../utils/distance');

const BASIC_FARE = 50; 
const RATE_PER_KM = 12; 
const createBooking = async ({ passengerId, source, destination }) => {
  
  const distance = haversineDistance(source.latitude, source.longitude, destination.latitude, destination.longitude);
  const fare = BASIC_FARE + (distance * RATE_PER_KM);
  const bookingData = {
    passenger: passengerId,
    source,
    destination,
    fare,
    status: 'pending'
  };
  
  const booking = bookingRepository.createBooking(bookingData);
  return booking;
};

const findNearbyDrivers = async (location, radius = 5) => {
  const longitude = parseFloat(location.longitude);
  const latitude = parseFloat(location.latitude);

  const radiusKm = parseFloat(radius);

  if (isNaN(longitude) || isNaN(latitude) || isNaN(radiusKm)) {
    throw new Error('Invalid Coordinates or Radius');
  }

  const nearbyDrivers = await locationService.findNearbyDrivers(longitude, latitude, radiusKm);

  return nearbyDrivers;
};


const assignDriver = async (bookingId, driverId) => {
  const booking = await bookingRepository.updateBookingStatus(bookingId, driverId, 'confirmed');
  if (!booking) throw new Error('Booking already Confirmed or Does not exist');
  return booking;
};



module.exports = { createBooking, findNearbyDrivers, assignDriver };
