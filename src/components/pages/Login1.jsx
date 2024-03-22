/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react'
import { useLoginUserMutation } from '../../app/api';
import "./Login1.css"
const Login1 = () => {

    const userRef = useRef()
    const errRef = useRef();

    const [username, setUsername] = useState("")
    const [pwd, setPwd] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [success, setSuccess] = useState(false)
    const [loginUser] = useLoginUserMutation();
    const [formData, setFormData] = useState({
        user: "", password: "",
    })
    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg("")
    }, [username, pwd])

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPwd(value);
        }
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, pwd)


        try {
            const response = await loginUser(formData);
            setUsername("")
            setPwd("")
            setSuccess(true)
            console.log(response)
            if (response.status === 200) {
                setFormData({
                    username: "",
                    password: ""
                })
                console.log("User Logged In")
            }
            navigate('/products')
        } catch (error) {
            throw console.error(error);

        }

    }

    return (
        <>
            {success ? (
                <section className='login_section'>
                    <h1>
                        You are logged in
                    </h1>
                    <br />
                    <p><a href="#">Go to Home</a></p>
                </section>
            ) : (
                <section className='login_section'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form className="login_form"onSubmit={handleSubmit}>
                        <label className="login_label" htmlFor="username">Username:</label>
                        <input
                            type="text"
                            name="username"
                            className='login_input'
                            id="username"
                            ref={userRef}
                            autoComplete='off'
                            onChange={handleChange}
                            value={username}
                            required
                        />
                        <label className="login_label" htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            className='login_input'
                            id="password"
                            onChange={handleChange}
                            value={pwd}
                            required
                        />
                        <button className="sign_in_button"type="submit">Sign In</button>
                    </form>
                    <p>
                        Need an Account? <br />
                        <span className="line"> {/* put router link here */}
                            <a href="*">Sign Up</a></span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login1
