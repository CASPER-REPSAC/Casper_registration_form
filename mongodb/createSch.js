const mongoose = require('mongoose');

const userSch = new mongoose.Schema( //create Schema
    {
        username: { type: String, required: true},
        userid: { type: String, required: true, unique:true, lowercase: true},
        nas: { type: Boolean},
        wiki: { type: Boolean},
        done: {type: Boolean, default: false}
    }
);