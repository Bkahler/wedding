var express                 = require('express'),
    router                  = express.Router(),
    passport                = require("passport"),
    Invite                  = require('../models/invite'),
    User                  = require('../models/user'),
    isAdminMiddleware    = require("../middleware/isAdmin");
    var util = require('util');

    
    
router.get("/invites", isAdminMiddleware, function(req, res) {
  
  function returnData(res, data){
    res.render("invites/index", {users:data['users'], invites:data['invites']})
  };

  User.find({}, function(err, users){
    if(err){
      console.log(err);  
    } else  {
      console.log("found users.");
      Invite.find({}, function(err, invites){
        if(err){
          console.log(err);
        } else  {
          console.log("found invites.");
          returnData(res,{users: users, invites: invites})
        }
      });
    }
  });
});

//// Create Invite ////
router.post("/invites", isAdminMiddleware, function(req, res){
  
  User.findById(req.body.owner, function(err, user){
    if (err){
      console.log(err);
      /// flassh some error here
      res.redirect("/invites"); 
    } else {
      
      var newInvite = {
        title: req.body.title, 
        description: req.body.description, 
        attending: null,
        numberInAttendance: req.body.numberInAttendance,
        rsvpDate: null,
        vegetarianMeals: null,
        owner : {
          id: user._id,
          username: user.username
        }
      };
      
      Invite.create(newInvite, function(err, invite) {
        if(err){
          console.log(err);
        }
        else{
          console.log("New Invite added to db");
          res.redirect("/invites");  
        }
      });
      
    };
  });

});




module.exports = router;