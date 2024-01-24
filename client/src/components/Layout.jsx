import React from 'react'
import Header from './Header'
import styled from 'styled-components'
import AsideBox from './AsideBox'
import DisplayPost from './DisplayPost'


const Layout = () => {
  return (
    <Wrapper>
      <div className='header'>
        <Header/>
    </div>
    <div className='body'>
    <main>
     
      <DisplayPost/>
    </main>
    <aside>
      <AsideBox />
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
    width: 65%;
    margin: 10px;
  }
  aside{
    width: 30%;
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
export default Layout