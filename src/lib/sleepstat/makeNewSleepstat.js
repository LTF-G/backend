const { Sleepstat } = require("../../models");
const parseTossTurn = require("./parseTossTurn");
const getActualSleepTime = require("./getActualSleepTime");

async function makeNewSleepstat(userid, sleepstat) {
    const { sleep_start, sleep_stop, sensorData } = sleepstat;
    const toss_turn = parseTossTurn(sensorData);
    const actual_sleep = getActualSleepTime(sleep_start, sleep_stop, toss_turn.length);
    console.log(toss_turn);

    try {
        await Sleepstat.create({
            userid,
            sleep_start,
            sleep_stop,
            toss_turn,
            actual_sleep,
        });

        return {
            statusCode: 200,
            ok: true,
            message: "sleep statistics are successfully created",
        };
    } catch (e) {
        console.error(e);
        return {
            statusCode: 500,
            ok: false,
            message: e,
        };
    }
}

module.exports = makeNewSleepstat;
