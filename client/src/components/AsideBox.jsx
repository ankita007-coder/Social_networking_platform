import React, { useState } from 'react'
import Friends from './Friends'
import { Groups, ShowAllFriends } from '.'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/css/AsideBox';
import styled from 'styled-components';

const AsideBox = () => {

  const [isShowFriendsOpen,setIsShowFriendsOpen] = useState(false);
  const [overlay,setOverlay] = useState(false);

  const showAllFriends = ()=>{
    setOverlay(true);
    setIsShowFriendsOpen(true);
  }
  const closeFriends = ()=>{
    setOverlay(false);
    setIsShowFriendsOpen(false);
  }

  return (
    <>
    <Wrapper>
        <div className='title'>
            <h5>My Friends</h5>
        </div>
        <Friends/>
        <button onClick={showAllFriends}>View All Friends</button>
        {
        overlay && <Overlay/>
      }
      {
        isShowFriendsOpen && <ShowAllFriends closeFriends={closeFriends}/>
      }
    </Wrapper>
    <Wrapper>
        <div className='title'>
            <h5>Latest Groups</h5>
        </div>
        <Groups/>
        <button><Link to='/groups' className='link'>View All Groups</Link></button>
    </Wrapper>
    </>
  )
}

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


export default AsideBox