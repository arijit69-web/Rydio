const driverRepository = require('../repositories/driverRepository');
const locationService = require('../services/locationService');

const updateLocation = async (driverId, { latitude, longitude }) => {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
  
    if (isNaN(lat) || isNaN(lon)) {
      throw new Error('Invalid Coordinates');
    }
  
    console.log(`Adding to Redis: ${lon.toString()} ${lat.toString()} ${driverId}`);
  
    try {
        await locationService.addDriverLocation(driverId, lat, lon);
    } catch(error) {
        throw new Error(error);
    }
    
  
    await driverRepository.updateDriverLocation(driverId, {
      type: 'Point',
      coordinates: [lon, lat]
    });
};

const getDriverBookings = async (driverId) => {
  const driverBookings = driverRepository.findDriverById(driverId);
  return driverBookings;
};

module.exports = { updateLocation, getDriverBookings };
