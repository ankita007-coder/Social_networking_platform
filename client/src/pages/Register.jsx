import React, { useState } from 'react'
import { NavHead } from '../components'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/css/RegisterAndLogin'
import axios from 'axios'
import toast from 'react-hot-toast';
const Register = () => {
  const [fullName,setFullName] = useState('');
  const [email,setEmail] =  useState('');
  const [city,setCity] =  useState('');
  const [state,setStates] =  useState('');
  const [gender,setGender] =  useState('');
  const [profession,setProfession] =  useState('');
  const [userName,setUserName] =  useState('');
  const [password,setPassword] =  useState('');
  const stateNames = ["Andhra Pradesh",
                      "Arunachal Pradesh","Assam","Bihar",
                      "Chhattisgarh",
                      "Goa",
                      "Gujarat",
                      "Haryana",
                      "Himachal Pradesh",
                      "Jharkhand",
                      "Karnataka",
                      "Kerala",
                      "Maharashtra",
                      "Madhya Pradesh",
                      "Manipur",
                      "Meghalaya",
                      "Mizoram",
                      "Nagaland",
                      "Odisha",
                      "Punjab",
                      "Rajasthan",
                      "Sikkim",
                      "Tamil Nadu",
                      "Tripura",
                      "Telangana",
                      "Uttar Pradesh",
                      "Uttarakhand",
                      "West Bengal",
                      "Andaman & Nicobar",
                      "Chandigarh",
                      "Dadra & Nagar Haveli and Daman & Diu",
                      "Delhi",
                      "Jammu & Kashmir",
                      "Lakshadweep",
                      "Puducherry"]

  const handleRegister = async(e)=>{
    e.preventDefault();
   try {
      const response = await axios.post('http://localhost:8000/api/v1/users/register',{
        userName, fullName, state, city, email, password,gender, profession
      })
      if(response.data){
        toast.success(response.data.msg)
      }
   } catch (error) {
      toast.error(error.response.data.msg)
   }
  }
  return (
    <Wrapper>
      <NavHead/>
      <div className='form'>
        <h3>REGISTER</h3>
        <hr/>
      <form>
      <div>
          <label htmlFor="fullName">Enter your full name <span>*</span></label>
        </div>
        <div>
        <input type="text" 
                name="fullName" 
                id="fullName" 
                onChange={(e)=>setFullName(e.target.value)}
              required/>
        </div>
        <div>
          <label htmlFor="city">Enter your city<span>*</span></label>
        </div>
        <div>
        <input type="text" 
                name="city" 
                id="city" 
                onChange={(e)=>setCity(e.target.value)}
              required/>
        </div>
        <div>
          <label htmlFor="state">Enter your state<span>*</span></label>
        </div>
        <div>
        <select name="state" id="state" onChange={(e)=>setStates(e.target.value)}>
          {
            stateNames.map((stateName,index)=>{
              return <option value={stateName} key={index}>{stateName}</option>
           
            })
          }
        </select>
        </div>
        <div>
          <label>Gender<span>*</span></label>
        </div>
        <div className='radio'>
          <div>
        <input type="radio" 
                name="gender" 
                id="female" 
                value="Female"
                onChange={(e)=>setGender(e.target.value)}
              /><label htmlFor="female">Female</label>
          </div>
          <div>
          <input type="radio" 
                      name="gender" 
                      id="male" 
                      value="Male"
                      onChange={(e)=>setGender(e.target.value)}
                    />
                    <label htmlFor="male">Male</label>
          </div>
           
        </div>
        <div>
          <label htmlFor="profession">Enter your profession<span>*</span></label>
        </div>
        <div>
        <input type="text" 
                name="profession" 
                id="profession" 
                onChange={(e)=>setProfession(e.target.value)}
              required/>
        </div>
        <div>
          <label htmlFor="userName">Enter a username <span>*</span></label>
        </div>
        <div>
        <input type="text" 
                name="userName" 
                id="userName" 
                onChange={(e)=>setUserName(e.target.value)}
              required/>
        </div>
        <div>
        <label htmlFor="email">Enter your email<span>*</span></label>
        </div>
        <div>
        <input type="email" 
                name="email" 
                id="email" 
                onChange={(e)=>setEmail(e.target.value)}
              required/>
        </div>
        <div>
        <label htmlFor="password">Enter the password <span>*</span></label>
        </div>
        <div>
        <input type="password" 
                name="password" 
                id="password" 
                onChange={(e)=>setPassword(e.target.value)}
              required/>
        </div>
        <div>
          <input type='submit' value="Register" onClick={handleRegister}/>
        </div>
      </form>
      <div><p>Already a member? <Link to="/" className='link'><span>Login</span></Link></p></div>
      </div>
    </Wrapper>
  )
}



export default Register