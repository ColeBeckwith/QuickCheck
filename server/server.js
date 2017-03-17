const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');

const app = express();

// TODO fix me for production;
// mongoose.connect('mongodb://localhost/quickcheck');

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(bodyParser.urlencoded({'extended' : 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type : 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

const airportsApi = require('./routes/airports');
app.use('/api/airports', airportsApi);

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));

