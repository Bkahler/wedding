var express                 = require('express'),
    router                  = express.Router(),
    passport                = require("passport"),
    Invite                  = require('../models/invite'),
    User                    = require('../models/user'),
    isAdminMiddleware       = require("../middleware/isAdmin"),
    inviteAuthorization     = require("../middleware/inviteAuthorization"),
    moment                  = require("moment");


router.get("/invites", isAdminMiddleware, function(req, res) {
  
  function renderAdmin(res, data){
    res.render("invites/index", {users:data['users'], invites:data['invites'], count: data['count']});
  }
  
  function getCounts(invites, users){
    var counts = { yes: 0, no:0, noAnswer:0};
    
    for(var i =0; i < invites.length; i++){
  
        if (invites[i].attending  == "true") {
          counts.yes += invites[i].numberInAttendance;
        } else if (invites[i].attending == "false") {
          counts.no += invites[i].numberInAttendance;
        } else {
          counts.noAnswer += invites[i].guestsAllowed;
        }
    }
    var data = {users: users, invites: invites, count: counts};
    
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log(data);
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");

    renderAdmin(res, data );
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
          getCounts(invites, users);
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
        attending: null,
        guestsAllowed: req.body.guestsAllowed,
        rsvpDate: null,
        vegetarianMeals: null,
        owner : null 
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

//// EDIT Invite ////
router.get("/invites/:id/edit", inviteAuthorization, function(req, res) {
    Invite.findById(req.params.id, function(err,foundInvite){
        if(err){
          console.log("error finding invite to edit...");
          console.log(err);
        }
        else{
          res.render("invites/edit",{invite:foundInvite});
        }
    });
});

//// UPDATE Invite ////
router.put("/invites/:id", inviteAuthorization, function(req, res){
    var invite_id = req.params.id,
        invite    = req.body.invite;
    
    invite.rsvpDate = moment().format('MMMM Do YYYY');

    Invite.findByIdAndUpdate(invite_id, invite, function(err, updatedInvite){
      if(err){
          console.log("error updating invite...");
          console.log(err);
      }
      else{
        console.log("invite successfully updated");
        req.flash('success','Invite updated!');
        res.redirect('/users/' + req.user._id);
      }
    });
});

//// DESTROY Invites ////
router.delete("/invites/:id", inviteAuthorization, function(req, res){
    var id= req.params.id;
    Invite.findByIdAndRemove(id,function(err){
        if(err){
          console.log("failed to delete invite...");
          console.log(err);
          res.redirect("/invites");
        }
        else{
          console.log("invite successfully deleted");
          res.redirect("/invites"); 
        }
    });
});


module.exports = router;