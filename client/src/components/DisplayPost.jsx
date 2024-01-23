import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import profile from '../assets/images/profile.png'
import { AiOutlineLike, AiFillLike, AiOutlineShareAlt } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa6";
import { useAuth } from "../utils/AuthContext";
import toast from 'react-hot-toast';
import Comments from './Comments';
import CreatePost from './CreatePost';

const DisplayPost = () => {

const [posts,setPosts] = useState([]);
const {userDetails} = useAuth();
const [commentVisible,setCommentVisible] = useState(false);


//handle like
const handleLike = async (postId) => {
    try {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        toast.error('Token is missing. Please log in.');
        return;
      }
  
      const response = await axios.post(
        `http://localhost:8000/api/v1/posts/${postId}/likes`,
        {},
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
  
      console.log('Like response:', response);
  
      if (response.status === 200) {
       // console.log('Updated post:', response.data.post);
  
        setPosts((prevPosts) =>
          prevPosts.map((prevPost) =>
            prevPost._id === postId
              ? { ...prevPost, likes: response.data.post.likes }
              : prevPost
          )
        );
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  
//to show and hide comment input
const handleComments=()=>{
    setCommentVisible(!commentVisible);
}

// to handle adding of comments
const addComments = async(postId,comment)=>{
    try {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            toast.error('Token is missing. Please log in.');
            return;
        }
        const response = await axios.post(`http://localhost:8000/api/v1/posts/${postId}/comment`,
        {content:comment},{
            headers: {Authorization: `Bearer ${storedToken}`}
        })
        if(response.status===200){

            setPosts((prevPosts) =>
          prevPosts.map((prevPost) =>
            prevPost._id === postId
              ? { ...prevPost, comments: response.data.post.comments }
              : prevPost
          )
        );
            
            toast.success(response.data.msg);
        }
    } catch (error) {
        toast.error('Error while adding comment');
    }
}
const fetchPosts= async()=>{
    const response = await axios.get('http://localhost:8000/api/v1/posts');
    console.log(response.data.posts)
    setPosts(response.data.posts);
}
useEffect(()=>{
   
    fetchPosts();
},[])

return (
<Wrapper>
    <CreatePost fetchPosts={fetchPosts}/>
    {posts && posts.length>0 ? (
        <div>{
            posts.map((post)=>{
                //console.log(post);
                const profilePhoto = post.author?`http://localhost:8000/${post.author.profilePic}`:profile;
                return <div className="post">
                            
                            <div className='image'>
                                <img src={profilePhoto} alt={post.author?.fullName || 'Unknown User'} />
                                <h4>{post.author?.fullName || 'Unknown User'}</h4>
                                <p>{post.likes.length} Likes</p>
                            </div>
                            
                            <div className='post-content'>
                                <div>{post.content!=="No content"?(
                                        <div className='content'>
                                            <p>{post.content}</p>
                                        </div>
                                        ):null}</div>
                                <div>{
                                    post.imageUrl!=="" && post.imageUrl.endsWith('.mp4')?(   
                                        <video controls width="100%" height="100%">
                                            <source src={`http://localhost:8000/${post.imageUrl}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    ):
                                    post.imageUrl!==""? (
                                            <img src={`http://localhost:8000/${post.imageUrl}`} alt="Post" />
                                        ):null
                
                                }</div>
                                <div className='post-action'>
                                    <div className='likes'>
                                        {post.likes.some((like) => {
                                            return like.author._id === userDetails._id;
                                            }) ? (
                                            <AiFillLike onClick={() => handleLike(post._id)} />
                                            ) : (
                                            <AiOutlineLike onClick={() => handleLike(post._id)} />
                                        )}
                                    </div>
                                    <div className='comments'>
                                        <FaRegComment onClick={handleComments}/>
                        
                                    </div>
                                    <div className='share'>
                                        <AiOutlineShareAlt />
                                    </div>                    
                                </div>
                               {
                                commentVisible && 
                                    <Comments handleComments={addComments}
                                                postId={post._id}/>
                               }
                               <div>
                                   {post && post.comments ?(post.comments.map(c=>{
                                    
                                    return <div className='comment'>
                                        <img src={`http://localhost:8000/${c.author.profilePic}`}/>
                                        <p>{c.content}</p>
                                    </div>
                                    })):null}
                               </div>
                            </div>
                        </div>
                
            })
            }</div>
    ) : (
        <div>No posts available</div>
                    )}
</Wrapper>
)
}

const Wrapper = styled.div`
    .post{
        display:flex;
        border: 1px solid var(--grey-800);
        padding: 10px;
        margin: 10px;
        box-shadow: var(--shadow-3);
        font-size: 1.25rem;
        background-color: #eee;
        .image{
            width: 21%;
            padding: 10px;
            margin: 10px;
            img{
                width: 100%;
            }
        }
    }
    .post-content {
        width: 100%;
        margin-top: 10px;
        .content{
            margin-top: 15px;
            padding: 10px;
            border: 1px solid var(--primary-500);
        }
        img{
            width: 100%;
        }
        .comment{
            display: flex;
            border: 1px solid var(--primary-500);
            padding: 10px;
            margin: 10px;
            img{
                width: 75px;
                height: 75px;
            }
            p{
                padding: 10px;
            }
        }
    }
    .post-action{
        display:flex;
        margin: 5px;
        div{
            padding: 5px;
            margin:5px;
            font-size: 24px;
        }
        div:hover{
            cursor: pointer;
        }
    }

`

export default DisplayPost