import React, { useEffect, useState } from 'react';
import "./css.css"
import  $ from "jquery"
import Swal from 'sweetalert2';
import Loading from "../../componants/loading"
import  Button3dlogin from "../../componants/button/3dbutton"
import ReCAPTCHA from "react-google-recaptcha";
import {  postRegesterUser} from "../../store/slices/login/slice";
import {  useDispatch, useSelector } from 'react-redux';
 import { useNavigate } from 'react-router-dom';
import {getAllCountriesAsOptions,getAllCitiesOfCountryAsOptions,formatCountry,getAllCountriesArray} from "./country"
import "select2"
import "select2/dist/css/select2.min.css"
import Mainogin from './mainlogin';
import { Player } from '@lottiefiles/react-lottie-player';
import * as yup  from "yup"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import { useTranslation } from 'react-i18next';
 
const schemaregester = yup.object().shape({

  "fullnamereg":yup.string().required("fullname is required"),
  "phonereg":yup.string().required("phone is required"),
  "emailreg":yup.string().required("email is required").email("email not valid"),
  "passwordreg":yup.string().required("password is required"),
  "repasswordreg":yup.string().oneOf([yup.ref("passwordreg")],"Your passwords do not match")

})


const Regester = () => {
  const {t,i18n} = useTranslation()
    
   const {register,handleSubmit,formState:{errors}} =useForm({resolver:yupResolver(schemaregester)})



    const { isloading,error,user} = useSelector((state) => {return state.loginslice} )
    
     const [country,setcountry]=useState(getAllCountriesAsOptions())
     const [citys,setcitys]=useState("")

     const dispatch=useDispatch()
     const navigate=useNavigate()

useEffect(()=>{
  $('#countryselect').html(country)
  $('#countryselect').select2( {templateResult:formatCountry,width:350})
  $('#selectciy').select2({width:350})
  $('#countryselect').on('change',(e)=>{
    const codecounry =(e.target.value).split("-")[0]
    const phonecode =(e.target.value).split("-")[2]
     $("#phonreg").val("+"+phonecode)
    document.getElementById("imgc").setAttribute("src", "flags/" + codecounry.toLowerCase()+".png");    
    const  citys =  getAllCitiesOfCountryAsOptions(codecounry)  
    document.getElementById("selectciy").innerHTML=citys
     console.log(e.target.value)
  })
   
})


useEffect(()=>{
  if(error!="empty"){
    console.log(error)
    Swal.fire(
       { icon :"error",
          text:error   
      }

    )
  }
 

},[error])






const handulregesteruser=(data)=>{
  dispatch(postRegesterUser({fullnamereg:data.fullnamereg,emailreg:data.emailreg,passwordreg:data.passwordreg,phonereg:data.phonereg,country:$("#countryselect").val(),city:$("#selectciy").val()}))
  navigate("/")

}
   
    return (
        <div  id='regform'>
       

         <Mainogin   />   

            
       
          
              {isloading ? < Loading/> : ( 
              
  <section className='flex lg:justify-center  md:flex md:justify-center  '>
           <div className='w-[40%] m-auto'> 
            <Player  src="./asste/signup.json" loop autoplay className="player"/>
                      </div>
                       
<div  className="   bg-[#000000] mt-16 shadow-inner  shadow-[#fbbf24]   w-[400px]  p-6 rounded-3xl mr-3">

<div className="heading"> {t("nav.regester")} </div> 
<form action="" className="form">

<input {...register("fullnamereg")} className= {` input ${i18n.language=="ar" ? " text-right" : "text-left"}`} type="text" name="fullnamereg" id="fullnamereg" placeholder="full name" /><span className=' text-red-600 text-right'>{errors.fullnamereg?.message}</span>
<input {...register("emailreg")}  className= {` input ${i18n.language=="ar" ? " text-right" : "text-left"}`} type="email"  id="emailreg" placeholder="email" /><span className=' text-red-600 text-right'>{errors.emailreg?.message}</span>


<div className='  flex mt-1  mb-2'><img id='imgc' className='w-10  h-7' src="flags/af.png" alt="" srcSet="" />
<select  {...register("country")} id='countryselect' className="w-full  " ></select>
</div>
 
<select {...register("citys")}  id='selectciy' className=" w-full " >{citys}</select><br />
 
<input {...register("phonereg")}    className= {` input ${i18n.language=="ar" ? " text-right" : "text-left"}`} type="text" name="phonereg" id="phonreg" placeholder="phone number" /><span className=' text-red-600 text-right'>{errors.phonereg?.message}</span>


<input {...register("passwordreg")}  className= {` input ${i18n.language=="ar" ? " text-right" : "text-left"}`} type="password" name="passwordreg" id="passwordreg" placeholder="password" /><span className=' text-red-600 text-right'>{errors.passwordreg?.message}</span>
<input {...register("repasswordreg")} className= {` input ${i18n.language=="ar" ? " text-right" : "text-left"}`} type="password" name="repasswordreg" id="repasswordreg" placeholder="rewrit password" /><span className=' text-red-600 text-right'>{errors.repasswordreg?.message}</span>

<div  className=' flex justify-center mt-2'><ReCAPTCHA  sitekey="6Ldyp8soAAAAACoSnEolN0tw8z-FQwLHrNOLjG-a" onChange={null}/></div>
<div className=' w-full flex justify-center p-0 m-0'  onClick={handleSubmit(handulregesteruser) }>< Button3dlogin   namebutton= {t("nav.regester")} /></div>
</form>


</div>

  </section>
  
  )}
 
        </div>
    );
}

export default Regester;
