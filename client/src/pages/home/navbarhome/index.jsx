 import { IoMdNotifications } from "react-icons/io"; 
import { AiOutlineClose, AiOutlineMenuFold } from "react-icons/ai"; 
import { MdShoppingCartCheckout } from "react-icons/md"; 
 import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCookie } from '../../../hookes/cookiesfun';
import Searchbar from '../../../componants/searchbar';
import Togllelanguage from "../../../componants/togllelang"
 import { motion } from "framer-motion";
 import $ from "jquery"
import Notification from "../notification";
import { getProducts } from "../../../store/slices/shoping/slice";



const Navbarhome = () => {
        const {  isauthenticated} = useSelector((state) => { console.log(state); return state.loginslice} )
        const { productcount} = useSelector((state) => state.shopingslice);
      const dispatch =useDispatch()
       const islogin =()=>{ if( isauthenticated || getCookie("islogin")) {  return true} else{   return false }}
       const [notifycount,setnotifycount]=useState(0)
       const userpic= getCookie("userpic") || "http://localhost:8000/profile/unkownavatart.jpg"
       const notifycountchange=(boxcount)=>{
        setnotifycount(boxcount)
       }

       useEffect(() => {
        dispatch(getProducts({ userid: parseInt(getCookie("userid")) }));
     }, [dispatch]);
   
           
     return (
        <div  >


              <div onClick={()=>{ $("#mainsec").toggleClass("hidden");$("#topen").toggle();$("#tclose").toggle()}} className=" cursor-pointer absolute z-[9999] right-0 top-0 md:hidden float-right">
                <AiOutlineMenuFold id="topen"  className=" fill-white  w-10 h-10 bg-black m-2" />
                <AiOutlineClose id="tclose" className=" fill-white   hidden w-10 h-10  m-2" />
                </div>

                
           <motion.section   id="mainsec"  initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:1}}   className=' hidden top-0 absolute z-[999] w-screen md:flex flex-col  items-center md:items-start p-2 md:p-0 md:flex-row md:justify-between bg-black'>
            
            <div className=' flex flex-col md:flex-row  md:h-6 items-center md:justify-center'>
            <Link className='no-underline mr-4  transition-all  hover:text-yellow-400' to='/artistprofile'> <img className=' w-9  rounded-full' src={userpic} alt="" srcset="" /> </Link>
            <Link className={`no-underline mr-4  font-bold text-lg transition-all  hover:text-yellow-400 ${ islogin ? ("hidden"): "block"} to='/login'`}> login </Link>  
            <Link className='no-underline mr-4 p-1 font-bold text-lg  transition-all  hover:text-yellow-400' to='/artistprofile'> profile </Link>
            <span onClick={()=>{window.scrollTo(0, document.body.scrollHeight);}} className=' cursor-pointer text-blue-700 no-underline mr-4 p-1 font-bold text-lg ttransition-all  hover:text-yellow-400' to='/artistprofile'> contact us </span>


           </div> 
           
           <div className=" flex justify-center">
          <span   className=" relative group flex mr-1">
            <IoMdNotifications onClick={()=>{$("#notifbox").toggleClass("hidden")}} className="  hover:cursor-pointer group-hover:fill-yellow-400 w-8 h-8 fill-[#07ff1c]" /> 
            <motion.div initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:1}} id="notifbox" className=" hidden rounded-xl absolute z-50 bg-blue-400 border-yellow-400 border-2 font-bold p-2 top-7 w-[200px] left-[-200px]"> 
            <Notification notifycountchange={notifycountchange}/>
            </motion.div>
            <span className=" group-hover:text-yellow-400 text-[#07ff1c] text-[20px] font-bold ">{notifycount}</span>
            </span>

          

          <span  className=" group flex mr-1">
          <Link to="/shopping">
            <MdShoppingCartCheckout  className=" hover:cursor-pointer group-hover:fill-yellow-400  w-8 h-8 fill-[#07ff1c]" /> 

            </Link>
            <span className=" group-hover:text-yellow-400 text-[#07ff1c] text-[20px] font-bold ">{productcount}</span>
            
            </span>
          
                   <Searchbar/>
          </div>
          </motion.section>
           


          

       

      <div className=" w-28 absolute bottom-[66px]  "> <Togllelanguage /></div>

       
        </div>
    );
}

export default Navbarhome;
