import { createSlice,createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bCategoryService from "./bcategoryService";


export const getCategories=createAsyncThunk("blogCategory/get-categories",async(thunkAPI)=>{
    try{
        return await bCategoryService.getBlogCategories();
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const getABlogCat=createAsyncThunk("blogCategory/get-category",async(id,thunkAPI)=>{
    try{
        return await bCategoryService.getABlogCategory(id);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteBlogCat=createAsyncThunk("blogCategory/delete-categories",async(id,thunkAPI)=>{
    try{
        return await bCategoryService.deleteBlogCategory(id);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
  });

export const resetState=createAction('Reset_all');
export const createBlogCategory = createAsyncThunk(
    "blogCategory/create-categories",
    async (categoryData, thunkAPI) => {
      try {
        return await bCategoryService.createBlogCategory(categoryData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const updateBlogCategory = createAsyncThunk(
    "blogCategory/update-categories",
    async (bcat, thunkAPI) => {
      try {
        return await bCategoryService.updateBlogCategory(bcat);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );


const initialState={
    bCategories:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}
export const bCategorySlice=createSlice({
    name:"bCategories",
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
                state.bCategories=action.payload;

            })
            .addCase(getCategories.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.isSuccess=false;
                state.message=action.error;

            })
            .addCase(createBlogCategory.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(createBlogCategory.fulfilled,(state,action)=>{
                    state.isLoading=false;
                    state.isError=false;
                    state.isSuccess=true;
                    state.createdBlogCategory=action.payload;
    
            })
            .addCase(createBlogCategory.rejected,(state,action)=>{
                    state.isLoading=false;
                    state.isError=true;
                    state.isSuccess=false;
                    state.message=action.error;
    
            })
            .addCase(getABlogCat.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(getABlogCat.fulfilled,(state,action)=>{
                    state.isLoading=false;
                    state.isError=false;
                    state.isSuccess=true;
                    state.BlogCategoryName=action.payload.title;

            })
            .addCase(getABlogCat.rejected,(state,action)=>{
                    state.isLoading=false;
                    state.isError=true;
                    state.isSuccess=false;
                    state.message=action.error;

            })
            .addCase(updateBlogCategory.pending,(state)=>{
                    state.isLoading=true;
            })
            .addCase(updateBlogCategory.fulfilled,(state,action)=>{
                    state.isLoading=false;
                    state.isError=false;
                    state.isSuccess=true;
                    state.updatedBlogCategory=action.payload;

            })
            .addCase(updateBlogCategory.rejected,(state,action)=>{
                    state.isLoading=false;
                    state.isError=true;
                    state.isSuccess=false;
                    state.message=action.error;

            })
            .addCase(deleteBlogCat.pending,(state)=>{
                    state.isLoading=true;
            })
            .addCase(deleteBlogCat.fulfilled,(state,action)=>{
                    state.isLoading=false;
                    state.isError=false;
                    state.isSuccess=true;
                    state.deletedBlogCategory=action.payload;

            })
            .addCase(deleteBlogCat.rejected,(state,action)=>{
                    state.isLoading=false;
                    state.isError=true;
                    state.isSuccess=false;
                    state.message=action.error;

            })
            .addCase(resetState,()=>initialState);

    }
})

export default bCategorySlice.reducer;