import React from 'react'
import {Table } from 'antd';
import { useEffect,useState } from 'react';
import { getColors,resetState } from '../features/color/colorSlice';
import { useDispatch,useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import CustomModal from '../components/CustomModal';
import { MdDelete } from "react-icons/md";
import { deleteColor } from '../features/color/colorSlice';
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
      title: 'Action',
      dataIndex: 'action',
    },
  ];
 
const Colorlist = () => {
  const [open, setOpen] = useState(false);
  const [colorId,setcolorId]=useState("");
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(resetState());
    dispatch(getColors());
  },[]);
  const colorState=useSelector((state)=>state.color.colors);
  // console.log(colorState)
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i+1,
      name: colorState[i].title,
      action:(
        <>
         <Link to={`/admin/color/${colorState[i]._id}`} className=" fs-3 text-danger">
          <FaEdit/>
         </Link>
         <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={()=>showModal(colorState[i]._id)}>
          <MdDelete/>
         </button>
        </>
        
      ),
    });
  }
  const deleteAColor=(e)=>{
    dispatch(deleteColor(e));
    setOpen(false);
    setTimeout(()=>{
      dispatch(getColors());
    },100);
    
  };
  return (
    <div>
        <h3 className='mb-4 title'>Colors</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal hideModal={hideModal} open={open} performAction={()=>{deleteAColor(colorId)}} title="Are you sure you want to delete this color?"/>

    </div>
  )
}

export default Colorlist;
