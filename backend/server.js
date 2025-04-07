import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import { connectDB } from './config/db.js';
import path from "path";
import productRoutes from "./routes/product.route.js";



const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use(express.json());

app.use("/api/products",productRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    })
}

app.listen(PORT, async()=>{
    await connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
})


