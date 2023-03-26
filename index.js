const express = require ('express');
const {connection}= require('./config/db');
const {authenticator}= require('./middleware/authentication');
const {postRouter}=require('./routes/post'); 
const {userRouter}=require('./routes/user');
const cors = require('cors');
const port = process.env.port;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/posts", authenticator);
app.use("/posts", postRouter);

app.listen(port,async()=>{
    try {
        await connection ;
        console.log("Connected to db")    
    } 
    catch (error) {
        console.log(error.message);
    }
})