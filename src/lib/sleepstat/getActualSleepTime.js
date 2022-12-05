const TOSS_TURN_COEFFICIENT = 1000 * 60 * 20;

function getActualSleepTime(sleepStart, sleepStop, numTossTurn) {
    const sleepTime = sleepStop - sleepStart - numTossTurn * TOSS_TURN_COEFFICIENT;
    console.log(sleepStop, sleepStart, numTossTurn, sleepStop - sleepStart, sleepTime);
    if (sleepTime > 0) return sleepTime;
    else return 0;
}

module.exports = getActualSleepTime;
