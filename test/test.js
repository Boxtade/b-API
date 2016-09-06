var request = require("supertest");
var mongoose = require('mongoose');
var global = require('../handler/global/global');

var app;
var token1,token2,taskNo5,taskNo2;

module.exports = function(a) {
    app = a;
    before(function(done){
        var db = mongoose.connect(app.constant.url_test,function(){
            db.connection.db.dropDatabase(function(){
                db.disconnect();
                done();
            });
        });
    });
    describe('status', function () {
        describe("GET/ status", getStatus);
    });
    describe('users', function () {
        describe("POST/ users/register", postUsersRegister);
        describe("POST/ users/login", postUsersLogin);
        describe("POST/ users/token", postUsersToken);
    });
    describe('password', function () {
        describe("POST/ users/password/change", postUsersPasswordChange);
        describe("POST/ users/password/code users/password/reset",postUsersPasswordCodeAndReset);
    });
    describe('bthinker tasks/',function(){
        describe("POST/ bthinker/tasks",postCreateTask);
        describe("GET/ bthinker/tasks",getAllTasks);
        describe("GET/ bthinker/task",getTask);
        describe("PUT/ bthinker/task",updateTask);
        describe("DELETE/ bthinker/task",deleteTask);
    });
    describe('global',function(){
        describe("GET/ global variable : count_tasks",getCountTasks);
        describe("SET/ global variable : count_tasks = 3",setCountTasks);
    });
};

var getStatus = function(){
    it("should have status 'Services's b-API are working.' ",function(done){
        request(app)
            .get("/status")
            .expect(function(res) {
                if("Services's b-API are working." != res.text )
                    throw new Error("nothing status 'Services's b-API are working.'");
            })
            .end(done);
    });

    it("should have http code 200", function(done){
        request(app)
            .get("/status")
            .expect(200)
            .end(done);
    })
};

var postUsersRegister = function() {
    describe("should create two users", function () {
        it("users1 : kvin.salles@gmail.com", function (done) {
            var json = {
                email: 'kvin.salles@gmail.com',
                password: 'Ab123456'
            };

            request(app)
                .post('/users/register')
                .set('Content-Type', 'application/json')
                .send(json)
                .expect(function (res) {
                    if (!res.body.res) {
                        throw new Error("Error during creation : " + res.body.response);
                    }
                })
                .expect(200, done);
        });
        it("users2 : boxtade@gmail.com", function (done) {
            var json = {
                email: 'boxtade@gmail.com',
                password: 'Ab123456'
            };

            request(app)
                .post('/users/register')
                .set('Content-Type', 'application/json')
                .send(json)
                .expect(function (res) {
                    if (!res.body.res) {
                        throw new Error("Error during creation : " + res.body.response);
                    }
                })
                .expect(200)
                .end(done);
        });
        it("should not create users3 : users3@gmail.com", function (done) {
            var json = {
                email: 'users3@gmail.com',
                password: 'ab1g'
            };

            request(app)
                .post('/users/register')
                .set('Content-Type', 'application/json')
                .send(json)
                .expect(function (res) {
                    if (res.body.res){
                        throw new Error("Error during creation : " + res.body.response);
                    }
                    else{
                        console.log("\t\t\t"+res.body.response);
                    }
                })
                .expect(200)
                .end(function(){
                    setTimeout(done,1000);
                });
        });
        it("should not create users4 : users4@hotmail.com", function (done) {
            var json = {
                email: 'users4@hotmail.com',
                password: 'Ab12345'
            };

            request(app)
                .post('/users/register')
                .set('Content-Type', 'application/json')
                .send(json)
                .expect(function (res) {
                    if (res.body.res){
                        throw new Error("Error during creation : " + res.body.response);
                    }
                    else{
                        console.log("\t\t\t"+res.body.response);
                    }
                })
                .expect(200)
                .end(function(){
                    setTimeout(done,1000);
                });
        });
    });
};

