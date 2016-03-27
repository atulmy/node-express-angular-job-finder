// App / Models / Jobs
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: String,
    description: String,
    salary: Number,
    location: Number,
    createdAt: {
        type : Date
    },
    updatedAt: {
        type : Date,
        default : Date.now
    }
});
module.exports = mongoose.model('Jobs', schema);