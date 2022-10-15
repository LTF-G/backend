const redis = require("redis");

const redisClient = redis.createClient({
    host: process.env.REDIS_AUTH_HOST,
    port: process.env.REDIS_AUTH_PORT,
    db: process.env.REDIS_AUTH_DB_NUM,
    password: process.env.REDIS_AUTH_PASSWORD,
    legacyMode: true,
});

(async () => {
    redisClient.connect();
})();

module.exports = redisClient;
