import {React,useState,useEffect} from 'react'
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import CustomInput from '../components/CustomInput'

import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import "react-widgets/styles.css";
import { createCoupon,resetState,getCoupon,updateCoupon } from '../features/coupon/couponSlice';

let schema = Yup.object({
  name: Yup.string().required("Coupon Name is Required"),
  expiry: Yup.date().required("Expiry Date is Required"),
  discount: Yup.number().required("Discount percentage is Required"),

});



const Addcoupon = () => {
  const dispatch=useDispatch();
  const location=useLocation();
  const navigate=useNavigate();
  const getCouponId=location.pathname.split("/")[3];  
  const newCoupon=useSelector((state)=>state.coupon);
  const {isSuccess,isError,isLoading,createdCoupon,couponName,couponDiscount,couponExpiry,updatedCoupon}=newCoupon;
  const changeDateFormat = (date) => {
    if (!date) return ""; // Return empty string if date is not provided
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    let month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    let day = newDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  useEffect(()=>{
    if(getCouponId!==undefined){
      dispatch(getCoupon(getCouponId));
      // formik.values.title=brandName;

    }
    
    else{
      dispatch(resetState());
    }

  },[getCouponId])
  useEffect(()=>{
    if(isSuccess && createdCoupon){
      toast.success('Coupon Added Successfully');
    }
    if(isSuccess && updatedCoupon){
      toast.success('Coupon Updated Successfully');
      navigate("/admin/coupon-list");
    }
    if(isError){
      toast.error('Something Went Wrong!')
    }
  },[isSuccess,isError,isLoading]);
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      name: couponName||"",
      expiry:changeDateFormat(couponExpiry)||"",
      discount:couponDiscount||"",
    },
    validationSchema:schema,
    onSubmit: values => {
        // alert(JSON.stringify(values));
        if(getCouponId!==undefined){
         
          const data={id:getCouponId,couponData:values};
          dispatch(updateCoupon(data));
          dispatch(resetState());
        }
        else{
          dispatch(createCoupon(values));
          formik.resetForm();
          setTimeout(()=>{
            dispatch(resetState())
          },300);
        }
     
    },
  });
  return (
    <div>
        <h3 className='mb-4 title'>{getCouponId!==undefined ? "Edit":"Add"} Coupon</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput type="text" label="Enter Coupon name" name="name" onCh={formik.handleChange("name")} onBl={formik.handleBlur('name')} val={formik.values.name}/>
                <div className="error">
                  {formik.touched.name && formik.errors.name}
                </div>
                <CustomInput type="date" label="Enter Expiry Date" name="expiry" onCh={formik.handleChange("expiry")} onBl={formik.handleBlur('expiry')} val={formik.values.expiry}/>
                <div className="error">
                  {formik.touched.expiry && formik.errors.expiry}
                </div>
                <CustomInput type="number" label="Enter Discount" name="discount" onCh={formik.handleChange("discount")} onBl={formik.handleBlur('discount')} val={formik.values.discount}/>
                <div className="error">
                  {formik.touched.discount && formik.errors.discount}
                </div>
                <button className='btn btn-success border-0 rounded-3 mt-3'>
                {getCouponId!==undefined ? "Edit":"Add"} Coupon
                </button>
            </form>
        </div>
    </div>
  )
}

export default Addcoupon;

// 30:24