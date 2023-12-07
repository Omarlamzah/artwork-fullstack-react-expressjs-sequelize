import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";




import { getCookie,removeCookie,setcookie } from "../../../hookes/cookiesfun";
export const postlogin = createAsyncThunk("postlogin", async (datalogin, apithunk) => {
  try {
    const response = await axios.post("http://localhost:8000/acount/login", datalogin);

    return response.data; 
  } catch (error) {
    throw error; 
  }
});




export const postRegesterUser =createAsyncThunk("postRegesterUser",async (data,apithunk)=>{
  try {
    
  const  userdata={ firstName:data.fullnamereg.split(" ")[0], lastName:data.fullnamereg.split(" ")[1], email:data.emailreg, phonenumber:data.phonereg, password:data.passwordreg,country:data.country,city:data.city}
    const response =await axios.post("http://localhost:8000/acount/regester",userdata)
    return response.data
  } catch (error) {
    console.log(error.response.data.error)
    throw error.response.data.error
  }

})



export const postRestpassword =createAsyncThunk("postRestpassword",async (email,apithunk)=>{
  try {
    console.log(email)
        const response =await axios.post("http://localhost:8000/acount/reset",{"email":email})
        return response.data
  } catch (error) {
  
  }

})



export const postTorestorepass =createAsyncThunk("postTorestorepass",async (data,apithunk)=>{
  try {
    
        const response =await axios.post("http://localhost:8000/acount/restorepass",data)
        return response.data
  } catch (error) {
  
  }

})





// Create a slice for the login state
const loginslice = createSlice({
  name: "loginslice",
  initialState: { usertoken:"", isloading:false ,error:"empty",user:{},isauthenticated:false},
  reducers: {
   
  }, 
  extraReducers: (builder) => {
    builder
      .addCase(postlogin.pending, (state, action) => {
            state.isloading=true 


      
      })
      .addCase(postlogin.fulfilled, (state, action) => {
        state.isloading=false
        state.user=action.payload.userwithtoken  // Merge existing user data with new data
       

        console.log(action.payload.userwithtoken.usertokens)
        if(action.payload.userwithtoken.usertokens!==null){
           setcookie("usertoken", action.payload.userwithtoken.usertokens.token)
           setcookie("userid", action.payload.userwithtoken.id)

           state.usertoken=action.payload.userwithtoken.usertokens.token
           state.isauthenticated=true
           Swal.fire({title:"welcome "+action.payload.userwithtoken.firstName,icon:"success"})

           
        }
       
       

      })
      
      .addCase(postlogin.rejected, (state, action) => {
        state.isloading=false;
        state.error=action.error.message
        Swal.fire({icon:"error",title:"error",text:action.error.message})

       
      })
      // here post regester 
      .addCase(postRegesterUser.pending, (state, action) => { state.isloading=true })
      .addCase (postRegesterUser.fulfilled, (state, action) =>{
                state.user=action.payload
                state.isloading=false
                console.log(action.payload.userwithtoken)
                setcookie("usertoken", action.payload.userwithtoken.usertokens.token)
                setcookie("userid", action.payload.userwithtoken.id)
                state.isauthenticated=true
                setcookie("islogin",true)
        
              
              })
      .addCase(postRegesterUser.rejected,(state, action)=>{
                state.isloading=false
                Swal.fire({icon:"error",title:"error",text:action.error.message})
                state.error=action.error.message})
             

                // here post email to get email reset password 
      .addCase(postRestpassword.pending, (state, action) => { state.isloading=true ;})
      .addCase (postRestpassword.fulfilled, (state, action) =>{
               Swal.fire({icon:"success",title:"great 👌",text: " please check your email inbox to reset new password"})

                state.isloading=false
                console.log( state.isloading)
              
              })
      .addCase(postRestpassword.rejected,(state, action)=>{
                state.isloading=false
                state.error=action.error.message
                Swal.fire({icon:"error",title:"error",text:action.error.message})

              })

                // here post password and token to get email reset password 

                .addCase(postTorestorepass.pending, (state, action) => { state.isloading=true ;})
                .addCase (postTorestorepass.fulfilled, (state, action) =>{
                  state.isloading=false
                        setcookie("usertoken", action.payload.user_with_token.user.usertokens.token)
                        setcookie("userid", action.payload.user_with_token.user.id)
                        state.isauthenticated=true
                        setcookie("islogin",true)
               
              
              })
                .addCase(postTorestorepass.rejected,(state, action)=>{
                state.isloading=false
                state.error=action.error.message
                Swal.fire({icon:"error",title:"error",text:action.error.message})

              })
  },
});
export default loginslice.reducer


