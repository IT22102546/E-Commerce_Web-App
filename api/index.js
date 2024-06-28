import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoute from "./routes/products.route.js";
import cors from "cors";

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(err);
});

const app = express();
app.use(express.json());

app.listen(3000,()=>{
    console.log("Server is Running on Port 3000");
});

const corsOptions = {
    origin: 'http://localhost:5173',
};
app.use(cors(corsOptions));

app.use("/api/products", productRoute);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});
