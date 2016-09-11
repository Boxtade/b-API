/**
 * Created by kvins on 11/09/2016.
 */
var crypto = require('crypto');
var m_users = require('../../model/model_users');

exports.email = function(token,callback) {
    m_users.find({token:token},function(err,users){
        if(users.length != 0){
            var email = users[0].email;
            callback({'response':"email sended",'res':true,'email':email});
        }
        else {
            callback({'response':"User does not exist",'res':false});
        }
    });
}
