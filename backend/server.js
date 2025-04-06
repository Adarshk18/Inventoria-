import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/products",productRoutes)

app.listen(PORT, async()=>{
    await connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
})