var postUsersLogin = function(){
    describe("should login two users", function () {
        it("login kvin.salles@gmail.com", function (done) {
            var json = {
                email: 'kvin.salles@gmail.com',
                password: 'Ab123456'
            };

            request(app)
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .send(json)
                .expect(function (res) {
                    if (!res.body.res){
                        throw new Error("Error during creation : " + res.body.response);
                    }
                    else{
                        token1 = res.body.token;
                    }
                })
                .expect(200)
                .end(done);
        });
        it("login boxtade@gmail.com", function (done) {
            var json = {
                email: 'boxtade@gmail.com',
                password: 'Ab123456'
            };

            request(app)
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .send(json)
                .expect(function (res) {
                    if (!res.body.res){
                        throw new Error("Error during creation : " + res.body.response);
                    }
                    else{
                        token2 = res.body.token;
                    }
                })
                .expect(200)
                .end(done);
        });
    });
};

var postUsersToken = function(){
    describe("should same token for both users", function () {
        it("check token kvin.salles@gmail.com", function (done) {
            var json = {
                token: token1
            };

            request(app)
                .post('/users/token')
                .set('Content-Type', 'application/json')
                .send(json)
                .expect(function (res) {
                    console.log("\t\t\t"+"token kvin.salles@gmail.com : "+res.body.token);
                    if (!res.body.res){
                        throw new Error("Error during creation : " + res.body.response);
                    }
                    else{
                        if(res.body.token != token1)
                            throw new Error("It doesn't same token");
                    }
                })
                .expect(200)
                .end(done);
        });
        it("check token boxtade@gmail.com", function (done) {
            var json = {
                token: token2
            };

            request(app)
                .post('/users/token')
                .set('Content-Type', 'application/json')
                .send(json)
                .expect(function (res) {
                    console.log("\t\t\t"+"token boxtade@gmail.com : "+res.body.token);
                    if (!res.body.res){
                        throw new Error("Error during creation : " + res.body.response);
                    }
                    else{
                        if(res.body.token != token2)
                            throw new Error("It doesn't same token");
                    }
                })
                .expect(200)
                .end(done);
        });
    });
};

var postUsersPasswordChange = function(){
    describe("should be able to change password for both users", function () {
        it("change password kvin.salles@gmail.com", function (done) {
            var json = {
                oldpass: "Ab123456",
                newpass: "Xy456789",
                token:token1
            };

            request(app)
                .post('/users/password/change')
                .set('Content-Type', 'application/json')
                .send(json)
                .expect(function (res) {
                    if (!res.body.res){
                        throw new Error("Error during creation : " + res.body.response);
                    }
                })
                .expect(200)
                .end(done);
        });
        it("change password boxtade@gmail.com", function (done) {
            var json = {
                oldpass: "Ab123456",
                newpass: "Xy456789",
                token:token2
            };

            request(app)
                .post('/users/password/change')
                .set('Content-Type', 'application/json')
                .send(json)
                .expect(function (res) {
                    if (!res.body.res){
                        throw new Error("Error during creation : " + res.body.response);
                    }
                })
                .expect(200)
                .end(done);
        });
    });
};

var postUsersPasswordCodeAndReset = function(){
    var resetCode = 0;
    describe("should can reset a lost password of kvin.salles@gmail.com user ", function () {
        it("reset code", function (done) {
            var json = {
                email: "kvin.salles@gmail.com"
            };
            request(app)
                .post('/users/password/code')
                .set('Content-Type', 'application/json')
                .send(json)
                .expect(function (res) {
                    console.log("Code : "+res.body.code);
                    resetCode = res.body.code;
                    if (!res.body.res){
                        throw new Error("Error during creation : " + res.body.response);
                    }
                })
                .expect(200)
                .end(done);
        });
        it("reset password", function (done) {
            var json = {
                email: "kvin.salles@gmail.com",
                code:resetCode,
                newpass: "Ab123456"
            };
            request(app)
                .post('/users/password/reset')
                .set('Content-Type', 'application/json')
                .send(json)
                .expect(function (res) {
                    if (!res.body.res){
                        throw new Error("Error during creation : " + res.body.response);
                    }
                })
                .expect(200)
                .end(done);
        });
        it("login kvin.salles@gmail.com", function (done) {
            var json = {
                email: 'kvin.salles@gmail.com',
                password: 'Ab123456'
            };

            request(app)
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .send(json)
                .expect(function (res) {
                    if (!res.body.res){
                        throw new Error("Error during creation : " + res.body.response);
                    }
                    else{
                        token1 = res.body.token;
                    }
                })
                .expect(200)
                .end(done);
        });
    });
    describe("should cannot reset a lost password of boom@gmail.com user ", function () {
        it("reset code", function (done) {
            var json = {
                email: "boom@gmail.com"
            };
            request(app)
                .post('/users/password/code')
                .set('Content-Type', 'application/json')
                .send(json)
                .expect(function (res) {
                    console.log("Code : "+res.body.code);
                    resetCode = res.body.code;
                    if (res.body.res){
                        throw new Error("Error during creation : " + res.body.response);
                    }
                })
                .expect(200)
                .end(done);
        });
    });
};

