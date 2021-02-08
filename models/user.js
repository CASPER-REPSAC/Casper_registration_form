const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String,  required: true },
    userid: { type: String, required: true,unique: true },
    nas :{ type: Boolean, default: true },
    wiki: { type: Boolean, default: false },
    done: {type:Boolean}
});

module.exports = mongoose.model("User", UserSchema);
