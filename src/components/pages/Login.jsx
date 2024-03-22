import React, { useState } from 'react';
import { useLoginUserMutation } from '../../app/api';
// import { useDispatch  } from 'react-redux';
import "./pagesStyles.css";

import { useNavigate} from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [loginUser] = useLoginUserMutation();
  const [formData, setFormData] = useState({
    username:"", password:"",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.prevent
    const {username, password} = formData;
    if (username.trim() === "") {
      alert("Username is required.");
      return;
    }
    if (password.trim() === "") {
      alert("Password is required.");
      return;
    }
    try {
      const response = await loginUser(formData);
      console.log(response)
      navigate('/products')
    } catch (error) {
      throw console.error(error);
      
    }
  }
  return (
    <>
      <form className='loginForm' onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input name="username" placeholder="Username" type="text" onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="password">Password:</label>
        <input name="password" placeholder="Password"  type={show ? "text" : "password"} onChange={handleChange} />
        <button type="button" onClick={() => setShow(!show)}>Show</button>
        <br />
        <br />
        <input type="submit" />
      </form>
    </>
  )
}
export default Login;