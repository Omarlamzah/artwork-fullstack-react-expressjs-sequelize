import { AiFillNotification } from "react-icons/ai"; 
import React from 'react';
import { AiOutlineMenuFold } from 'react-icons/ai';
import { CgCloseR } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import Togllelanguage from '../../componants/togllelang';
import $ from "jquery"
import { motion } from 'framer-motion';

const Nav = () => {

  
    return (
        <div  className=' z-50'>


        <div onClick={()=>{ $("#mainsec").toggleClass("hidden");$("#topen").toggle();$("#tclose").toggle()}} className=" cursor-pointer absolute z-[9999] right-0 top-0 md:hidden float-right">
          <AiOutlineMenuFold id="topen"  className=" w-10 h-10 fill-white bg-black m-2" />
          <CgCloseR id="tclose" className="  hidden w-10 h-10 fill-white bg-black m-2" />
          </div>
     <motion.section   id="mainsec"  initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:1}}   className=' hidden top-0 absolute z-[99999999] w-screen md:flex flex-col  items-center md:items-start p-2 md:p-0 md:flex-row md:justify-between bg-black'>
      
      <div className=' flex flex-col md:flex-row  md:h-6 items-center md:justify-center'>
       <Link className=' flex  items-center no-underline mr-4 p-1 font-bold text-lg ttransition-all  hover:text-yellow-400' to='/notification'><AiFillNotification /> <span>notify users</span></Link>
     </div> 
    
    </motion.section>
     


    

 

<div className=" w-28 absolute bottom-[66px]  "> <Togllelanguage /></div>

 
  </div>
    );
}

export default Nav;
