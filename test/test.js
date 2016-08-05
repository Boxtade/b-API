var request = require("supertest");
var mongoose = require('mongoose');
var global = require('../handler/global/global');

var app;
var token1,token2;

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
    describe('users', function () {
        describe("GET/ status", getStatus);
        describe("POST/ users/register", postUsersRegister);
        describe("POST/ users/login", postUsersLogin);
        describe("POST/ users/token", postUsersToken);
        describe("POST/ users/password/change", postUsersPasswordChange);
    });
    describe('global',function(){
        describe("GET/ global variable : count_tasks",getCountTasks);
        describe("SET/ global variable : count_tasks = 3",setCountTasks);
    });
    describe('bthinker tasks/',function(){
        describe("POST/ bthinker/tasks",postCreateTask);
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
                    if (!res.body.res){
                        throw new Error("Error during creation : " + res.body.response);
                    }
                })
                .expect(200,done);
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
                    if (!res.body.res){
                        throw new Error("Error during creation : " + res.body.response);
                    }
                })
                .expect(200)
                .end(done);
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
            it("should have http code : 200", function (done) {
                var json = {
                    title: "My task",
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
    });

};

