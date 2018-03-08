var chai = require("chai");
var chaiHttp = require("chai-http");
var should = chai.should();

chai.use(chaiHttp);

describe("test login", () => {
  it("successfully login", function(done) {
    chai
      .request("http://localhost:3000")
      .post("/signin")
      .send({
        username: "andrew",
        password: "boxaladin"
      })
      .end((err, res) => {
        res.should.have.status(200);

        res.should.be.json;
        res.should.be.a('object');

        // res.body.should.have.property("username");
        // res.body.username.should.equal("andrew");
        // res.body.username.should.be.a("String");

        // res.body.should.have.property("password");
        // res.body.password.should.equal("968BBY39e90dbfb42f0f56960086bc6dd62670");
        // res.body.password.should.be.a("String");

        res.body.should.have.property('message').eql('login success');

        id = res.body.id;
        done();
      });
  });

  it("login with wrong password", function(done) {
    chai
      .request("http://localhost:3000")
      .post("/signin")
      .send({
        username: "andrew",
        password: "adasdsafasfasfas"
      })
      .end((err, res) => {
        res.should.have.status(200);

        res.should.be.json;
        res.should.be.a('object');
        res.body.should.have.property('message').eql('password incorrect');

        id = res.body.id;
        done();
      });
  });

  it("login with wrong username", function(done) {
    chai
      .request("http://localhost:3000")
      .post("/signin")
      .send({
        username: "andrewa",
        password: "boxaladin"
      })
      .end((err, res) => {
        res.should.have.status(200);

        res.should.be.json;
        res.should.be.a('object');
        res.body.should.have.property('message').eql('username not found');


        id = res.body.id;
        done();
      });
  });

  it("successfully read all users", function(done) {
    chai
      .request("http://localhost:3000")
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});