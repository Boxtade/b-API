var task = require("../handler/b_thinker/bthinker");

module.exports = function(app) {

    app.post('/bthinker/task',task.create_task);
    
    app.get("/bthinker/tasks",task.get_tasks);
    
    app.get("/bthinker/task",task.get_task);
    
    app.put('/bthinker/task',task.update_task);
    
    app.delete('/bthinker/task',task.delete_task);
};