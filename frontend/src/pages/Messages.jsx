import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const socket = io('http://localhost:4000', {
    withCredentials: true,
  });

  useEffect(() => {
    // Listen for incoming messages
    socket.on(`receive_message_${localStorage.getItem('userId')}`, (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = () => {
    const messageData = {
      senderId: localStorage.getItem('userId'), // Assume logged-in user ID is stored in localStorage
      receiverId,
      content: newMessage,
    };

    socket.emit('send_message', messageData);
    setMessages((prevMessages) => [...prevMessages, { ...messageData, timestamp: new Date() }]);
    setNewMessage(''); // Clear input
  };

  return (
    <div>
      <h1>Messages</h1>
      <div>
        <label>
          Receiver ID:
          <input
            type="text"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
          />
        </label>
        <textarea
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button onClick={sendMessage}>Send</button>
      </div>

      <div>
        <h2>Conversation</h2>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderId === localStorage.getItem('userId') ? 'You' : 'Other'}:</strong>
            <p>{msg.content}</p>
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
