import React, { useEffect, useState } from 'react'
import profile from '../assets/images/profile.png';
import styled from 'styled-components';
import axios from 'axios';

const Groups = () => {
  const url = "http://localhost:8000/api/v1/groups";
  const [data,setData] = useState([]);
  const fetchData= async()=>{
    try {
      const response = await axios.get(url);
      const d = response.data;
      setData(d.groups);
      console.log(d.groups)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
    
  return (
    <Wrapper>
      <div className='friends'>
      {
        data.slice(0,3).map((d)=>{
          return (
            <div className='box' key={d._id}>
            <div className='image'>
                <img src={profile} alt="profile" />
            </div>
            <div className='text'>
                <h4>{d.name}</h4>
                <p>{d.description}</p>
            </div>   
            
            </div>
          )
        })
      }
      </div>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  .friends{
    margin: 10px;
    padding: 10px;
  }
  img{
    margin: 3px;
    width:90%;
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
  }
  .image{
    width: 25%;
  }
`
export default Groups