import {React,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {getBrands} from "../features/brand/brandSlice";
import { getCategories } from '../features/pcategory/pcategorySlice';
import * as Yup from 'yup';
import {Select} from 'antd';
import { getColors } from '../features/color/colorSlice';
import Dropzone from 'react-dropzone';
import "react-widgets/styles.css";
import { uploadImg,delImg } from '../features/upload/uploadSlice';
import {createProducts,resetState} from '../features/product/productSlice'

let schema = Yup.object({
  title: Yup
  .string()
  .required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  price:Yup.number().required("Price is Required"),
  brand:Yup.string().required("Brand is Required"),
  category:Yup.string().required("Category is Required"),
  tags:Yup.string().required("Tag is Required"),
  color:Yup.array().min(1,"Pick at least one color").required("Color is Required"),
  quantity:Yup.number().required("Quantity is Required"),
});

const Addproduct = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [color,setColor]=useState([]);
  const [images,setImages]=useState([]);

  // console.log(color);
  

  const brandState=useSelector((state)=>state.brand.brands);
  const catState=useSelector((state)=>state.pCategory.pCategories);
  const colorState=useSelector((state)=>state.color.colors);
  const imageState=useSelector((state)=>state.upload.images);
  const newProduct=useSelector((state)=>state.product);
  const {isSuccess,isError,isLoading,createdProduct}=newProduct;
  useEffect(()=>{
    if(isSuccess && createdProduct){
      toast.success('Product Added Successfully');
    }
    if(isError){
      toast.error('Something Went Wrong!')
    }
  },[isSuccess,isError,isLoading]);
  const coloropt=[];
  colorState.forEach(i =>{
    coloropt.push({
      label:i.title,
      value:i._id,

    });
  });


  
  const img=[];
  imageState.forEach(i =>{
    img.push({
      public_id:i.public_id,
      url:i.url,

    })
  })
  console.log(img);
  useEffect(()=>{
    dispatch(getBrands());
    dispatch(getCategories())
    dispatch(getColors());
   
  },[]);
  useEffect(()=>{
    formik.values.color=color?color:" ";
    formik.values.images=img;
  },[color,img]);

  
  const formik = useFormik({
    initialValues: {
      title: "",
      description:"",
      price:"",
      brand:"",
      category:"",
      tags:"",
      color:"",
      quantity:"",
      images:"",
    },
    validationSchema:schema,
    onSubmit: values => {
      // dispatch(login(values));
      // alert(JSON.stringify(values));
      dispatch(createProducts(values));
      formik.resetForm();
      setColor(null);
      setTimeout(()=>{
        dispatch(resetState())

      },3000);
    },
  });
    const [desc, setDesc] = useState('');
    const handleDesc = (value) => {
        setDesc(value);
    };
    const handleColors=(e)=>{
      setColor(e);
      console.log(color);
    }
  return (
    <div>
      <h3 className='mb-4 title'>Add Product</h3>
      <div>
        <form onSubmit={formik.handleSubmit} className='d-flex gap-2 flex-column'>
            <CustomInput type="text" label="Enter Product Title" name="title" onCh={formik.handleChange("title")} onBl={formik.handleBlur('title')} val={formik.values.title}/>
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
          
            <div className="">
              <ReactQuill theme='snow' name="description" onChange={formik.handleChange("description")}  val={formik.values.description}/>
            </div>
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>
            <CustomInput  type="number" label="Enter Product Price" name="price" onCh={formik.handleChange("price")} onBl={formik.handleBlur('price')} val={formik.values.price}/>
            <div className="error">
              {formik.touched.price && formik.errors.price}
            </div>
            <select className="form-control py-2 " name="brand" onChange={formik.handleChange("brand")} onBlur={formik.handleBlur('brand')} val={formik.values.brand} id=''>
                <option value=''>Select Brand</option>
                {brandState.map((i,j)=>{
                  return(
                    <option key={j} value={i.title}>
                      {i.title}
                    </option>
                  )
                })}

            </select>
            <div className="error">
              {formik.touched.brand && formik.errors.brand}
            </div>
            <select className="form-control py-2 " name="category" onChange={formik.handleChange("category")} onBlur={formik.handleBlur('category')} val={formik.values.category}  id=''>
                <option value=''>Select Category</option>
                {catState.map((i,j)=>{
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
            <select className="form-control py-2 " name="tags" onChange={formik.handleChange("tags")} onBlur={formik.handleBlur('tags')} val={formik.values.tags}  id=''>
                <option value=''>Select Tag</option>
                <option value='featured'>Featured</option>
                <option value='popular'>Popular</option>
                <option value='special'>Special</option>
            </select>
            <div className="error">
              {formik.touched.tags && formik.errors.tags}
            </div>
            <Select mode="multiple" name="color" allowClear className='w-100' placeholder='Select colors' defaultValue={color} onChange={(i)=>handleColors(i)} onBlur={formik.handleBlur('color')} options={coloropt}/>
            <div className="error">
              {formik.touched.color && formik.errors.color}
            </div>
           <CustomInput  type="number" label="Enter Product Quantity" name="quantity" onCh={formik.handleChange("quantity")} onBl={formik.handleBlur('quantity')} val={formik.values.quantity}/>
           <div className="error">
              {formik.touched.quantity && formik.errors.quantity}
            </div>
            <div className='bg-white border-1 p-5 text-center'>
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
            <div className='showimages d-flex flex-wrap gap-3'>
              {imageState?.map((image, index) => {
                return (
                <div className="position-relative" key={index} style={{ display: "inline-block", position: "relative" }}>
                  <button type="button" onClick={()=>dispatch(delImg(image.public_id))}className='btn-close position-absolute' style={{ top: "5px", right: "5px", zIndex: "1" }} />
                  <img src={image.url} width={200} height={200} alt="" style={{ display: "block" }} />
                </div>
                );
              })}

            </div>
           
          <button className='btn btn-success border-0 rounded-3 my-5' type="submit">
                Add Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default Addproduct

