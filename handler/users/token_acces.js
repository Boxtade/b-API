/**
 * Created by kvins on 30/06/2016.
 */
var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var m_users = require('../../model/model_users');

exports.token = function(token,callback) {

    m_users.find({token: token},function(err,users){
        if(users.length != 0){
            m_users.backup();
            callback({'response':"Login Sucess",'res':true,'token':token});
        }else {
            callback({'response':"Token does not exist",'res':false});
        }
    });
}