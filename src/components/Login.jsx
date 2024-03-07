import React, { useState } from 'react';
import { useLoginUserMutation } from '../app/api';
function Login() {
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

    } catch (error) {
      throw error;
    }
  }
  return (
    // <div>LogIn</div>
    <>
      <form className='loginForm' onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input name="username" type="text" onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="password">Password:</label>
        <input name="password" type={show ? "text" : "password"} onChange={handleChange} />
        <button type="button" onClick={() => setShow(!show)}>Show</button>
        <br />
        <br />
        <input type="submit" />
      </form>
    </>
  )
}
export default Login;