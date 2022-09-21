import mongoose from "mongoose";
import postMessage from "../models/postMessage.js";
export const getPost = async (req,res)=>{
    try{
        const postMessages = await postMessage.find();
        res.status(200).json(postMessages);

    }catch(err){
       console.log(err);
       res.status(404).json({msg : err.message});
    }
};

export const createPost = async (req,res)=>{
    const post = req.body ; 
    const newPost = new postMessage({...post, creator : req.userId, createdAt : new Date().toISOString()});
     try{
        await newPost.save();
        res.status(201).json(newPost);

     }catch(err){
         console.log(err);
         res.status(409).json({errMsg : RegExp.message});
     }
};

export const updatePost = async(req,res)=>{
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags, name } = req.body;

    // console.log('id :',id ,'req body ', req.body);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { name,creator, title, message, tags, selectedFile, _id : id };

    await postMessage.findByIdAndUpdate(id, updatedPost);
    //console.log('Updated post ....', updatedPost);
    res.json(updatedPost);
};

export const deletePost = async(req,res)=>{
    const {id} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No records foun with id : ${id}`);

        await postMessage.findByIdAndDelete(id);

        res.json({message : "Post deleted ...."});
        
    } catch (error) {
        console.log(error);
    }
};

export const likePost = async (req, res) => {
    const { id } = req.params;

   try {
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = await postMessage.findByIdAndUpdate(id, req.body);

    res.status(200).json(updatedPost);
   } catch (error) {
       console.log(error);
   }
}