const {post}= require('../models/post.model');
const express= require('express');
const postRouter= express.Router();

postRouter.get('/', async(req,res)=>{
    try {
        const {userId}= req.body;
        const {device=["Tablet","Laptop","Mobile"]}= req.query;
        const Post = await post.find({$and:[{userId},{device:{$in:device}}]});
        res.json({Post,msg:"Your posts"});
    } catch (error) {
        res.send(error.message)
    }
});

postRouter.get('/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const Post = await post.findById(id);
        res.send({Post}) 
    } catch (error) {
        res.send({msg:error.message})
    }
});

postRouter.post('/',async (req,res)=>{
    try {
        const data = req.body;
        const newpost = new post(data);
        await newpost.save();
        res.send({msg:"Post created",post:newpost});
    } 
    catch (error) {
        res.send(error.message)    
    }
});

postRouter.patch('/update/:id',async(req,res)=>{
    try {
        const data = req.body;
        const id = req.params.id;
        const update= await post.findByIdAndUpdate(id,data);
        res.send({msg:"Post updated", post: update})
    } catch (error) {
        res.send({msg:error.message}) 
    }
})

postRouter.delete("/delete/:id", async(req,res)=>{
    try {
        const id = req.params.id;
        const deleted = await post.findByIdAndDelete(id);
        if(deleted){
            res.send({msg:"Post deleted", post:deleted})
        }
        else{
            res.send({msg:"Post not found"})
        }
    } 
    catch (error) {
        console.log(error);
        res.send({msg:error.message})    
    }
});

module.exports={postRouter};