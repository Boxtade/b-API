var express  = require('express');
var connect = require('connect');
var cors = require('cors');
var constant = require('../config/constant');
require('../model/model').configUrl(constant.url_prod);

var app      = express();
var port     = process.env.PORT || 5002;
// Configuration
var corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
    credentials: true
};

app.use(cors(corsOptions));
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
        uri: this.url_prod,
        root: './boxtade/'
    });
}
catch (e){
    console.log("Not restore");
}

console.log('b_API runs on port ' + port);