
import React,{ useState,useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { MdLanguage } from "react-icons/md"; 
const Togllelanguage = () => {
    const {t,i18n} =useTranslation()
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
       

<section  className="flex group fixed z-[99999999]  booton-3 left-6 p-1 m-1 rounded-full border-yellow-400 transition-all">
<button className=" p-1 transition-all duration-500 ease-in-out hover:bg-gray-200 "> <span><img className=" w-7 h-6" src={flag} alt="" /></span><MdLanguage  className=" w-5 h-5 fill-black"/></button>
<div className=" flex items-center w-0 group-hover:w-36 transition-all duration-500 ease-in-out  top-8 ">
<span onClick={changelanguagetoar}><img className="w-0 group-hover:w-10 hover:scale-125 h-8 cursor-pointer" src="flags/sa.png" alt="" /></span>
<span onClick={changelanguagetoen}><img className="w-0 group-hover:w-10 hover:scale-125 h-8 ml-1 mr-1 cursor-pointer" src="flags/us.png" alt="" /></span>
<span onClick={changelanguagetofr}><img className="w-0 group-hover:w-10 hover:scale-125 h-8 cursor-pointer" src="flags/fr.png" alt="" /></span>
</div>
</section>
    );
}

export default Togllelanguage;
