import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AsideBox, Header } from '../components'
import axios from 'axios';
import toast from 'react-hot-toast';
import profilePic from '../assets/images/profile.png';
import { FaCameraRetro } from "react-icons/fa";

const Profile = () => {
  const [profile,setProfile] = useState('');
  const [selectedFile,setSelectedFile]= useState(null);
  const [showProfileButton, setShowProfileButton] = useState(false);
  const displayProfile = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      //console.log(storedToken);
      if (!storedToken) {
        // Handle the case when the token is missing
        toast.error('Token is missing. Please log in.');
        return;
      }
  
      const response = await axios.get('http://localhost:8000/api/v1/users/profile', {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      //console.log("response",response);
      setProfile(response.data.user);
    } catch (error) {
      toast.error('Error fetching profile:', error.response.msg);
    }
  };
  
  const handleProfilePictureUpload = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('profilePicture', selectedFile);
  
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/users/profile/profile-picture',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.status === 200) {
        toast.success(response.data.msg);
        
        // Optionally, update the local state with the new profile picture
        setProfile({ ...profile, profilePic: response.data.imageUrl });
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      toast.error('Error uploading profile picture');
    }
  };
  
  
  useEffect(()=>{
    displayProfile();
  },[]);
  
  return (
      <Wrapper>
      <div className='header'>
        <Header/>
    </div>
    <div className='body'>
    <main>
    <h2>{profile.fullName}</h2>
      <hr/>
      <div className='profile'>
          <div className="images" 
                onMouseEnter={()=>setShowProfileButton(true)}
                onMouseLeave={()=>setShowProfileButton(false)}>
                  {/* <img src={profilePic} alt="hi"/> */}
            <img src={profile.profilePic ? `http://localhost:8000/${profile.profilePic}`: profilePic} alt={profile.fullName} />
           {
            showProfileButton &&  
            <div className='changeProfile'>
            <label htmlFor='profile-pic'><FaCameraRetro/></label>
              <input type="file" 
                      id='profile-pic'
                      onChange={(e) => setSelectedFile(e.target.files[0])} 
                      style={{display:'none'}}
                      accept='image/*'
                      />

              <button  onClick={handleProfilePictureUpload}
                        className='change-button'>Change</button>
            </div>
            
           }
          </div>
        <div className="details">
          <p><b>Name: </b><span>{profile.fullName}</span></p>
          <p><b>Email Address: </b><span>{profile.email}</span></p>
          <p><b>City: </b><span>{profile.city}</span></p>
          <p><b>State: </b><span>{profile.state}</span></p>
          <p><b>Gender: </b><span>{profile.gender}</span></p>
          <p><b>Profession: </b><span>{profile.profession}</span></p>
        </div>
      </div>
    </main>
    <aside>
      <AsideBox/>
    </aside>
    </div>
    </Wrapper>
    
  )
}

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

.profile {
  display: flex;
  border: 1px solid var(--grey-900);

  .images {
    position: relative;
    width: 28%;
    border: 1px solid var(--grey-900);
    padding: 5px;
    margin: 10px;

    label{
      position: absolute;
      bottom: 50%;
      left: 48%;
      color: black;
    }
    img {
      width: 100%;
    }
 
    .change-button {
      position: absolute;
      bottom: 30%;
      left: 50%;
      transform: translateX(-50%);
      background-color: var(--grey-300);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: var(--primary-500);
      }
    }
    .details{
      padding: 10px;
      margin: 20px;
    }
  }
 .changeProfile{
    z-index: 900;
    background-color: var(--grey-900);
    width: 100%;

 }  
}
@media only screen and (max-width: 992px){
  aside{
    display:none;
  }
  main{
    width: 100%;
  }
`
export default Profile