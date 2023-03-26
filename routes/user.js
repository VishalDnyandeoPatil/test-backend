const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const{user}=require('../models/user.model');
const express= require('express'); 
const userRouter= express.Router();

userRouter.post('/register',async(req,res)=>{
    try {
        const payload = req.body;
        const User= await user.findOne({email:payload.email});
        if(User){
            return res.send({msg:'Please login, user already exist'})
        }
        else{
            const hashPassword=await bcrypt.hashSync(payload.password,8);
            payload.password=hashPassword;

            const newuser=new user(payload);
            await newuser.save();
            return res.json({msg:"User registered",user:newuser});
        }
    } 
    catch (error) {
        res.send({msg:error.message})
    }
});

userRouter.post('/login',async(req,res)=>{
    try {
        const payload = req.body;
        const User= await user.findOne({email:payload.email});
        if(!User){
            return res.send('Please signup first');
        }
        const isPasswordCorrect= await bcrypt.compareSync(
            payload.password,User.password
        );
        if(isPasswordCorrect){
            const token = await jwt.sign({email:User.email,userId:User._id},process.env.jwtSecretKey,{expiresIn: '1h'})
            res.json({msg:"Login success",token});
        }
        else{
            res.send({msg:"Invalid credentials"})
        }
    } catch (error) {
        res.send(error.message)
    }
})

module.exports={userRouter}