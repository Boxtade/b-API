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

exports.get_tasks = function(request,response){
    response.status(200).json({
        tasks:exports.tasks.sort(function(a,b){
            if(a.count == b.count)
                return 0;
            if(a.count < b.count)
                return 1;
            if(a.count > b.count)
                return -1;
        })
    });
};

exports.get_task = function(request,response){
    var index = findTask(request.params.id);
    if(index === undefined)
        response.status(404).send("Not Found");
    response.status(200).json(exports.tasks[index]);
};

exports.update_task = function(request,response){
    var index = findTask(request.params.id);
    if(index === undefined)
        response.status(404).send("Not Found");
    if(request.body["task"] === undefined)
        response.status(400).send("Bad request");
    exports.tasks[index].task = request.body["task"];
    exports.get_tasks(request,response);
};

exports.delete_task  = function(request,response){
    var index = findTask(request.params.id);
    if(index === undefined)
       response.status(404).send("Not Found");
    exports.tasks.splice(index,1);
    exports.get_tasks(request,response);
};

var findTask = function(id){
    for(var i=0;i<exports.tasks.length;i++)
    {
        if(exports.tasks[i].id == id)
            return i;
    }
    return undefined;
};