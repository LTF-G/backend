const express = require("express");
const redisClient = require("../util/redis_channel");
const router = express.Router();

/**
 * GET /polling/device - device poller

 */
router.get("/device", async (req, res) => {
    const ipComponents = req.socket.remoteAddress.split(":");
    const ipv4 = ipComponents[ipComponents.length - 1];

    return res.status(200).send();
});

module.exports = router;
