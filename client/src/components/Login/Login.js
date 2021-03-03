import './Login.css';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const Login = ()=>
{
    const [username,setUsername] = useState('');
    return (
        <div className="loginOuterContainer">
            <div className="loginInnerContainer">
                <h1 className="heading">Welcome to Chit-Chat</h1>
                <div><input placeholder = "Enter Username" type="text" className="loginInput" onChange={(event)=>(setUsername(event.target.value))}></input></div>
                <Link onClick = {(event)=>(!username) ? event.preventDefault() : null} to={`/chat?username=${username}`}>
                    <button type="submit" className="button mt-20">Click to Join</button>
                </Link>
            </div>
        </div>
        )

}

// function Login()
// {
//     return (
//         <div className="login_page">
//             <input type="text" value = "username" placeholder="UserName"></input>
//         </div>
//     )
// }

export default Login;