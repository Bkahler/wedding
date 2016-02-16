var express        = require('express'),
    router         = express.Router(),
    passport       = require("passport"),
    User           = require('../models/user'),
    authMiddleware = passport.authenticate('local',{successRedirect:'/users', failureRedirect:'/login'});
 

router.get("/", function(req, res) {
    res.render("index");
});

router.get('/register', function(req, res) {
    res.render('auth/register');
});

router.post('/register', function(req, res) {
    var newUser  = new User({username:req.body.username}),
        password = req.body.password;
        
    User.register(newUser, password, function(err,user){
        if(err){
            console.log('Failed to register user...');
            console.log(err);
            req.flash("error", err.message);
            return res.render('auth/register');
        }
        else{
            passport.authenticate('local')(req, res, function(){
                console.log('user registered successfully...');
                req.flash("success", "Welcome to YelpCamp " + user.username);
                res.redirect('/users');
            });
        }
    });
});

router.get('/login', function(req, res) {
    res.render('auth/login');
});

router.post('/login', authMiddleware, function(req, res) { 
    
});

router.get('/logout', function(req, res) {
    req.logout();
    console.log('User has been logged out...');
    req.flash('success','You have been logged out.')
    res.redirect('/');
});




module.exports = router;