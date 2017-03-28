const http = require('http');

module.exports = {
    getAirportWaitTimesByShortcode: function(shortcode) {
        return new Promise((resolve, reject) => {
            http.get('http://apps.tsa.dhs.gov/MyTSAWebService/GetTSOWaitTimes.ashx?ap=' + shortcode + '&output=json',
                (resp) => {
                    let buffer = '';
                    resp.on('data', (chunk) => {
                        buffer += chunk;
                    });
                    resp.on('end', () => {
                        let waitTimes = JSON.parse(buffer).WaitTimes;
                        waitTimes.forEach((waitTime) => {
                            waitTime.CheckpointIndex = parseInt(waitTime.CheckpointIndex);
                        });
                        resolve(waitTimes);
                    });
                })
        })
    }
};
