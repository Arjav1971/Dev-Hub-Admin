import React from 'react'
import {Table } from 'antd';
import { useEffect,useState  } from 'react';
import { getBlogs,deleteBlog,resetState } from '../features/blogs/blogSlice';
import { useDispatch,useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CustomModal from '../components/CustomModal';

const columns = [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: (a, b) => a.category.localeCompare(b.category),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
  
const Bloglist = () => {
  const [open, setOpen] = useState(false);
  const [blogId,setblogId]=useState("");
  const showModal = (e) => {
    setOpen(true);
    setblogId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(resetState());
    dispatch(getBlogs());
  },[]);
  const blogState=useSelector((state)=>state.blog.blogs);
  const data1 = [];
  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i+1,
      title: blogState[i].title,
      category: blogState[i].category,
      action:(
        <>
         <Link className=" fs-3 text-danger" to={`/admin/blog/${blogState[i]._id}`}>
          <FaEdit/>
         </Link>
         <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={()=>showModal(blogState[i]._id)}>
          <MdDelete/>
         </button>
        </>
        
      ),
    });
  }
  const deleteABlog=(e)=>{
    dispatch(deleteBlog(e));
    setOpen(false);
    setTimeout(()=>{
      dispatch(getBlogs());
    },100);
    
  };
  return (
    <div>
        <h3 className='mb-4 title'>Blogs List</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal hideModal={hideModal} open={open} performAction={()=>{deleteABlog(blogId)}} title="Are you sure you want to delete this Blog?"/>

    </div>
  )
}

export default Bloglist
