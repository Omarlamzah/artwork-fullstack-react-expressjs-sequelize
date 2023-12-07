import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 
        //works
        export const searchworks = createAsyncThunk("searchworks", async(keyssearch ,apithunk)=>{
            try {
                
                const getworksartist =await axios.post("http://localhost:8000/home/getworks",keyssearch)
                return getworksartist.data
            } catch (error) {
                 throw error
            }
            })


      

                     
     
        //fin works 

const getworksearch = createSlice({
    initialState: {  isLoading:false ,  worksearch:[{works:"empty"}],
                   
},
    name: "getworksearch",
    reducers:{
    },
    extraReducers: (builder)=>{
            builder
               // for get works 
               .addCase(searchworks.pending,(state,action)=>{state.isLoading=true;})
               .addCase(searchworks.rejected,(state,action)=>{state.isLoading=false})
               .addCase(searchworks.fulfilled,(state,action)=>{
                state.isLoading=false
                state.worksearch= action.payload
                console.log(state.worksearch)
               })
               //  end get works


                  



                    
    }
})



export default getworksearch.reducer
 