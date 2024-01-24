import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AsideBox, Header } from '../components';
import axios from "axios";
import profile from '../assets/images/profile.png'
import { FaPlus } from "react-icons/fa";
import Dialog from '../components/Dialog';
import { useAuth } from '../utils/AuthContext';
import toast from 'react-hot-toast';
import { FaArrowRightFromBracket } from "react-icons/fa6";
const url = "http://localhost:8000/api/v1/groups";

const Groups = () => {
  const [data,setData] = useState([]);
  const [dialogBox, setDialogBox] = useState(false);
  const [overlay,setOverlay] = useState(false);
  const [groupJoin,setGroupJoin] = useState([]);
  const {userDetails} = useAuth();

  const fetchData= async()=>{
    
    try {
      const response = await axios.get(url,
        {
          params: {
              userId: userDetails._id,
      }});
      const d = response.data;
      setData(d.groups);
      //console.log(d.groups)
    } catch (error) {
      //console.log(error)
      toast.error("Error in fetching groups");
    }
  }
  const handleClick= ()=>{
    setDialogBox(true);
    setOverlay(true);
  }
  const handleCLoseDialog=()=>{
    setDialogBox(false);
    setOverlay(false);
  }
  const handleJoin = async(groupId,index)=>{
    
    const response = await axios.post(`http://localhost:8000/api/v1/groups/${groupId}`,{
      userId: userDetails._id,
    },)
    //console.log(response.data)

    if(response.data.msg==="Group joined"){
   
        setGroupJoin((prevGroup)=>{
          const newGroup = [...prevGroup];
          newGroup[index]=true;
          return newGroup;
        });
      }
    }
    const handleExit = async (groupId) => {
      try {
        const response = await axios.post(`http://localhost:8000/api/v1/groups/exit/${groupId}`, {
          userId: userDetails._id,
        });
  
        if (response.status===200) {
          toast.success(response.data.msg);
          fetchData(); // Refresh the group list after exiting

        }
      } catch (error) {
        console.error('Error exiting group:', error);
        toast.error('Error exiting group');
      }
    };
  

  useEffect(() => {
    fetchData();
  }, [data]);
  
  return (
    <Wrapper>
      <div className='header'>
        <Header/>
    </div>
    <div className='body'>
    <main>
        <h2>GROUPS </h2>     
      <hr/>
      <div>
      {
        data.map((d,index)=>{
          return (
            <div className='box' key={d._id}>
            <div className='images'>
                <img src={profile} alt="profile" />
            </div>
            <div className='text'>
                <h4>{d.name}</h4>
                <p>{d.description}</p>
                <button className='join'
                onClick={()=>handleJoin(d._id,index)}
                 disabled={d.isMember||groupJoin[index]}>
              {d.isMember||groupJoin[index] ? (
                
                 'Joined'
               ): 'Join Group'}
            </button>
           {d.isMember && <button className='join'
                                  style={{margin:'0px 50px'}}
                                  onClick={()=>handleExit(d._id)}>Exit Group <FaArrowRightFromBracket/></button>}
            </div>
            </div>
          )
        })
      }
      </div>
      {
        overlay && <Overlay/>
      }
      {
        dialogBox && <Dialog onClose={handleCLoseDialog} 
                              setOverlay={setOverlay} />
      }
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
    bottom: 0px;
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
export default Groups