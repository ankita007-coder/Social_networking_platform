// components/ChatModal.js
import React from 'react';
import Modal from 'react-modal';
import Chat from './Chat';

Modal.setAppElement('#root'); // Set the app root element for accessibility

const customStyles={
  content:{
    width: '60%',
    margin: 'auto',
    padding:'0'
  }
}
const ChatModal = ({ isOpen, onClose, friendId }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Chat Modal"
      style={customStyles}
    >
      <Chat friendId={friendId} onClose={onClose} />
    </Modal>
  );
};

export default ChatModal;
