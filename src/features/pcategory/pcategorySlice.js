import { createSlice,createAsyncThunk, createAction } from "@reduxjs/toolkit";
import pCategoryService from "./pcategoryService";


export const getCategories=createAsyncThunk("productCategory/get-Categories",async(thunkAPI)=>{
    try{
        return await pCategoryService.getProductCategories();
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const getCategory=createAsyncThunk("productCategory/get-category",async(id,thunkAPI)=>{
    try{
        return await pCategoryService.getCategory(id);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const createCategory = createAsyncThunk(
    "category/create-category",
    async (categoryData, thunkAPI) => {
      try {
        return await pCategoryService.createCategory(categoryData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
export const deleteCategory=createAsyncThunk("productCategory/delete-category",async(id,thunkAPI)=>{
    try{
        return await pCategoryService.deleteCategory(id);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
  });
export const resetState=createAction('Reset_all');
export const updateCategory = createAsyncThunk(
    "productCategory/update-category",
    async (brand, thunkAPI) => {
      try {
        return await pCategoryService.updateCategory(brand);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

const initialState={
    pCategories:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}
export const pCategorySlice=createSlice({
    name:"pCategories",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
           .addCase(getCategories.pending,(state)=>{
            state.isLoading=true;
            })
            .addCase(getCategories.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isError=false;
                state.isSuccess=true;
                state.pCategories=action.payload;

            })
            .addCase(getCategories.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.isSuccess=false;
                state.message=action.error;

            })
            .addCase(createCategory.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(createCategory.fulfilled,(state,action)=>{
                    state.isLoading=false;
                    state.isError=false;
                    state.isSuccess=true;
                    state.createdCategory=action.payload;
    
            })
            .addCase(createCategory.rejected,(state,action)=>{
                    state.isLoading=false;
                    state.isError=true;
                    state.isSuccess=false;
                    state.message=action.error;
    
            })
            .addCase(getCategory.pending,(state)=>{
                    state.isLoading=true;
            })
            .addCase(getCategory.fulfilled,(state,action)=>{
                    state.isLoading=false;
                    state.isError=false;
                    state.isSuccess=true;
                    state.categoryName=action.payload.title;
  
            })
            .addCase(getCategory.rejected,(state,action)=>{
                    state.isLoading=false;
                    state.isError=true;
                    state.isSuccess=false;
                    state.message=action.error;
  
            })
            .addCase(deleteCategory.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(deleteCategory.fulfilled,(state,action)=>{
                    state.isLoading=false;
                    state.isError=false;
                    state.isSuccess=true;
                    state.deletedCategory=action.payload;
    
            })
            .addCase(deleteCategory.rejected,(state,action)=>{
                    state.isLoading=false;
                    state.isError=true;
                    state.isSuccess=false;
                    state.message=action.error;
    
            })
            
            .addCase(updateCategory.pending,(state)=>{
                        state.isLoading=true;
             })
            .addCase(updateCategory.fulfilled,(state,action)=>{
                    state.isLoading=false;
                    state.isError=false;
                    state.isSuccess=true;
                    state.updatedCategory=action.payload;

            })
            .addCase(updateCategory.rejected,(state,action)=>{
                    state.isLoading=false;
                    state.isError=true;
                    state.isSuccess=false;
                    state.message=action.error;

            })
            .addCase(resetState,()=>initialState);


    }
})

export default pCategorySlice.reducer;