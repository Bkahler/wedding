var express        = require('express'),
    router         = express.Router(),
    passport       = require("passport"),
    User           = require('../models/user');
    
    
router.get("/users", function(req, res) {
    res.render("index");
});

module.exports = router;