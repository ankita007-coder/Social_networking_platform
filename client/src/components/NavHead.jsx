import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../assets/images/logo.png";
import {NavLink} from 'react-router-dom';
import Wrapper from '../assets/css/Navigation';
import { useAuth } from '../utils/AuthContext';

const NavHead = () => {
  const {isLoggedIn,logout} = useAuth();
  return (
         <Wrapper>
            <Nav>
                <Navbar.Brand ><NavLink to='/'><img src={logo} alt="logo"/></NavLink></Navbar.Brand>
                <p>Social Networking For Everyone</p>
            </Nav>
            <Nav>
              {
                isLoggedIn? <button onClick={logout}>Logout</button> :
                <> <NavLink to='/' className='link'>
                Login / 
              </NavLink>
              <NavLink to='/register' className='link'>
                 Register
              </NavLink></>
              }
           
            </Nav>
            </Wrapper>
            
  )
}



export default NavHead