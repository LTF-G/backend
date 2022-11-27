const { Sleepstat } = require("../../models");

async function deleteSleepstat(userid, sid) {
    try {
        const sleepstat = await Sleepstat.findOne({
            where: {
                userid,
                sid,
            },
        });

        if (!sleepstat)
            return {
                statusCode: 404,
                ok: false,
                message: "no statistic found",
            };

        await sleepstat.destroy();

        return {
            statusCode: 200,
            ok: true,
            message: "sleep statistics are successfully deleted",
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

module.exports = deleteSleepstat;
