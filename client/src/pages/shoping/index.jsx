import { BsPaypal } from "react-icons/bs"; 
 import { FaCcPaypal } from "react-icons/fa"; 
import { BiArrowFromRight, BiTrash } from "react-icons/bi";
import React, { useEffect, useState } from 'react';
import { getProducts, deleteProductByid } from "../../store/slices/shoping/slice";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../hookes/cookiesfun";
import SimpleImageSlider from "react-simple-image-slider";
import { motion } from "framer-motion";
import Paymentbutton from "../../componants/paypalbutton/paypalbutton";
import 'react-responsive-modal/styles.css';
import {Modal} from "react-responsive-modal";
import Invoice from "../home/invoice";
import { useNavigate } from "react-router-dom";
  
const ShoppingComponent = () => {
  const dispatch = useDispatch()
  const navigate= useNavigate()
  const { products, totalprice, isloading } = useSelector((state) => state.shopingslice);
  const [payshow,stpayshow]=useState(false)
  const [showinvoice,setshowinvoice]=useState(false)

   
  const checkout = () => {
    stpayshow(true)
  };

  useEffect(() => {
     dispatch(getProducts({ userid: parseInt(getCookie("userid")) }));
  }, [dispatch]);

  const removeProduct = (artworkid) => {
    dispatch(deleteProductByid({ artworkid, userid: parseInt(getCookie("userid")) }));
  };

  const formatImageUrl = (urls) => {
    return urls.map((img) => ({ url: `http://localhost:8000/${img.url}` }));
  };


  const hundelinvoiceOpen=()=>{
    setshowinvoice(true)
  }

  const hundelinvoiceClose=()=>{
    setshowinvoice(false)
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
     <div className=" flex justify-between">
     <button className=" p-1   bg-yellow-400 rounded-full m-1" onClick={() => navigate(-1)}>
           <BiArrowFromRight  className=" fill-blue-700 h-10 w-10"/>
          </button>
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
     </div>
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products &&
          products.map((product) => (
            <div key={product.id} className="group bg-white p-6 rounded-md shadow-md transition-transform transform hover:scale-105">
              <div className="mb-4">
                {product.media_of_artwork && product.media_of_artwork.length > 0 ? (
                  <SimpleImageSlider
                    width={250}
                    height={254}
                    images={formatImageUrl(product.media_of_artwork)}
                    showBullets={product.media_of_artwork.length > 1}
                    showNavs={product.media_of_artwork.length > 1}
                  />
                ) : (
                  <p className="text-center text-gray-500">No images available</p>
                )}
              </div>
              <p className="text-lg font-bold mb-2">{product.name}</p>
              <p className="text-gray-600">${product.price}</p>
              <button
                className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
                onClick={() => {
                  removeProduct(product.id);
                }}
              >
                <BiTrash />
              </button>
            </div>
          ))}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {products.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul>{/* Render your cart items here */}</ul>
        )}
        <div className="mt-4">
      <div className=" flex ">
      <FaCcPaypal className=" fill-blue-600 w-10 h-10" />
          <p className="font-bold p-2">Total: ${totalprice}</p>
      </div>
           <button
            className="mt-2  bg-blue-700  hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition-colors"
            onClick={checkout}
          >
           <BsPaypal  className=" fill-white-600 w-6 h-6"  />
            Checkout
          </button>
              
            <Modal  open={payshow} onClose={ ()=>{stpayshow(false)}}>
          <h3 className=" p-3">  shoose the best way to pay </h3>
              
              <Paymentbutton hundelinvoiceOpen={hundelinvoiceOpen} totalprice={totalprice} />
           
            </Modal > 
            
           {

<Modal  open={showinvoice} onClose={ ()=>{setshowinvoice(false)}}>
     
<Invoice products={products} totalprice={totalprice}></Invoice>
 
  </Modal > 
           }
 
 
        </div>
      </div>
    </div>
  );
};

export default ShoppingComponent;
