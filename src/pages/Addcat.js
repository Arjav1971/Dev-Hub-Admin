import {React,useState,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomInput from '../components/CustomInput'

import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import "react-widgets/styles.css";
import { createCategory,getCategory,resetState, updateCategory } from '../features/pcategory/pcategorySlice';

let schema = Yup.object({
  title: Yup.string().required("Category Name is Required"),
});

const Addcat = () => {
  const dispatch=useDispatch();
  const location=useLocation();
  const getPCatId=location.pathname.split("/")[3];
  const navigate=useNavigate();
  const newCategory=useSelector((state)=>state.pCategory);
  const {isSuccess,isError,isLoading,createdCategory,categoryName,updatedCategory}=newCategory;
  useEffect(()=>{
    if(getPCatId!==undefined){
      dispatch(getCategory(getPCatId));
      // formik.values.title=brandName;

    }
    
    else{
      dispatch(resetState());
    }

  },[getPCatId])
  useEffect(()=>{
    if(isSuccess && createdCategory){
      toast.success('Category Added Successfully');
    }
    if(isSuccess && updatedCategory){
      toast.success('Category Updated Successfully');
      navigate("/admin/list-category");
    }
    if(isError){
      toast.error('Something Went Wrong!')
    }
  },[isSuccess,isError,isLoading]);
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title: categoryName || "",
    
    },
    validationSchema:schema,
    onSubmit: values => {
      if(getPCatId!==undefined){
        const data={id:getPCatId,pCategoryData:values};
        dispatch(updateCategory(data));
        dispatch(resetState());
      }
      else{
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(()=>{
          dispatch(resetState())
        },3000);
      }
 
    },
  });
  return (
    <div>
        <h3 className='mb-4 title'>{getPCatId!==undefined ? "Edit":"Add"} Category</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput type="text" label="Enter Product Category" name="title" onCh={formik.handleChange("title")} onBl={formik.handleBlur('title')} val={formik.values.title}/>
                <div className="error">
                  {formik.touched.title && formik.errors.title}
                </div>
                <button className='btn btn-success border-0 rounded-3 mt-3'>
                {getPCatId!==undefined ? "Edit":"Add"} Category
                </button>

            </form>
        </div>
    </div>
  )
}

export default Addcat
