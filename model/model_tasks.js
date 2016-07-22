var mongoose = require('mongoose');

var tasksSchema = mongoose.Schema({
    id : Number,
    count: Number,
    title: String,
    content : String,
    token:String
});

module.exports = mongoose.model('tasks', tasksSchema);
module.exports = new require('./model')();
