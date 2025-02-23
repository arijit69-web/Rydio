const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();
const redisClient = redis.createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_URI,
        port: process.env.REDIS_PORT
    }
});



module.exports = { redisClient };
