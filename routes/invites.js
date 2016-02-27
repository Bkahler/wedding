var express                 = require('express'),
    router                  = express.Router(),
    passport                = require("passport"),
    Invite                  = require('../models/invite'),
    User                    = require('../models/user'),
    isAdminMiddleware       = require("../middleware/isAdmin");

router.get("/invites", isAdminMiddleware, function(req, res) {
  
  function renderAdmin(res, data){
    res.render("invites/index", {users:data['users'], invites:data['invites']});
  }

  User.find({}, function(err, users){
    if(err){
      console.log(err); 
      req.flash('error', err.message);
      res.redirect("/"); 
    } else  {
      console.log("found users.");
      Invite.find({}, function(err, invites){
        if(err){
          console.log(err);
          req.flash('error', err.message);
          res.redirect("/"); 
        } else  {
          console.log("found invites.");
          renderAdmin(res,{users: users, invites: invites});
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
      req.flash('error', err.message);
      res.redirect("/"); 
    } else {
      
      var newInvite = {
        title: req.body.title, 
        description: req.body.description, 
        attending: null,
        numberInAttendance: req.body.numberInAttendance,
        rsvpDate: null,
        vegetarianMeals: null,
        owner : null //{
        //   id: user._id,
        //   username: user.username
        // }
      };
      
      Invite.create(newInvite, function(err, invite) {
        if(err){
          console.log(err);
          req.flash('error', err.message);
          res.redirect("/invites"); 
        }
        else{
          invite.owner.id = user._id;
          invite.owner.username = user.username;
          invite.save();
          user.invites.push(invite);
          user.save();
                
          console.log("New Invite added to db");
          req.flash('success', "New invite created.");
          res.redirect("/invites");  
        }
      });
    }
  });
});

module.exports = router;