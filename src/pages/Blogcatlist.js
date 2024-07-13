import React, { useEffect,useState } from 'react'
import {Table } from 'antd';
import { deleteBlogCat, getCategories,resetState } from '../features/bcategory/bcategorySlice';
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
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
 
    
  ];
 
const Blogcatlist = () => {
  const [open, setOpen] = useState(false);
  const [bcatId,setbcatId]=useState("");
  const showModal = (e) => {
    setOpen(true);
    setbcatId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(resetState());
    dispatch(getCategories());
  },[]);
  const bCategoryState=useSelector((state)=>state.bCategory.bCategories);
  const data1 = [];
  for (let i = 0; i < bCategoryState.length; i++) {
    data1.push({
      key: i+1,
      name: bCategoryState[i].title,
      action:(
        <>
         <Link className=" fs-3 text-danger" to={`/admin/blog-category/${bCategoryState[i]._id}`}>
          <FaEdit/>
         </Link>
         <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={()=>showModal(bCategoryState[i]._id)}>
          <MdDelete/>
         </button>
        </>
        
      ),
    });
  }
  const deleteACategory=(e)=>{
    dispatch(deleteBlogCat(e));
    setOpen(false);
    setTimeout(()=>{
      dispatch(getCategories());
    },100);
    
  };
  return (
    <div>
        <h3 className='mb-4 title'>Blog Categories List</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal hideModal={hideModal} open={open} performAction={()=>{deleteACategory(bcatId)}} title="Are you sure you want to delete this Blog category?"/>

    </div>
  )
}

export default Blogcatlist
