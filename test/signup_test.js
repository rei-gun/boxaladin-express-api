// var chai = require('chai');
// var chaiHttp = require('chai-http');
// var should = chai.should()
// var users = Math.floor(Math.random() * 100000);
// var assert = require("assert");
// var expect = chai.expect;

// chai.use(chaiHttp);

// describe('test user', ()=>{
//   it('successfully create new user', function (done) {
//     chai.request('http://localhost:3000')
//     .post('/signup')
//     .send({
//       username: 'user'+users,
//       //  testing password dibuat allownull true di model dan migration
//       email: users+'@gmail.com',
//       firstName: 'user',
//       familyName: 'aaa',
//       sex: 'M',
//     })
//     .end((err,res) => {  
//       res.should.have.status(200)
//       res.body.should.have.property('username');
//       res.body.username.should.equal('user'+users);
//       res.body.username.should.be.a('String');

//       res.body.should.have.property("email");
//       res.body.email.should.equal(users+'@gmail.com');
//       res.body.email.should.be.a('String');

//       res.body.should.have.property("firstName");
//       res.body.firstName.should.equal('user');
//       res.body.firstName.should.be.a('String');

//       res.body.should.have.property("familyName");
//       res.body.familyName.should.equal('aaa');
//       res.body.familyName.should.be.a('String');

//       res.body.should.have.property("sex");
//       res.body.sex.should.equal('M');
//       res.body.sex.should.be.a('String');
//       id = res.body.id
//       done()
//     })
//   })

//   it('successfully read all users', function (done) {
//     chai.request('http://localhost:3000')
//     .get('/')
//     .end((err,res) => {
//       res.should.have.status(200)
//       done()
//     })
//   })
// })