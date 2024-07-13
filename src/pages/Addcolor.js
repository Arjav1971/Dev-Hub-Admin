import {React,useState,useEffect} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomInput from '../components/CustomInput'

import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import "react-widgets/styles.css";
import { createColor,resetState,getColor,updateColor } from '../features/color/colorSlice';

let schema = Yup.object({
  title: Yup.string().required("Color is Required"),
});

const Addcolor = () => {
  const dispatch=useDispatch();
  const location=useLocation();
  const navigate=useNavigate();
  const getColorId=location.pathname.split("/")[3];
  const newColor=useSelector((state)=>state.color);
  const {isSuccess,isError,isLoading,createdColor,colorName,updatedColor}=newColor;
  useEffect(()=>{
    if(getColorId!==undefined){
      dispatch(getColor(getColorId));
    }
    else{
      dispatch(resetState());
    }

  },[getColorId])
  useEffect(()=>{
    if(isSuccess && createdColor){
      toast.success('Color Added Successfully');
    }
    if(isSuccess && updatedColor){
      toast.success('Color Updated Successfully');
      navigate("/admin/list-color");
    }
    if(isError){
      toast.error('Something Went Wrong!')
    }
  },[isSuccess,isError,isLoading]);
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema:schema,
    onSubmit: values => {
      if(getColorId!=undefined){
        const data={id:getColorId,colorData:values};
        dispatch(updateColor(data));
        dispatch(resetState());
      }
      else{
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(()=>{
          dispatch(resetState())
        },300);
      }

    },
  });
  return (
    <div>
        <h3 className='mb-4 title'>{getColorId!==undefined ? "Edit":"Add"} Color</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput type="color" label="Enter Color" name="title" onCh={formik.handleChange("title")} onBl={formik.handleBlur('title')} val={formik.values.title}/>
                <div className="error">
                  {formik.touched.title && formik.errors.title}
                </div>
                <button className='btn btn-success border-0 rounded-3 mt-3'>
                {getColorId!==undefined ? "Edit":"Add"}Color
                </button>
            </form>
        </div>
    </div>
  )
}

export default Addcolor;
