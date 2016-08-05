var mongoose = require('mongoose');

var globalSchema = mongoose.Schema({
    count_tasks: Number
});

module.exports = require('./model').createModel('globals', globalSchema);
module.exports.open = function(){require('./model').open()};
module.exports.close = function(){require('./model').close()};
module.exports.backup = function(){require('./model').backup()};
module.exports.debugMode = function (bool) {require('./model').debugMode = bool;};

