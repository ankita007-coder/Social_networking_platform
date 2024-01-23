import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AsideBox, Header } from '../components';
import { FaPlus } from "react-icons/fa";



const Photos = () => {

  const handleClick=()=>{

  }
  return (
    <Wrapper>
      <div className='header'>
        <Header/>
    </div>
    <div className='body'>
    <main>
        <h2>PHOTOS </h2>     
      <hr/>

    </main>
   
    <aside>
      <AsideBox/>
    </aside>
    </div>
    <div id='addGroup' onClick={handleClick}>
      <FaPlus className='icon' />
    </div>
    </Wrapper>
    
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
  #addGroup{
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
  #addGroup:hover{
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
  @media only screen and (max-width: 992px){
    aside{
      display:none;
    }
    main{
      width: 100%;
    }
  }
`
export default Photos