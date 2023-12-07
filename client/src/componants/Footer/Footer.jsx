import { BsInstagram } from "react-icons/bs"; 
import { AiFillTwitterCircle } from "react-icons/ai"; 
import { FaFacebookSquare } from "react-icons/fa"; 
// Footer.js

import React, { useRef } from 'react';
import axios from "axios";
import Swal from "sweetalert2";




const Footer = () => {

  const emailref= useRef("")

  const Subscribeuser=()=>{
    axios.post("http://localhost:8000/home/subscribe",{email:emailref.current.value}).then((response)=>{
      Swal.fire({"icon":"success" ,text:response.data.message})
    }).catch(()=>{
      Swal.fire({"icon":"error" ,text:"internal error"})

    })
 }
 


  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="  flex">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">Artworks Company</h2>
          <p className="mt-2"> Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

       

       <article>
       <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Subscribe to our newsletter</h3>
          <div className="flex">
            <input
            ref={emailref}
            
              type="email"
              placeholder="Your email"
              className="bg-gray-700 text-white p-2 rounded-l focus:outline-none"
            />
            <button onClick={Subscribeuser} className="bg-blue-500 text-white p-2 rounded-r">Subscribe</button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            {/* Add your social media icons or links here */}
            <a href="#" target="_blank" rel="noopener noreferrer">
               <FaFacebookSquare  className=" w-12 h-12 hover:scale-110 transition duration-500 hover:fill-yellow-400"/>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
                <AiFillTwitterCircle className=" w-12 h-12 hover:scale-110 transition duration-500 hover:fill-yellow-400" />            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
            <BsInstagram  className=" w-12 h-12 hover:scale-110 transition duration-500 hover:fill-yellow-400"/>            </a>
          </div>
        </div>
       </article>
      </div>
    </footer>
  );
};

export default Footer;



