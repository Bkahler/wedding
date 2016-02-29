//sets up express 
var express               = require("express"),
    app                   = express(),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require('body-parser'),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    methodOverride        = require("method-override"),
    flash                 = require("connect-flash"),
    User                  = require('./models/user');
console.log("=========" + process.env.DB_CONNECT_URL);
var inviteRoutes = require('./routes/invites'),
    indexRoutes  = require('./routes/index'),
    userRoutes  = require('./routes/users');
    
// app plugins & etc //
// mongoose.connect("mongodb://localhost/wedding_site");
mongoose.connect(process.env.DB_CONNECT_URL);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

// passport setup //
app.use(require('express-session')({
    secret:"sarahandbryan",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()) ;
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(indexRoutes);
app.use(userRoutes);
app.use(inviteRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Has Started...")
});