var mongoose              = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    userName: String,
    password: String,
    invites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Invite"
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);