import { AiFillHome } from "react-icons/ai"; 
import { BiMailSend } from "react-icons/bi"; 
import React, { useEffect, useRef, useState } from 'react';
import { Textarea, Checkbox,Switch } from "@material-tailwind/react";
 import { AiFillPicture } from 'react-icons/ai';
import axios from 'axios';
import Select from "react-select";
import {motion} from "framer-motion"
import Swal from "sweetalert2";
import socket from "./socket";
import { Link ,useNavigate} from "react-router-dom";
  

const Sendnotification = () => {
  const Navigate= useNavigate()
  
  const [useremails, setuseremails] = useState([]);
  const [towebsite, settowebsite] = useState(false);
  const [toemail, settoemail] = useState(false);
  const [toemailAdress, settoemailAdress] = useState("");

  
  const [message, setmessage] = useState("");
  const [formData, setFormData] = useState(new FormData());
  const filenameref=useRef("")
 
  
  useEffect(() => {
    axios.get("http://localhost:8000/home/allusers", { offset: 0, pagesize: 100 }).then((response) => {
      const emails = response.data.users;
      emails.map((email) => {
        setuseremails((privemails) => [...privemails, { value: email.email, label: email.email }]);
      });
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  function loadfilehundel(event) {
     event.preventDefault();
     const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    formData.append("fileuplad" , files[0]);
    console.log("Selected files:", files);
    filenameref.current.innerText=files[0].name
   }

  const Sendnotificationclick = (event) => {
    event.preventDefault();
    formData.delete("istomail");
    formData.delete("istowebsite");
    formData.delete("emailadress");
    formData.delete("message");

    formData.append("istomail", toemail);
    formData.append("istowebsite", towebsite);
    formData.append("emailadress", toemailAdress);
    formData.append("message", message);

    axios.post("http://localhost:8000/home/posttonotification", formData).then((response) => {
              const res= response.data
               Swal.fire({icon:"success",text:res})
               // emit notification
                  if(towebsite){
                        socket.emit('newnotification', message);

                    
                  }
                // emit notification
               
               
    }).catch((error) => {
      const err= error.message
      console.log(err)
      socket.emit('newnotification', message);

      Swal.fire({icon:"error",text:err})     
    });
  };

  return (
    <div>
      <form className="flex flex-col p-8 m-4 bg-gray-800 text-white rounded-lg shadow-lg">
      
      <div className=" flex justify-between">
      <span className=" w-20" onClick={()=>{Navigate("../home")}}><AiFillHome  className=" w-10 h-10 fill-yellow-300"/> back</span>
      

      <h1 className=' text-center text-yellow-400 w-full'>send notification to email and to website</h1>
      </div>
         <div className="mb-4">
          <Checkbox onChange={(e) => settowebsite(e.target.checked)} label="Send to website" />
          <Checkbox onChange={(e) => {settoemail(e.target.checked);      }} label="Send to email" />

          {
                toemail ? (
                    <motion.div initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration :1}} >
                                            < Select onChange={(option) => {settoemailAdress(option.value)}} options={useremails} className="mt-2 text-black" ></ Select>

                    </motion.div>
                ) : null
                }

        </div>
        <Textarea className=" text-white p-2 border border-yellow-500 rounded" onChange={(e) => setmessage(e.target.value)} />

        <section className="flex justify-between mt-4">
          <div>
            <label
             onDragOver={(e) =>{  e.preventDefault()}}
             onDrop={loadfilehundel}
              className="border-dashed border-3 h-40 w-40 border-yellow-500 bg-blue-400 hover:bg-blue-600 hover:cursor-pointer hover:border-solid hover:border-black transition rounded"
              htmlFor="file1"
            >
              <AiFillPicture className="h-8 fill-yellow-400 w-full mt-2" />
            </label>
            <input className="hidden" onChange={loadfilehundel} type="file" name="" id="file1" />
          </div>
          <label className=' text-yellow-300 font-bold'  >  {  toemail  ? toemailAdress : null}</label>

        </section>
        <label className=' text-yellow-300 font-bold'  ref={filenameref}></label>

        <button
          onClick={Sendnotificationclick}
          className=" flex justify-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded"
        >
          <BiMailSend className=" h-10 w-10" />
        </button>
      </form>
    </div>
  );
};

export default Sendnotification;
