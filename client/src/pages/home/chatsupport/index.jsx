import { BsWhatsapp } from "react-icons/bs"; 
import { BsFillSendFill } from "react-icons/bs"; 
import React, { useState,useEffect, useRef } from 'react';
import { FcCustomerSupport } from 'react-icons/fc';
import { Checkbox ,Radio} from '@material-tailwind/react';
import { CgCloseO } from 'react-icons/cg';
import { motion } from "framer-motion";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { getCookie ,setcookie} from "../../../hookes/cookiesfun";
import socket from "./socket";  

 
const Chatsupport = () => {

 

 
  const inputref=useRef("")
  const inputemail=useRef("")
  const [supportlist,setsupportlist]=useState([])
  const [istyping,setistyping]=useState(false)
  const [selectedSupport, setSelectedSupport] = useState(null);


  const [boxmessage,setboxmessage]=useState([])
   
  
  

  
 


  const sendmessageemail=()=>{
          console.log(selectedSupport)
         console.log(inputemail.current.value)
         setcookie("supportchat",selectedSupport.id+"//"+selectedSupport.email)
         socket.emit("sendemail" ,{email:inputemail.current.value})
          settoglechatbox(true)
          settogleamil(false)
  } 

  socket.on("supportstoclient",({supports})=>{
    setsupportlist(supports)
     console.log(supports)
    //settoglechatbox(true)
    //settogleamil(false)
    //Swal.fire({icon:"success",text:"welcome to support chatbox"})

   })



const focustyping=()=>{
  socket.emit("istyping")
 }

 const blurtyping=()=>{
  socket.emit("isnotyping")
 }
  
 const hundelersupport=(support)=>{


}

  const [toglechatbox,settoglechatbox]=useState(false)
  const [togleamil,settogleamil]=useState(false)
  const userpic= getCookie("userpic") || "http://localhost:8000/profile/unkownavatart.jpg"



   
  const handleSelectSupport = (support, index) => {
    setSelectedSupport(support);
   };


  useEffect(() => {
    supportlist.forEach((support, i) => {
      const selectElement = document.getElementById(i + "select");
      const radioElement = document.getElementById(i + "radio");

      if (i === supportlist.indexOf(selectedSupport)) {
        console.log(selectElement)
        selectElement.style.backgroundColor = "yellow";
        radioElement.checked = true;
      } else {
        selectElement.style.backgroundColor = "white";
        radioElement.checked = false;
      }
    });
  }, [selectedSupport]);


  const sendmessage=()=>{
    const id =getCookie("supportchat").split("//")[0]
    const timestamp= (Date().split(" ")[4]).slice(0,5)
    socket.emit("chatmessage" ,{to:id,message:inputref.current.value,timestamp})
    setboxmessage([...boxmessage,{from:"me",message:inputref.current.value,timestamp}]) 
    const  element= document.getElementById("sectionbox")
    element.scrollTop= element.scrollHeight
}



  socket.on("chatmessage",({message,from})=>{
    const timestamp= (Date().split(" ")[4]).slice(0,5)
    setboxmessage([...boxmessage,{from,message,timestamp}]) 
    const  element= document.getElementById("sectionbox")
    element.scrollTop= element.scrollHeight
 

})





  const handleWhatsAppContact = () => {
     const whatsappLink = `https://wa.me/+212706786683?text=${encodeURIComponent("are you still displonibe to contact")}`;
    window.open(whatsappLink, '_blank');
  }
  
  return (
    <div>
                     <button onClick={handleWhatsAppContact} className=' hover:bg-black rounded-full  fixed z-50 bottom-20 right-3'> <BsWhatsapp className=' fill-green-600 w-10 h-10 transfor' /></button> 
                   <button onClick={()=>{settogleamil(true); socket.connect()}} className=' hover:bg-black rounded-full  fixed z-50 bottom-2 right-3'> <FcCustomerSupport className=' w-10 h-10 transfor' /></button> 

                 {toglechatbox ? (  
                   <motion.article  initial={{y:"-100vh"}} animate={{y:0}} transition={{duration:0.5}}
                  className='  fixed z-50 w-screen h-screen bg-[#0e254996] left-0 top-0 flex justify-center items-center'>

                        <section className=" rounded-3xl p-2 pt-5 h-[60vh] bg-white relative flex flex-col justify-between">
                        <button   onClick={()=>{settoglechatbox(false)}} className=" absolute right-0 top-0 m-0 border-0">  <CgCloseO className=" fill-yellow-500 w-5 h-5 " /></button>


                           <div id="sectionbox" className=" overflow-y-scroll scrollbar scrollbar-thumb-blue-500 scrollbar-track-yellow-400 overflow-x-hidden">
                           <h4 className=" text-center pl-14 pr-14">welcome to chatbox</h4>

                                
                                 {boxmessage.map((message)=>{
  
                         
                          if(message.from=="me"){
                            return (
                              <motion.section initial={{opacity:0}} whileInView={{opacity:1}} className="support flex  justify-between  bg-gradient-to-r to-yellow-300  from-blue-400 p-1 "><img className=' w-10 h-10 rounded-full' src={userpic} alt="" srcset="" />
                              <div className=" flex flex-col ">
                            <p>{message.message} </p><span className=" font-bold">{message.timestamp}</span>
                            </div>
                             </motion.section>
                     )
                    }
                    else {
                     return (
                       <motion.section initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:1 }}  className="support flex flex-row-reverse justify-between  bg-gradient-to-r from-yellow-300  to-blue-400 p-1 ">
                                 <FcCustomerSupport className=' w-10 h-10 transfor' />                            <div className=" flex flex-col ">
                            <p>{message.message} </p><span className=" font-bold">{message.timestamp}</span>
                            </div>
                             </motion.section>
                       )
                            }
                               
                          
                                        })}



                           </div>


                          <div className=" flex items-center">
                                              <input  onBlur={blurtyping} onFocus={focustyping} className=" p-2 rounded-full outline-none border-blue-500 border-2 hover:border-yellow-400 w-full" placeholder="send him..."  ref={inputref} type="text" />
                                               <span className=" cursor-pointer" > <BsFillSendFill onClick={sendmessage} className=" fill-blue-500 hover:fill-yellow-400 w-7 h-7" /> </span>
                            </div>
                            
                        </section>
                   </motion.article>): null}





                   {togleamil ? (  
                   <motion.article  initial={{x:"-100vw"}} animate={{x:0}} transition={{duration:0.5}}
                  className=' fixed z-50 w-screen h-screen bg-[#0e254996] left-0 top-0 flex justify-center items-center'>

                        <section className=" rounded-3xl p-2 pt-5  bg-white relative flex flex-col justify-center">
                        <button   onClick={()=>{settogleamil(false)}} className=" absolute right-0 top-0 m-0 border-0">  <CgCloseO className=" fill-yellow-500 w-5 h-5 " /></button>

                           <h4 className=" text-center pl-14 pr-14">chatbox</h4>

                           


                          <div className="">
                            <section  id="elementsec"  className=" flex flex-col h-[70vh] overflow-y-scroll">
                           

                            {supportlist.map((support,index) => {
          const avatarText = support.email.slice(0, 2);
          const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
          return (
            <motion.div id={index+"select"}
            key={support.id}
            onClick={() => handleSelectSupport(support,index)}
          
            whileHover={{ scale: 1.05,  cursor: 'pointer' }}
          
            className= {` hover:bg-yellow-300  flex bottom-1 border-yellow-300 ${selectedSupport === support ? 'selected-support' : ''}`}
          >
            <div>
              <div className="avatar rounded-full w-14 h-14 pt-2 m-1 text-center text-[25px] font-bold" style={{ backgroundColor: randomColor }}>
                {avatarText} 
              </div>
            </div>
            <div>
              <div  className="flex justify-between items-center w-[170px]">
                <p className="p-0 m-0">{support.email}</p>
                <span><HiOutlineStatusOnline className="fill-green-500 w-8 h-8" /></span>
                <Radio id={index+"radio"} checked name="radio" />
              </div>
            </div>
          </motion.div>
          );
        })}





                            </section>
                            <section className=" flex">
                                            <input placeholder=" write your email here...."  className=" p-2 rounded-3xl border-blue-600 outline-none w-full"  ref={inputemail} type="text" />
                                               <span className=" cursor-pointer" > <BsFillSendFill onClick={sendmessageemail} className=" fill-blue-500 w-7 h-7" />  </span>
                        
                            </section>
                            </div>
                            
                        </section>
                   </motion.article>): null}
  
  

                   </div>
  
  
  );
}

export default Chatsupport;
