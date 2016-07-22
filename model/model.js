var mongoose = require('mongoose');
var backup = require('mongodb-backup');

mongoose.connect('mongodb://localhost:27017/boxtade');

function model(){
    this.backup =  function(){
        backup({
            uri: 'mongodb://localhost:27017/boxtade', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
            root: "./",
            collections:['users', "tasks"]
        });
    }
}

module.exports = model;