const express = require('express')
const http = require('http')
const PORT = 5000||process.env.PORT
const cors = require('cors')
const fs = require('fs')
const app = express()
app.use(cors());
const server = http.createServer(app)
//const io = require('socket.io')(server)
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    }
  });
io.on('connection',(socket)=>{

    socket.on('disconnect',()=>console.log("User has left"));
    socket.on('join',(props)=>{
      console.log(`${props.username} has joined the chat`);
      const username = props.username;
      const filename = username+".json"
      if(fs.existsSync("./data"+filename))
      {
        console.log("User has signed up previously");
      }
      else{
        fs.writeFile("./data/"+filename, 'json', 'utf8',()=>{});
      }
    }
    )
    socket.on('sendMessage',(message)=>{
      console.log(message);
      console.log("Message received");
      //const hawas = message;
      socket.emit("message",message,()=>{console.log("Message emitted")});
    });
    socket.on("sendFile",(file_whole)=>{console.log(file_whole);console.log("Image received");socket.emit("receiveFile",{file_whole},()=>{});});
})

const router = require('./router')
app.use(router)

server.listen(PORT,()=>console.log(`server is running on port ${PORT}`))

