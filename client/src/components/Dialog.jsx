import axios from 'axios';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { useAuth } from '../utils/AuthContext';
import toast from 'react-hot-toast';

const Dialog = ({ onClose }) => { // Receive onClose as a prop

    const {userDetails} = useAuth();
    const [groupName,setGroupName] = useState('');
    const [desc,setDesc] = useState('');

    const handleClose = () => {
        // Call the onClose function when the close button is clicked
        onClose();
        
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await axios.post('http://localhost:8000/api/v1/groups',{
            name: groupName,
            description: desc,
            members: userDetails._id,
            admin: userDetails._id
        });
        if(response.status ===200){
            console.log(response.data);
            onClose();
            toast.success(response.data.msg);
        }
        
    }
    return (
        <Wrapper>
            <div className='header'>
                <h4>Add group</h4>
                <button onClick={handleClose}><IoClose /></button>
            </div>

            <form onSubmit={handleSubmit}>
                <input type="text" 
                        name="groupName" 
                        id="groupName" 
                        value={groupName}
                        onChange={(e)=>setGroupName(e.target.value)}
                        placeholder='Enter group name *' />
                <textarea name="desc" 
                            id="desc" 
                            cols="30" 
                            rows="5" 
                            value={desc}
                            onChange={(e)=>setDesc(e.target.value)}
                            placeholder='Enter group description'></textarea>
                <button type='submit'>Add Group</button>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid var(--grey-900);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1000; /* Ensure the modal is on top of other elements */
    width: 50%;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px;
        margin: 0px;
        margin-bottom: 10px;
        background-color: var(--primary-500);
        padding: 10px;
        color:white;
        button{
            color: white;
            background-color: transparent;
            border: none;
            cursor: pointer;
            font-size: 1.5rem;
        }
    }
    h4{
        color: white;
    }
    form{
        padding: 10px;
        magin: 10px;
        display: flex;
        flex-direction: column;
        justify-content:center;
        button {
            background-color: var(--primary-300);
            border: 1px solid var(--primary-300);
            cursor: pointer;
            font-size: 1.25rem;
            color: white;
            padding: 6px;
            border-radius: var(--borderRadius);
            transition: ease-in-out 0.3s;
        }
        button:hover{
            background-color: transparent;
            color: var(--primary-300);
            box-shadow: var(--shadow-3);            
        }
    }
    

    input,
    textarea {
        width: 100%;
        margin-bottom: 10px;
        padding: 8px;
        border: 1px solid var(--grey-900);
        border-radius: 4px;
    }
`;

export default Dialog;
