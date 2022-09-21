import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import user from '../models/userModel.js';

export const signIn = async(req,res)=>{
    const {email, password} = req.body;

    try {
        const existingUser = await user.findOne({email});

        if(!existingUser){
           return res.status(404).json({message : " User does not exists ..."});
        }
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message : "Invalid credentials .."});
        }
        
        const token = jwt.sign({email : existingUser.email , id : existingUser._id},'test',{expiresIn:"1h"});
        res.status(200).json({result : existingUser, token});
    } catch (error) {
        res.status(500).json({message : "something went wrong "});
    }

};

export const signUp = async(req,res)=>{
    const {email,fName, lName, password, confirmPassword} = req.body;

    try {
        const existingUser = await user.findOne({email});

        if(existingUser){
           return res.status(404).json({message : " User already exists ..."});
        }
       if(password !== confirmPassword){
        return res.status(400).json({message: "password doed not match"});
       }
       const hashPassword = await bcrypt.hash(password,12);

       const result = await user.create({email, password : hashPassword, name : `${fName} ${lName}`});
       
       const token = jwt.sign({email : result.email , id : result._id},'test',{expiresIn:"1h"});
        res.status(200).json({result , token});
        
    } catch (error) {
        res.status(500).json({message : "something went wrong "}); 
    }

};