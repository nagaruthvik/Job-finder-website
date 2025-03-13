import express from "express"
import mongoose from "mongoose"
import user from "../models/user.js"
import jwt from "jsonwebtoken"
import { log, errorlog } from "../middlewares/log.js";

const bcrypt = require("bcryptjs");

import {authMiddleware} from "../middlewares/authMiddleware.js";


const routes = express.Router()

routes.get("/", authMiddleware, errorlog, async (req, res) => {
   res.send({ username: req.user.username });
});



routes.post("/register", errorlog, async (req,res)=>{
   try {
      const {name,username,email,mobile,password} = req.body
   
      const userExist = await user.findOne({$or : [{email:email} , {username : username}]})
      if(userExist){
         return res.status(400).send({message:"username and email has  been taken"})
      }
      else{

         const hashpassword = await bcrypt.hashSync(password,10)

         const newUser = new user({
            name,
            username,
            email,
            mobile,
            password : hashpassword
         })
         await newUser.save()
         res.status(200).json({message:"user created"})
      }
   } catch (error) {
      errorlog(error,req,res)
   }

   
})

routes.post("/login",errorlog,async(req,res)=>{
   const {email,password} = req.body

   try {
      const isuser = await user.findOne({email: email})
      if(!isuser){
         return res.status(400).send({message:"user does't not exist"})
      }
      else{
         const hashpassword = bcrypt.compareSync(password,isuser.password)
         if(hashpassword){
            const token = jwt.sign({
               userId:isuser._id,
               username:isuser.username,


            },process.env.JWT_SECRET,{expiresIn:"7d"})
            res.cookie("token",token)
            

            res.status(202).send({message:"login sucessful",token})
         }
         else{
            res.status(400).send({message:"invalid username or password"})
         }
      }
   } catch (error) {
      errorlog(error,req,res)
   }

})



export default routes