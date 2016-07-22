var mongoose = require('mongoose');
var model = require('./model');

var userSchema = mongoose.Schema({
    token : String,
    email: String,
    hashed_password: String,
    salt : String,
    temp_str:String
});

module.exports = mongoose.model('users', userSchema);
module.exports = new model();
