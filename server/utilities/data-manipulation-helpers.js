// This is just a helper function that takes the XML-converted JSON and fixes the checkpoint object since arrays
// with lengths of less than 2 do not translate well from XML to JSON. It only needs to be run after the first
// conversion from XML and should not be run more than once, although it hopefully won't make too much of a fuss if
// you do. Any time you need to run it, just add a call to fixJsonFromTSA() on the lines after it.

function fixJsonFromTSA() {
    for (let i = 0; i < airports.airports.length; i++) {
        let airport = airports.airports[i];
        if (airport.checkpoints.checkpoint) {
            if (Array.isArray(airport.checkpoints.checkpoint)) {
                airport.checkpoints = airport.checkpoints.checkpoint;
            } else {
                airport.checkpoints = [airport.checkpoints.checkpoint];
            }
        }
        airport.checkpoints.forEach((checkpoint) => {
            checkpoint.id = parseInt(checkpoint.id);
        });
        airport.latitude = parseFloat(airport.latitude);
        airport.longitude = parseFloat(airport.longitude);
        // WTF TSA?
        airport.precheck = airport.precheck === 'true';
        airport.dst = airport.dst === 'True';
    }
    fs.writeFile(__dirname + '/../assets/airports.json', JSON.stringify(airports), 'utf-8', (err) => {
        if (err) throw err;
    })
}

// fixJsonFromTSA();
