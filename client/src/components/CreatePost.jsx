import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import styled from 'styled-components'
import { useAuth } from '../utils/AuthContext';
import { MdFileUpload } from 'react-icons/md';

const CreatePost = ({fetchPosts}) => {
    const [content,setContent] = useState('');
    const [image,setImage]= useState(null);
  
    const {userDetails} = useAuth();
    const imageHandler = (e)=>{
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
        console.log(selectedImage);
    }


    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append('content', content);
          formData.append('image', image);
          formData.append('author', userDetails._id);
            console.log(formData);
          const response = await axios.post('http://localhost:8000/api/v1/posts', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
      
          if (response.status === 200) {
            toast.success(response.data.msg);
            setContent('');
            fetchPosts();
          }
        } catch (error) {
            console.log(error.response);
          toast.error("error in catch", error)
        }
      };
      
  return (
    <Wrapper>
        <div className='file-upload'>
            <h4>Wall</h4>
            <form onSubmit={handlePostSubmit} encType="multipart/form-data">
                <textarea name="content" 
                            id="content" 
                            cols="30" 
                            rows="5"
                            value={content}
                            onChange={(e)=>setContent(e.target.value)}></textarea>
                <div className='submit-btn'>
                    <div>
                    <button type="submit">Submit</button>
                    </div>
                    <div style={{margin: '10px'}}>
                        <label htmlFor='image'><MdFileUpload /> Upload</label>
                        <input type="file" 
                                name="image" 
                                id="image" 
                                accept="image/*,video/*" 
                                onChange={imageHandler}
                                style={{display:'none'}}
                                />

                    </div>
                </div>
            </form>
           
        </div>
    </Wrapper>
  )
}


const Wrapper = styled.div`
    .file-upload{
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: center;
        border: 1px solid var(--grey-900);        
        h4{
          color: white;
            padding: 5px;
            background-color: var(--primary-500);
        }
        textarea{
            width:97%;
            margin: 10px;
        }
        button{
            margin: 10px;
            background-color: transparent;
            border: 1px solid var(--grey-900);
            font-size: 15px;
            padding: 4px 8px;
        }
        .submit-btn{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
        label{
            font-size: 15px;
            padding: 4px 8px;
            border: 1px solid var(--grey-900)
        }
        label:hover{
            cursor: pointer;
        }
    }
`
export default CreatePost