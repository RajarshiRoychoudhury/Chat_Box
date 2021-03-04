
import React from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message, onChangeText, onChangeImage}) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={(event)=>onChangeText(event)}
      //onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
        <input type="file" 
        className="input_file"
        onChange={(event)=>{onChangeImage(event);
        }} />
    <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
  </form>
)

export default Input;