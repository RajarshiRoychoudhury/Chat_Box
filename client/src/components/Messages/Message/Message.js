import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

//const Message = ({ message: { text, user }, name }) => {
  const Message = ({message,name}) => {
  const {hasImage, hasText, image,text,user} = message;
  const trimmedName = name.trim().toLowerCase();
  let isSentByCurrentUser = false;
  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }
  console.log(isSentByCurrentUser);
  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{text}</p>S
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{text}</p>
            </div>
            <p className="sentText pl-10 ">{user}</p>
            <p className="messageText colorWhite"></p>
          </div>
        )
  );
}

export default Message;