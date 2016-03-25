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
    var staticRootPath = __dirname + '/public';
    app.use(express.static(staticRootPath)); // set the static files location /public/

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
    // seed jobs
    Jobs.find(function(error, jobs) {
        if(jobs.length == 0) {
            var jobNew = new Jobs({
                title: "title",
                description: "description",
                location: "location"
            });
            jobNew.save();
        }
    });

/* ---------- Routes ---------- */
// Front
    app.get('/', function(request, response) {
        response.sendFile('app.html', {root: staticRootPath});
    });

// List
    app.get('/api/jobs', function(request, response) {
        Jobs.find(function(error, jobs) {
            if (error) {
                response.send(error);
            }

            response.json(jobs);
        });
    });

// Add
    app.post('/api/job', function(request, response) {
        var job = {
            title: request.body.title,
            description: request.body.description,
            location: request.body.location,
        };

        Jobs.create(job, function(error, success) {
            if(error) {
                response.send(error);
            }

            response.redirect('/');
        });
    });

// Single
    app.get('/api/job/:id', function(request, response) {
        var job = {
            title: request.body.title,
            description: request.body.description,
            location: request.body.location,
        };

        Jobs.create(job, function(error, success) {
            if(error) {
                response.send(error);
            }

            response.redirect('/');
        });
    });

/* ---------- Start App ---------- */
var port = 8080;
app.listen(port);
console.log('App Started!'+Date());