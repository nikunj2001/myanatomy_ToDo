const chai = require('chai');
const server = require('../app');
const chaiHttp = require('chai-http');
const Users = require("../models/Users");
chai.should();
chai.use(chaiHttp);

let defaultEmail = {
    email: "trying@gmail.com"
}

describe("Create New User", () => {
    before(async () => {
        try {
            const response = await Users.findOneAndDelete({ email: defaultEmail.email });
        } catch (error) {
            console.log(error);
        }
    })
    after(async () => {
        try {
            const response = await Users.findOneAndDelete({ email: defaultEmail.email });
        } catch (error) {
            console.log(error);
        }
    })

    describe("/registerUser", () => {

        it("It should create new User", (done) => {
            const userBody = {
                name: "try",
                email: defaultEmail.email,
                password: "123456"
            }
            chai.request(server)
                .post("/registerUser")
                .send(userBody)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('msg').eq("User created");
                    response.body.should.have.property('user');
                    response.body.should.have.property('token');
                    response.body.user.should.have.property('_id');
                    response.body.user.should.have.property('name');
                    response.body.user.should.have.property('email');
                    response.body.user.should.have.property('password');
                    done();
                })
        })


        it("It should NOT create new User because of no email", (done) => {
            const userBody = {
                name: "try",
                email: "",
                password: "123456"
            }
            chai.request(server)
                .post("/registerUser")
                .send(userBody)
                .end((err, response) => {
                    response.body.should.have.property('errors');
                    response.body.errors.should.be.a("array");
                    response.body.errors[0].should.have.property("msg").eq("Email is required");
                    response.body.errors[0].should.have.property("value").eq("");
                    response.body.errors[0].should.have.property("param").eq("email");
                    done();
                })
        })


        it("It should NOT create new User because of invalid email", (done) => {
            const userBody = {
                name: "try",
                email: "tryyyyyyyyy",
                password: "123456"
            }
            chai.request(server)
                .post("/registerUser")
                .send(userBody)
                .end((err, response) => {
                    response.body.should.have.property('errors');
                    response.body.errors.should.be.a("array");
                    response.body.errors[0].should.have.property("msg").eq("Enter a valid Email");
                    response.body.errors[0].should.have.property("value").eq("tryyyyyyyyy");
                    done();
                })
        })

        it("It should NOT create new User because of Empty Password", (done) => {
            const userBody = {
                name: "try",
                email: "tryy@gmail.com",
                password: ""
            }
            chai.request(server)
                .post("/registerUser")
                .send(userBody)
                .end((err, response) => {
                    response.body.should.have.property('errors');
                    response.body.errors.should.be.a("array");
                    response.body.errors[0].should.have.property("msg").eq("Enter a valid Password");
                    response.body.errors[0].should.have.property("value").eq("");
                    done();
                })
        })

        it("It should NOT create new User because of Short Password", (done) => {
            const userBody = {
                name: "try",
                email: "tryy@gmail.com",
                password: "123"
            }
            chai.request(server)
                .post("/registerUser")
                .send(userBody)
                .end((err, response) => {
                    response.body.should.have.property('errors');
                    response.body.errors.should.be.a("array");
                    response.body.errors[0].should.have.property("msg").eq("Password must be 6 character long");
                    response.body.errors[0].should.have.property("value").eq("123");
                    done();
                })
        })

    }),

        describe("/loginUser", () => {
            it("user login successfully", (done) => {
                const userBody = {
                    email: "nikunj.gupta_cs19@gla.ac.in",
                    password: "123456"
                }
                chai.request(server)
                    .post("/loginUser")
                    .send(userBody)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.have.property('msg').eq("User Logged In");
                        response.body.should.have.property('user');
                        response.body.should.have.property('token');
                        response.body.user.should.have.property('_id');
                        response.body.user.should.have.property('name');
                        response.body.user.should.have.property('email');
                        response.body.user.should.have.property('password');
                        done();
                    })
            })
            it("user login Faild with email not existing", (done) => {
                const userBody = {
                    email: "wrong@gmail.com",
                    password: "123456"
                }
                chai.request(server)
                    .post("/loginUser")
                    .send(userBody)
                    .end((err, response) => {
                        response.body.should.have.property('errors');
                        response.body.errors.should.be.a("array");
                        response.body.errors[0].should.have.property("msg").eq("User not found with this email");
                        done();
                    })
            })

            it("user login Faild with wrong password", (done) => {
                const userBody = {
                    email: "nikunj.gupta_cs19@gla.ac.in",
                    password: "123"
                }
                chai.request(server)
                    .post("/loginUser")
                    .send(userBody)
                    .end((err, response) => {
                        response.body.should.have.property('errors');
                        response.body.errors.should.be.a("array");
                        response.body.errors[0].should.have.property("msg").eq("wrong username or password");
                        done();
                    })
            })
        })

})