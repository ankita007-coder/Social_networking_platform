import React, { useEffect, useState } from 'react';
import profile from '../assets/images/profile.png';
import styled from 'styled-components';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


const Friends = () => {

  const [friends,setFriends] = useState([]);


  const displayFriends = async()=>{
    try {
      const storedToken = localStorage.getItem('token');
      const response =await axios.get('http://localhost:8000/api/v1/users/getFriends',{
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      if(response.status===200){
        console.log(response.data.friends)
        setFriends(response.data.friends);
      }
    } catch (error) {
      toast.error('Error while fetching friends');
    }
  }
  
  useEffect(()=>{
    displayFriends();
  },[])
  return (
    <Wrapper>
      <div className='friends'>
        {friends.length>0?<div>
          {
            friends.slice(0,9).map((friend)=>{
                  return <div key={friend._id}>
                    <img src={`http://localhost:8000/${friend.profilePic}`}/>
                    <p>{friend.fullName}</p>
                  </div>
            })
          }
        </div>:<p style={{padding:'10px'}}>Add friend from <Link to='/members'>Members</Link>page</p>}
      </div>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  display: flex;
  .friends{
    margin: 10px;
    padding: 10px;
    border: 1px solid var(--grey-800);
    width:30%;
  }
  img{
    width: 100%;
  }  
`
export default Friends