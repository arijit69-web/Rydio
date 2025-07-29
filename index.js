const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const cors = require('cors');
const { redisClient } = require('./utils/redisClient');
const authRoutes = require('./routes/authRoutes');
const locationService = require('./services/locationService');
const bookingRoutes = require('./routes/bookingRoutes');
const driverRoutes = require('./routes/driverRoute');
const passengerRoutes = require('./routes/passengerRoutes');
dotenv.config();


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://127.0.0.1:5500", 
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

connectDB();
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

redisClient.connect();


app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes(io));
app.use('/api/drivers', driverRoutes);
app.use('/api/passengers', passengerRoutes(io));

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});


io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('registerDriver', async (driverId) => {
      await locationService.setDriverSocket(driverId, socket.id);
    });

  
    socket.on('disconnect', async () => {
      console.log('A user disconnected');
      const driverId = await locationService.getDriverSocket(`driver:${socket.id}`);
      if (driverId) {
        await redisClient.del(`driver:${driverId}`);
      }
    });
});