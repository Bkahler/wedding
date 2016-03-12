var mongoose = require("mongoose");

//schema setup
var inviteSchema = new mongoose.Schema({
    title: String,
    attending: String,
    numberInAttendance: Number,
    guestsAllowed:Number,
    rsvpDate:String,
    vegetarianMeals:Number,
    guestNames:String,
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Invite", inviteSchema);