import { MdLanguage } from "react-icons/md"; 
import { AiOutlineHome } from "react-icons/ai" ; 


import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logingoogle from "../../componants/button/logingoogle"
//import './i18n';
import { useTranslation } from "react-i18next";
const onactive=(navlink) =>{
   if(navlink.isActive){
    return { color:"white",fill:"#fbbc05",backgroundColor:"black",transition:"2s"}
}
}

 
const Mainogin = (props) => {
    const { t, i18n } = useTranslation();
    const [lang ,setlang]=useState("en")
    const [flag ,setflag]=useState("en")

    useEffect(()=>{
        const language=i18n.language
        switch (language) {
            case "ar":
                setflag("flags/sa.png")
                break;
                case "en":
                    setflag("flags/us.png")
                    break;
                    case "fr":
                        setflag("flags/fr.png")
                        break;
            default:
                setlang("flags/en.png")
                break;
        }
       
    },[flag])


     const changelanguagetoar=()=>{i18n.changeLanguage("ar");  setflag("flags/sa.png");}
     const changelanguagetoen=()=>{i18n.changeLanguage("en");setflag("flags/us.png")}
     const changelanguagetofr=()=>{i18n.changeLanguage("fr");setflag("flags/fr.png")}
    return (
        <div className=' w-screen '>
             <section className=' flex justify-evenly bg-[#3992c9] text-[white] text-[20px] p-2'>

             <section className="group relative flex">
       <button className=" p-1 transition-all duration-500 ease-in-out hover:bg-gray-200 "> <span><img className=" w-7 h-6" src={flag} alt="" /></span><MdLanguage  className=" w-5 h-5 fill-black"/></button>
    <div className=" flex items-center w-0 group-hover:w-36 transition-all duration-500 ease-in-out  top-8 ">
        <span onClick={changelanguagetoar}><img className="w-0 group-hover:w-10 hover:scale-125 h-8 cursor-pointer" src="flags/sa.png" alt="" /></span>
        <span onClick={changelanguagetoen}><img className="w-0 group-hover:w-10 hover:scale-125 h-8 ml-1 mr-1 cursor-pointer" src="flags/us.png" alt="" /></span>
        <span onClick={changelanguagetofr}><img className="w-0 group-hover:w-10 hover:scale-125 h-8 cursor-pointer" src="flags/fr.png" alt="" /></span>
    </div>


    <NavLink  className=' no-underline text-black  mr-4 transition-all hover:text-[22px]' to='/'> <AiOutlineHome style={onactive} className=" w-8 h-8 hover:fill-[#fbbc05] " /></NavLink>

</section>




              


             <NavLink style={onactive}  className='shadow-md shadow-[#fbbf24]  pl-2 pr-2 rounded-2xl hover:text-[white]  no-underline  text-[#2b1818]  mr-4 transition-all hover:text-[22px]' to='/login'> {t("nav.login")} </NavLink>
              <NavLink style={onactive} className='shadow-md shadow-[#fbbf24]  pl-2 pr-2 rounded-2xl hover:text-[white] no-underline  text-[#181d2b]   transition-all hover:text-[22px]' to='/regester'>{t("nav.regester")} </NavLink>

              <a className=" no-underline  hover:text-[white]" href="http://localhost:8000/acount/auth/google" rel="noopener noreferrer"><Logingoogle text={t("nav.loginbygoogle")}> </Logingoogle></a>
             </section>

           



       
        </div>
    );
}

export default Mainogin;
