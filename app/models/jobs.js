// App / Models / Jobs
var mongoose = require('mongoose');

module.exports = mongoose.model('Jobs', {
    title: String,
    description: String,
    location: String
});