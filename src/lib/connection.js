const { promisify } = require("util");
const redisClient = require("../util/redis_channel");
const kinesis = require("./kinesis");

const async_get = promisify(redisClient.get).bind(redisClient);

const IP_ADDR_REGEXP =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

async function getRPIIp(publicIp) {
    try {
        const privateIp = await async_get(publicIp);

        if (privateIp) {
            return {
                statusCode: 200,
                ok: true,
                message: "RPI's ip address",
                ip: privateIp,
            };
        } else {
            return {
                statusCode: 404,
                ok: false,
                message: "there is no RPI's ip address registered",
            };
        }
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
            ok: false,
            message: e,
        };
    }
}

async function registerRPIIp(publicIp, privateIp) {
    if (typeof privateIp !== "string" || !IP_ADDR_REGEXP.test(privateIp))
        return {
            statusCode: 400,
            ok: false,
            message: "wrong ip address",
        };

    try {
        redisClient.set(publicIp, privateIp);
        redisClient.expire(publicIp, 60);

        return {
            statusCode: 200,
            ok: true,
            message: "RPI's ip address is registered",
        };
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
            ok: false,
            message: e,
        };
    }
}

module.exports = {
    getRPIIp,
    registerRPIIp,
};
