var crypto = require('crypto'); 
var rand = require('csprng'); 
var mongoose = require('mongoose');
var m_users = require('../../model/model_users');
var api_key = 'key-e435d1bb720e3934a86f44d189f52bc5';
var domain = 'boxtade.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

exports.change = function(id,opass,npass,callback) {  

     var temp1 =rand(160, 36);
     var newpass1 = temp1 + npass;
     var hashed_passwordn = crypto.createHash('sha512').update(newpass1).digest("hex");

    m_users.find({token: id},function(err,users){
         if(users.length != 0){

             var temp = users[0].salt;
             var hash_db = users[0].hashed_password; var newpass = temp + opass;
             var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");

             if(hash_db == hashed_password){
                  if (npass.length > 0) {
                      m_users.findOne({ token: id }, function (err, doc){
                            doc.hashed_password = hashed_passwordn;
                            doc.salt = temp1;
                            doc.save();

                       callback({'response':"Password successfully changed",'res':true});
                       });
                  }else{
                       callback({'response':"New password is empty.",'res':false});
                  }
             }
             else{
                  callback({'response':"Password does not match with the old password. Try Again !",'res':false});
             }
         }
         else{
            callback({'response':"Error while changing password",'res':false});
         }
     });
};

exports.code = function(email,callback) {
    var temp =rand(24, 24);
    m_users.find({email: email}, function (err, users) {
        if (users.length != 0) {
            m_users.findOne({email: email}, function (err, doc) {
                doc.temp_str = temp;
                doc.save();

                var mailOptions = {
                    from: "noreply <noreply@boxtade.com>",
                    to: email,
                    subject: "Reset Your Password on b-thinker",
                    text: "Hello " + email + ".\nCode to reset your Password is " + temp + ".\nb-thinker team.",
                };

                mailgun.messages().send(mailOptions, function (error, body) {
                    if (error) {
                        callback({'response': "Error While Resetting password. Try Again !", 'res': false});
                    } else {
                        if(require('../../config/constant').debug_mode){
                            callback({
                                'code':temp,
                                'response': "Check your email and enter the verification code to reset your password.",
                                'res': true
                            });
                        }
                        else{
                            callback({
                                'response': "Check your email and enter the verification code to reset your password.",
                                'res': true
                            });
                        }
                    }
                });
            });
        } else {
            callback({'response': "Email does not exist.", 'res': false});
        }
    });
};

exports.reset = function(email,code,npass,callback) {

    m_users.find({email: email},function(err,users){
          if(users.length != 0){
               var temp = users[0].temp_str;
               var temp1 =rand(160, 36);
               var newpass1 = temp1 + npass;
               var hashed_password = crypto.createHash('sha512').update(newpass1).digest("hex");

               if(temp == code){
                    if (npass.length > 0) {
                        m_users.findOne({ email: email }, function (err, doc){
                              doc.hashed_password= hashed_password;
                              doc.salt = temp1;
                              doc.temp_str = "";
                              doc.save();

                              callback({'response':"Password successfully changed",'res':true});
                         });
                    }
                    else{
                         callback({'response':"New password is empty.",'res':false});
                    }
               }
               else{
                    callback({'response':"Code does not match. Try Again !",'res':false});
               }
          }
          else{
               callback({'response':"Error",'res':true});
          }
     });
}  