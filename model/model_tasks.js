var mongoose = require('mongoose');

var tasksSchema = mongoose.Schema({
    id : Number,
    count: Number,
    title: String,
    content : String,
    token:String
});

module.exports = require('./model');
module.exports.open();
module.exports = module.exports.createModel('tasks', tasksSchema);

