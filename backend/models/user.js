import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,

    },
    username:{
        type:String,
        require:true,

    },
    
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})

export default mongoose.model("User",userSchema)