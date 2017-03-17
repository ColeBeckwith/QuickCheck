const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const http = require('http');
const https = require('https');
const request = require('request');
const xml2json = require('xml2json');
const fs = require('fs');
const airports = require('../assets/airports.json');

router.get('/', (req, res) => {
    res.status(200).send(airports);
});

router.get('/shortcode/:shortcode', (req, res) => {
    http.get('http://apps.tsa.dhs.gov/MyTSAWebService/GetTSOWaitTimes.ashx?ap=' + req.params.shortcode + '&output=json',
        (resp) => {
            res.status(200).send(JSON.parse(resp.body));
        });
});

module.exports = router;
