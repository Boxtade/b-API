var m_tasks = require('../../model/model_tasks');
var global = require('../../handler/global/global');

exports.create_task = function(args,callback){
    if(args.content === undefined || args.title === undefined)
        callback({'res':false, 'response': 'Bad request : no "tasks" object'});
    else
    {
        global.getCountTasks(function(count){
            count += 1;
            var task = new m_tasks({
                id:Math.round(Math.random()*1200000000),
                count:count,
                title:args.title,
                content:args.content,
                token:args.token
            });
            task.save(function(err){
                if(err)
                    callback({'res':false,'response':"Don't save task"});
                global.setCountTasks(count,function(err){
                    if(err)
                        callback({'res':false,'response':"Error updating count_tasks"});
                    callback({'res':true,'response':"New task created."});
                })
            });
        });
    }
};

exports.get_tasks = function(args,callback){
    m_tasks.find({token: args.token}).sort({ count: -1 }).exec(function(err,tasks){
        if(err)
            callback({'res':false,'response':"Error while the process"});
        else
            callback({'res':true,'response':"Done!",tasks:tasks});
    })
};

exports.get_task = function(args,callback){
    m_tasks.findOne({token: args.token,id:args.id}).exec(function(err,task){
        if(err)
            callback({'res':false,'response':"Error while the process"});
        else
            callback({'res':true,'response':"Done!",task:task});
    })
};

exports.update_task = function(args,callback){
    m_tasks.findOneAndUpdate({token: args.token,id:args.id},{title: args.title,content : args.content},function(err,task) {
        if (err)
            callback({'res': false, 'response': "Error while the process"});
        else
            callback({'res': true, 'response': "Done and update!", task: task});
    });
};

exports.delete_task  = function(args,callback){
    m_tasks.findOneAndRemove({token: args.token,id:args.id},function(err,task) {
        if (err)
            callback({'res': false, 'response': "Error while the process"});
        else
            callback({'res': true, 'response': "Done and update!", task: task});
    });
};