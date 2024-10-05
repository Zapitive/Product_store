import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";


dotenv.config();
const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Server is online')
})

app.post('/product',async (req,res)=>{
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message:'Please provide will all fields'})
    }

    const newProduct = new Product(product)

    try{
        await newProduct.save();
        res.status(201).json({success:true, message:'new product added successfully',data:newProduct})
    }catch(err){
        console.error('Error in create product:',err.message)
        res.status(500).json({success:false,message:'Server error'})
    }
})

app.listen(5555,()=>{
    connectDB();
    console.log('app is listening on port 5555')
})

