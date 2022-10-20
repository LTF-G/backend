const { KinesisVideoSignalingChannels } = require("aws-sdk");
const { promisify } = require("util");
const redisClient = require("../util/redis_channel");
const kinesis = require("./kinesis");

const async_get = promisify(redisClient.get).bind(redisClient);

/**
 * @param {string} userIp - Public IP address of mobile user
 * @param {string} username - Public IP address of mobile user
 * @param {string} channelName - Name of the channel to create
 * @return {{statusCode: int, ok: boolean, message: string, createdChannelData?: object}} result of creating channel
 */
async function createChannel(userIp) {
    const channelData = await async_get(userIp);

    if (channelData === null) {
        try {
            const createdChannelData = await kinesis.createChannel(userIp, "MASTER");
            redisClient.set(userIp, "Created");
            redisClient.expire(userIp, 60);
            return {
                statusCode: 200,
                ok: true,
                message: "a channel is successfully created",
                createdChannelData,
            };
        } catch (e) {
            return {
                statusCode: 500,
                ok: false,
                message: "internal server error",
            };
        }
    } else {
        return {
            statusCode: 400,
            ok: false,
            message: "a channel is already exists",
        };
    }
}

/**
 * @param {string} userIp - Public IP address of mobile user
 * @return {{statusCode: int, ok: boolean, message: string, createdChannelData?: object}} result of creating channel
 */
async function checkConnectionCreated(userIp) {
    const channelData = await async_get(userIp);

    if (channelData == null) {
        return {
            statusCode: 500,
            ok: false,
            message: "wrong status : a channel is not created",
        };
    } else if (channelData == "Connected") {
        return {
            statusCode: 200,
            ok: true,
            message: "a connection is created",
        };
    } else {
        redisClient.expire(userIp, 60);
        return {
            statusCode: 200,
            ok: true,
            message: "a connection is not created",
        };
    }
}

async function deleteChannel(userIp) {
    const channelData = await async_get(userIp);

    if (channelData !== null) {
        redisClient.del(userIp);
        kinesis.deleteChannel(userIp);
        return {
            statusCode: 200,
            ok: true,
            message: "a channel is successfully deleted",
        };
    } else {
        return {
            statusCode: 400,
            ok: false,
            message: "a channel is not exists",
        };
    }
}

/**
 * @param {string} userIp - Public IP address of mobile user
 * @return {{statusCode: int, ok: boolean, message: string, createdChannelData?: object}} result of existing channel
 */
async function searchChannel(userIp) {
    const channelData = await async_get(userIp);

    if (channelData == null) {
        return {
            statusCode: 200,
            ok: true,
            message: "a channel is not created",
        };
    } else if (channelData == "Connected") {
        return {
            statusCode: 400,
            ok: false,
            message: "a connection is already created",
        };
    } else {
        redisClient.set(userIp, "Connected");
        redisClient.expire(userIp, 60);

        return {
            statusCode: 200,
            ok: true,
            message: "a connection is already created",
            channelData: await kinesis.getChannelInfo(userIp, "VIEWER", "cient"),
        };
    }
}

module.exports = {
    createChannel,
    checkConnectionCreated,
    deleteChannel,
    searchChannel,
};
