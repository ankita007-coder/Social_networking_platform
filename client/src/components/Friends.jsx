import React from 'react'
import profile from '../assets/images/profile.png';
import styled from 'styled-components';

const Friends = () => {
  return (
    <Wrapper>
      <div className='friends'>
        <img src={profile} alt="profile" />
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