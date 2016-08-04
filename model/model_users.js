var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    token : String,
    email: String,
    hashed_password: String,
    salt : String,
    temp_str:String
});

// module.exports = mongoose.model('users', userSchema);
// module.exports.m = new model();

module.exports = require('./model').createModel('users', userSchema);
module.exports.open = function(u){require('./model').open(u)};
module.exports.close = function(){require('./model').close()};
module.exports.backup = function(){require('./model').backup()};
module.exports.debugMode = function (bool) {require('./model').debugMode = bool;};

