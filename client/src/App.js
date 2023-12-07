import { Provider  } from "react-redux";
import "./App.css";

import Store from "./store/store"
import { useEffect, useState } from "react";
import Preloaiding from "./componants/preloading"

import { BrowserRouter, Routes,Route, useLocation} from "react-router-dom";
import Home from "./pages/home";
import Regester from "./pages/login/regester";
import Login from "./pages/login/login";
import Resetpassword from "./pages/login/resetpassword";
import Artistprofile from "./pages/artistProfile";
import './i18n';
import {motion,AnimatePresence }from "framer-motion"
import Dashboard from "./pages/dashboard";
import Sendnotification from "./pages/dashboard/sendnotification";
import CommentComponent from "./pages/comment/comment";
import ShoppingComponent from "./pages/shoping";
 

function App() {
  const [isloading,setisloading]=useState(true);
   const location =useLocation()
  useEffect(()=>{
    console.log(isloading)
 setTimeout(() => {
   setisloading(false);
  console.log(isloading)
 }, 500);

  },[isloading])
  return (
    <div className="App">
      
   

       
      {isloading ? < Preloaiding/> : 
      <>


 <Provider store={Store}>
     
      
    

       <Routes  key={location.pathname} location={location }>
                    <Route path='/' element={
                    <div>
            <motion.div 
  initial={{ height: "100vh" }} 
  animate={{ height:0 }} 
  transition={{ duration: 1.2 }}  
   className=" bg-[url('assets/bg/wave.svg')] bg-[size:25%]  absolute h-screen w-screen z-[999999999999999999]"
>
</motion.div>
                       <Home/>
                       </div>
                    }>

                    </Route> 
                    <Route path='/regester'
                     element={<div> <motion.div initial={{height:"100vh"}} animate={{height:0}} transition={{duration:1}} className="  bg-[url('assets/bg/wave.svg')] bg-[size:25%]  absolute h-0 bg-yellow-400  w-screen z-[999999999999999999]">  </motion.div> <Regester/></div>  }> </Route>
                    <Route path='/login' element={<div >  <motion.div initial={{height:"100vh"}} animate={{height:0}} transition={{duration:1}} className=" bg-[url('assets/bg/wave.svg')] bg-[size:25%]  absolute h- bg-green-500 w-screen z-[999999999999999999]">  </motion.div> <Login/></div>}></Route>
                    <Route path='/resetpassword' element={ <Resetpassword/>}></Route>
                    <Route path='/artistprofile' element={ <Artistprofile/>}></Route>
                    <Route path="/artistprofile/:token" element={<Artistprofile />} />
                    <Route path="/shopping" element={<ShoppingComponent />} />
                    <Route path="/Login/:userwithtokenencode" element={<Login />} />


                    <Route path='/dashboard' element={ <div><Dashboard/><motion.div initial={{height:"100vh"}} animate={{height:0}} transition={{duration:1}} className="  bg-[url('assets/bg/wave.svg')] bg-[size:25%]  absolute h-0 bg-yellow-400  w-screen z-[999999999999999999]">  </motion.div></div> }></Route>
                   <Route path="/notification" element={ <div><motion.div initial={{height:"100vh"}} animate={{height:0}} transition={{duration:1}} className="  bg-[url('assets/bg/wave.svg')] bg-[size:25%]  absolute h-0 bg-yellow-400  w-screen z-[999999999999999999]">  </motion.div>  <Sendnotification/></div>}></Route>
                    <Route path="/comments/:artworkid" element={<CommentComponent />} />

                    


 

                    
                    </Routes>
       
       

       </Provider>
      


      </>
     }
      



    
    </div>
  );
}

export default App;
