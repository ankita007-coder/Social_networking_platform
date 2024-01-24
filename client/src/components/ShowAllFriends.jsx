import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { IoMdClose } from 'react-icons/io';
import { MdPersonRemove } from 'react-icons/md';
import styled from 'styled-components';
import ViewProfile from './ViewProfile';
import { FaEdit } from 'react-icons/fa';

const ShowAllFriends = ({ closeFriends }) => {
    const [friends, setFriends] = useState([]);
    const [isViewProfileOpen, setIsViewProfileOpen] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
  
    const displayFriends = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/v1/users/getFriends', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        if (response.status === 200) {
          console.log(response.data.friends);
          setFriends(response.data.friends);
        }
      } catch (error) {
        toast.error('Error while fetching friends');
      }
    };
  
    const handleClose = () => {
      closeFriends();
    };
  
    const openViewProfile = () => {
      setOverlay(true);
      setIsViewProfileOpen(true);
    };
  
    const closeViewProfile = () => {
      setIsViewProfileOpen(false);
      setOverlay(false);
    };
  
    const fetchProfile = async (friendId) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/view-profile/${friendId}`);
        console.log('Fetched profile data:', response.data);
        if (response.status === 200) {
          setUserProfile(response.data.user);
          openViewProfile();
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
  
    const handleRemoveFriend = async (friendId) => {
      try {
        const storedToken = localStorage.getItem('token');
        const response = await axios.post(
          'http://localhost:8000/api/v1/users/remove-friend',
          { friendId },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
    
        if (response.status === 200) {
          toast.success('Friend removed successfully');
          // Refresh the friends list after removing a friend
          displayFriends();
        }
      } catch (error) {
        console.error('Error removing friend:', error);
        toast.error('Error removing friend');
      }
    };
    
    useEffect(() => {
      displayFriends();
    }, []);
  
    return (
      <Wrapper>
        <div className='header'>
          <h4>View All Friends</h4>
          <button onClick={handleClose}><IoMdClose /></button>
        </div>
        <div className='all-friends'>
          {friends.map((friend) => (
            <div key={friend._id} className='profile'>
              <div className='image'>
                <img src={`http://localhost:8000/${friend.profilePic}`} alt={friend.fullName} />
              </div>
  
              <div className="buttons">
                <button style={{ backgroundColor: 'red' }}
                        onClick={()=>handleRemoveFriend(friend._id)}>
                <MdPersonRemove /> Remove Friend
                </button>
                <button style={{ backgroundColor: 'var(--primary-300)' }} onClick={() => fetchProfile(friend._id)}>
                  <FaEdit /> View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
        {overlay && <Overlay />}
        {isViewProfileOpen && (
          <ViewProfile onClose={closeViewProfile} user={userProfile} />
        )}
      </Wrapper>
    );
  };
const Overlay = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  filter: blur(10px);
  top: 0;
  left: 0;
  z-index: 999;
`

const Wrapper = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid var(--grey-900);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1000; 
    width: 70%;
    .all-friends{
    overflow-y:scroll;
    }
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
        align-items:center;
        .image{
            width: 30%;
            padding: 10px;
            margin: 10px;
            img{
                height: 200px;
                width: 200px;
            }
        }
        .buttons{
            width: 65%;
            margin: 10px;
            button{
              
              padding: 10px;
              margin: 10px;
              border: 1px solid var(--grey-900);
              color: white;
            width:auto;
            }
          }

    }

`
export default ShowAllFriends