var getCountTasks = function(){
    it("should have a number more than -1",function(done){
        global.getCountTasks(function(count){
            if(count == -1)
                throw new Error("Error global variable : count_tasks");
            done();
        })
    })
};

var setCountTasks = function(){
    it("should have a number equal to 3",function(done){
        global.setCountTasks(3,function(code) {
            if(code == -1)
                throw new Error("Error in setCountTasks");
            global.getCountTasks(function (count) {
                if (count != 3)
                    throw new Error("Error global variable : count_tasks");
                done();
            })
        })
    })
};

var postCreateTask = function(){
    describe("should create ten posts", function () {
        for(var i = 0;i<10;i++){
            if(i%2 == 0){
                it("should have http code : 200 with user1", function (done) {
                    var json = {
                        title: "My task user1 No : ",
                        content : "Voici le contenu du post. Interessant, non!!!!",
                        token:token1
                    };

                    request(app)
                        .post('/bthinker/tasks')
                        .set('Content-Type', 'application/json')
                        .send(json)
                        .expect(function (res) {
                            if (!res.body.res){
                                throw new Error("Error during creation : " + res.body.response);
                            }
                        })
                        .expect(200,done);
                });
            }
            else{
                it("should have http code : 200 with user2", function (done) {
                    var json = {
                        title: "My task user2 No : ",
                        content : "Voici le contenu du post. Interessant, non!!!!",
                        token:token2
                    };

                    request(app)
                        .post('/bthinker/tasks')
                        .set('Content-Type', 'application/json')
                        .send(json)
                        .expect(function (res) {
                            if (!res.body.res){
                                throw new Error("Error during creation : " + res.body.response);
                            }
                        })
                        .expect(200,done);
                });
            }
        }
    });
};

var getAllTasks = function(){
  describe("should get all tasks's user1",function(){
      it("should have http code : 200", function (done) {
          var json = {token: token1};

          request(app)
              .get('/bthinker/tasks')
              .set('Content-Type', 'application/json')
              .send(json)
              .expect(function (res) {
                  if (!res.body.res){
                      throw new Error("Error during creation : " + res.body.response);
                  }

                  var tasks = res.body.tasks;
                  for(var index in tasks){
                      if(index == 2)
                        taskNo5 = tasks[index].id;
                      console.log("\t\t\t"+tasks[index].title+tasks[index].count);
                      if(tasks[index].token != token1)
                          throw new Error("Error matching token.");
                  }
              })
              .expect(200,done);
      });
  });

    describe("should get all tasks's user2",function(){
        it("should have http code : 200", function (done) {
            var json = {token: token2};

            request(app)
                .get('/bthinker/tasks')
                .set('Content-Type', 'application/json')
                .send(json)
                .expect(function (res) {
                    if (!res.body.res){
                        throw new Error("Error during creation : " + res.body.response);
                    }

                    var tasks = res.body.tasks;
                    for(var index in tasks){
                        if(index == 4)
                            taskNo2 = tasks[index].id;
                        console.log("\t\t\t"+tasks[index].title+tasks[index].count);
                        if(tasks[index].token != token2)
                            throw new Error("Error matching token.");
                    }
                })
                .expect(200,done);
        });
    })
};

