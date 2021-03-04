const express = require('express')
const http = require('http')
const PORT = 5000||process.env.PORT
const cors = require('cors')
const fs = require('fs')
const app = express()
const { addUser, removeUser ,getUser } = require('./users');
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


    const room = "chit-chat";

    socket.on('disconnect',()=>{
      console.log("User has left");
      removeUser(socket);
    });



 /*
message structure: 
{
    hasImage: false
    hasText: false
    image: 
    text:
    user
}

*/
   

    socket.on('join',(props)=>{
      //console.log(props)
      const {hasImage, hasText, image,text,user} = props;
      const username = props.user;
      const filename = username+".json"
      addUser(socket,username);
      socket.join(room);
      const msg = username+" joined";
      const alert_all ={hasImage:hasImage, hasText:hasText, image:image,text:msg,user:"admin"};
      socket.broadcast.emit("message",alert_all);
      const login_message = `Welcome ${username} to chit-chat`;
      const welcome = [{hasImage:false, hasText:false, image:false,text:login_message,user:"admin"}];
      if(fs.existsSync("../data/"+filename))
      {
          fs.readFile("../data/"+filename, function(err, data) { 
        
            // Check for errors 
            if (err) throw err; 
            // Converting to JSON 
            const data_stored = JSON.parse(data); 
            console.log(data_stored);
            data_stored.forEach(item=>{
              //console.log(item);
              socket.emit("message",item);
            });
        }); 
      }
      else{
        //const login_message = `Welcome ${username} to chit-chat`;
        //const welcome = [{hasImage:false, hasText:false, image:false,text:login_message,user:username}];
        fs.writeFile("../data/"+filename,JSON.stringify(welcome),()=>{});
        socket.emit("message", welcome[0]);
        //socket.emit("message", login_message[0]);
      }
    }
    )



    socket.on('sendMessage',(message)=>{
      console.log(message);
      //console.log("Message received");
      const {hasImage, hasText, image,text,user} = message;
      //socket.emit("message",message);
      if(hasText)
      {
          var rx = /(?:^|\s)(@[a-z0-9]\w*)/gi;
          var s = text;
          var m, res=[];
          while (m = rx.exec(s)) {
            res.push(m[1].substring(1).trim().toLowerCase());
          }
          //console.log(res);
          //const hawas = message;
          if(res.length>0)
          {
            socket.emit("message",message);
            res.forEach(username=>{
              const to_be_sent = getUser(username)[1];
              console.log(to_be_sent);
            io.to(to_be_sent).emit("message",message);
            })
          }
          else{
            console.log("To be broadcasted");
            //socket.broadcast.emit("message", message);
            io.emit("message", message);
          }
      }
      else{
        //socket.broadcast.emit("message", message);
        io.emit("message", message);
      }
    });



    //socket.on("sendFile",(file_whole)=>{console.log(file_whole);console.log("Image received");socket.emit("receiveFile",{file_whole},()=>{});});
})

const router = require('./router')
//const { default: Messages } = require('../client/src/components/Messages/Messages')
app.use(router)

server.listen(PORT,()=>console.log(`server is running on port ${PORT}`))

