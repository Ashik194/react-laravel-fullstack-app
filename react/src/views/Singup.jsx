import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client.js'
import { useStateContext } from '../context/ContextProvider';

function Singup() {
  const nameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState(null);
  const {setUser, setToken} = useStateContext()
  
    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          password_confirmation: passwordConfirmationRef.current.value,
        }
        axiosClient.post('/signup', payload)
          .then(({data}) => {
            setUser(data.user)
            setToken(data.token)
          })
          .catch(e => {
            const response = e.response;
            if(response && response.status === 422) {
              // console.log(response.data.errors)
              setErrors(response.data.errors)
            }
          })
    }
  return (
    <div className='login-signup-form animated fadeInDown'>
        <div className="form">
            <form action="" onSubmit={onSubmit}>
                <h1 className='title'>Signup for Free</h1>
                {
                  errors && <div className='alert'>
                    {Object.keys(errors).map(key => (
                      <p key={key}>{errors[key][0]}</p>
                    ))}
                  </div>
                }
                <input ref={nameRef} type="text" placeholder='Enter your Full Name' />
                <input ref={emailRef} type="email" placeholder='Enter your Email' />
                <input ref={passwordRef} type="password" placeholder='Enter your Password' />
                <input ref={passwordConfirmationRef} type="password" placeholder='Re-enter your Password' />
                <button className='btn btn-block'>Signup</button>
                <p className="message">
                  Already  Registered? <Link to="/login">Sign In</Link>
                </p>
            </form>
        </div>
    </div>
  )
}

export default Singup