var getTask = function(){
    describe("should get tasks number 5 of user1",function(){
        it("should have http code : 200", function (done) {
            var json = {
                token: token1,
                id:taskNo5
            };

            request(app)
                .get('/bthinker/task')
                .set('Content-Type', 'application/json')
                .send(json)
                .expect(function (res) {
                    if (!res.body.res){
                        throw new Error("Error during creation : " + res.body.response);
                    }
                    var task = res.body.task;
                    console.log("\t\t\t"+task.title+task.count);
                    if(task.token != token1)
                        throw new Error("Error matching token.");
                })
                .expect(200,done);
        });
    });

    describe("should get tasks number 2 of user2",function(){
        it("should have http code : 200", function (done) {
            var json = {
                token: token2,
                id:taskNo2
            };

            request(app)
                .get('/bthinker/task')
                .set('Content-Type', 'application/json')
                .send(json)
                .expect(function (res) {
                    if (!res.body.res){
                        throw new Error("Error during creation : " + res.body.response);
                    }

                    var task = res.body.task;
                    console.log("\t\t\t"+task.title+task.count);
                    if(task.token != token2)
                        throw new Error("Error matching token.");
                })
                .expect(200,done);
        });
    })
};

var updateTask = function(){
    describe("should update tasks number 5 of user1",function(){
        it("should have http code : 200", function (done) {
            var json = {
                token: token1,
                id:taskNo5,
                title:"MY TASK USER1 NO : ",
                content:"VOICI LE CONTENU DU POST. INTERESSANT, NON!!!!"
            };

            request(app)
                .put('/bthinker/task')
                .set('Content-Type', 'application/json')
                .send(json)
                .expect(function (res) {
                    if (!res.body.res){
                        throw new Error("Error during creation : " + res.body.response);
                    }
                    var task = res.body.task;
                    console.log("\t\t\t"+task.title+task.count);
                    console.log("\t\t\t"+task.content);
                    if(task.token != token1)
                        throw new Error("Error matching token.");
                })
                .expect(200,done);
        });
    });

    describe("should get tasks number 2 of user2",function(){
        it("should have http code : 200", function (done) {
            var json = {
                token: token2,
                id:taskNo2,
                title:"MY TASK USER2 NO : ",
                content:"VOICI LE CONTENU DU POST. INTERESSANT, NON!!!!"
            };

            request(app)
                .put('/bthinker/task')
                .set('Content-Type', 'application/json')
                .send(json)
                .expect(function (res) {
                    if (!res.body.res){
                        throw new Error("Error during creation : " + res.body.response);
                    }

                    var task = res.body.task;
                    console.log("\t\t\t"+task.title+task.count);
                    console.log("\t\t\t"+task.content);
                    if(task.token != token2)
                        throw new Error("Error matching token.");
                })
                .expect(200,done);
        });
    })
};

var deleteTask = function(){
    describe("should deleted tasks number 5 of user1",function(){
        it("should have http code : 200", function (done) {
            var json = {
                token: token1,
                id:taskNo5
            };

            request(app)
                .delete('/bthinker/task')
                .set('Content-Type', 'application/json')
                .send(json)
                .expect(function (res) {
                    if (!res.body.res){
                        throw new Error("Error during creation : " + res.body.response);
                    }
                    var task = res.body.task;
                    console.log("\t\t\t"+task.title+task.count);
                    console.log("\t\t\t"+task.content);
                    if(task.token != token1)
                        throw new Error("Error matching token.");
                })
                .expect(200,done);
        });
    });

    describe("should get tasks number 2 of user2",function(){
        it("should have http code : 200", function (done) {
            var json = {
                token: token2,
                id:taskNo2
            };

            request(app)
                .delete('/bthinker/task')
                .set('Content-Type', 'application/json')
                .send(json)
                .expect(function (res) {
                    if (!res.body.res){
                        throw new Error("Error during creation : " + res.body.response);
                    }

                    var task = res.body.task;
                    console.log("\t\t\t"+task.title+task.count);
                    console.log("\t\t\t"+task.content);
                    if(task.token != token2)
                        throw new Error("Error matching token.");
                })
                .expect(200,done);
        });
    })
};
