import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import toast from 'react-hot-toast';
import '../assets/css/Chat.css'; // Import the CSS file for styling
import io from 'socket.io-client';
import { MdClose } from "react-icons/md";

const Chat = ({ friendId, onClose }) => {

  var connectionOptions = {
    "force new connection": true,
    "reconnectionAttempts": "Infinity",
    "timeout": 10000,
    "transports": ["websocket"]
  };
  
  const socket = io.connect('http://localhost:8000', connectionOptions);
  const { userDetails } = useAuth();
  const [messageContent, setMessageContent] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const chatContainerRef = useRef();
  const [receivedMessage,setReceivedMessage] = useState({});
  const [friendName,setFriendName]=useState('');
  const [messageReceive,setMessageReceive] = useState('');

  useEffect(() => {

    fetchChatMessages();
    socket.on('receive-data', (data) => {
      setReceivedMessage(data);
    })
  }, []);
  useEffect(() => {
    
    if ("receiver" in receivedMessage) {
      if (receivedMessage.receiver === userDetails._id) {
        setMessageReceive(receivedMessage.content);
      }
    }
  }, [receivedMessage]);
  
  useEffect(()=>{
    if(messageReceive!==""){
      console.log(messageReceive);
      setChatMessages((prevMessages)=>[...prevMessages,messageReceive]);
      fetchChatMessages();
    }
  },[messageReceive])

  const fetchChatMessages = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/api/v1/chat/${friendId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      setChatMessages(response.data.messages);
      setFriendName(response.data.friendName);
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

      // Emit the newMessage event to notify other users in the chat room
      socket.emit('newMessage', {
        sender: userDetails._id,
        receiver: friendId,
        content: messageContent,
      });

      
      setChatMessages((prevMessages) => [...prevMessages, messageContent]);
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      setMessageContent('');
      // Fetch updated chat messages after sending a new message
      fetchChatMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Error sending message');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat with {friendName}</h2>
        <button onClick={onClose} className='close-btn'><MdClose/></button>
      </div>
      <div className="chat-messages" ref={chatContainerRef}>
        {chatMessages.map((message) => (
          <div key={message._id} className={`message ${message.sender === userDetails._id ? 'sent' : 'received'}`}>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;

