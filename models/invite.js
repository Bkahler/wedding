var mongoose = require("mongoose");

//schema setup
var inviteSchema = new mongoose.Schema({
    title: String,
    description: String,
    attending: Boolean,
    numberInAttendance: Number,
    guestsAllowed:Number,
    rsvpDate:Date,
    vegetarianMeals:Number,
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Invite", inviteSchema);