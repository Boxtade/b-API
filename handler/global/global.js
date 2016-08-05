var m_global = require('../../model/model_global');
var mongoose = require('mongoose');
var local = false;

exports.getCountTasks = function(callback){
    if(mongoose.connection.readyState == 0){
        m_global.open();
        local = true;
    }

    m_global.find({},function(err,global){
        if(err){
            if(local){
                local = false;
                m_global.close();
            }
            callback(-1);
        }
        else{
            if(global.length == 0){
                var newVar = new m_global({count_tasks:0});
                newVar.save(function(err) {
                    m_global.backup();
                    if(local){
                        local = false;
                        m_global.close();
                    }
                    if (err){
                        callback(-1);
                    }
                    callback(0);
                });
            }
            else{
                if(local){
                    local = false;
                    m_global.close();
                }
                callback(global[0].count_tasks);
            }
        }
    });
};

exports.setCountTasks = function(newCount, callback){
    if(mongoose.connection.readyState == 0){
        m_global.open();
        local = true;
    }
    m_global.find({},function(err,global){
        if(err){
            if(local){
                local = false;
                m_global.close();
            }
            callback(-1);
        }
        else{
            global[0].count_tasks = newCount;
            _updateGlobal(global[0],global[0].toObject(),callback);
        }
    });

};

var _updateGlobal = function(model,object,callback){
    model.update(model,{upsert: true},function(err) {
        m_global.backup();
        if(local){
            local = false;
            m_global.close();
        }
        if (err){
            callback(-1);
        }
        callback(0);
    });
};