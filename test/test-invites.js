var chai         = require('chai'),
    passportStub = require('passport-stub'),
    chaiHttp     = require('chai-http'),
    server       = require('../app.js'),
    should       = chai.should();

chai.use(chaiHttp);

describe('Invites', function(){
   it('should return 200 on /invites GET', function(done){
       chai.request(server)
        .get('/invites')
        .end(function(err, res){
            res.should.have.status(200);
            done();
        });
   });
});