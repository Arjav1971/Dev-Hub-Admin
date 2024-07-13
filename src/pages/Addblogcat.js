import {React,useState,useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomInput from '../components/CustomInput'

import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import "react-widgets/styles.css";
import { createBlogCategory, getABlogCat, resetState, updateBlogCategory } from '../features/bcategory/bcategorySlice';

let schema = Yup.object({
  title: Yup.string().required("Blog category is Required"),
});

const Addblogcat = () => {
  const dispatch=useDispatch();
  const location=useLocation();

  const navigate=useNavigate();
  const getBlogCatId=location.pathname.split("/")[3];  

  const newCategory=useSelector((state)=>state.bCategory);
  const {isSuccess,isError,isLoading,createdBlogCategory,BlogCategoryName,updatedBlogCategory,deletedBlogCategory}=newCategory;
  useEffect(()=>{
    if(getBlogCatId!==undefined){
      dispatch(getABlogCat(getBlogCatId));
    }
    else{
      dispatch(resetState());
    }

  },[getBlogCatId])
  useEffect(()=>{
    if(isSuccess && createdBlogCategory){
      toast.success('Category Added Successfully');
    }
    if(isSuccess && updatedBlogCategory){
      toast.success('Category Updated Successfully');
      navigate("/admin/blog-category-list");
    }
    if(isError){
      toast.error('Something Went Wrong!')
    }
  },[isSuccess,isError,isLoading]);
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title: BlogCategoryName || "",
    },
    validationSchema:schema,
    onSubmit: values => {
      if(getBlogCatId!=undefined){
        const data={id:getBlogCatId,blogCatData:values};
        dispatch(updateBlogCategory(data));
        dispatch(resetState());
      }
      else{
        dispatch(createBlogCategory(values));
        formik.resetForm();
        setTimeout(()=>{
          dispatch(resetState())
        },300);
      }

    },
  });
  return (
    <div>
        <h3 className='mb-4 title'>{getBlogCatId!==undefined ? "Edit":"Add"} Blog Category</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput type="text" label="Enter Blog Category" name="title" onCh={formik.handleChange("title")} onBl={formik.handleBlur('title')} val={formik.values.title}/>
                <div className="error">
                  {formik.touched.title && formik.errors.title}
                </div>
                <button className='btn btn-success border-0 rounded-3 mt-3'>
                    {getBlogCatId!==undefined ? "Edit":"Add"} Blog Category
                </button>
            </form>
        </div>
    </div>
  )
}

export default Addblogcat
