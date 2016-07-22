// var express = require('express');
// var task = require('./../handler/b_thinker/task');
// var cors = require('cors');
//
//
// var app = express();
//
// var corsOptions = {
//     origin: '*',
//     methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
//     credentials: true
// };
//
// app.use(cors(corsOptions));
//
//
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
//
// function start() {
//     app.listen(5000); // Look at the asynchronous.
//     console.log("Server has started.");
//     console.log('Server running at http://localhost:5000/');
// };
//
// app.post('/tasks',task.create_task);
// app.get("/tasks",task.get_tasks);
// app.get("/tasks/:id",task.get_task);
// app.put('/tasks/:id',task.update_task);
// app.delete('/tasks/:id',task.delete_task);
//
// module.exports.start = start;

var express  = require('express');
var connect = require('connect');
var app      = express();
var port     = process.env.PORT || 5000;
// Configuration
app.use(express.static(__dirname + '/public'));
app.use(connect.logger('dev'));
app.use(connect.json());
app.use(connect.urlencoded());
// Routes

require('../router/routes')(app);

app.listen(port);

var restore = require('mongodb-restore');

try{
    restore({
        uri: 'mongodb://localhost:27017/boxtade', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
        root: './boxtade/'
    });
}
catch (e){
    console.log("Not restore");
}


console.log('b_API runs on port ' + port);