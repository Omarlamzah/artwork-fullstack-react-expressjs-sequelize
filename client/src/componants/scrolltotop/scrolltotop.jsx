import React, { useState } from 'react';
import {scroll} from "framer-motion"
import { BiArrowToTop } from 'react-icons/bi';
const Scrolltotop = () => {

    const [progressH,setprogressH]=useState(0)
    scroll((progressh)=>{setprogressH(progressh)})

    return ( 
        <div>
       <div style={{width:Math.floor(progressH*100)+"vw"}} className={`fixed top-0  border-4 border-yellow-300  z-[9999]`}></div>
       {progressH  ? (   <BiArrowToTop onClick={()=>{window.scrollTo({top:0,behavior:"smooth"})}} className=" cursor-pointer hover:bg-blue-950  z-[99999999] bg-blue-600 fixed bottom-[150px] right-4 h-20 w-20 fill-yellow-400 rounded-full border-5 border-solid border-red-600" />) : null}


            
        </div> 
    );
}

export default Scrolltotop;
