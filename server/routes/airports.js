const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const http = require('http');
const https = require('https');
const request = require('request');
const xml2json = require('xml2json');
const fs = require('fs');
const airports = require('../assets/airports.json');

const test = require('../assets/test.json');

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
    }
    fs.writeFile(__dirname + '/../assets/airports.json', JSON.stringify(airports), 'utf-8', (err) => {
        if (err) throw err;
    })
}


router.get('/', (req, res) => {
    res.status(200).send(airports);
});

router.get('/shortcode/:shortcode', (req, res) => {
    http.get('http://apps.tsa.dhs.gov/MyTSAWebService/GetTSOWaitTimes.ashx?ap=' + req.params.shortcode + '&output=json',
        (resp) => {
            let buffer = '';
            resp.on('data', (chunk) => {
                buffer += chunk;
            });

            resp.on('end', (chunk) => {
                res.status(200).send(JSON.parse(buffer))
            });
        });
});

module.exports = router;
