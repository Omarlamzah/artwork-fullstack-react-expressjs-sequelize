import { RiLockPasswordLine } from "react-icons/ri"; 
import { FaUserLock } from "react-icons/fa"; 
import React, { useEffect, useState } from 'react';
import "./css.css"
import Loading from "../../componants/loading"
import  Button3dlogin from "../../componants/button/3dbutton"
import  Checkbox from "../../componants/checkbox"
import ReCAPTCHA from "react-google-recaptcha";
import {  postlogin ,postRestpassword} from "../../store/slices/login/slice";
import {  useDispatch, useSelector } from 'react-redux';
import Mainogin from './mainlogin';
import { Player } from '@lottiefiles/react-lottie-player';
import Emailrestpass from './emailrestpass';
import { getCookie, setcookie } from '../../hookes/cookiesfun';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const schema =  yup.object().shape({

  "email": yup.string().required("email is required").email("email should be a valid email address"),
  "password": yup.string().required("password is required").matches(/[a-zA-Z]/,"password should less then one character")
  
})





const Login = () => {

            const navigaion=useNavigate()
            const { isloading,error,user,isauthenticated} = useSelector((state) => { console.log(state); return state.loginslice} )
            const [capcha,setcapcha]=useState(false)
            const [isforgetpass,setisforgetpass]=useState(false)
            const [rememberme,setrememberme]=useState(false)
            const recapchachange=(value)=>{ value ? setcapcha(true) : setcapcha(false) }
            const dispatch=useDispatch()
            const {userwithtokenencode} =  useParams()
            const userwithtoken = userwithtokenencode
            ? JSON.parse(decodeURIComponent(userwithtokenencode))
            : "unknown";
                    

useEffect(()=>{
    if(isauthenticated || getCookie("islogin") ||  checkuserilogingedbygoogle()){
      
       navigaion("/artistprofile") 
        if(rememberme){
            setcookie("islogin",true)
        }

    }
   
   

  },[isauthenticated])

  const checkuserilogingedbygoogle=()=>{
    if(userwithtoken !=="unknown"){
      console.log(44444444444444444444444444)
      console.log(userwithtoken.userwithtoken)
      
    
      setcookie("usertoken",userwithtoken.userwithtoken.usertokens.token)
      setcookie("userid",userwithtoken.userwithtoken.id)
      setcookie("userpic",userwithtoken.userwithtoken.pic)
      setcookie("islogin",true)



      console.log(userwithtoken.userwithtoken)
      console.log(4444444444444444444444444444)  
     return true
    }
    else return false


  }


        
const restpassword=(email)=>{
    dispatch(postRestpassword(email))
    setisforgetpass(false)
}

const closeforget=()=>{setisforgetpass(false)}


const { register,handleSubmit , formState: { errors }} = useForm( { resolver: yupResolver(schema),} );
//console.log(register)
const Regesteruser=(data)=>{
  dispatch(postlogin({email:data.email,password:data.password}))       
}

    return (
        <div className=' '  id='logform'>
                  

             <Mainogin  srcplayer="./asste/login.json" />
              {isloading ? < Loading/> : (  

<motion.section   className={`flex lg:justify-center md:flex md:justify-center ${isforgetpass ? 'opacity-5' : 'opacity-100'}`}>

<div className='w-[40%] m-auto'> 
            <Player  src="./asste/signup.json" loop autoplay className="player"/>
                      </div>




                      <div  className=" h-[410px] bg-[#000000] mt-16 rounded-3xl p-3 pl-5 pr-5 shadow-inner  shadow-[#fbbf24]  ">
                   <div className="heading">Sign In</div>
      <form>

    <section className=' flex flex-col gap-2'>
        <div className=" flex bg-slate-50 items-center rounded-full pl-1 hover: border-yellow-400 hover:border-2 hover:border-solid ">
            <span><FaUserLock /></span>
        <input  {...register('email')}  className=" p-2 border-0 outline-none rounded-full transition" type="email"  id="email" placeholder="E-mail" /> 
   

        </div>
        <p  className=" text-red-700 ">{errors.email?.message}</p>
        <div className=" flex bg-slate-50 items-center rounded-full pl-1 hover: border-yellow-400 hover:border-2 hover:border-solid ">
            <span><RiLockPasswordLine /> </span>
        <input  {...register("password")}  className="p-2 border-0 outline-none rounded-full transition" type="password"  id="password" placeholder="Password"/>
    
        </div>
        <p  className=" text-red-700 ">{errors.password?.message}</p>
    </section>
    
      <ReCAPTCHA sitekey="6Ldyp8soAAAAACoSnEolN0tw8z-FQwLHrNOLjG-a" onChange={null}/>
      
      <div className=' w-full flex justify-center p-0 m-0'  onClick={handleSubmit(Regesteruser)}>< Button3dlogin   namebutton="login" /></div>
        
         <div className=' flex text-lg'> < Checkbox  onChange={(e)=>{setrememberme(e.target.checked)}}/><span className=' text-green-700' > remamber me</span></div>
         <span onClick={()=>{ setisforgetpass(true)}} className=' cursor-pointer float-right text-red-600'>reset password</span>
 
    </form>


  </div>


 
  
</motion.section>




  
  
  )}
 {
    isforgetpass &&  <Emailrestpass closeforget={closeforget}  restpassword={restpassword}/> 
}
        </div>
    );
}

export default Login;

