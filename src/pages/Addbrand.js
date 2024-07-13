import {React,useState,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomInput from '../components/CustomInput'

import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import "react-widgets/styles.css";
import { createBrand,resetState,getBrand,updateBrand} from '../features/brand/brandSlice';

let schema = Yup.object({
  title: Yup.string().required("Brand Name is Required"),
});



const Addbrand = () => {
  const dispatch=useDispatch();
  const location=useLocation();
  const navigate=useNavigate();
  const getBrandId=location.pathname.split("/")[3];
  const newBrand=useSelector((state)=>state.brand);
  const {isSuccess,isError,isLoading,createdBrand,brandName,updatedBrand}=newBrand;
  useEffect(()=>{
    if(getBrandId!==undefined){
      dispatch(getBrand(getBrandId));
      // formik.values.title=brandName;

    }
    
    else{
      dispatch(resetState());
    }

  },[getBrandId])

  useEffect(()=>{
    if(isSuccess && createdBrand){
      toast.success('Brand Added Successfully');
    }
    if(isSuccess && updatedBrand){
      toast.success('Brand Updated Successfully');
      navigate("/admin/list-brand");
    }
    if(isError){
      toast.error('Something Went Wrong!')
    }
  },[isSuccess,isError,isLoading]);
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema:schema,
    onSubmit: values => {
      if(getBrandId!==undefined){
        console.log(getBrandId);
        const data={id:getBrandId,brandData:values};
        dispatch(updateBrand(data));
        dispatch(resetState());
      }
      else{
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(()=>{
          dispatch(resetState())
        },300);
      }
      

    },
  });
  return (
    <div>
        <h3 className='mb-4 title'>{getBrandId!==undefined ? "Edit":"Add"} Brand</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput type="text" label="Enter Brand" name="title" onCh={formik.handleChange("title")} onBl={formik.handleBlur('title')} val={formik.values.title}/>
                <div className="error">
                  {formik.touched.title && formik.errors.title}
                </div>
                <button className='btn btn-success border-0 rounded-3 mt-3'>
                {getBrandId!==undefined ? "Edit":"Add"} Brand
                </button>
            </form>
        </div>
    </div>
  )
}

export default Addbrand;

