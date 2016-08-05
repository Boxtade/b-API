var mongoose = require('mongoose');
var backup = require('mongodb-backup');
var db;
var url;

module.exports.debugMode = false;

module.exports.open = function(){
    db = mongoose.connect(url);
};

module.exports.configUrl = function(u){
    url = u;
};

module.exports.backup = function(){

    if(!module.exports.debugMode) {
        backup({
            uri: url, // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
            root: "./",
            collections: ['users', "tasks", "globals"]
        });
    }
};

module.exports.close = function(){
    db.connection.close();
};


module.exports.createModel = function(dbName, dbSchema){
    return mongoose.model(dbName, dbSchema);;
};

