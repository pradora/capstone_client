/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useRegisterUserMutation } from '../../app/api';
import { useNavigate } from 'react-router-dom';
import "./RegisterUser1.css";
import { Helmet } from 'react-helmet';






// Ensures that the email format is valid by checking that it does not contain whitespace (\s),
// contains exactly one "@" symbol (@), and has at least one character before and after the "@" symbol
// followed by a period and at least one character after the period.
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Enforces password complexity rules by requiring at least one lowercase letter (?=.*[a-z]),
// one uppercase letter (?=.*[A-Z]), one digit (?=.*\d), one special character from the set [$@$!%*?&] (?=.*[$@$!%*?&]),
// and a total length of at least 6 characters to 24, {6, 24}. The character set [A-Za-z\d$@$!%*?&] matches any alphanumeric
// character or one of the special characters specified: $, @, !, %,*,?, &

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,24}$/;

// ^: Start of the string.
// [a-zA-Z]: First character must be a letter (uppercase or lowercase).
// [a-zA-Z0-9_-]: Allowed characters are letters, numbers, underscores, and hyphens.
// {3,23}: The username can be 3 to 23 characters long after the first character.
// $: End of the string.
const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{3,23}$/;








const RegisterUser1 = () => {
  const [show, setShow] = useState(false);
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [userName, setUserName] = useState('');
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])
  // username validation
  useEffect(() => {
    const result = usernameRegex.test(userName)
    console.log(result)
    console.log(userName)
    setValidName(result)
  }, [userName])

  // password match
  useEffect(() => {
    const result = passwordRegex.test(pwd)
    console.log(result)
    console.log(pwd)
    setValidPwd(result)
    const match = pwd === matchPwd
    setValidMatch(match)

  }, [pwd, matchPwd])

  // email validation
  useEffect(() => {
    const result = emailRegex.test(email)
    console.log(result)
    console.log(email)
    setValidEmail(result)
  }, [email])

  useEffect(() => {
    setErrMsg('');
  }, [userName, pwd, matchPwd, email]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    admin: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "user") {
        setUserName(value);
    } else if (name === "pwd") {
        setPwd(value);
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const v1 = usernameRegex.test(userName);
    const v2 = passwordRegex.test(pwd);
    const v3 = emailRegex.test(email)
  
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
  
    console.log(userName, pwd, email);
  
    try {
      const response = await registerUser(formData);
  
      // eslint-disable-next-line no-constant-condition
      if (response.status === 200 || 201 || 204) {
        setFormData({
          username: "",
          email: "",
          password: "",
          admin: false,
        });
        console.log("User created");
      }
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };


  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>Register User</title>
        <link rel="icon" type="image/png" href="/path/to/your/favicon.png" />
      </Helmet>
      {success ? (
        <section className='registration_section'>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section className='registration_section' >
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <h1>Register</h1>
          <form className="registrationForm"onSubmit={handleSubmit}>
            {/* ----USERNAME -------------------------------------------------------------- */}
            <label className='registraion_label' htmlFor="username">
              Username:
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !userName ? "hide" :
                "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
            className='registration_input'
              type="text"
              id="username"
              name="username"
              placeholder='Username'
              // allow us to set focus on input
              ref={userRef}
              // dont want previous created values to pop up
              autoComplete="off"
              // provide the event and ties the input to the user state
              onChange={handleChange}
              required
              // accesability, lets a screen reader announce whether this input feildneeds adjusted if wrong 
              aria-invalid={validName ? "false" : "ture"}
              // lets us provieds another element that describes the input field
              aria-describedby="uidnote"
              // if the user inupt field is on focus by the user
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}



            />
            <p id="uidnote" className={userFocus && userName &&
              !validName ? "instructions" : "offscreen"} >
              <FontAwesomeIcon icon={faInfoCircle} />
              First character must be a letter. <br />
              Allowed characters are letters, numbers, underscores, and hyphens <br />
              The username can be 3 to 23 characters long after the first character <br />
            </p>
            {/*--------------------------- password ----------------------------------------------------------------------------*/}
            <label className='registraion_label' htmlFor="password">
              Password:
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" :
                "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className='registration_input'
              type={show ? "text" : "password"}
              id="password"
              name="password"
              placeholder='Password'

              // provide the event and ties the input to the user state
              onChange={handleChange}
              required
              // accesability, lets a screen reader announce whether this input feildneeds adjusted if wrong 
              aria-invalid={validPwd ? "false" : "ture"}
              // lets us provieds another element that describes the input field
              aria-describedby="pwdnote"
              // if the user inupt field is on focus by the user
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}



            />
            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"} >
              <FontAwesomeIcon icon={faInfoCircle} />
              one uppercase letter <br />
              one number <br />
              one special character: $ @ ! % * ? & <br />
              The username can be 6 to 24 characters long after the first character <br />
            </p>
            {/*---------------------------Confirm password ----------------------------------------------------------------------------*/}
            <label className='registraion_label' htmlFor="confirm_password">
              Confirm Password:
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPwd ? "hide" :
                "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
            className='registration_input'
              type={show ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              placeholder='Confirm Password'

              // provide the event and ties the input to the user state
              onChange={handleChange}
              required
              // accesability, lets a screen reader announce whether this input feildneeds adjusted if wrong 
              aria-invalid={validPwd ? "false" : "ture"}
              // lets us provieds another element that describes the input field
              aria-describedby="pwdnote"
              // if the user inupt field is on focus by the user
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}



            />
            <button id="show_button"type="button" onClick={() => setShow(!show)}>Show</button>
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"} >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must Match the first password input field.
            </p>


            {/* ----EMAIL -------------------------------------------------------------- */}
            <label className='registraion_label' htmlFor="email">
              Email:
              <span className={validEmail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !email ? "hide" :
                "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
            className='registration_input'
              type="text"
              id="email"
              name="email"
              placeholder='Email Address'
              // allow us to set focus on input
              ref={userRef}
              // dont want previous created values to pop up
              autoComplete="off"
              // provide the event and ties the input to the user state
              onChange={handleChange}
              required
              // accesability, lets a screen reader announce whether this input feildneeds adjusted if wrong 
              aria-invalid={validEmail ? "false" : "ture"}
              // lets us provieds another element that describes the input field
              aria-describedby="emailnote"

              // if the user inupt field is on focus by the user
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}




            />
            <p id="emailnote" className={emailFocus && email &&
              !validEmail ? "instructions" : "offscreen"} >
              <FontAwesomeIcon icon={faInfoCircle} />
              First character must be a letter. <br />
              Allowed characters are letters, numbers, underscores, and hyphens <br />
              The username can be 3 to 23 characters long after the first character <br />
            </p>
            {/* ------------------submit button-------------------------- */}
            <button type="submit" disabled={!validName || !validPwd || !validMatch || !validEmail? true : false} >Register</button>
          </form>
          <p>
            Already Registered? <br />
            <span className="line" >
              {/* put router link here */}
              <a href="#">Sign-in</a>
            </span>
          </p>
        </section>
      )}
    </>
  )
}

export default RegisterUser1