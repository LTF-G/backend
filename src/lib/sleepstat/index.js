const { Sleepstat } = require("../../models");
const makeNewSleepstat = require("./makeNewSleepstat");
const getSleepstatsList = require("./getSleepstatsList");
const getTossTurn = require("./getTossTurn");
const deleteSleepstat = require("./deleteSleepstat");

module.exports = {
    makeNewSleepstat,
    getSleepstatsList,
    getTossTurn,
    deleteSleepstat,
};
