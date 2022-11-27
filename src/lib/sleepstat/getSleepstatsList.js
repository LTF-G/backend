const { Sleepstat } = require("../../models");

async function getSleepstatsList(userid) {
    try {
        const sleepstatsRaw = await Sleepstat.findAll({
            where: {
                userid,
            },
        });

        if (sleepstatsRaw.length === 0)
            return {
                statusCode: 404,
                ok: false,
                message: "no statistic found",
            };

        const sleepstats = sleepstatsRaw.map((val) => {
            return {
                sid: val.sid,
                sleep_start: val.sleep_start,
                sleep_stop: val.sleep_stop,
            };
        });

        return {
            statusCode: 200,
            ok: true,
            message: "sleep statistic data",
            sleepstats,
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

module.exports = getSleepstatsList;
