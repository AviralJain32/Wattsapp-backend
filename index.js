import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {createServer} from "http"
import Connection from './database/db.js';
import Route from './Routes/route.js'
const app=express();
const server = createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use("/",Route);
Connection();

//----------------- socket io-----------------------
let users=[];
const addUser=(userData,socketId)=>{
    !users.some(user=>user.sub==userData.sub) && users.push({...userData,socketId})
}
const getUser=(userId)=>{
    if(userId!==null){
        return users.find(user=>user.sub===userId)
    }
    else{
        console.log("user id is null");
    }
}
io.on('connection',(socket)=>{
    console.log("user connected",socket.id);
    socket.on("addUsers",userData=>{
        addUser(userData,socket.id);
        io.emit("getUsers",users);
    })
    socket.on('sendMessage',data=>{
        const user=getUser(data.recieverId);
        console.log("message recived");
        io.to(user?.socketId).emit('getMessage',data)
    })
})

const PORT=process.env.PORT || 8000;
server.listen(PORT, ()=>{
    console.log(`socket server and server running successfully on port ${PORT}`);
})