var password = require('./password');
var register = require('./register');
var login = require('./login');
var token = require('./token_acces');
var info = require('./info');
var m_users = require('../../model/model_users');

exports.login = function(req,res) {

    var email = req.body.email;
    var password = req.body.password;
    m_users.open();
    login.login(email, password, function (found) {
        res.json(found);
        m_users.close();
    });
};

exports.register = function(req,res){
    m_users.open();
    var email = req.body.email;
    var password = req.body.password;

    register.register(email,password,function (found) {
        m_users.backup();
        m_users.close();
        res.json(found);
    });
};

exports.password_change = function(req, res) {
    m_users.open();
    var id = req.body.token;
    var opass = req.body.oldpass;
    var npass = req.body.newpass;

    password.change(id,opass,npass,function(found){
        m_users.backup();
        res.json(found);
        m_users.close();
    });
};

exports.password_code =  function(req, res) {
    m_users.open();
    var email = req.body.email;

    password.code(email,function(found){
        console.log(found);
        res.json(found);
        m_users.close();
    });
};

exports.password_reset = function(req, res) {
    m_users.open();
    var email = req.body.email;
    var code = req.body.code;
    var npass = req.body.newpass;

    password.reset(email,code,npass,function(found){
        m_users.backup();
        res.json(found);
        m_users.close();
    });
};

exports.token =  function(req, res) {
    m_users.open();
    var tkn = req.body.token;

    token.token(tkn,function(found){
        res.json(found);
        m_users.close();
    });
};

exports.email =  function(req, res) {
    m_users.open();
    var token;
    (req.body.token === undefined)?(token=req.query.token):(token = req.body.token);
    info.email(token,function(found){
        res.json(found);
        m_users.close();
    });
};


    
    