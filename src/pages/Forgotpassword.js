import React from 'react'
import CustomInput from '../components/CustomInput'

const Forgotpassword = () => {
  return (
  
      <div className='py-5 ' style={{ display:'flex' , justifyContent: 'center', alignItems: 'center',background: "#86cbb6", minHeight: "100vh" }}>
      <div className='my-4 w-25 mx-auto p-4 bg-white rounded-3'>
        <h3 className='text-center'>Forgot Password</h3>
        <p className='text-center'>Please enter your register email to get reset password mail.</p>
        <form action="">
          <CustomInput type='text' label='Email Address'  id="email"/>

          <button className='border-0 px-3 py-2 w-100 text-white fw-bold' style={{background:"#86cbb6"}} type="submit">
          Send Link
          </button>
        </form>
      </div>
    </div>
  )
}

export default Forgotpassword
