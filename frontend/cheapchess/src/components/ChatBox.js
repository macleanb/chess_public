import React, { useState } from 'react';

const ChatBox = ({ onMessageSubmit }) => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() !== '') {
      onMessageSubmit(message);
      setMessage('');
    }
  };

  return (
    <div className="chat-box">
      <div className="message-container">
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={handleMessageChange}
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;