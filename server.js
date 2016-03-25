/* ---------- Load Modules ---------- */
var express = require('express');
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // logging to console
var bodyParser = require('body-parser'); // pull information from HTML POST
var methodOverride = require('method-override'); // simulate DELETE and PUT


/* ---------- Configurations ---------- */
// DB
    var database = require('./config/database.js');
    mongoose.connect(database.url);

// Express
    var app = express(); // create our express app
    app.set('port', process.env.PORT || 8080);
    app.set('static_root_path', __dirname + '/public');
    app.use(express.static(app.get('static_root_path'))); // set the static files location /public/

// Mix
    app.use(morgan('dev')); // logging to console
    app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
    app.use(bodyParser.json()); // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());


/* ---------- Routes ---------- */
require('./app/routes')(app);


/* ---------- Initialize ---------- */
app.listen(app.get('port'));
console.log('App Started on '+app.get('port')+' @ '+Date());