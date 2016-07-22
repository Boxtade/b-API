var mongoose = require('mongoose');
var backup = require('mongodb-backup');

function model(){

    this.db = mongoose.connect('mongodb://localhost:27017/boxtade');

    this.backup =  function(){
        backup({
            uri: 'mongodb://localhost:27017/boxtade', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
            root: "./",
            collections:['users', "tasks"]
        });
    };

    this.close = function(){
        this.db.disconnect();
    }
}

module.exports = model;