import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AsideBox, Header } from '../components';
import { FaPlus } from "react-icons/fa";
import AddPhotosModal from '../components/AddPhotosModal';
import toast from 'react-hot-toast';
import axios from 'axios';



const Photos = () => {

  const [isModalOpen,setIsModalOpen] = useState(false);
  const [photos,setPhotos] = useState([])

  const openModal=()=>{
    setIsModalOpen(true);
  }
  const closeModal=()=>{
    setIsModalOpen(false);
  }

    const handleAddPhoto = async (photoData) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          'http://localhost:8000/api/v1/photos/upload-photo',
          { ...photoData },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        console.log(response.data);
        if(response.status===200){
          fetchPhotos();
        }
      } catch (error) {
        console.error('Error uploading photo:', error);
        toast.error('Error while uploading photos');
      }
    };


    const fetchPhotos = async()=>{
      try {
          const token = localStorage.getItem('token');
          const response =await axios.get('http://localhost:8000/api/v1/photos',{
            headers:{
              Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data)
        setPhotos(response.data.photos);
      } catch (error) {
        toast.error("Error while fetching photos")
      }
    }

    useEffect(()=>{
      fetchPhotos();
    },[])
    
  return (
    <Wrapper>
      <div className='header'>
        <Header/>
    </div>
    <div className='body'>
    <main>
        <h2>PHOTOS </h2>     
      <hr/>
      <div className='photo-display'>
        {/* Display photos */}
      {photos.map((photo, index) => (
        <div key={index} className='pic'>
          <img src={`http://localhost:8000/${photo.photoUrl}`} alt={photo.caption} />
          <p>{photo.caption}</p>
        </div>
      ))}

     
      {/* Add photo modal */}
      {isModalOpen && (
        <AddPhotosModal onClose={closeModal} onAddPhoto={handleAddPhoto} />
      )}
      </div>
    </main>
   
    <aside>
      <AsideBox/>
    </aside>
    </div>
    <div id='addPhotos' onClick={openModal}>
      <FaPlus className='icon' />
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
  h2{
    font-size: 40px;
    margin: 10px;
  }
  #addPhotos{
    position: fixed;
    bottom: 10px;
    right: 30px;
    display: flex;
    align-items: center;
    background-color: var(--primary-500);
    color: white;
    border-radius: 50%;
    box-shadow: var(--shadow-1);
    padding: 25px;
    margin: 10px;
    font-size: 2rem;
    transition: ease-in-out 0.5s;
    .icon{
      padding: 0px;
    }
  }
  #addPhotos:hover{
    background-color: white;
    color: var(--primary-500);
    box-shadow: none;
    border: 1px solid var(--primary-500);
  }

  .images img{
    margin: 3px;
    width:70%;
  }  
  h4{
    color: var(--primary-300);
  }
  .box{
    display: flex;
    width: 100%;
    border: 1px solid var(--grey-900);
    margin: 8px;
    border-radius: var(--borderRadius);
    padding: 10px;
    align-items:center;
  }
  .images{
    width: 25%;
  }
  .join{
    background-color: transparent;
    border-radius: var(--borderRadius);
    padding: 4px 8px
  }
  .photo-display{
    display: flex;
    flex-wrap:wrap;
    .pic{
      display:flex;
      flex-direction: column;
      width: 30%;
      margin: 10px;
      border: 1px solid var(--grey-900);
      justify-content:center;
      align-items:center;
      img{
        width:200px;
        height: 200px;
        padding:10px;
        
      }
      p{
        background-color: var(--primary-300);
        width:200px;
        padding: 10px;
        margin: 10px;
        text-align: center;
        font-size: 20px;
        color:white;
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
    .photo-display{
      .pic{
      width:100%;
      }
    }
  }
`
export default Photos