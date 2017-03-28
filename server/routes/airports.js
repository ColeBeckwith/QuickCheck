const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const http = require('http');
const https = require('https');
const request = require('request');
const xml2json = require('xml2json');
const fs = require('fs');
const airports = require('../assets/airports.json');
const tsaApiCalls = require('../utilities/tsa-api-calls');


router.get('/', (req, res) => {
    res.status(200).send(airports);
});

router.get('/shortcode/:shortcode', (req, res) => {
    tsaApiCalls.getAirportWaitTimesByShortcode(req.params.shortcode).then((resp) => {
        res.status(200).send(resp);
    });
});

module.exports = router;
