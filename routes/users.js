var express        = require('express'),
    router         = express.Router(),
    passport       = require("passport"),
    User           = require('../models/user');
    
    
router.get("/users", function(req, res) {
    res.render("index");
});

router.get("/users/:user_id", function(req, res) {
    console.log(req.params.user_id)
    User.findById(req.params.user_id).populate("invites").exec(function(err, user) {
       if(err){
         console.log(err);
       }
       else{
         console.log("found user: " + user);
         res.render("users/show", {user: user});
       }
   });
   
});

module.exports = router;