const express = require("express");
const { Authorized } = require("../middlewares/authorized");
const { createChannel, searchChannel } = require("../lib/channel");
const router = express.Router();

/**
 * POST /channel/mobule - Create Channel
 * @return {{statusCode: int, ok: boolean, message: string, createdChannelData?: object}} Result of registration
 */
router.post("/mobile", Authorized, async (req, res) => {
    const ipComponents = req.socket.remoteAddress.split(":");
    const ipv4 = ipComponents[ipComponents.length - 1];
    try {
        const response = await createChannel(ipv4, "CHANNELNAME");
        return res.status(response.statusCode).send(response);
    } catch (e) {
        return res.statusCode(500).send(e);
    }
});

router.get("/mobile", Authorized, async (req, res) => {
    const ipComponents = req.socket.remoteAddress.split(":");
    const ipv4 = ipComponents[ipComponents.length - 1];
    try {
        const response = await checkConnectionCreated(ipv4);
        return res.status(response.statusCode).send(response);
    } catch (e) {
        return res.statusCode(500).send(e);
    }
});

router.get("/device", async (req, res) => {
    const ipComponents = req.socket.remoteAddress.split(":");
    const ipv4 = ipComponents[ipComponents.length - 1];

    try {
        const channelData = await searchChannel(ipv4);
        return res.status(response.statusCode).send(response);
    } catch (e) {
        return res.statusCode(500).send(e);
    }
});

module.exports = router;