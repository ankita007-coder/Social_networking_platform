import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';


const NavBar = () => {
  return (
    <>
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/home" 
                      className='link' 
                      style={({ isActive }) => ({
                        color: isActive?'var(--text-color)':'var(--text-color)',
                        backgroundColor: isActive ? '#e7e7e7': '',
                      })}>Home</NavLink>
            <NavLink to="/members" 
                      className='link'
                      style={({ isActive }) => ({
                        color: isActive?'var(--text-color)':'var(--text-color)',
                        backgroundColor: isActive ? '#e7e7e7': '',
                      })}>Members</NavLink>
            <NavLink to="/groups" 
                      className='link'
                      style={({ isActive }) => ({
                        color: isActive?'var(--text-color)':'var(--text-color)',
                        backgroundColor: isActive ? '#e7e7e7': '',
                      })}>Groups</NavLink>
            <NavLink to="/photos" 
                      className='link'
                      style={({ isActive }) => ({
                        color: isActive?'var(--text-color)':'var(--text-color)',
                        backgroundColor: isActive ? '#e7e7e7': '',
                      })}>Photos</NavLink>
            <NavLink to="/profile" 
                      className='link'
                      style={({ isActive }) => ({
                        color: isActive?'var(--text-color)':'var(--text-color)',
                        backgroundColor: isActive ? '#e7e7e7': '',
                      })}>Profile</NavLink>
          </Nav>
          <Nav className='small-screen'>
            <NavLink to='/members'
                      className='link'
                      style={({ isActive }) => ({
                        color: isActive?'var(--text-color)':'var(--text-color)',
                        backgroundColor: isActive ? '#e7e7e7': '',
                      })}>View All Friends</NavLink>
            <NavLink
                      to='/memes'
                      className='link'
                      style={({ isActive }) => ({
                        color: isActive?'var(--text-color)':'var(--text-color)',
                        backgroundColor: isActive ? '#e7e7e7': '',
                      })}>
              View all groups
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
    
  )
}

export default NavBar