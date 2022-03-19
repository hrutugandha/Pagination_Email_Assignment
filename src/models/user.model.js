const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    first_name: {type:String, required:true},
    last_name: {type:String, required:true},
    email: {type:String, required:true},
},{
    versionKey: false,
    timestampKey: true,
});

const User = mongoose.model("user", userSchema);

module.exports = User;