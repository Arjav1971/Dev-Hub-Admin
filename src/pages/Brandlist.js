import React from 'react'
import { Table } from 'antd';
import { useEffect,useState } from 'react';
import { getBrands, resetState } from '../features/brand/brandSlice';
import { useDispatch,useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CustomInput from '../components/CustomInput';
import CustomModal from '../components/CustomModal';
import { deleteBrand } from '../features/brand/brandSlice';
const columns = [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter:(a,b)=>a.name.length-b.name.length,
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
    
  ];
 
const Brandlist = () => {
  const [open, setOpen] = useState(false);
  const [brandId,setbrandId]=useState("");
  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(resetState());
    dispatch(getBrands());
  },[]);
  const brandState=useSelector((state)=>state.brand.brands);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i+1,
      name: brandState[i].title,
      action:(
        <>
         <Link to={`/admin/brand/${brandState[i]._id}`} className=" fs-3 text-danger" >
          <FaEdit/>
         </Link>
         <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={()=>showModal(brandState[i]._id)}>
          <MdDelete/>
         </button>
        </>
        
      ),
    });
  }
  const deleteABrand=(e)=>{
    dispatch(deleteBrand(e));
    setOpen(false);
    setTimeout(()=>{
      dispatch(getBrands());
    },100);
    
  };
  return (
    <div>
        <h3 className='mb-4 title'>Brands</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal hideModal={hideModal} open={open} performAction={()=>{deleteABrand(brandId)}} title="Are you sure you want to delete this brand?"/>
    </div>
  )
}

export default Brandlist;
