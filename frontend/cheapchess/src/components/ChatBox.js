import React, { useState } from 'react';

const ChatBox = ({ onMessageSubmit, userName }) => {
  const [message, setMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    if (message.trim() !== '') {
      onMessageSubmit({ message, userName });
      setMessage('');
      setMessageHistory([...messageHistory, { message, userName }]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(); 
    }
  };

  return (
    <div className="chat-box">
      {messageHistory.length > 0 && (
        <div className="message-history-box">
          {messageHistory.map((msg, index) => (
            <div key={index} className="message">
              <span className="user-name">{msg.userName}</span>: {msg.message}
            </div>
          ))}
        </div>
      )}
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button type="button" onClick={handleSubmit}>Send</button>
    </div>
  );
};

export default ChatBox;