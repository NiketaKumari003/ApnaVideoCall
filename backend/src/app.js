import express from "express";
import {createServer} from "node:http";
import {Server} from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import {connectToSocket} from 
"./controllers/socketManager.js";
import userRoutes from
 "./routes/users.routes.js";








const app=express();
const server=createServer(app);
const io=connectToSocket(server);





app.set("port",(process.env.PORT|| 8000))
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));

app.use("/api/v1/users",userRoutes);


app.get("/home",(req,res)=>{
    return res.json({"hello":"World"})
});

const start =async()=>{
    const connectionDb=await mongoose.connect("mongodb+srv://kumari03niketa700:wWiPw4LuFtxAqZNW@cluster0.19vyrft.mongodb.net/")
    console.log(`MONGO Connected DB HOST:${connectionDb.connection.host}`)


    server.listen(app.get("port"),()=>{
        console.log("Listening on The Port 8000")
    });
    
}
start();