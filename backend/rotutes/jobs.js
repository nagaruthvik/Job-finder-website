import express from "express"
import {authMiddleware} from "../middlewares/authMiddleware.js";
import { errorlog } from "../middlewares/log.js"
import jobModel from "../models/jobs.js"



const routes = express.Router()

routes.get("/", errorlog, async (req, res) => {
    try {
        const name = req.query.name || "";
        let skills = req.query.skills || [];
        const size = parseInt(req.query.size) || 0;  
        const offset = parseInt(req.query.offset) || 0; 

        if (typeof skills === "string") {
            skills = skills.split(",");
        }

        const filter = {};

        if (name) {
            filter.position = { $regex: name, $options: "i" };
        }
        if (Array.isArray(skills) && skills.length > 0) {
            filter.skills = { $in: skills };
        }


        const foundData = await jobModel.find(filter)
            .limit(size)
            .skip(offset);

        return res.status(200).json(foundData);
        
    } catch (error) {
        errorlog(error, req, res);
    }
});

routes.get("/:id",errorlog,async(req,res)=>{
    try {
        const id = req.params.id

        const result = await jobModel.findById(id);

        if(!result){
            return res.status(404).json({message:"Job not found"})
        }
        else{
            
            res.status(200).json(result)
        }
    } catch (error) {
        errorlog(error,req,res)
    }
})



routes.post("/addjob",authMiddleware,errorlog,async(req,res)=>{
    const {company,url,position,salary,jobType,remote,location,description,about,skills,information} = req.body
    

    try {
        const newUser = jobModel({
            company,
            url,
            position,
            salary,
            jobType,
            remote,
            location,
            description,
            about,
            skills,
            information,
            createdBy : req.user.userId
        })

        await newUser.save()
        res.status(200).json({message:"New Job Created"})
        
    } catch (error) {
        errorlog(error,req,res)
    }
})

routes.delete("/:id", authMiddleware,errorlog, async(req,res)=>{
    const id = req.params.id;

    const record = await jobModel.findOne({ _id: id });
    
    
    if(!record){
        return res.status(404).json({message:"No job found"})
    }

    try {
        
       
        if(req.user.userId !== record.createdBy.toString()){
            console.log("id",req.user.userId)
            return res.status(401).json({message:"you are not allowed to delete this job"})
        }
        else{
            await record.deleteOne();
            res.status(200).json({message:"Job deleted "})
        }
    } catch (error) {
        errorlog(error,req,res)
    }
})

routes.put("/update/:id",authMiddleware,errorlog ,async (req,res)=>{
    const data = req.body
    const id = req.params.id;

    const record = await jobModel.findById(id)
    if(!record){
        return res.status(401).json({message:"No Record Found"})
    }
    try {
        if(req.user.userId !== record.createdBy.toString()){
            return res.status(401).json({message:"your are not authorized to update this"})
        }
        else{
            const newrecord = await jobModel.findByIdAndUpdate(id,data,{new :true})
            res.status(200).json({message:"record updated",newrecord})
        }
    } catch (error) {
        errorlog(error,req,res)
    }

 })
export default routes