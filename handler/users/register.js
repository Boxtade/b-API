var crypto = require('crypto'); 
var rand = require('csprng');
var m_users = require('../../model/model_users');   


exports.register = function(email,password,callback) {

    var x = email;
    if(!(x.indexOf("@")==x.length)){
        if(!(x.match("hotmail") || x.match("outlook") || x.match("msn"))){
            if (password.length > 0) {
                var temp =rand(160, 36);
                var newpass = temp + password;
                var token = crypto.createHash('sha512').update(email +rand).digest("hex");
                var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");

                var newuser = new m_users({
                    token: token,
                    email: email,
                    hashed_password: hashed_password,
                    salt :temp });

                m_users.find({email: email},function(err,users){

                    var len = users.length;

                    if(len == 0){
                        newuser.save(function (err) {
                            callback({'res':true ,'response':"You have been successfully registered"});});
                    }
                    else{
                        callback({'res':false,'response':"Email is already registered"});
                    }
                });
            }
            else{
                callback({'res':false,'response':"Password is empty"});
            }
        }
        else{
            callback({'res':false,'response':"Microsoft emails are not accepted"});
        }
    }
    else{
        callback({'res':false,'response':"Email is not valid"});
    }
}  ;