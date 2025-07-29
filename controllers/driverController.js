const driverService = require('../services/driverService');

const getDriverBookings = async (req, res) => {
  try {
    const bookings = await driverService.getDriverBookings(req.user._id);
    res.status(201).send({data:bookings, success: true, error: null, message: "Successfully Retrieved Driver Bookings"});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateLocation = async (req, res) => {
    try {
      const { latitude, longitude } = req.body;
  
      if (typeof latitude !== 'number' || typeof longitude !== 'number') {
        throw new Error('Latitude and Longitude must be Numbers');
      }
  
      await driverService.updateLocation(req.user._id, { latitude, longitude });
      res.status(201).send({ success: true, error: null, message: "Location Updated Successfully" });

    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
  

module.exports = { getDriverBookings, updateLocation };
