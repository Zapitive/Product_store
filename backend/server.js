import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

app.get('/',(req,res)=>{
    res.send('Server is online')
})

app.listen(5555,()=>{
    connectDB();
    console.log('app is listening on port 5555')
})

