import React, { useState } from 'react'

const registerUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    admin:false,
  })
  const[show, setShow] = useState(false);
  const handleChange = (e) => {
   
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">username:</label>
        <input name ={"username"} type={"text" } onChange= {handleChange}/>
        <br />
        <br />
        <label htmlFor="password">password:</label>
        <input name = {"password"} type={show?"text":"password" } onChange= {handleChange}/>
        <button onClick={()=>setShow(!show)}>Show</button>
        <br />
        <br />
        <label htmlFor="E-mail">E-mail:</label>
        <input name={"email"} type={"text" } onChange= {handleChange}/>
        <br />
        <br />
        <input type={"submit"} />
      </form>
    </>
  )
}
export default registerUser;