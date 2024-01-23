import React from 'react'
import Friends from './Friends'
import { Groups } from '.'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/css/AsideBox';

const AsideBox = () => {
  return (
    <>
    <Wrapper>
        <div className='title'>
            <h5>My Friends</h5>
        </div>
        <Friends/>
        <button> <Link to='/members' className='link'>View All Friends</Link></button>
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



export default AsideBox