/**
 * Created by mac on 3/28/17.
 */
const cron = require('cron');
const http = require('http');
const tsaApiCalls = require('../utilities/tsa-api-calls');

// '0 30 4 * * 0' is Cron syntax which tells it to fire every Sunday at 4:30:00 AM.
// The first and second asterisks are for Day of Month and Month of Year respectively.
// If you wanted to fire a job every year on the 15th of November at noon: '0 0 12 15 10 *'
const gatherer = new cron.CronJob({
    cronTime: '0 30 4 * * 0',
    onTick: () => {
        gatherCheckpointDataForAllAirports();
    },
    start: false,
    timeZone: 'America/Rainy_River'
});

gatherer.start();

function gatherCheckpointDataForAllAirports() {
    const airports = require('../assets/airports.json').airports;

    airports.forEach((airport) => {
        tsaApiCalls.getAirportWaitTimesByShortcode(airport.shortcode).then((waitTimes) => {
            if (waitTimes.length === 0) {
                return;
            }

            console.log(waitTimes.length);
        });
    });
}

