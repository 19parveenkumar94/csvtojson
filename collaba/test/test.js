var expect=require('chai').expect;
var supertest=require('supertest');
api=supertest('http://localhost:8082');

describe('basic Tests',function(){
  it('should return home page',function(done){
    api.get('/')
    .end(function(err,res){
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
  it('get token',function(done){
    api.post('/token')
    .send({
          email:'parveen.arya@gmail.com'
      })
      .end(function(err,res){
              expect(res.statusCode).to.equal(200);
        done();
      });
  });
});
