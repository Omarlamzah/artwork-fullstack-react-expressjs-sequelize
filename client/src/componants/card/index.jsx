import { MdAddShoppingCart } from "react-icons/md"; 
import { BiTrash } from "react-icons/bi"; 
import { MdFavorite } from "react-icons/md"; 
import { MdFavoriteBorder } from "react-icons/md"; 

import React, { useRef, useState, useEffect } from 'react';
import { BsShareFill } from 'react-icons/bs';
import SimpleImageSlider from "react-simple-image-slider";
import ReactReadMoreReadLess from  "react-read-more-read-less";



import './css.css';
import { getCookie } from "../../hookes/cookiesfun";
import { Link } from "react-router-dom";

const Card = (props) => {
  const [imagesartis,setimagesartis]=useState(props.imagesartis)

 useEffect(()=>{
 

 })


 const shareProfileLink = async () => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: 'Your Profile',
        text: 'Check out my profile!',
        url: `http://localhost:3000/artistprofile?token${getCookie("usertoken")}`
      });
    } else {
      // Fallback for browsers that do not support Web Share API
      console.log('Web Share API is not supported on this browser.');
      // You can provide an alternative sharing mechanism here, like a modal with copy-to-clipboard functionality.
    }
  } catch (error) {
    console.error('Error sharing profile link:', error.message);
  }
};




 if(true) {

  

  return (
   
    <div className="card w-full bg-blue-500 " >



      <div className="top-section">
        <div className="border"></div>
        <div className="icons">
        <div className="logo w-[40%] text-white pt-[2px] ">

           { (props.createdAt).split("T")[0] }

          </div>
          <div className="social-media w-[25%] p-0 m-0 pt-1">
          <div className="logo  m-0 p-0 w-full flex justify-between gap-2 ">
           
           <div> {
            props.isowner ? (            <BiTrash onClick={()=>{props.removeWorkclick(props.id)}} className=" fill-red-700 w-6 h-6 cursor-pointer" />
            ): ""
            }
            </div>
           <div className=" flex ">
            < BsShareFill onClick={shareProfileLink} className=" fill-green-600 w-6 h-6 cursor-pointer" /> 
              < MdFavoriteBorder className=" cursor-pointer fill-red-800 w-6 h-6" />
           < MdFavorite  className=" fill-white w-6 h-6 hidden"/></div>
          </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">

    
 
      <SimpleImageSlider
  width={300}
  height={304}
  images={imagesartis.length > 0 ? imagesartis : [{"url": "asste/profile/error.png"}]}
  showBullets={imagesartis.length >1 ? true :false}
  showNavs={imagesartis.length > 1 ? true :false}
></SimpleImageSlider>

 

    
    
     
      </div>
      <div className="bottom-section">
        <span className="title">{props.name}</span>
        <div className=" text-white">  
         <ReactReadMoreReadLess 
                
                charLimit={80}
                readMoreText={"Read more ▼"}
                readLessText={"Read less ▲"}
                
            >
             {props.desc}
            </ReactReadMoreReadLess> </div>
        <div className="row row1">
          <div className="item">
            <span className=" text-yellow-400 no-underline font-bold text-base regular-text big-text">{props.Commentcount}</span>
            <span className="  text-yellow-400 no-underline font-bold   text-[17px] regular-text">
               <Link className="   text-yellow-400 no-underline font-bold  regular-text  " to={`/comments/${props.artworkid}`}>comments</Link>

              </span>
          </div>
          
          <div  onClick={()=>{props.openpanel({ artworkid:parseInt(props.artworkid),desc:props.desc, name:props.name,isowner:props.isowner, price:props.price, oldprice:props.oldprice})}} className=" animate-pulse item flex flex-col items-center justify-center  text-yellow-400    regular-text hover:cursor-pointer">
               <span className=" animate-bounce">  <MdAddShoppingCart className=" fill-yellow-400 w-5 h-5" /></span>
                                  
               <span className=" text-yellow-400 font-bold text-base">buy now</span> 
                <div className=" flex gap-2"> <span className=" font-bold text-[25px] text-white ">{props.price}$</span><span className=" line-through text-red-600 font-bold">{props.oldprice}$</span></div>
            </div>

 
            <div className="item">
            <span className=" text-yellow-400 no-underline font-bold text-base regular-text big-text">87%</span>
            <span className=" text-yellow-400 no-underline font-bold text-base regular-text regular-text">views</span>
          </div>
        </div>
      </div>
    </div>
  );
 }

};

export default Card;
