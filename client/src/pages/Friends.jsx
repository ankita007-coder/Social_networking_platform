// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'
// import { AsideBox, Header } from '../components'
// import axios from 'axios'
// import { useAuth } from '../utils/AuthContext'
// import profile from "../assets/images/profile.png";
// import { MdPersonAddAlt1 } from "react-icons/md";
// import { LuMessagesSquare } from "react-icons/lu";
// import { FaEdit } from "react-icons/fa";
// import toast from 'react-hot-toast'
// const Friends = () => {

//   const [nonFriends,setNonFriends] = useState([]);
//   const {userDetails} = useAuth();
 
//   const fetchNonFriends = async () => {
//     try {
//       const storedToken = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:8000/api/v1/users/non-friends', {
//         headers: {
//           Authorization: `Bearer ${storedToken}`,
//         },
//       });
//       setNonFriends(response.data);
//     } catch (error) {
//       console.error('Error fetching non-friends:', error);
//       // Handle the error accordingly
//     }
//   };
  
  
  
//    const addFriend = async (friendId) => {
//     try {
//       const storedToken = localStorage.getItem('token');
//       // Make an API call to add the friend
//       const response = await axios.post('http://localhost:8000/api/v1/users/add-friend', {
//         friendId: friendId,
//       },{
//         headers: {
//           'Authorization':`Bearer ${storedToken}`
//         }
//       });
//       if(response.status===200){
        
//       // Assuming the API returns success
//       toast.success('Friend added successfully:', response.data);
//       setNonFriends((prevNonFriends) =>
//       prevNonFriends.filter((nonFriend) => nonFriend._id !== friendId)
//     );
//       }
//     } catch (error) {
//       console.error('Error adding friend:', error);
//       // Handle the error accordingly
//     }
//   };



//   useEffect(()=>{
//     fetchNonFriends();
//   },[userDetails.friends]);

//   return (
//     <Wrapper>
//       <div className='header'>
//         <Header/>
//     </div>
//     <div className='body'>
//     <main>
//       {
//         nonFriends.map((nonFriend,index)=>{
//           const {profilePic, fullName} = nonFriend;
        
//           //console.log(nonFriend._id);
//           return <div key={index} className='members'>
//                   <div className='profile-img'>
//                     <img src={profile} alt={fullName}/>
//                     <h4>{fullName}</h4>
//                   </div>
//                  <div className='buttons'>
//                   <button style={{ backgroundColor:'green'}}
//                           onClick={()=>addFriend(nonFriend._id)}><MdPersonAddAlt1 /> Add Friend</button>
//                   <button style={{ backgroundColor:'transparent'}}
//                           onClick={()=>handleSendMessage(nonFriend._id)}><LuMessagesSquare /> Send Message</button>
//                   <button style={{ backgroundColor:'var(--primary-300)'}}><FaEdit /> View Profile</button>
//                  </div>
//                 </div>
//         })
//       }
//     </main>
//     <aside>
//       <AsideBox/>
//     </aside>
//     </div>
//     </Wrapper>
    
//   )
// }

// const Wrapper= styled.div`
//   .body{
//     display: flex;
//   }
//   main{
//     width: 70%;
//     padding: 10px;
//     margin: 10px;
//     margin-left: 7%;
//   }
//   aside{
//     width: 30%;
//   }
//   .members{
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin: 10px;
   
//     padding: 10px
//   }
//   .profile-img{
//     width: 23%;
//     img{
//       width: 100%;
//       border: 1px solid var(--grey-900);
//       padding: 10px;
//     }
//     h4{
//       text-align:center;
//       margin-top:3px;
//     }
//   }
//   .buttons{
//     width: 75%;
//     margin: 10px;
//     button{
      
//       padding: 10px;
//       margin: 10px;
//       border: 1px solid var(--grey-900);
//       color: white;
    
//     &:nth-child(2){
//       color: black;
//     }
//     }
//   }
//     @media only screen and (max-width: 992px){
//       aside{
//         display:none;
//       }
//       main{
//         width: 100%;
//       }
//     }
//     .buttons button{
//       width: 145px;
//     }

// `
// export default Friends


// components/Friends.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AsideBox, Header, Chat } from '../components';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import profile from '../assets/images/profile.png';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { LuMessagesSquare } from 'react-icons/lu';
import { FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Friends = () => {
  const [nonFriends, setNonFriends] = useState([]);
  const { userDetails } = useAuth();
  const [selectedFriend, setSelectedFriend] = useState(null);

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
      console.error('Error fetching non-friends:', error);
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

  const handleSendMessage = (friendId) => {
    // Open chat with the selected friend
    setSelectedFriend(friendId);
  };

  const handleCloseChat = () => {
    // Close the chat
    setSelectedFriend(null);
  };
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
            return (
              <div key={index} className="members">
                <div className="profile-img">
                  <img src={profile} alt={fullName} />
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
                    onClick={() => handleSendMessage(nonFriend._id)}
                  >
                    <LuMessagesSquare /> Send Message
                  </button>
                  <button style={{ backgroundColor: 'var(--primary-300)' }}>
                    <FaEdit /> View Profile
                  </button>
                </div>
              </div>
            );
          })}
        </main>
        <aside>
          <AsideBox />
        </aside>
      </div>

      {selectedFriend && (
        <Chat friendId={selectedFriend} onClose={handleCloseChat} />
      )}
    </Wrapper>
  );
};

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
