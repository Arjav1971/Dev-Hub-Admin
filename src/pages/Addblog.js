import {React,useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCategories } from '../features/bcategory/bcategorySlice';

import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Dropzone from 'react-dropzone';
import "react-widgets/styles.css";
import { uploadImg,delImg } from '../features/upload/uploadSlice';
import {createBlog,resetState,getABlog,updateBlog} from '../features/blogs/blogSlice'


let schema = Yup.object({
  title: Yup
  .string()
  .required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  category:Yup.string().required("Category is Required"),
});


const Addblog = () => {
  const dispatch=useDispatch();
  const location=useLocation();

  const navigate=useNavigate();
  const getBlogId=location.pathname.split("/")[3];  

  const imageState=useSelector((state)=>state.upload.images);
  const bCatState=useSelector((state)=>state.bCategory.bCategories);
  
  const newBlog=useSelector((state)=>state.blog);
  const {isSuccess,isError,isLoading,createdBlog,updatedBlog,blogName,blogDesc,blogCategory,blogImages}=newBlog;
  
console.log(newBlog);

  useEffect(()=>{
    if(getBlogId!==undefined){
      dispatch(getABlog(getBlogId));
      img.push(blogImages);
    }
    else{
      dispatch(resetState());
    }

  },[getBlogId])
  useEffect(()=>{
    dispatch(resetState());
    dispatch(getCategories());
   
  },[]);
  

  

  
  useEffect(()=>{
    if(isSuccess && createdBlog){
      toast.success('Blog Added Successfully');
    }
    if(isSuccess && updatedBlog){
      toast.success('Blog Updated Successfully');
      navigate("/admin/blog-list");
    }
    if(isError){
      toast.error('Something Went Wrong!')
    }
  },[isSuccess,isError,isLoading]);

  const img=[];
  imageState.forEach(i =>{
    img.push({
      public_id:i.public_id,
      url:i.url,

    })
  })

  useEffect(() => {
    console.log("blogName:", blogName);
    console.log("blogDesc:", blogDesc);
    console.log("blogCategory:", blogCategory);
  }, [blogName, blogDesc, blogCategory]);
  
  useEffect(()=>{
    formik.values.images=img;
  },[blogImages]);


  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title: blogName || "",
      description:blogDesc || "",
      category:blogCategory || "",
      images:"",

    },
    validationSchema:schema,
    onSubmit: values => {
      if(getBlogId!=undefined){
        const data={id:getBlogId,blogData:values};
        dispatch(updateBlog(data));
        dispatch(resetState());
      }
      else{
        dispatch(createBlog(values));
        formik.resetForm();
  
        setTimeout(()=>{
          dispatch(resetState())
  
        },3000);
      }
     
    },
  });

  return (
    <div>
      <h3 className='mb-4 title'>{getBlogId!==undefined ? "Edit":"Add"} Blog</h3>

 
      <div className='mt-3'>
        <form action='' onSubmit={formik.handleSubmit}>
          <div className='mt-4'>
              <CustomInput type='text' label='Enter Blog Title' name="title" onCh={formik.handleChange("title")} onBl={formik.handleBlur('title')} val={formik.values.title}/>
          </div>
          <div className="error">
              {formik.touched.title && formik.errors.title}
          </div>
          <select className="form-control py-2  mt-3" name="category" onChange={formik.handleChange("category")} onBlur={formik.handleBlur('category')} val={formik.values.category}  id=''>
            <option value=''>Select Blog Category</option>
            {bCatState.map((i,j)=>{
                  return(
                    <option key={j} value={i.title}>
                      {i.title}
                    </option>
                  )
                })}
          </select>
          <div className="error">
              {formik.touched.category && formik.errors.category}
          </div>
          <ReactQuill className='mt-3' theme='snow' name="description" onChange={formik.handleChange("description")}  val={formik.values.description} />
          <div className="error">
              {formik.touched.description && formik.errors.description}
          </div>
          <div className='bg-white border-1 p-5 text-center mt-3'>
            <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
              {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>
                    Drag 'n' drop some files here, or click to select files
                  </p>
                </div>
              </section>
              )}
            </Dropzone>
          </div>
          <div className='showimages d-flex flex-wrap gap-3 mt-3'>
              {imageState?.map((image, index) => {
                return (
                <div className="position-relative" key={index} style={{ display: "inline-block", position: "relative" }}>
                  <button type="button" onClick={()=>dispatch(delImg(image.public_id))}className='btn-close position-absolute' style={{ top: "5px", right: "5px", zIndex: "1" }} />
                  <img src={image.url} width={200} height={200} alt="" style={{ display: "block" }} />
                </div>
                );
              })}

          </div>
          <button className='btn btn-success border-0 rounded-3 mt-3'>
          {getBlogId!==undefined ? "Edit":"Add"}Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
