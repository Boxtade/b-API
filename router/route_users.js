var users = require("../handler/users/users");

module.exports = function(app) {        
    
     app.post('/users/login',users.login);     

     app.post('/users/register',users.register);     

     app.post('/users/password/change',users.password_change );     

     app.post('/users/password/code',users.password_code);     

     app.post('/users/password/reset',users.password_reset);

     app.post('/users/token',users.token);
};