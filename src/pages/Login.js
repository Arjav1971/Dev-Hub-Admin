import React from 'react'
import CustomInput from '../components/CustomInput'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
 
  <div className='py-5' style={{ display:'flex' , justifyContent: 'center', alignItems: 'center',background: "#86cbb6", minHeight: "100vh" }}>
    <div className='my-4 w-25 mx-auto p-4 bg-white rounded-3'>
      <h3 className='text-center'>Login</h3>
      <p className='text-center'>Login to your account to continue.</p>
      <form action="">
        <CustomInput type='text' label='Email Address'  id="email"/>
        <CustomInput type='password' label='Password'  id="pass"/>
        <div className='mb-2 text-end'>
          <Link to="forgot-password" className=''>
            Forgot Password?
          </Link>
        </div>
        <Link to="/admin" className='login-link border-0 px-3 py-2 w-100 text-white fw-bold text-center text-decoration-none fs-5'  type="submit">
           Login
        </Link>
       </form>
    </div>
  </div>

  )
}

export default Login
