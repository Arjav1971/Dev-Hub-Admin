import { createSlice,createAsyncThunk, createAction} from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";


export const getEnquiries=createAsyncThunk("enquiry/get-enquiry",async(thunkAPI)=>{
    try{
        return await enquiryService.getEnquiries();
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const getAEnquiry=createAsyncThunk("enquiry/get-aenquiry",async(id,thunkAPI)=>{
    try{
        return await enquiryService.getAEnquiry(id);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteEnquiry=createAsyncThunk("enquiry/delete-enquiry",async(id,thunkAPI)=>{
    try{
        return await enquiryService.deleteEnquiry(id);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
  });
  export const updateEnquiry=createAsyncThunk("enquiry/update-enquiry",async(enq,thunkAPI)=>{
    try{
        return await enquiryService.updateEnquiry(enq);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
  });
  export const resetState = createAction("Reset_all");

const initialState={
    enquiries:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}
export const enquirySlice=createSlice({
    name:"enquiries",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
           .addCase(getEnquiries.pending,(state)=>{
            state.isLoading=true;
            })
            .addCase(getEnquiries.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isError=false;
                state.isSuccess=true;
                state.enquiries=action.payload;

            })
            .addCase(getEnquiries.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.isSuccess=false;
                state.message=action.error;

            })
            .addCase(deleteEnquiry.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(deleteEnquiry.fulfilled,(state,action)=>{
                    state.isLoading=false;
                    state.isError=false;
                    state.isSuccess=true;
                    state.deletedEnquiry=action.payload;

            })
            .addCase(deleteEnquiry.rejected,(state,action)=>{
                    state.isLoading=false;
                    state.isError=true;
                    state.isSuccess=false;
                    state.message=action.error;

            })
            .addCase(getAEnquiry.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(getAEnquiry.fulfilled,(state,action)=>{
                    state.isLoading=false; 
                    state.isError=false;
                    state.isSuccess=true;
                    state.enqName=action.payload.name;
                    state.enqMobile=action.payload.mobile;
                    state.enqEmail=action.payload.email;
                    state.enqComment=action.payload.comment;
                    state.enqStatus=action.payload.status;

    
            })
            .addCase(getAEnquiry.rejected,(state,action)=>{
                    state.isLoading=false;
                    state.isError=true;
                    state.isSuccess=false;
                    state.message=action.error;
    
            })
            .addCase(updateEnquiry.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(updateEnquiry.fulfilled,(state,action)=>{
                    state.isLoading=false; 
                    state.isError=false;
                    state.isSuccess=true;
                    state.updatedEnquiry=action.payload;


    
            })
            .addCase(updateEnquiry.rejected,(state,action)=>{
                    state.isLoading=false;
                    state.isError=true;
                    state.isSuccess=false;
                    state.message=action.error.message;
    
            })
            .addCase(resetState, () => initialState);
            

    }
})

export default enquirySlice.reducer;
