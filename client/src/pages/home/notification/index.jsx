import { BiMessageAltDetail } from "react-icons/bi"; 
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import socket from "../../dashboard/socket";
 

const Notification = (props) => {

  const [notifybox, setnotifybox]=useState([ ])
  useEffect(() => {
    const handleNewNotification = (msg) => {
      setnotifybox((prev) => [...prev, { url: "/artistprofile", msg }]);
      console.log(msg);
      props.notifycountchange(notifybox.length+1);
    };
  
    socket.on('newnotification', handleNewNotification);
  
    return () => {
      // Cleanup the event listener when the component is unmounted
      socket.off('newnotification', handleNewNotification);
    };
  }, [notifybox, props]);
  
  return (
    <>
      

      { notifybox.length>0 ? notifybox.map((notify,index)=>{
                 return (
                  <div  key={index} className=" bg-gradient-to-b from-blue-400 to-yellow-300">
                  <span><BiMessageAltDetail className=" w-5 h-5 fill-black" /></span>
                  <p>{notify.msg}</p>
                  <Link className=" font-bold no-underline" to={notify.url || "/home"}> check here </Link>
                </div>
                 )
      }): (<p className=" p-1 font-bold text-lg"> empty box notification</p>)}

    </>
  );
}

export default Notification;
