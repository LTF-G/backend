const { promisify } = require("util");
const redisClient = require("./redis_channel");

const async_get = promisify(redisClient.get).bind(redisClient);
redisClient.set(userid, refreshToken);

async function readyToCreateChannel(userIp, userId) {
    redisClient.set(userIp, userId);
}

async function searchChannel(userIp) {
    await async_get.get(userIp);
}
