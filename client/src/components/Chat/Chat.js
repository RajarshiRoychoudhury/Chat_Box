import queryString from 'query-string'
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import './Chat.css';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';


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



let socket
let to_Send = []

const Chat = ({location}) => {
    const [username,setName] = useState('');
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const [file,setFile] = useState('');
    const [hasText,setTextStatus] = useState(false);
    const [hasImage,setImageStatus] = useState(false);
    const [image,setImage] = useState('');
    const ENDPOINT = "localhost:5000";
    useEffect(
        ()=>{
            const {username} = queryString.parse(location.search);
            //console.log(data);
            setName(username);
            console.log(username);
            socket = io(ENDPOINT);
            const msg ={
                    hasImage: false,
                    hasText: false,
                    image: null,
                    text:username,
                    user: username,
                }
            socket.emit("join",msg,()=>{});


        },[ENDPOINT,location.search])
    
    useEffect(
        ()=>{
            socket.on("message",(message1)=>{

                console.log(message1);
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
        const toBeSent = {hasImage:hasImage,hasText:hasText,image:image,text:message,user:username};
        //console.log(message)
        socket.emit("sendMessage",toBeSent,()=>setMessage());
        console.log(toBeSent);
        setMessage('')
        setFile('');
        setTextStatus(false);
        setImageStatus(false);
        //console.log(message);
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
            //console.log(base64);
            //socket.emit("sendFile",{base64},()=>setFile(''));
            setImage(base64);
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

    const onChangeText = (event) =>{
        const message_read = event.target.value;
        setMessage(message_read);
        setTextStatus(true);
    }

    const onChangeImage = (event) =>{
        const image_name = event.target.files[0].name;
        setFile(image_name);
        setImageStatus(true);
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
                  <Input message={message} setMessage={setMessage} sendMessage={sendMessage} onChangeText= {onChangeText} onChangeImage= {onChangeImage}/>
              </div>
            </div>
          );
}

export default Chat