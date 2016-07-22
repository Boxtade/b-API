var password = require('./password');
var register = require('./register');
var login = require('./login');
var token = require('./token_acces');
var m_users = require('../../model/model_users');

exports.login = function(req,res) {
    var email = req.body.email;
    var password = req.body.password;

    login.login(email, password, function (found) {
        console.log(found);
        res.json(found);
    });
};

exports.register = function(req,res){
    var email = req.body.email;
    var password = req.body.password;

    register.register(email,password,function (found) {
        console.log(found);
        m_users.m.backup();
        res.json(found);
    });
};

exports.password_change = function(req, res) {
    var id = req.body.token;
    var opass = req.body.oldpass;
    var npass = req.body.newpass;

    password.change(id,opass,npass,function(found){
        console.log(found);
        m_users.m.backup();
        res.json(found);
    });
};

exports.password_code =  function(req, res) {

    var email = req.body.email;

    password.code(email,function(found){
        console.log(found);
        res.json(found);
    });
};

exports.password_reset = function(req, res) {
    var email = req.body.email;
    var code = req.body.code;
    var npass = req.body.newpass;

    password.reset(email,code,npass,function(found){
        console.log(found);
        m_users.m.backup();
        res.json(found);

    });
};

exports.token =  function(req, res) {
    var tkn = req.body.token;
    token.token(tkn,function(found){
        
        console.log(found);
        res.json(found);

    });
};


    
    