import React from 'react'
import {Table } from 'antd';
import { useEffect,useState } from 'react';
import { getEnquiries, updateEnquiry } from '../features/enquiry/enquirySlice';
import { useDispatch,useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import CustomModal from '../components/CustomModal';
import { deleteEnquiry } from '../features/enquiry/enquirySlice';
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
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
    },
    {
      title:'Status',
      dataIndex:'status'
    },

    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];

const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enqId,setenqId]=useState("");
  const showModal = (e) => {
    setOpen(true);
    setenqId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getEnquiries());
  },[]);
  const enquiryState=useSelector((state)=>state.enquiry.enquiries);
  
  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i+1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      comment:enquiryState[i].comment,
      mobile:enquiryState[i].mobile,
      status:(
        <>
<select name="" 
               defaultValue={enquiryState[i].status?enquiryState[i].status:"Submitted"}
               className='form-control form-select' id="" onChange={(e)=>setEnquiryStatus(e.target.value,enquiryState[i]._id)}>
                <option value="Submitted" >
                    Submitted
                </option>
                <option value="Contacted" >
                    Contacted
                </option>
                <option value="In Progress" >
                    In Progress
                </option>
                <option value="Resolved" >
                    Resolved
                </option>
            
                </select> 
        </>
      ),
      action:(

        <>

         <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={()=>showModal(enquiryState[i]._id)}>
          <MdDelete/>
         </button>
         <Link className=" ms-3 fs-3 text-danger bg-transparent border-0" to={`/admin/enquiries/${enquiryState[i]._id}`}>
          <AiOutlineEye/>
         </Link>
        </>
        
      ),
    });
  }
  const setEnquiryStatus=(e,i)=>{
    const data={id:i,enqData:e};
    dispatch(updateEnquiry(data));
  }
  const deleteAEnquiry=(e)=>{
    dispatch(deleteEnquiry(e));
    setOpen(false);
    setTimeout(()=>{
      dispatch(getEnquiries());
    },100);
    
  };
  return (
    <div>
        <h3 className='mb-4 title'>Enquiries</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal hideModal={hideModal} open={open} performAction={()=>{deleteAEnquiry(enqId)}} title="Are you sure you want to delete this enquiry?"/>

    </div>
  )
}

export default Enquiries


// 1:34:48 