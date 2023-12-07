import React, { useEffect, useState } from 'react';
import { useParams ,useLocation, useNavigate} from 'react-router-dom';
import { ReCAPTCHA } from 'react-google-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import Button3dlogin from '../../../componants/button/3dbutton';
import Loading from '../../../componants/loading';
import validator from 'validator';
import { postTorestorepass } from '../../../store/slices/login/slice';
import Swal from 'sweetalert2';


const Resetpassword = () => {
  
    const dispatch =useDispatch()
    const location = useLocation()
    const token = new URLSearchParams(location.search).get("token")
    const fullname = new URLSearchParams(location.search).get("fullname")
    const id = new URLSearchParams(location.search).get("id")

    
    //const { error,user} = useSelector((state) => {return state.reducer} )
      const [capcha,setcapcha]=useState(false)
     const [password,setpassword]=useState("")
     const [password2,setpassword2]=useState("")

     const  [passworderror,setpassworderror]=useState("");
     const  [password2error,setpassword2error]=useState("");
     const  [passNotthesame,setpassNotthesame]=useState("");
     const {isauthenticated,isloading} =useSelector((state)=>{return state.loginslice})

     const POSTResetpassword =()=>{
             const ispass = validator.isStrongPassword(password)
             const ispass2 = validator.isStrongPassword(password2)
             var isthesame =true;
             if(!ispass){  setpassworderror("password not strong")}
             if(!password){  setpassword2error("password not strong")}
             if(password!=password){isthesame=false;setpassNotthesame("password sould be the same ")}
            // if(ispass && isthesame && ispass2){
                if(true){
                dispatch(postTorestorepass({id,password,token,fullname}))
             }


        
     }
     const navigaion=useNavigate()

     useEffect(()=>{
        if(isauthenticated){
           Swal.fire({icon:"success" ,title:"✔ welcome back ✔",text:"Welcome back to the website "})
            navigaion("/")

        }

     },[isauthenticated])

      

    return (
        <div>
          {
            isloading ? (<Loading/>) :(      <div  id='logform' className=' bg-black h-screen pt-5'>
            <div  className=" w-[30%] mx-auto bg-[aquamarine]">
             <div className="heading">hi <span className=' rounded-3xl text-green-500'> {fullname}</span> reset your password</div>
<form action="" className="form">

<input  onChange={(e)=>{setpassword(e.target.value)}}  required="" className="input" type="password" name="password" id="password" placeholder="password" />
<span className=' text-red-600 text-right'>{passworderror}</span>
<input onChange={(e)=>{setpassword2(e.target.value)}} value={password2} required="" className="input" type="password" name="password2" id="password2" placeholder="confirme Password"/>
<span className=" text-red-600 text-right">{password2error}</span>
<span className=" text-red-600 text-right">{passNotthesame}</span>

<ReCAPTCHA sitekey="6Ldyp8soAAAAACoSnEolN0tw8z-FQwLHrNOLjG-a" onChange={null}/>

<div  onClick={POSTResetpassword}>< Button3dlogin  namebutton="reset password" /></div>
  

</form>


</div>

  </div>)
          }
      
            
        </div>
    );
}

export default Resetpassword;
