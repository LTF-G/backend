const express = require("express");
const { Authorized } = require("../middlewares/authorized");
const { makeNewSleepstat, getSleepstatsList, getTossTurn, deleteSleepstat } = require("../lib/sleepstat");
const router = express.Router();

router.get("/", Authorized, async (req, res) => {
    try {
        const response = await getSleepstatsList(req.id);
        return res.status(response.statusCode).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).send(e);
    }
});

router.get("/:sid", Authorized, async (req, res) => {
    const { sid } = req.params;

    try {
        const response = await getTossTurn(req.id, sid);
        return res.status(response.statusCode).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).send(e);
    }
});

router.post("/", Authorized, async (req, res) => {
    const statistics = req.body;

    try {
        const response = await makeNewSleepstat(req.id, statistics);
        return res.status(response.statusCode).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).send(e);
    }
});

router.delete("/:sid", Authorized, async (req, res) => {
    const { sid } = req.params;

    try {
        const response = await deleteSleepstat(req.id, sid);
        return res.status(response.statusCode).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).send(e);
    }
});

module.exports = router;
