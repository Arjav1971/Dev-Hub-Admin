import React from 'react'
import {Table } from 'antd';
import { useEffect } from 'react';
import { getOrders } from '../features/auth/authSlice';
import { useDispatch,useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const columns = [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];

const Orders = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getOrders());
  },[]);
  const orderState=useSelector((state)=>state.auth.orders);
  console.log(orderState)
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i+1,
      name: orderState[i].orderby.firstname,
      product:orderState[i].products.map((i)=>{
        return (
          <>
            <ul>
              <li>{i.product.title}</li>
            </ul>
          </>

        )
        
        
      }),
      amount:orderState[i].paymentIntent.amount,
      date:new Date(orderState[i].createdAt).toLocaleString(),
      action:(
        <>
         <Link className=" fs-3 text-danger" to="/">
          <FaEdit/>
         </Link>
         <Link className="ms-3 fs-3 text-danger" to="/">
          <MdDelete/>
         </Link>
        </>
        
      ),
    });
  }
  return (
    <div>
        <h3 className='mb-4 title'>Orders</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
    </div>
  )
}

export default Orders;
