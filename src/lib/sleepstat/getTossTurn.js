const { Sleepstat } = require("../../models");

async function getTossTurn(userid, sid) {
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

        return {
            statusCode: 200,
            ok: true,
            message: "sleep toss-turn data",
            toss_turn: sleepstat.toss_turn,
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

module.exports = getTossTurn;
