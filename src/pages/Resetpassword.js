import React from 'react'
import CustomInput from '../components/CustomInput'

const Resetpassword = () => {
  return (
 
  <div className='py-5' style={{ display:'flex' , justifyContent: 'center', alignItems: 'center',background: "#86cbb6", minHeight: "100vh" }}>
   
    <div className='my-4 w-25 mx-auto p-4 bg-white rounded-3'>
      <h3 className='text-center'>Reset Password</h3>
      <p className='text-center'>Please Enter Your new password.</p>
      <form action="">
        <CustomInput type='text' label='New Password'  id="pass"/>
        <CustomInput type='password' label='Confirm Password'  id="confirmpass"/>
        <button className='border-0 px-3 py-2 w-100 text-white fw-bold' style={{background:"#86cbb6"}} type="submit">
           Reset Password
        </button>
      </form>
    </div>
  </div>

  )
}

export default Resetpassword
