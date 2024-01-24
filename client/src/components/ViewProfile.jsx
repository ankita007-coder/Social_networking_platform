import React from 'react'
import { IoMdClose } from 'react-icons/io'
import styled from 'styled-components'


const ViewProfile = ({user,onClose}) => {
    const handleClose=()=>{
        onClose();
    }
   
  return (
    <Wrapper>
        <div className='header'>
                <h4>{user.fullName}</h4>
                <button onClick={handleClose}><IoMdClose /></button>
            </div>
            <div className='profile'>
                <div className='image'>
                    <img src={`http://localhost:8000/${user.profilePic}`} alt={user.fullName} />
                </div>
                <div className="details">
                    <p><b>Name: </b><span>{user.fullName}</span></p>
                    <p><b>Email Address: </b><span>{user.email}</span></p>
                    <p><b>City: </b><span>{user.city}</span></p>
                    <p><b>State: </b><span>{user.state}</span></p>
                    <p><b>Gender: </b><span>{user.gender}</span></p>
                    <p><b>Profession: </b><span>{user.profession}</span></p>
                </div>
            </div>
    </Wrapper>
  )
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
    .profile{
        display:flex;
        flex-direction:row;
        .image{
            width: 30%;
            padding: 10px;
            margin: 10px;
            img{
                width:100%;
            }
        }
        .details{
            width: 60%;
            padding: 10px;
            margin: 10px;
        }

    }

`
export default ViewProfile