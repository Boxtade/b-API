/**
 * Created by Kevin on 2015-11-11.
 */
var tasks = require('./tasks');
var m_tasks = require('../../model/model_tasks');
var m_users = require('../../model/model_users');

var _checkIfUserIsValid = function(token,callback){
    m_users.find({token: token},function(err,users) {
        if (users.length != 0) {
            callback({'res':false,"response":"User doesn't exist"});
        }
        else
            callback({'res':true,"response":"User exists"});
    });
};

exports.create_task = function(req,res){
    m_tasks.open();
    var token = req.body.token;
    _checkIfUserIsValid(token,function(err){
        if(err.res)
            res.status(400).json(err);
        else{
            var args = {
                title:req.body["title"],
                content:req.body["content"],
                token:token
            };
            tasks.create_task(args,function(found){
                m_tasks.backup();
                m_tasks.close();
                res.status(200).json(found);
            })
        }
    });
};

exports.get_tasks = function(req,res){
    m_tasks.open();
    var token = req.body.token;
    _checkIfUserIsValid(token,function(err){
        if(err.res)
            res.status(400).json(err);
        else{
            var args = {
                token:token
            };
            tasks.get_tasks(args,function(found){
                m_tasks.backup();
                m_tasks.close();
                res.status(200).json(found);
            })
        }
    });
};

exports.get_task = function(req,res){
    m_tasks.open();
    var token = req.body.token;
    var id = req.body.id;
    _checkIfUserIsValid(token,function(err){
        if(err.res)
            res.status(400).json(err);
        else{
            var args = {
                token:token,
                id:id
            };
            tasks.get_task(args,function(found){
                m_tasks.backup();
                m_tasks.close();
                res.status(200).json(found);
            })
        }
    });
};

exports.update_task = function(req,res){
    m_tasks.open();
    var token = req.body.token;
    var id = req.body.id;
    var title = req.body.title;
    var content = req.body.content;
    _checkIfUserIsValid(token,function(err){
        if(err.res)
            res.status(400).json(err);
        else{
            var args = {
                token:token,
                id:id,
                title:title,
                content:content
            };
            tasks.update_task(args,function(found){
                m_tasks.backup();
                m_tasks.close();
                res.status(200).json(found);
            })
        }
    });
};

exports.delete_task  = function(req,res){
    m_tasks.open();
    var token = req.body.token;
    var id = req.body.id;
    _checkIfUserIsValid(token,function(err){
        if(err.res)
            res.status(400).json(err);
        else{
            var args = {
                token:token,
                id:id
            };
            tasks.delete_task(args,function(found){
                m_tasks.backup();
                m_tasks.close();
                res.status(200).json(found);
            })
        }
    });
};