var express  = require('express');
var connect = require('connect');
var cors = require('cors');


var app      = express();
app.constant = require('../config/constant');
app.constant.debug_mode = true;
app.db = require("../model/model");
app.db.debugMode = true;
app.db.configUrl(app.constant.url_test);


var port     = process.env.PORT || 5022;
// Configuration
var corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(connect.json());
app.use(connect.urlencoded());
// Routes

require('../router/routes')(app);

app.listen(port);

require("../test/test")(app);
