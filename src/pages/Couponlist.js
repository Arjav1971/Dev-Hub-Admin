import React from 'react'
import {Table } from 'antd';
import { useEffect,useState } from 'react';
import { getCoupons,resetState } from '../features/coupon/couponSlice';
import { useDispatch,useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import CustomModal from '../components/CustomModal';
import { deleteCoupon } from '../features/coupon/couponSlice';
import { MdDelete } from "react-icons/md";
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
      title: 'Discount',
      dataIndex: 'discount',
      sorter:(a,b)=>a.discount-b.discount,
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiry',
      sorter:(a,b)=>a.expiry-b.expiry,
      
    },


    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
 
const Couponlist = () => {
  const [open, setOpen] = useState(false);
  const [couponId,setcouponId]=useState("");
  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(resetState());
    dispatch(getCoupons());
  },[]);
  const couponState=useSelector((state)=>state.coupon.coupons);
  // console.log(couponState)
  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i+1,
      name: couponState[i].name,
      discount: couponState[i].discount,
      expiry:new Date(couponState[i].expiry).toLocaleString(),
      action:(
        <>
         <Link to={`/admin/coupon/${couponState[i]._id}`} className=" fs-3 text-danger" >
          <FaEdit/>
         </Link>
         <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={()=>showModal(couponState[i]._id)}>
          <MdDelete/>
         </button>
        </>
        
      ),
    });
  }
  const deleteACoupon=(e)=>{
    dispatch(deleteCoupon(e));
    setOpen(false);
    setTimeout(()=>{
      dispatch(getCoupons());
    },100);
    
  };
  return (
    <div>
        <h3 className='mb-4 title'>Coupons</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal hideModal={hideModal} open={open} performAction={()=>{deleteACoupon(couponId)}} title="Are you sure you want to delete this coupon?"/>

    </div>
  )
}

export default Couponlist;
