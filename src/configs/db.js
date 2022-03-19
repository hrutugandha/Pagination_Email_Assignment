const mongoose = require('mongoose');


const connect = async () =>{
    try{
       return mongoose.connect("mongodb://localhost:27017/test")
    }catch(err){
        console.log(err);
    }
}

module.exports = connect;