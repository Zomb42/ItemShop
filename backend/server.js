//const express = require('express');
import express from "express";
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import Product from "./models/product.js"
import mongoose from 'mongoose';

dotenv.config()
const app = express();

app.use(express.json()); //allows us to accept JSON data


app.get("/api/products", async (req, res)=>{

    try {
        const products = await Product.find({});
        res.status(200).json({ sucess: true, data: products});
    }catch(error){
        console.log("error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }

})

//middleware is a function that runs
app.post("/api/products", async (req, res) => {
    const product = req.body; //user will send this data

    if (!product.name || !product.price || !product.image){
        return res.status(400).json({ success: false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct});

    } catch (error){
        console.error("Error in Create product:", error.message);
        res.status(500).json({success: false, message: "Server Error" });
    }

});
//patch is updating some field while put is updating all
//post is to add info and get is to retrive

app.put("/api/products/:id", async (req, res)=>{
    const { id } = req.params;

    const product = req.body;


    if (!mongoose.Types.ObjectId.isValid(id)){

        return res.status(404).json({success:false, message: "Invalid Product Id"});
    }

    try{

        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({ success: true, data: updatedProduct});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error"});

    }

})

console.log(process.env.MONGO_URI);

//id is dynamic
app.delete("/api/products/:id", async (req, res)=> {
    const {id} = req.params;
    
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted :("})
    }catch(error){
        console.group("error in deleting products:", error.message);
        res.status(404).json({ success: false, message: "Product not found"})
    }


});

app.listen(3000, () => {
    connectDB();
    console.log("Server started at http://localhost:3000");
});


