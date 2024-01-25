// AddPhotosModal.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCloudUploadAlt } from "react-icons/fa";
const AddPhotosModal = ({ onClose, onAddPhoto }) => {
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setPhoto(selectedFile);
  };

  const handleAddPhoto = () => {
    // Validate and send photo data to the parent component
    if (photo) {
      onAddPhoto({ photo, caption });
      onClose();
    }
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <p style={{padding: '8px',border: '1px solid #ccc'}}> <span>Choose Photo: &nbsp;&nbsp;</span>  
        <label htmlFor="photo" style={{fontSize:'20px'}}><FaCloudUploadAlt/></label>
        </p>
        <input type="file" id="photo" onChange={handleFileChange} style={{display:'none'}}/>
        
      </ModalContent>
      <ModalContent>
        <label htmlFor="captionInput">Caption:</label>
        <input
          type="text"
          id="captionInput"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </ModalContent>
      <ButtonWrapper>
        <button onClick={handleAddPhoto}>Add Photo</button>
        <button onClick={onClose}>Cancel</button>
      </ButtonWrapper>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const ModalContent = styled.div`
  margin-bottom: 15px;

  label { 
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }

  button:nth-child(1) {
    background-color: var(--primary-400);
    color: white;
  }

  button:nth-child(2) {
    background-color: #ccc;
    color: #333;
  }
  @media only screen and (max-width: 992px){
    flex-direction:column;
    button{
      margin-bottom: 10px;
      width: 90%;
    }
  }
`;

export default AddPhotosModal;
