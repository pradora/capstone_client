/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useRegisterUserMutation } from '../../app/api';
import { useNavigate } from 'react-router-dom';
import "./RegisterUser1.css";
import { Helmet } from 'react-helmet';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$/;
const usernameRegex = /^[a-zA-Z0-9_]+$/;

const RegisterUser = () => {
  
  const [show, setShow] = useState(false);
  const [registerUser] = useRegisterUserMutation();
  // const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  // const [showErrorAlert, setShowErrorAlert] = useState(false);
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
    const { username, email, password } = formData;
    if (username.trim() === "") {
      alert("Username is required.");
      return;
    }
    if (username.includes(" ")) {
      alert("Username cannot contain spaces.");
      return;
    }


    if (password.trim() === "") {
      alert("Password is required.");
      return;
    }

    if (email.trim() === "") {
      alert("Email is required.");
      return;
    }
    

    try {
      const response = await registerUser(formData);
      // console.log("Outside IF loop, Response:", response.data)
      // eslint-disable-next-line no-constant-condition
      if (response.status === 200 ||201 ||204) {
        // console.log("inside IF loop",response)
        // setShowSuccessAlert(true);
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
      console.error("Error registering user:", error);
    }

  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>Register User</title>
        <link rel="icon" type="image/png" href="/path/to/your/favicon.png" />
      </Helmet>

      <form className='registrationForm' onSubmit={handleSubmit}>
        <label htmlFor="Username">Username:</label>
        <input name="username" type="text" placeholder="Username" onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="password">Password:</label>
        <input name="password" placeholder="Password" type={show ? "text" : "password"} onChange={handleChange} />
        <button type="button" onClick={() => setShow(!show)}>Show</button>
        <br />
        <br />
        <label htmlFor="E-mail">E-mail:</label>
        <input name="email" placeholder="Email Address" type="text" onChange={handleChange} />
        <br />
        <br />
        <input type="submit" />
      </form>
    </>
  );
};

export default RegisterUser;
