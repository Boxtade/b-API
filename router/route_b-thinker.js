var task = require("../handler/b_thinker/bthinker");

module.exports = function(app) {

    app.get('/bthinker', function(req, res) {res.end("Api b-thinker works.");});

    app.post('/bthinker/tasks',task.create_task);
    
    app.get("/bthinker/tasks",task.get_tasks);
    
    app.get("/bthinker/tasks/:id",task.get_task);
    
    app.put('/bthinker/tasks/:id',task.update_task);
    
    app.delete('/bthinker/tasks/:id',task.delete_task);
};