var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    token : String,
    email: String,
    hashed_password: String,
    salt : String,
    temp_str:String
});

module.exports = require('./model').createModel('users', userSchema);
module.exports.open = function(){require('./model').open()};
module.exports.close = function(){require('./model').close()};
module.exports.backup = function(){require('./model').backup()};
module.exports.debugMode = function (bool) {require('./model').debugMode = bool;};

