const express = require('express')
const mongoose = require('mongoose')

const connect = require('./configs/db')

const app = express();

app.use(express.json());

const userSchema = mongoose.Schema({
    first_name: {type:String, required:true},
    last_name: {type:String, required:true},
    email: {type:String, required:true},
},{
    versionKey: false,
    timestampKey: true,
});

const User = mongoose.model("user", userSchema);


app.listen(8080, async() =>{
    try{
        await connect();
    }catch(err){
        console.log(err);
    }
    console.log('listening on port 8080')
})

