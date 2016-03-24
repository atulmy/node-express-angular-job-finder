/* ---------- Setup ---------- */
// Express
    var express = require('express');
    var app = express(); // create our express app

// DB
    var mongoose = require('mongoose'); // mongoose for mongodb

// Mix
    var morgan = require('morgan'); // logging to console
    var bodyParser = require('body-parser'); // pull information from HTML POST
    var methodOverride = require('method-override'); // simulate DELETE and PUT


/* ---------- Configurations ---------- */
// DB
    mongoose.connect('mongodb://localhost:27017/jobsearch');

// Express
    app.use(express.static(__dirname + '/public')); // set the static files location /public/img

// Mix
    app.use(morgan('dev')); // logging to console

    app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
    app.use(bodyParser.json()); // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

    app.use(methodOverride());


/* ---------- Models ---------- */
// Jobs
    var Jobs = mongoose.model('Jobs', {
        title: String,
        description: String,
        location: String
    });
    var job1 = new Jobs({
        title: "title",
        description: "description",
        location: "location"
    });
    job1.save();


/* ---------- Routes ---------- */
// List
    app.get('/api/list', function(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");

        // use mongoose to get all todos in the database
        Jobs.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });


/* ---------- Start App ---------- */
var port = 8080;
app.listen(port);
console.log('App Started!'+Date());