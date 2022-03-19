const express = require('express')

const connect = require('./configs/db')
const userController = require('./controllers/user.controller')

const app = express();

app.use(express.json());

app.use("/user", userController);


app.listen(8080, async() =>{
    try{
        await connect();
    }catch(err){
        console.log(err);
    }
    console.log('listening on port 8080')
})

