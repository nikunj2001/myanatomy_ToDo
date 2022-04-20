const mocha = require('mocha');
const chai = require('chai');
const server = require("../app");
const chaiHttp = require('chai-http');
// Assertion style 
chai.should();
chai.use(chaiHttp);

let defaultUser = {
    email: "nikunj.gupta_cs19@gla.ac.in",
    password: "123456"
}

let token;
let userId;
let taskId, numOfTasks;
describe('Tasks API', () => {
    beforeEach(done => {
        chai.request(server)
            .post("/loginUser")
            .send(defaultUser)
            .end((err, response) => {
                token = response.body.token;
                userId = response.body.user._id;
                done();
            })
    });
    // test POST route
    describe("/uploadTask", () => {
        it("It should Create a new Task", (done) => {
            const newTask = {
                task: "Task-Tests",
                description: "It is Good to test",
                status: "under-process"
            }
            chai.request(server)
                .post("/uploadTask")
                .send(newTask)
                .set('Cookie', `token=${token}`)
                .end((err, response) => {
                    taskId = response.body.taskCreated._id;
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('msg');
                    response.body.should.have.property('taskCreated');
                    response.body.taskCreated.should.have.property('_id');
                    response.body.taskCreated.should.have.property('task').eq("Task-Tests");
                    response.body.taskCreated.should.have.property('description').eq("It is Good to test");
                    response.body.taskCreated.should.have.property('status').eq("under-process");
                    done();
                })
        });
        it("It should NOT Create a new Task without the task property", (done) => {
            const newTask = {
                task: "",
                description: "It is Good",
                status: "under-process"
            }
            chai.request(server)
                .post("/uploadTask")
                .send(newTask)
                .set('Cookie', `token=${token}`)
                .end((err, response) => {
                    response.body.should.have.property('errors');
                    response.body.errors.should.be.a("array");
                    response.body.errors[0].should.have.property("msg").eq("Task Cannot be Empty");
                    done();
                })
        })
        it("It should NOT Create a new Task Because of wrong status", (done) => {
            const newTask = {
                task: "Task-2",
                description: "It is Good",
                status: "testtttttt"
            }
            chai.request(server)
                .post("/uploadTask")
                .send(newTask)
                .set('Cookie', `token=${token}`)
                .end((err, response) => {
                    response.body.should.have.property('errors');
                    response.body.errors.should.be.a("array");
                    response.body.errors[0].should.have.a.property('msg').eq("Status Must be Either Pending,under-process Or completed");
                    done();
                })
        })
    })

    // Test the get route
    describe("/getTasks", () => {
        it("It should get all the tasks", (done) => {
            chai.request(server)
                .get(`/getTasks/${userId}`)
                .set('Cookie', `token=${token}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.tasks[0].should.be.a("object");
                    response.body.tasks[0].should.have.all.keys(["_id", "task", "userId", "status", "description", "createdAt", "__v"]);
                    done();
                })
        })

        it("It should get all the tasks because owner is not Valid for the Call.", (done) => {
            chai.request(server)
                .get(`/getTasks/625feb1a312ec4fd1187af62`)
                .set('Cookie', `token=${token}`)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a("object");
                    response.body.should.have.property("msg").eq("Cannot Fetch Tasks.Id Not Matched.")
                    done();
                })
        })

        it("It should Not get Tasks because of User does not exist with this Id", (done) => {
            chai.request(server)
                .get(`/getTasks/123654789101`)
                .set('Cookie', `token=${token}`)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a("object");
                    response.body.should.have.property("msg").eq("User Not Found with this UserID");
                    done();
                })
        })
        it("It should Not get Tasks because of Invalid User ID", (done) => {
            chai.request(server)
                .get(`/getTasks/123`)
                .set('Cookie', `token=${token}`)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a("object");
                    response.body.should.have.property("message").eq("Invalid ID Please Enter a valid Id");
                    done();
                })
        })

        it("It should not get all the tasks because of wrong token", (done) => {
            chai.request(server)
                .get(`/getTasks/${userId}`)
                .set('Cookie', `token=123654789asda`)
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.should.be.a("object");
                    response.body.should.have.property("errors");
                    response.body.errors.should.be.a("array");
                    response.body.errors[0].should.have.property("msg").eq("jwt malformed");
                    done();
                })
        })

        // Wrong Route 
        it("It should NOT get all the tasks because of wrong URL", (done) => {
            chai.request(server)
                .get("/getTask")
                .set('Cookie', `token=${token}`)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })
    })


    // test the put route
    describe("/updateTaskDetails/:id", () => {
        it("It should update a existing Task", (done) => {
            const newTask = {
                task: "Task Updated",
                description: "It is Good Update",
                status: "pending"
            }
            chai.request(server)
                .put(`/updateTaskDetails/${taskId}`)
                .send(newTask)
                .set('Cookie', `token=${token}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('msg').eq("Task Updated");
                    done();
                })
        })

        it("It should Not update an existing Task Because Task Field is not Provided ", (done) => {
            const newTask = {
                task: "",
                description: "It is Good Update",
                status: "pending"
            }
            chai.request(server)
                .put(`/updateTaskDetails/${taskId}`)
                .send(newTask)
                .set('Cookie', `token=${token}`)
                .end((err, response) => {
                    response.body.should.have.property('errors');
                    response.body.errors.should.be.a("array");
                    response.body.errors[0].should.have.property("msg").eq("Task Cannot be Empty");
                    done();
                })
        })

        it("It should Not update an existing Task Because Task status in Not Valid ", (done) => {
            const newTask = {
                task: "Task Update",
                description: "It is Good Update",
                status: "TEstts"
            }
            chai.request(server)
                .put(`/updateTaskDetails/${taskId}`)
                .send(newTask)
                .set('Cookie', `token=${token}`)
                .end((err, response) => {
                    response.body.should.have.property('errors');
                    response.body.errors.should.be.a("array");
                    response.body.errors[0].should.have.a.property('msg').eq("Status Must be Either Pending,under-process Or completed");
                    done();
                })
        })

        it("It should Not update an existing Task Because of Invalid Task ID", (done) => {
            const newTask = {
                task: "Task Update",
                description: "It is Good Update",
                status: "pending"
            }
            chai.request(server)
                .put(`/updateTaskDetails/321564`)
                .send(newTask)
                .set('Cookie', `token=${token}`)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a("object");
                    response.body.should.have.property("message").eq("Invalid ID Please Enter a valid Id");
                    done();
                })
        })
        it("It should Not update an existing Task Because Task ID is Not present in the DB ", (done) => {
            const newTask = {
                task: "Task Update",
                description: "It is Good Update",
                status: "pending"
            }
            chai.request(server)
                .put(`/updateTaskDetails/625feb1a312ec4fd1187af62`)
                .send(newTask)
                .set('Cookie', `token=${token}`)
                .end((err, response) => {
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    response.body.should.have.property("message").eq("Task Not Found with This Id");
                    done();
                })
        })
    })

    // test the delete Route
    describe("/deleteTask/:id", () => {
        it("It should delete an existing Task", (done) => {
            chai.request(server)
                .delete(`/deleteTask/${taskId}`)
                .set('Cookie', `token=${token}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('msg').eq("Task Deleted");
                    done();
                })
        })
        it("It should Not delete an existing because Task Id is not Valid", (done) => {
            chai.request(server)
                .delete(`/deleteTask/123456897`)
                .set('Cookie', `token=${token}`)
                .end((err, response) => {
                    console.log(response.body);
                    response.should.have.status(400);
                    response.body.should.be.a("object");
                    response.body.should.have.property("message").eq("Invalid ID Please Enter a valid Id");
                    done();
                })
        })
    })
});