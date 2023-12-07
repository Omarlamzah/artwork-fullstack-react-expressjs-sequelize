import { CgCloseO } from "react-icons/cg"; 
import { BiSearchAlt2 } from "react-icons/bi"; 
import React, { useRef, useState } from 'react';
import {Select,Option,Input} from "@material-tailwind/react"
 import { motion } from "framer-motion";
import { searchworks } from "../../store/slices/home/slice";
import { useDispatch } from "react-redux";
import { getCookie } from "../../hookes/cookiesfun";
 
const Index = () => {
    const [toglesearch,settoglesearch]=useState(false)
    const dispatch = useDispatch()
    const inputsearchref= useRef("")
    const [selectcatego,setselectcatego]= useState("")
   const searchworksclick =()=>{
     const data = { page: 1,idcateg:selectcatego, keyword: inputsearchref.current.value, token: getCookie("usertoken") };
        dispatch(searchworks(data));
   }
    return (
        <div >  
 <button onClick={()=>{settoglesearch(true)}} className=" m-0 border-0 bg-blue-600">  <BiSearchAlt2 className=" fill-yellow-500 w-5 h-5 " /></button>


{ toglesearch ? ( <motion.section initial={{y:"-100vh"}} animate={{y:0}} transition={{duration:0.5}} className="  absolute w-screen h-screen bg-[#0e254996] left-0 top-0 flex justify-center items-center">
 <button   onClick={()=>{settoglesearch(false)}} className=" m-0 border-0 bg-red-500">  <CgCloseO className=" fill-yellow-500 w-5 h-5 " /></button>
 
       <article className=" border-0 bg-white flex">
          <Select onChange={(value)=>{setselectcatego(value) }}  className=" w-32 ">
                <Option  value="1">category one</Option>
                <Option value="2">category tow</Option>
                <Option  value="3">category three</Option>
                <Option  value="4">category four</Option>
            </Select>
           
           <input ref={inputsearchref} placeholder="what is in your mind " className=" w-52 border-0 outline-none"/>
           <button onClick={ searchworksclick} className=" m-0 border-0 bg-blue-600">  <BiSearchAlt2 className=" fill-yellow-500 w-5 h-5 " /></button>
       </article>   
 </motion.section>) : null}


            







        </div>
    );
}

export default Index;
