import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AsideBox, Header, Chat, ChatModal, ViewProfile } from '../components';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { LuMessagesSquare } from 'react-icons/lu';
import { FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Friends = () => {
  const [nonFriends, setNonFriends] = useState([]);
  const { userDetails } = useAuth();
  const [isChatModalOpen, setChatModalOpen] = useState(false);
  const [currentFriendId, setCurrentFriendId] = useState(null);
  const [isViewProfileOpen, setIsViewProfileOpen] = useState(false);
  const [overlay,setOverlay] = useState(false);
  const [userProfile,setUserProfile] = useState(null);

  //fetching members who are not friends
  const fetchNonFriends = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/v1/users/non-friends', {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      setNonFriends(response.data);
    } catch (error) {
      toast.error('Error fetching non-friends:', error);
      // Handle the error accordingly
    }
  };

  const addFriend = async (friendId) => {
    try {
      const storedToken = localStorage.getItem('token');
      // Make an API call to add the friend
      const response = await axios.post(
        'http://localhost:8000/api/v1/users/add-friend',
        {
          friendId: friendId,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      if (response.status === 200) {
        // Assuming the API returns success
        toast.success('Friend added successfully:', response.data);
        setNonFriends((prevNonFriends) =>
          prevNonFriends.filter((nonFriend) => nonFriend._id !== friendId)
        );
      }
    } catch (error) {
      console.error('Error adding friend:', error);
      // Handle the error accordingly
    }
  };

  const openChatModal = (friendId) => {
    setCurrentFriendId(friendId);
    setChatModalOpen(true);
  };

  const closeChatModal = () => {
    setCurrentFriendId(null);
    setChatModalOpen(false);
  };

  const openViewProfile=()=>{
    setOverlay(true);
    setIsViewProfileOpen(true);
  }
 const closeViewProfile=()=>{
  setIsViewProfileOpen(false);
  setOverlay(false);
 }
 const fetchProfile =async (friendId)=>{
  const response = await axios.get(`http://localhost:8000/api/v1/users/view-profile/${friendId}`);
  if(response.status===200){
    setUserProfile(response.data.user);
    openViewProfile();
  }
}

  useEffect(()=>{
    fetchNonFriends();
  },[userDetails.friends]);

  return (
    <Wrapper>
      <div className="header">
        <Header />
      </div>
      <div className="body">
        <main>
          {nonFriends.map((nonFriend, index) => {
            const { profilePic, fullName } = nonFriend;
           // console.log(profilePic);
            return (
              <div key={index} className="members">
                <div className="profile-img">
                  <img src={`http://localhost:8000/${profilePic}`} alt={fullName} />
                  <h4>{fullName}</h4>
                </div>
                <div className="buttons">
                  <button
                    style={{ backgroundColor: 'green' }}
                    onClick={() => addFriend(nonFriend._id)}
                  >
                    <MdPersonAddAlt1 /> Add Friend
                  </button>
                  <button
                    style={{ backgroundColor: 'transparent' }}
                    onClick={() => openChatModal(nonFriend._id)}
                  >
                    <LuMessagesSquare /> Send Message
                  </button>
                  <button 
                      style={{ backgroundColor: 'var(--primary-300)' }}
                      onClick={()=>fetchProfile(nonFriend._id)}
                  >
                    <FaEdit /> View Profile
                  </button>
                </div>
                {
                  overlay && <Overlay/>
                }
                {
                  isViewProfileOpen && <ViewProfile 
                                                    onClose={closeViewProfile} 
                                                    user={userProfile}
                                                    />
                }
              </div>
            );
          })}
        </main>
        <aside>
          <AsideBox />
        </aside>
      </div>

      {isChatModalOpen && (
        <ChatModal isOpen={isChatModalOpen} onClose={closeChatModal} friendId={currentFriendId}/>
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
const Wrapper= styled.div`
  .body{
    display: flex;
  }
  main{
    width: 70%;
    padding: 10px;
    margin: 10px;
    margin-left: 7%;
  }
  aside{
    width: 30%;
  }
  .members{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
   
    padding: 10px
  }
  .profile-img{
    width: 23%;
    img{
      width: 100%;
      border: 1px solid var(--grey-900);
      padding: 10px;
    }
    h4{
      text-align:center;
      margin-top:3px;
    }
  }
  .buttons{
    width: 75%;
    margin: 10px;
    button{
      
      padding: 10px;
      margin: 10px;
      border: 1px solid var(--grey-900);
      color: white;
    
    &:nth-child(2){
      color: black;
    }
    }
  }
    @media only screen and (max-width: 992px){
      aside{
        display:none;
      }
      main{
        width: 100%;
      }
    }
    .buttons button{
      width: 145px;
    }

`
export default Friends;
