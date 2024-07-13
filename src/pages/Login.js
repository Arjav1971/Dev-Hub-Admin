import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../features/auth/authSlice';
import {useDispatch,useSelector} from "react-redux"
let userSchema = Yup.object({
  email: Yup
  .string()
  .email("Email Should be valid")
  .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});
const Login = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password:"",
    },
    validationSchema:userSchema,
    onSubmit: values => {
      dispatch(login(values));
      // alert(JSON.stringify(values, null, 2));
    },
  });
  const {user,isLoading,isError,isSuccess,message}=useSelector(
    (state)=>state.auth
  );
  useEffect(()=>{
    if(isSuccess){
      navigate("admin");
    }
    else{
      navigate("");
    }
  },[user,isLoading,isError,isSuccess,message])
  return (
 
  <div className='py-5' style={{ display:'flex' , justifyContent: 'center', alignItems: 'center',background: "#86cbb6", minHeight: "100vh" }}>
    <div className='my-4 w-25 mx-auto p-4 bg-white rounded-3'>
      <h3 className='text-center'>Login</h3>
      <p className='text-center'>Login to your account to continue.</p>
      <div className="error text-center">
        {message.message=="Rejected" ? "You are not an Admin":""}
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput type='text' name="email" label='Email Address'  id="email"   val={formik.values.email} onCh={formik.handleChange("email")} onBlr={formik.handleBlur("email")} /> <div className='error'>
        {formik.touched.email && formik.errors.email ? (
         <div>{formik.errors.email}</div>
       ) : null}
        </div>
        <CustomInput type='password' name="password" label='Password'  id="pass"  val={formik.values.password} onCh={formik.handleChange("password")} onBlr={formik.handleBlur("password")} /> <div className='error'>
        {formik.touched.password && formik.errors.password ? (
         <div>{formik.errors.password}</div>
       ) : null}
        </div>
        <div className='mb-2 text-end'>
          <Link to="forgot-password" className=''>
            Forgot Password?
          </Link>
        </div>
        <button   className='login-link border-0 px-3 py-2 w-100 text-white fw-bold text-center text-decoration-none fs-5'  type="submit">
           Login
        </button>
       </form>
    </div>
  </div>

  )
}

export default Login
