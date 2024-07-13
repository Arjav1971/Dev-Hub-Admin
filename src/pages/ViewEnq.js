import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { getAEnquiry,updateEnquiry,resetState } from '../features/enquiry/enquirySlice';
import { BiArrowBack } from "react-icons/bi";

const ViewEnq = () => {
  const location=useLocation();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const getEnqId=location.pathname.split("/")[3];
  const enqState=useSelector((state)=>state.enquiry);
  const {enqName,enqMobile,enqEmail,enqComment,enqStatus}=enqState;
  useEffect(()=>{
    dispatch(getAEnquiry(getEnqId));
  },[getEnqId])
  const goBack=()=>{
    navigate(-1);
  }

  const setEnquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, enqData: e };
    dispatch(updateEnquiry(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getAEnquiry(getEnqId));
    }, 100);
  };
  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <h3 className='mb-4 title'>View Enquiry</h3>
        <button onClick={goBack} className="bg-transparent border-0 mb-0 d-flex align-items-center fs-5 gap-2 " ><BiArrowBack className='fs-5 '/> Go Back</button>
      </div>
      <div className='mt-5 bg-white p-4 rounded-3 d-flex-column '>
        <div className='d-flex align-items-center gap-3'>
            <h6 className='mb-0 mt-3'>Name:</h6>
            <p className='mb-0 mt-3'>{enqName}</p>
        </div>
        <div className='d-flex align-items-center gap-3'>
            <h6 className='mb-0 mt-3'>Mobile:</h6>
            <p className='mb-0 mt-3'>
                <a href={`tel:91${enqMobile}`}>{enqMobile}</a>
            </p>
        </div>
        <div className='d-flex align-items-center gap-3'>
            <h6 className='mb-0 mt-3'>Email:</h6>
            <p className='mb-0 mt-3'>
            <a href={`mailto:${enqEmail}`}>{enqEmail}</a>
            </p>
        </div>
        <div className='d-flex align-items-center gap-3'>
            <h6 className='mb-0 mt-3'>Comment:</h6>
            <p className='mb-0 mt-3'>{enqComment}</p>
        </div>
        <div className='d-flex align-items-center gap-3'>
            <h6 className='mb-0 mt-3'>Change Status:</h6>
            <div className='mt-3'>
               <select name="" 
               defaultValue={enqStatus?enqStatus:"Submitted"}
               className='form-control form-select' id="" onChange={(e)=>setEnquiryStatus(e.target.value,getEnqId)}>
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
            </div>
        </div>

      </div>
    </div>
  )
}

export default ViewEnq
