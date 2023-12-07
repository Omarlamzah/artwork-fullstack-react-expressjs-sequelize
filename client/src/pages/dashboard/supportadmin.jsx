import { TbPlugConnectedX } from "react-icons/tb";
import { VscDebugDisconnect } from "react-icons/vsc";
import { BiMessageCheck } from "react-icons/bi";
import { HiOutlineStatusOnline } from "react-icons/hi";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from "framer-motion";
import { BsFillSendFill } from 'react-icons/bs';
import { getCookie, setcookie } from "../../hookes/cookiesfun";
import swal from "sweetalert2";
import socket from "./socket";
import { FcCustomerSupport } from "react-icons/fc";

const Supportadmin = () => {
  const inputref = useRef("");
  const inputsupportref = useRef("");
  const [clientslist, setclientslist] = useState([]);
  const [boxmessage, setboxmessage] = useState([]);
  const [istyping, setistyping] = useState(false); // Define setistyping state
  const [clientselected, setclientselected] = useState("");

  const updatesupportname = useCallback(() => {
    setcookie("supportname", inputsupportref.current.value);
    swal.fire({ icon: "success", text: "your name updated successfully " });
  }, []);

  const connect = useCallback(() => {
    socket.emit("sendemailsupport", {email: getCookie("supportname") });
  }, []);

  useEffect(() => {
    const handleClientUpdate = ({ clients }) => {
      setclientslist(clients);
    };

    const handleTyping = ({ from }) => {
      console.log(from + " is typing");
      setistyping(true);
      setclientslist(prevClients => {
        return prevClients.map(client => {
          if (from === client.id) {
            return { ...client, isTyping: true };
          }
          return client;
        });
      });
    };

    const handleNotTyping = ({ from }) => {
      console.log(from + " is not typing");
      setistyping(false);
      setclientslist(prevClients => {
        return prevClients.map(client => {
          if (from === client.id) {
            return { ...client, isTyping: false };
          }
          return client;
        });
      });
    };

    const handleChatMessage = ({ message, from }) => {
      const timestamp = (Date().split(" ")[4]).slice(0, 5);
      setboxmessage(prevMessages => [...prevMessages, { from, message, timestamp, of: from }]);

      setclientslist(prevClients => {
        return prevClients.map(client => {
          if (from === client.id) {
            return { ...client, messageCount: (client.messageCount || 0) + 1 };
          }
          return client;
        });
      });

      const element = document.getElementById("sectionbox");
      element.scrollTop = element.scrollHeight;
    };

    socket.on("clientstosupport", handleClientUpdate);
    socket.on("istyping", handleTyping);
    socket.on("isnotyping", handleNotTyping);
    socket.on("chatmessage", handleChatMessage);

    return () => {
      socket.off("clientstosupport", handleClientUpdate);
      socket.off("istyping", handleTyping);
      socket.off("isnotyping", handleNotTyping);
      socket.off("chatmessage", handleChatMessage);
    };
  }, []);

  const sendmessage = useCallback(() => {
    const timestamp = (Date().split(" ")[4]).slice(0, 5);
    setboxmessage([...boxmessage, { from: "me", message: inputref.current.value, timestamp, of: clientselected.id }]);
    socket.emit("chatmessage", { to: clientselected.id, message: inputref.current.value, timestamp });
    const element = document.getElementById("sectionbox");
    element.scrollTop = element.scrollHeight;
  }, [boxmessage, clientselected.id]);

  const updateSelectedclient = useCallback((client) => {
    setclientselected(client);
  }, []);

  return (
    <div className=' flex'>
      <section className=' relative z-[999999] bg-blue-500 h-screen w-[20%] flex flex-col justify-between'>
        <div className="support flex flex-col  bg-gradient-to-r to-yellow-300  from-blue-400 p-1 ">
          <div className=" flex justify-around">
            <button className=" m-0 p-1 rounded-full bg-green-500" onClick={connect}>
              <VscDebugDisconnect className=" w-8 h-8 fill-blue-500 " />
            </button>
            <button onClick={() => { socket.disconnect() }} className=" m-0 p-1 rounded-full bg-red-500">
              <TbPlugConnectedX className=" w-8 h-8 fill-blue-500 " />
            </button>
          </div>

          {clientslist.map((client, index) => {
            const avatarText = client.email.slice(0, 2);
            const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            return (
              <motion.div onClick={() => { updateSelectedclient(client) }} whileHover={{ scale: 1.05 }} className=' hover:bg-yellow-300 hover:cursor-pointer flex bottom-1 border-yellow-300' key={client.id}>
                <div>
                  <div className="avatar   rounded-full w-14 h-14 pt-2 m-1 text-center text-[25px] font-bold" style={{ backgroundColor: randomColor }}>
                    {avatarText}
                  </div>
                </div>
                <div className="">
                  <div className=" flex justify-between w-[170px]">
                    <p className="p-0 m-0">{client.email}</p>
                    <span><HiOutlineStatusOnline className=" fill-green-500 w-8 h-8" /></span>
                    <span className="relative">
                      <BiMessageCheck className=" fill-green-500 w-8 h-8 " />
                      <span id={"messagecount" + index} className=" text-red-500 top-[-8px] font-bold  right-[-4px] absolute">
                        {client.messageCount || 0}
                      </span>
                    </span>
                  </div>
                  <span id={"istyping" + index} className=" font-bold">{client.isTyping ? "is typing ...." : ""}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className=" flex justify-center flex-col items-center">
          <input ref={inputsupportref} className=" w-full rounded-xl p-2 " placeholder="update support name" type="text" />
          <button onClick={updatesupportname} className=" w-28">update</button>
        </div>
      </section>
      <section className=' bg-yellow-300 h-screen w-[80%]'>
        <motion.article initial={{ y: "-100vh" }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
          className=' absolute w-screen h-screen bg-[#0e254996] left-0 top-0 flex justify-center items-center'>
          <section className=" rounded-3xl p-2 pt-5 h-[60vh] bg-white relative flex flex-col justify-between">
            <div id="sectionbox" className="   overflow-scroll overflow-x-hidden">
              <h4 className=" text-center pl-14 pr-14">chatbox</h4>
              {boxmessage.map((message) => {
                if (clientselected.id === message.of) {
                  if (message.from === "me") {
                    return (
                      <motion.section initial={{opacity:0}} whileInView={{opacity:1}}  className="support flex justify-between  bg-gradient-to-r to-yellow-300  from-blue-400 p-1 " key={message.timestamp}>
                        <FcCustomerSupport className=' w-10 h-10 transform' />
                        <div className=" flex flex-col ">
                          <p>{message.message} </p><span className=" font-bold">{message.timestamp}</span>
                        </div>
                      </motion.section>
                    );
                  } else {
                    return ( 
                      <motion.section initial={{opacity:0}} whileInView={{opacity:1}}  className="support flex justify-between flex-row-reverse  bg-gradient-to-r from-yellow-300  to-blue-400 p-1 " key={message.timestamp}>
                        <img className=' w-12  rounded-full' src="http://localhost:8000/profile/unkownavatart.jpg" alt="" srcset="" />
                        <div className=" flex flex-col ">
                          <p>{message.message} </p><span className=" font-bold">{message.timestamp}</span>
                        </div>
                      </motion.section>
                    );
                  }
                }
                return null;
              })}
            </div>
            <div className=" flex items-center">
              <input className=" p-2 rounded-full outline-none border-blue-500 border-2 hover:border-yellow-400 w-full" placeholder="send him..." ref={inputref} type="text" />
              <span className=" cursor-pointer"> <BsFillSendFill onClick={sendmessage} className=" fill-blue-500 hover:fill-yellow-400 w-7 h-7" /> </span>
            </div>
          </section>
        </motion.article>
      </section>
    </div>
  );
};

export default Supportadmin;
