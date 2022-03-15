const mocha = require('mocha');
const chai = require('chai');
const server = require("../app");
const chaiHttp = require('chai-http');
// Assertion style 
chai.should();
chai.use(chaiHttp);

describe('Tasks API',()=>{
    // Test the get route
    describe("/getTasks",()=>{
        it("It should get all the tasks",(done)=>{
            chai.request(server)
            .get("/getTasks")
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a("object"); 
                done();
            })
        })
    })
    // Wrong Route
    describe("/getTask",()=>{
        it("It should NOT get all the tasks",(done)=>{
            chai.request(server)
            .get("/getTask")
            .end((err,response)=>{
                response.should.have.status(404);
                done();
            })
        })
    })


    // test POST route
    describe("/uploadTask",()=>{
        it("It should Create a new Task",(done)=>{
            const newTask ={
                task:"Task-Tests",
                description:"It is Good",
                status:"under-process"
            }
            chai.request(server)
            .post("/uploadTask")
            .send(newTask)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('msg');
                response.body.should.have.property('task_todo');
                response.body.task_todo.should.have.property('_id');
                response.body.task_todo.should.have.property('task').eq("Task-Tests");
                response.body.task_todo.should.have.property('description').eq("It is Good");
                response.body.task_todo.should.have.property('status').eq("under-process");

                done();
            })
        })
    })
    describe("/uploadTask",()=>{
        it("It should NOT Create a new Task with the task property",(done)=>{
            const newTask ={
                task:"",
                description:"It is Good",
                status:"under-process"
            }
            chai.request(server)
            .post("/uploadTask")
            .send(newTask)
            .end((err,response)=>{
                console.log(response.body);
                response.should.have.status(400);
                response.body.should.have.property("msg").eq("Title is required");
                done();
            })
        })
    })

    // test the put route
       describe("/updateTaskDetails/:id",()=>{
        it("It should update a existing Task",(done)=>{
            const taskId="622adc962c2b3e7be1dd7306";
            const newTask ={
                task:"Task Updated",
                description:"It is Good Update" ,
                status:"pending"
            }
            chai.request(server)
            .put(`/updateTaskDetails/${taskId}`)
            .send(newTask)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('msg').eq("Task Updated");
                done();
            })
        })
    })

    // test the delete Route
      describe("/deleteTask/:id",()=>{
        it("It should delete an existing Task",(done)=>{
            const taskId="622adc962c2b3e7be1dd7306";
            chai.request(server)
            .delete(`/deleteTask/${taskId}`)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('msg').eq("Task Deleted");
                done();
            })
        })
    })
});