// App / Routes

module.exports = function(app) {

    // Jobs
        var Jobs = require('./models/jobs');

        // List
        app.get('/api/jobs', function(request, response) {
            var params = {
                sort: request.param('sort') ? request.param('sort') : 'freshness',
                text: request.param('text') ? request.param('text') : '',
                location: request.param('location') ? parseInt(request.param('location')) : -1,
                filter: request.param('filter') ? JSON.parse(request.param('filter')) : {min: -1, max: -1}
            };

            var queries = {};

            // Search
            if(params.location != '' && params.location != -1) {
                queries.location = params.location;
            }
            if(params.text != '') {
                var regex = new RegExp(params.text, "i")
                queries.title = regex;
            }

            // Filter
            if(params.filter) {
                if(params.filter.min != -1 && params.filter.max != -1) { // between x to x
                    queries.salary = {$lte: params.filter.max, $gte: params.filter.min};
                } else if(params.filter.min == -1 && params.filter.max != -1) { // > x
                    queries.salary = {$lte: params.filter.max};
                } else if(params.filter.min != -1 && params.filter.max == -1) { // < x
                    queries.salary = {$gte: params.filter.min};
                }
            }

            // Sort
            var sort = {};
            if(params.sort) {
                if(params.sort == 'freshness') {
                    sort = {sort: {createdAt: -1}};
                } else if(params.sort == 'highest') {
                    sort = {sort: {salary: -1}};
                } else if(params.sort == 'lowest') {
                    sort = {sort: {salary: 1}};
                }
            }

            console.log(queries);

            Jobs.find(queries, null, sort, function(error, jobs) {
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
                location: request.body.location,
                createdAt: Date.now()
            };

            Jobs.create(job, function(error, success) {
                if(error) {
                    response.send(error);
                }

                response.json(success);
            });
        });

    // Front (angular handles the routes except /api/* calls)
        app.get('*', function(request, response) {
            response.sendFile('app.html', {root: app.get('static_root_path')});
        });
};
