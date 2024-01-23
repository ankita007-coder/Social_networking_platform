// components/Chat.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useAuth } from '../utils/AuthContext';
import toast from 'react-hot-toast';


var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};

const socket = io.connect('http://localhost:8000',connectionOptions);

const Chat = ({ friendId, onClose }) => {
  const { userDetails } = useAuth();
  const [messageContent, setMessageContent] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    // Function to handle a new message
    const handleNewMessage = (newMessage) => {
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    };
  
    // Function to join the chat room
    const handleJoinRoom = () => {
      socket.emit('join', { userId: userDetails._id, friendId });
    };
  
    // Function to leave the chat room
    const handleLeaveRoom = () => {
      socket.emit('leave', { userId: userDetails._id, friendId });
    };
  
    // Set up event listeners
    socket.on('newMessage', handleNewMessage);
  
    // Join the chat room when the component mounts
    handleJoinRoom();
  
    // Clean up the event listeners and leave the chat room on component unmount
    return () => {
      socket.off('newMessage', handleNewMessage);
      handleLeaveRoom();
    };
  }, [userDetails._id, friendId]);
  
  

  const fetchChatMessages = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/api/v1/chat/${friendId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      setChatMessages(response.data);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      await axios.post(
        `http://localhost:8000/api/v1/chat/${friendId}`,
        { content: messageContent },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      // Clear the message input after sending
      setMessageContent('');

      // Fetch updated chat messages after sending a new message
      fetchChatMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Error sending message');
    }
  };

  return (
    <div>
      <h2>Chat with {friendId}</h2>
      <div>
        {chatMessages.map((message) => (
          <div key={message._id}>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send Message</button>
      <button onClick={onClose}>Close Chat</button>
    </div>
  );
};

export default Chat;
