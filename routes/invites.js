var express                 = require('express'),
    router                  = express.Router(),
    passport                = require("passport"),
    Invite                  = require('../models/invite'),
    User                  = require('../models/user'),
    isAdminMiddleware    = require("../middleware/isAdmin");

    
    
router.get("/invites", isAdminMiddleware, function(req, res) {
  var userslist   = [],
      inviteslist = [];
      
  User.find({}, function(err,users){
    if(err){
      console.log(err);  
    } else  {
      console.log("found users.");
      userslist = users;
      res.render("invites/index", {users:userslist}) ;
    }
  });
  
  // Invite.find({}, function(err,users){
  //   if(err){
  //     console.log(err);
  //     return []
  //   } else  {
  //     console.log("found invites.");
  //     inviteslist = users;
  //   }
  // });
  // console.log("-----invites-----" + inviteslist);
  // console.log("-----user-----" + userslist);
  
  // res.render("invites/index", {users:userslist, invites: inviteslist}) ;
});

//// Create Invite ////
router.post("/invites", isAdminMiddleware, function(req, res){
      
  var newInvite = {
      title: req.body.title, 
      description: req.body.description, 
      attending: null,
      numberInAttendance: req.body.numberInAttendance,
      rsvpDate: null,
      vegetarianMeals: null,
      owner : {
          id: req.body.user._id,
          username: req.body.user.username
      }
  };
  
  Invite.create(newInvite, function(err, campground) {
    if(err){
      console.log(err);
    }
    else{
      console.log("New Invite added to db");
      res.redirect("/invites");  
    }
  });
});


module.exports = router;