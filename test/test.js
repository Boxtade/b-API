var request = require("supertest");
var mongoose = require('mongoose');

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
        describe("POST/ users/register",postUsersRegister);
        describe("POST/ users/login",postUsersLogin);
        describe("POST/ users/token",postUsersToken);
        describe("POST/ users/password/change",postUsersPasswordChange);
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

