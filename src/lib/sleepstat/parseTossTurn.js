const THRESHOLD = 50;

function getSensorsDifference(sensorsMeasuredNow, sensorsMeasuredPrev) {
    return sensorsMeasuredNow.reduce((acc, val, idx) => {
        return acc + Math.abs(val - sensorsMeasuredPrev[idx]);
    }, 0);
}

function parseTossTurn(sensorData) {
    console.log(sensorData);

    const sensorDataSet = sensorData.map((val) => {
        const [sensors, timestamp] = val.split("/");
        return {
            sensor: sensors.split(":").map((v) => Number(v)),
            timestamp: Number(timestamp),
        };
    });

    return sensorDataSet.slice(1).reduce((acc, cur, idx) => {
        if (getSensorsDifference(cur.sensor, sensorDataSet[idx].sensor) > THRESHOLD) {
            return [...acc, cur.timestamp];
        } else {
            return acc;
        }
    }, []);
}

module.exports = parseTossTurn;
