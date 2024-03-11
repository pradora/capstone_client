import React, { useState } from 'react';
import { useRegisterUserMutation } from '../app/api';
import { useNavigate } from 'react-router-dom';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$/;
const usernameRegex = /^[a-zA-Z0-9_]+$/;

const RegisterUser = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [registerUser] = useRegisterUserMutation();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    admin: false,
  });
  
  // checks to see if the mutation is working 
  // registerUser({
  //   username: "newnew",
  //   email: "new@new.com",
  //   password: "password123",
  //   admin: true,
  // })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {username, email, password} = formData;
    if (username.trim() === "") {
      alert("Username is required.");
      return;
    }
    if (username.includes(" ")) {
      alert("Username cannot contain spaces.");
      return;
    }
    if (!usernameRegex.test(username)) {
      alert("Username must be alphanumeric.");
      return;
    }
    
    if (password.trim() === "") {
      alert("Password is required.");
      return;
    }
    if (!passwordRegex.test(password)){
      alert("Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 6 characters long.");
      return;
    }
    if (email.trim() === "") {
      alert("Email is required.");
      return;
    }
    if(!emailRegex.test(email)){
      alert("Invalid email address format.")
      return;
    }

    try {
      const response = await registerUser(formData);
      // console.log("Outside IF loop, Response:", response.data)
      if (response.status === 200||201||204) {
        // console.log("inside IF loop",response)
        setShowSuccessAlert(true);
        setFormData({
          username: "",
          email: "",
          password: "",
          admin: false,
        });
        console.log("outside IF loop: user created");
        navigate("/login");
      } else {
        // response.status === 400
        // setShowErrorAlert(true);
        // alert("user not created")
      }
    } catch (error) {
      throw error;
    }
  
  };

  return (
    <>

      <form className='registrationForm' onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input name="username" type="text" onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="password">Password:</label>
        <input name="password" type={show ? "text" : "password"} onChange={handleChange} />
        <button type="button" onClick={() => setShow(!show)}>Show</button>
        <br />
        <br />
        <label htmlFor="E-mail">E-mail:</label>
        <input name="email" type="text" onChange={handleChange} />
        <br />
        <br />
        <input type="submit" />
      </form>
    </>
  );
};

export default RegisterUser;
