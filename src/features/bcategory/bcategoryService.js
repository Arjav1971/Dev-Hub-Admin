import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config} from "../../utils/axiosconfig";

const getBlogCategories=async(user)=>{
    const response=await axios.get(`${base_url}blogcategory/`);
   
    return response.data;
}
const createBlogCategory=async(bcat)=>{
    const response=await axios.post(`${base_url}blogcategory/`,bcat,config);
   
    return response.data;
}
const updateBlogCategory=async(bcat)=>{
    const response=await axios.put(`${base_url}blogcategory/${bcat.id}`,{title:bcat.bcatData.title},config);
   
    return response.data;
}
const getABlogCategory=async(id)=>{
    const response=await axios.get(`${base_url}blogcategory/${id}`,config);
   
    return response.data;
}
const deleteBlogCategory=async(id)=>{
    const response=await axios.delete(`${base_url}blogcategory/${id}`,config);
   
    return response.data;
}

const bCategoryService={
    getBlogCategories,createBlogCategory,updateBlogCategory,getABlogCategory,deleteBlogCategory
};
export default bCategoryService; 