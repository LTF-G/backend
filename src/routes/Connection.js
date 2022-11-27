const express = require("express");
const { Authorized } = require("../middlewares/authorized");
const { getRPIIp, registerRPIIp } = require("../lib/connection");
const router = express.Router();

/**
 * get RPI's local ip for Mobile
 */
router.get("/", Authorized, async (req, res) => {
    const ipComponents = req.socket.remoteAddress.split(":");
    const publicIp = ipComponents[ipComponents.length - 1];

    try {
        const response = await getRPIIp(publicIp);
        return res.status(response.statusCode).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).send(e);
    }
});

/**
 * register local ip for RPI
 */
router.post("/", async (req, res) => {
    const { privateIp } = req.body;
    const ipComponents = req.socket.remoteAddress.split(":");
    const publicIp = ipComponents[ipComponents.length - 1];

    try {
        const response = await registerRPIIp(publicIp, privateIp);
        return res.status(response.statusCode).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).send(e);
    }
});

module.exports = router;
