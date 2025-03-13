import express, { json } from "express"
import mongoose from "mongoose"
import cors from "cors"
import jwt from "jsonwebtoken"
import bodyParser from "body-parser"
import dotenv from "dotenv";

import cookieParser from "cookie-parser";

import userRoute from "./rotutes/user.js"

import jobRoute from "./rotutes/jobs.js"


import {log,errorlog} from "./middlewares/log.js"

dotenv.config();

const app = express()


app.use(bodyParser.json())
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));

app.use(log)
app.use(errorlog)

app.use("/api/user",userRoute)
app.use("/api/job",jobRoute)



let port = process.env.PORT

let db_connection = process.env.DB_CONNECTION

function portConnection(){
    try {
        app.listen(port,()=>{
            console.log("listing to port 4000")
        })
    } catch (error) {
        console.log({message:error.message})

    }
}

function dbConnection(){
    try {

        mongoose.connect(db_connection,{useUnifiedTopology: true,useNewUrlParser: true}).then(()=>console.log("connected to mongoose"))
        
    } catch (error) {
        console.log({message:error.message})
    }
}


portConnection()

dbConnection()