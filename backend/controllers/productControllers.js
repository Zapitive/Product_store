import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req,res)=>{
    try{
        const products = await Product.find();
        res.status(200).json({success:true,data:products})
    }
    catch(err){
        res.status(404).json({success:false,message:"No products found"})
    }
}

export const createProduct = async (req,res)=>{
    console.log("reached")
    const product = req.body;
    console.log(product)

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message:'Please provide will all fields'})
    }

    const newProduct = new Product(product)

    try{
        await newProduct.save();
        res.status(201).json({success:true, message:'new product added successfully',data:newProduct})
    }catch(err){
        console.error('Error in create product:',err.message)
        res.status(400).json({success:false,message:'Server error'})
    }
}

export const updatedProduct = async (req,res)=>{
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid Product id"})
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true,data:updatedProduct});
    }catch(err){
        res.status(500).json({success:false,message:"Server Error"})
    }
}

export const deleteProduct = async (req,res)=>{
    const {id} = req.params;

    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product deleted"});
    }catch(err){
        res.status(404).json({success:false,message:"Product not found"})
    }
}