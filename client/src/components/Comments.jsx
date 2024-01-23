import React, { useState } from 'react'
import { IoIosSend } from "react-icons/io";
import styled from 'styled-components';

const Comments = ({postId,handleComments}) => {

    const [comment,setComment] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        handleComments(postId,comment);
        setComment('');
    }
  return (
    <Wrapper>
        <form onSubmit={handleSubmit}>
            <input type="text" 
                    name="comment" 
                    id="comment"
                    placeholder='Add Comments' 
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                />
            <button type='submit'><IoIosSend/></button>
        </form>
    </Wrapper>
  )
}


const Wrapper = styled.div`
    input{
        width:80%;
        border:none;
        border-bottom: 1px solid var(--primary-500);
        padding: 10px;
        margin: 10px;
        background-color: transparent;
    }
    button{
        width:10%; 
        border: 1px solid var(--primary-500);
        background-color: var(--primary-500);
        padding: 10px;
        margin: 10px;
        color:white;
        transition: ease-in 0.5s;
    }
    button:hover{
        background-color: white;
        color: var(--primary-500);
    }
    input:focus,input:active{
        outline: none;
    }
    @media only screen and (max-width: 992px){

        button{
            width:30%;
        }
    }
`
export default Comments