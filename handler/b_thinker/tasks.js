var m_tasks = require('../../model/model_tasks');
var global = require('../../handler/global/global');

exports.create_task = function(args,callback){
    if(args.content === undefined && args.title === undefined)
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