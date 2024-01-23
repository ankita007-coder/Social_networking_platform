import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/css/RegisterAndLogin';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../utils/AuthContext';
import { NavHead } from '../components';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/login', {
        email,
        password,
      });
  
      const { token, user } = response.data;
      if (token) {
       
  
        login(token, user);
        toast.success('Login successful');
        navigate('/home');
      }
    } catch (error) {
      toast.error(error.response);
      console.log(error.response);
    }
  };
  
  return (
    <Wrapper>
      <NavHead/>
      <div className='form'>
        <form>
          <div>
            <label htmlFor='email'>Enter your email <span>*</span></label>
          </div>
          <div>
            <input
              type='email'
              name='email'
              id='email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor='password'>Enter the password <span>*</span></label>
          </div>
          <div>
            <input
              type='password'
              name='password'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type='submit'
              value='Login'
              onClick={handleSubmit}
            />
          </div>
        </form>
        <div>
          <p>New User? <Link to='/register' className='link'><span>Register</span></Link></p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
