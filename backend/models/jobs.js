import mongoose from "mongoose";


const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    salary:{
        type: Number,
        required:true
    },
    jobType:{
        type:String,
        enum:["Full Time","Part Time","Contract","Internship"],
        required:true
    },
    remote:{
        type:String,
        enum:["Remote","Office"],
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        required:true
    },  
    information:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref :"User",
    }
})


const jobModel = mongoose.model("jobmodel",jobSchema)

export default jobModel;