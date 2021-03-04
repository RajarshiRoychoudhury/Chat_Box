import queryString from 'query-string'
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import './Chat.css';
//import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

let socket
let to_Send = []

const Chat = ({location}) => {
    const [username,setName] = useState('');
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const [file,setFile] = useState('');
    const ENDPOINT = "localhost:5000";
    useEffect(
        ()=>{
            const {username} = queryString.parse(location.search);
            //console.log(data);
            setName(username);
            console.log(username);
            socket = io(ENDPOINT);

            socket.emit("join",{username:username},()=>{});


        },[ENDPOINT,location.search])
    
    useEffect(
        ()=>{
            socket.on("message",(message1)=>{
                //console.log(message1);
                setMessages(messages => [...messages, message1]);
                //console.log(Object.keys(messages));
                //console.log(messages);
                //to_Send.push(message1);
            })
        },[])

        useEffect(
            ()=>{
                socket.on("receiveFile",(file_whole)=>{
                    console.log(file_whole);
                })
            },[])
    
    // const update = (message)=>{
    //     setMessages(messages => [...messages, message]);
    // }

    const sendMessage = (event)=>{
        event.preventDefault();
        //console.log(message);
        if(message)
        {
            //console.log(message)
            socket.emit("sendMessage",{message},()=>setMessage('Hello'));
            //console.log(message);
        }
    }

    const sendFile = (event)=>{
        event.preventDefault();
        if(file)
        {
            // console.log(file)
            // const file_whole = event.target.files[0];
            // socket.emit("sendFile",{file_whole},()=>setFile(''));
            // console.log("Message entered");
            const file_whole = event.target.files[0];
            uploadFile(file_whole);
        }
    }

    const uploadFile = (file_whole) => {
        console.log(file_whole);
        convertToBase64(file_whole).then(base64 => {
            console.log(base64);
            socket.emit("sendFile",{base64},()=>setFile(''));
        });
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            }
            reader.onerror = (err) => {
                reject(err);
            }
        });
    }


        // return(
        //     <div className="outerContainer">
        //         <div className="container">
        //             <InfoBar />
        //             <Input />
        //             {/* <input 
        //             value={message} 
        //             onChange={(event)=>{setMessage(event.target.value)}}
        //             onKeyPress={event=>event.key === 'Enter' ? sendMessage(event) : null} 
        //              /> */}
        //              {/* <input type="file" 
        //              onChange={(event)=>{console.log(event.target.files[0]);
        //                 setFile(event.target.files[0].name);
        //             }} 
                     
        //              onKeyPress ={event=>event.key === 'Enter' ? sendFile(event) : null}/> */}

        //         </div>

        //     </div>
        // )

        return (
            <div className="outerContainer">
              <div className="container">
                  <InfoBar/>
                  <Messages messages={messages} name={username} />
                  <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
              </div>
            </div>
          );
}

export default Chat