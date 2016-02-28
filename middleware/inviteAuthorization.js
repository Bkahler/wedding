var Invite = require('../models/invite');

var inviteAuthorization = function(req, res, next){
    if(req.isAuthenticated()){
        Invite.findById(req.params.id, function(err,foundInvite){
            if(err){
              console.log("error finding invite...");    
              console.log(err);
              req.flash("error", err.message);
              res.redirect("back");
            }
            else{
              if(foundInvite.owner.id.equals(req.user._id) ||req.user.username == 'Admin' ){
                next(); 
              }
              else{
                console.log("Unauthorized action on invite.");
                req.flash("error", "You are not authorized to perform that action.");
                res.redirect("back");
              }
            }
        });
    }
    else{
        console.log("Unauthorized action on invite.");
        req.flash("error", "You are not authorized to perform that action.");
        res.redirect("back");
    }
};

module.exports = inviteAuthorization;