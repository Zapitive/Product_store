import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000
app.use('/api/products',productRoutes)

app.get('/',(req,res)=>{
    res.send('Server is online')
})


app.listen(PORT,()=>{
    connectDB();
    console.log(`app is listening on port ${PORT}`)
})

