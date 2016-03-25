// App / Routes

module.exports = function(app) {

    // Jobs
        var Jobs = require('./models/jobs');

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
                salary: request.body.salary,
                location: request.body.location
            };

            Jobs.create(job, function(error, success) {
                if(error) {
                    response.send(error);
                }

                response.json(success);
            });
        });

        // Single
        app.get('/api/job/:id', function(request, response) {

        });

    // Front (let angular handle the routes)
    app.get('*', function(request, response) {
        response.sendFile('app.html', {root: app.get('static_root_path')});
    });
};
