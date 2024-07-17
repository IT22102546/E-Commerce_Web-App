import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoute from "./routes/products.route.js";
import authRoute from "./routes/auth.route.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js"
import orderRoute from "./routes/order.route.js"
import stripe from "./routes/stripe.route.js";

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(err);
});

const app = express();
app.use(cookieParser());
app.use(express.json());

app.listen(3000,()=>{
    console.log("Server is Running on Port 3000");
});

const corsOptions = {
    origin: 'http://localhost:5173',
};
app.use(cors(corsOptions));

app.use("/api/auth",authRoute);
app.use("/api/user",userRoute); 
app.use("/api/products", productRoute);
app.use("/api/order",orderRoute);
app.use("/api/stripe",stripe);



app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    });
})
