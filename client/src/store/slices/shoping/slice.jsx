import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

// Async thunk for creating a Product
export const createProduct = createAsyncThunk("shopingslice/createProduct", async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/shoping//createProduct", data);
    return response.data; // Assuming the response contains the created Product
  } catch (error) {
    throw error;
  }
});


 

// Async thunk for deleting a Product by token
export const deleteProductByid = createAsyncThunk("shopingslice/deleteProductByid", async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/shoping//deleteProductByid", data);
    return response.data;
  } catch (error) {
    throw error;
  }
});
// Async thunk for getting Products by token
export const getProducts= createAsyncThunk("shopingslice/getProducts", async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/shoping/getProducts", data ) ;
     
    return response.data;

  } catch (error) {
    throw error;
  }
});

// Async thunk for updating a Product by token
export const updateProductByToken = createAsyncThunk("shopingslice/updateProductByToken", async (data) => {
  try {
    const response = await axios.put("http://localhost:8000/shoping//updateProductByToken", data); // Assuming there is a typo here; it should probably be axios.put
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Create a slice for the favoritslice state
const shopingslice = createSlice({
  name: "shopingslice",
  initialState: {products:[] ,totalprice:0,productcount:0,isloading :false},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products=action.payload
        state.productcount=action.payload.length+1

          Swal.fire({timer:2000, icon:"success",title:"added successfully",text :"your product is added to carte successfully"})

      })
      .addCase(deleteProductByid.fulfilled, (state, action) => {
        state.products=action.payload
        state.productcount=action.payload.length
        Swal.fire({icon:"success",title:"deleted successfully",text :"your product is deleted successfully"})
        state.totalprice =0
        action.payload.map(product=>{
         state.totalprice+=parseInt(product.price)


        })

       })
      .addCase(getProducts.fulfilled, (state, action) => {
               state.products=action.payload
               state.productcount=action.payload.length 
               state.totalprice =0
               action.payload.map(product=>{
                state.totalprice+=parseInt(product.price)


               })

               



       })
      .addCase(updateProductByToken.fulfilled, (state, action) => {
        state.products=action.payload
        state.productcount=action.payload.length
        Swal.fire({icon:"success",title:"updated successfully",text :"your product is updated successfully"})

        

       });
  },
});

export default shopingslice.reducer;
