import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import { setcookie } from "../../../hookes/cookiesfun";






export const getProfileuser = createAsyncThunk("getProfileuser", async(token ,apithunk)=>{
try {
    
    const profileuser =await axios.post("http://localhost:8000/artist/profile",{token})
    console.log(profileuser)
    return profileuser.data
} catch (error) {
     throw error
}
})


export const createProfile = createAsyncThunk("createProfile", async(artistinfo ,apithunk)=>{
    try {
        
        const response =await axios.post("http://localhost:8000/artist/create",artistinfo)
        return response.data
    } catch (error) {
         throw error
    }
    })


    export const removeProfie = createAsyncThunk( "removeProfie",async(token ,apithunk)=>{
    try {
        
        const response =await axios.post("http://localhost:8000/artist/remove",{token})
        return response.data
    } catch (error) {
         throw error
    }
    })


 


    export const updateProfile = createAsyncThunk("updateProfile", async(formdata ,apithunk)=>{
        try {
               
            const response =await axios.post("http://localhost:8000/artist/update",formdata)

            console.log(formdata)
            return response.data
        } catch (error) {
             throw error
        }
        })


        //works
        export const getworksartist = createAsyncThunk("getworksartist", async(token ,apithunk)=>{
            try {
                
                const getworksartist =await axios.post("http://localhost:8000/artist/getworks",{token})
                return getworksartist.data
            } catch (error) {
                 throw error
            }
            })


      

                     
    export const removeWork = createAsyncThunk( "removework",async({token,id},apithunk)=>{
        try {
            console.log(token,id)
            const response =await axios.post("http://localhost:8000/work/remove",{token,id})
           
            
            return response.data
        } catch (error) {
             throw error
        }
        })


        export const creatework = createAsyncThunk("creatework",async(formdata,apithunk)=>{
            try {
              console.log(formdata)
                const response =await axios.post("http://localhost:8000/work/create",formdata)
               
                
                return response.data
            } catch (error) {
                 throw error
            }

        })
        
        //fin works 

const profileclice = createSlice({
    initialState: {userand_profile:"empty", isLoading:false,isauthenticated:false,
                     isremoved:false,isupdated:false,iscreated:false    ,
                     isLoadingworks:false,
                     isworksavaliabe:false ,
                     worksartist: [],
                     workremoved:false,
                     workadded:false,
                     usedupdated:false,
                     workupdated:false,
},
    name: "profileclice",

    reducers:{
        updateWorkRemoved: (state, action) => {
            state.workremoved = action.payload;
          },
          updateWorkAdded: (state, action) => {
            state.workadded = action.payload;
          },
          updateUsedUpdated: (state, action) => {
            state.usedupdated = action.payload;
          },
          updateWorkUpdated: (state, action) => {
            state.workupdated = action.payload;
          },
    },
    extraReducers: (builder)=>{
            builder
            // for get profile informatioin from api
            .addCase(getProfileuser.pending,(state,action)=>{state.isLoading=true;})
            .addCase(getProfileuser.rejected,(state,action)=>{state.isLoading=false})
            .addCase(getProfileuser.fulfilled,(state,action)=>{
                state.isLoading=false
                state.userand_profile= action.payload
                console.log(action)

            })
             // for create profile informatioin from api
             .addCase(createProfile.pending,(state,action)=>{state.isLoading=true;})
             .addCase(createProfile.rejected,(state,action)=>{state.isLoading=false})
             .addCase(createProfile.fulfilled,(state,action)=>{
                 state.isLoading=false
                 state.userand_profile= action.payload
                 state.iscreated=true
             })
              // for remove profile informatioin from api
            .addCase(removeProfie.pending,(state,action)=>{state.isLoading=true;})
            .addCase(removeProfie.rejected,(state,action)=>{state.isLoading=false})
            .addCase(removeProfie.fulfilled,(state,action)=>{
                state.isLoading=false
                state.userand_profile= action.payload
                state.iscreated=true
                Swal.fire({title:"profile removed succesely",icon:"success"})

            })
               // for update profile informatioin from api
               .addCase(updateProfile.pending,(state,action)=>{state.isLoading=true; console.log(state.isLoading)})
               .addCase(updateProfile.rejected,(state,action)=>{state.isLoading=false;})
               .addCase(updateProfile.fulfilled,(state,action)=>{
                state.isLoading=false
                state.userand_profile= action.payload
                state.workupdated=true
                 setcookie("userpic","http://localhost:8000"+ action.payload.user.pic)
             
                //   Swal.fire({title:"work updated succesely",icon:"success"})

               })



               // for get works 
               .addCase(getworksartist.pending,(state,action)=>{state.isLoading=true;})
               .addCase(getworksartist.rejected,(state,action)=>{state.isLoading=false})
               .addCase(getworksartist.fulfilled,(state,action)=>{
                state.isLoading=false
                state.worksartist= action.payload
                console.log(state.worksartist)
               })
               //  end get works


                   // for remove works 
                   .addCase(removeWork.pending,(state,action)=>{state.isLoading=true;})
                   .addCase(removeWork.rejected,(state,action)=>{state.isLoading=false})
                   .addCase(removeWork.fulfilled,(state,action)=>{
                    state.isLoading=false
                    state.worksartist= action.payload
                    
                    console.log(state.worksartist)
                    state.workremoved=true
                   // Swal.fire({title:"work removed succesely",icon:"success"})
                   })
                   //  end remove works



                     // for create works 
                     .addCase(creatework.pending,(state,action)=>{state.isLoading=true;})
                     .addCase(creatework.rejected,(state,action)=>{state.isLoading=false})
                     .addCase(creatework.fulfilled,(state,action)=>{
                      state.isLoading=false
                      state.worksartist= action.payload
                      console.log(state.worksartist)
                      state.workadded=true;
                     // Swal.fire({title:"work removed succesely",icon:"success"})
                     })
                     //  end create works
    }
})



export default profileclice.reducer
export const { updateWorkRemoved,updateWorkAdded,updateUsedUpdated,updateWorkUpdated} = profileclice.actions