import { FaShareSquare } from "react-icons/fa"; 
import { BiHome } from "react-icons/bi"; 
import { AiFillPlusSquare } from "react-icons/ai"; 
import { BsSend } from "react-icons/bs"; 
import { BiArrowFromTop } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { AiOutlinePicture } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import { getProfileuser, getworksartist, updateProfile ,removeWork } from "../../store/slices/artistProfile/slice";
import { updateWorkRemoved,updateWorkAdded,updateUsedUpdated,updateWorkUpdated} from "../../store/slices/artistProfile/slice";
import { getCookie } from "../../hookes/cookiesfun";
import Select from "react-select";
import { getallcountries, getallcities } from "../../hookes/getcountr_city";
import Card from "../../componants/card";
import $ from "jquery"
import "./css.css"
import Loading from "../../componants/loading";
import { motion ,scroll,useInView, } from "framer-motion";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import Creatework from "./creatework";
import { useNavigate, useParams } from "react-router-dom";
import Togllelanguage from "../../componants/togllelang";
import ScrollToTop from "../../componants/scrolltotop/scrolltotop";
import userpicunkown from '../../assets/bg/unkownavatart.jpg';
import { string } from "yup";


function ProfileComponent() { 
  const {t, i18n}=useTranslation()
  const dispatch = useDispatch();
  const { userand_profile, worksartist, isLoading, workremoved,workadded, usedupdated, workupdated} = useSelector((state) => state.profileclice);

  const {isauthenticated} = useSelector((state) => state.loginslice);


  scroll((to)=>{setshowTotop(to)})
  
  const [countries, setCounties] = useState(getallcountries());
  const [cities, setcities] = useState("");

  const [imgflag, setimgflag] = useState("");
  const [imagesartis, setimagesartis] = useState(null);
  //user state
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [biography, setbiography] = useState("");
  const [country, setCountry] = useState();
  const [city, setcity] = useState("");
  const [countrycode, setcountrycode] = useState("");
  const [userpic, setuserpic] = useState("");
   const  [profileIsShared,setprofileIsShared]=useState(false);
 // const formData= new FormData();

 const [showTotop,setshowTotop]=useState(0)
 const [showModal, setShowModal] = useState("");
 const navigate = useNavigate()
 
  const [formData, setFormData] = useState(new FormData());
  const {token}= useParams()
  
  

  useEffect(() => {
     if (workremoved) {
      Swal.fire({ icon: "success", text: "Your work removed successfully" })
        .then(() => {
          // Reset the workremoved flag after displaying the Swal
          updateWorkRemoved(false);
        });
    }
  
    if (workadded) {
      Swal.fire({ icon: "success", text: "Your work created successfully" })
        .then(() => {
          // Reset the workadded flag after displaying the Swal
          updateWorkAdded(false);
        });
    }
  
    if (workupdated) {
      Swal.fire({ icon: "success", text: "Your work updated successfully" })
        .then(() => {
          // Reset the workupdated flag after displaying the Swal
          updateUsedUpdated(false);
        });
    }
  }, [workremoved, workadded, workupdated]);
  


  //user state

  useEffect (()=>{
    token ? setprofileIsShared(true): setprofileIsShared(false)
  },[])

  useEffect(() => {
     var tokenuser 

    if(token){
      tokenuser=token
    }
    else{
      tokenuser=getCookie("usertoken")
    }

    if(!isauthenticated && !getCookie("islogin") && !tokenuser   ) {
     
      navigate("/login")
    }
    else{

      dispatch(getProfileuser(tokenuser));
      dispatch(getworksartist(tokenuser));

    }
  }, []); 

  useEffect(() => {
    if (userand_profile && userand_profile.user) {
      setimgflag("flags/" + userand_profile.user.countrycode + ".png");
      setfullname(userand_profile.user.firstName + " " + userand_profile.user.lastName);
      setemail(userand_profile.user.email);
      setphonenumber(userand_profile.user.phonenumber);
      setbiography(userand_profile.artist.biography);
  
      if (userand_profile.user.pic && userand_profile.user.pic.includes("http")) {
        setuserpic(userand_profile.user.pic);
       } else {
         setuserpic("http://localhost:8000" + (userand_profile.user.pic || ""));
      }
  
      setimagesartis(null);
      setCountry({
        value: userand_profile.user.country,
        label: userand_profile.user.country,
      });
      setcity({
        value: userand_profile.user.city,
        label: userand_profile.user.city,
      });
    }
  }, [userand_profile]);
  
  const ChangeCountry = (e) => {
    const counttrycode = e.value.split("_")[1];
    setCountry(e);
    setcities(getallcities(counttrycode));
    setimgflag("flags/" + counttrycode+ ".png");
    console.log(getallcities(counttrycode))
    setcountrycode(counttrycode)
   
  };

 
  const toglediting=()=>{$("#editingarticl").toggle(400) }


  

  const readimageprofile =(e)=>{
    formData.delete("pic"); 
  const file=e.target.files[0]
 const reader= new FileReader()
if (file) {
    formData.append("pic",file);
    reader.onloadend = () => {
    setimagesartis(reader.result);
      
  };
 reader.readAsDataURL(file);
}
  }

  const postToupdateuser=()=>{

formData.append('token', getCookie('usertoken'));
formData.append('biography', biography);
formData.append('email', email);
formData.append('phonenumber', phonenumber);
formData.append('fullname', fullname);
formData.append('countrycode', countrycode);
formData.append('city', city.value);
formData.append('country', country.value.split("_")[0]);
console.log(countrycode)
dispatch(updateProfile(formData))

formData.delete("token");
formData.delete("email");
formData.delete("phonenumber");
formData.delete("fullname");
formData.delete("countrycode"); 
formData.delete("city"); 
formData.delete("country"); 
formData.delete("pic"); 
setimagesartis(null)


}


const removeWorkclick=(id)=>{
  const token = getCookie("usertoken")
  Swal.fire({icon:"warning",title:"delete work",showCancelButton:true}).then((resalut)=>{
    if(resalut.isConfirmed){
      dispatch(removeWork({token,id}))
    
    }
  })
//
}
const closeOrOpenModel=(closeOropen)=>{
setShowModal(closeOropen);

}

const ref = useRef(null)
const  isinview  = useInView(ref,{once:true})

useEffect(()=>{
  
 

},
[isinview])


// share profile 
const shareProfileLink = async () => {
  try {
    const tokenuser = getCookie("usertoken") || token ; 
    if (navigator.share) {
      await navigator.share({
        title: 'Your Profile',
        text: 'Check out my profile!',
        url: `http://localhost:3000/artistprofile/${tokenuser}`
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
// share profile 
  return (
    <div className="bg-[#f5f8fc] w-screen h-screen p-3">
             <ScrollToTop/>
      {isLoading ? (
        < Loading/>
        
      ) : (
        <div ref={ref} id="topsection">
          {showModal ? ( <Creatework closeOrOpenModel={(tof)=>{closeOrOpenModel(tof)}}/>) : null}
       
          <motion.section 
          

          initial={{ opacity: 0, scale: 0.5 ,height:0}}
          animate={{ opacity: 1, scale: 1,height:"100%" }}
          transition={{
            duration:4,  
            delay: 0,
            ease: [0, 0.71, 0.2, 1.01]
          }}
          
          className=" flex flex-col md:flex-row ">
            <article   className="relative pt-10 pb-10 w-[98%] m-auto lg:w-[95%] bg-[#2f90cc] text-white rounded-2xl flex justify-center flex-col items-center">
             

             <article className=" flex flex-col items-center">
                  <div className=" top-2 absolute ml-7">             <Togllelanguage />  </div>
                <button onClick={()=>{closeOrOpenModel(true)}} className={` ${ profileIsShared ? "hidden" : ""}  group absolute top-28 left-1 p-1 m-1 rounded-full border-yellow-400`}>
               <span className="text-[0px] group-hover:text-[20px] transition-all duration-500"> {t("creatework")}</span> 
                  <AiFillPlusSquare className=" w-8 h-8   hover:file:bg-yellow-700 hover:cursor-pointer fill-yellow-400"/>
                  </button>

                                <button onClick={() => { navigate("/") }} className="group absolute top-16 left-1 p-1 m-1 rounded-full border-yellow-400 transition-all">
                <span className=" text-[0px] group-hover:text-[20px] transition-all duration-500">{t("home")}</span>
                <BiHome className="w-8 h-8 hover:fill:bg-yellow-700 hover:cursor-pointer fill-yellow-400" />
              </button>

                      
             
             <button   onClick={toglediting} className={` ${ profileIsShared ? "hidden" : "flex"}  group    absolute top-40 left-1 p-1 m-1 rounded-full border-yellow-400`}> 
             <span className="text-[0px] group-hover:text-[20px] transition-all duration-500">{t("profile.update")}</span>
                <BiEditAlt className=" w-8 h-8    hover:file:bg-yellow-700 hover:cursor-pointer fill-yellow-400"></BiEditAlt>{" "}
              </button >


              <button   onClick={shareProfileLink} className={` ${ profileIsShared ? " top-28" : " top-52"} group     absolute  left-1 p-1 m-1 rounded-full border-yellow-400`}> 
             <span className="text-[0px] group-hover:text-[20px] transition-all duration-500">{t("profile.share")}</span>
                <FaShareSquare className=" w-8 h-8    hover:file:bg-yellow-700 hover:cursor-pointer fill-yellow-400"></FaShareSquare>{" "}
              </button >
             

              <div className={` w-40 relative flex justify-center`}>
                <motion.img   initial={{ opacity: 0, scale: 0.5 }}   animate={{ opacity: 1, scale: 1 }}transition={{  duration: 2,     delay: 0.3,  ease: [0, 0.71, 0.2, 1.01]}} className="w-full  border-2 rounded-full" 
                
                src= { imagesartis==null ? userpic : userpicunkown }  alt=""    />
             
               
              </div>
              <div className=" flex gap-2 "> 
                <motion.p className=" font-bold text-lg bg-gradient-to-r from-yellow-600 to-yellow-300 text-transparent bg-clip-text" initial={{opacity:0}} animate={{opacity:1}}  transition={{duration :1, delay :1}}> {fullname} </motion.p>

                <motion.img initial={{opacity:0}} animate={{opacity:1}}  transition={{duration :1, delay :1.2}} className=" w-8 h-6" src={imgflag} alt="" />
              </div>
              

              <motion.div initial={{opacity:0}} animate={{opacity:1}}  transition={{duration :1, delay :1.3}} className=" flex items-center text-yellow-400">
                {userand_profile.artist && userand_profile.artist.fivestart}
                <AiFillStar className=" fill-yellow-500" />
              </motion.div>
              <motion.div className=" font-bold  " initial={{opacity:0}} animate={{opacity:1}}  transition={{duration :1, delay :1.4}}> {email}</motion.div>
              <motion.div initial={{opacity:0}} animate={{opacity:1}}  transition={{duration :1, delay :1.5}}>
                { phonenumber}
              </motion.div>

                         <motion.span  initial={{opacity:0}} animate={{opacity:1}}  transition={{duration :1, delay :1.6}}>  {" "} <span className=" text-yellow-400 font-bold">{t("profile.createat")} </span> <br /> {userand_profile.user &&  userand_profile.user.createdAt.split("T")[0]}</motion.span>
                          <motion.span initial={{opacity:0}} animate={{opacity:1}}  transition={{duration :1, delay :1.7}}>{" "} <span className=" text-yellow-400 font-bold">{t("profile.updateat")}</span>  <br />{userand_profile.user &&  userand_profile.user.updatedAt.split("T")[0]} </motion.span>
              
         
         

             </article>
      
          
            </article>



            <article id="editingarticl" className=" hidden pl-3 pr-3 relative bg-[#facc15] border-l-4 border-blue-500 rounded-2xl flex flex-col justify-center items-center">
        
        
        <div className=" flex flex-col w-full items-center">
          
        <label htmlFor="imgprofile"> <AiOutlinePicture className=" cursor-pointer fill-black w-11 h-11  rounded-full border-2 border-green-900 p-2 "></AiOutlinePicture> </label>
                 <input onChange={readimageprofile} className=" hidden" type="file" name="imgprofile" id="imgprofile" />
 
                 {imagesartis && <img className=" rounded-full border-2 w-36" src={imagesartis} alt="Uploaded" style={{ maxWidth: '100%' }} />}
 
 
        </div>
               <input
                 className=" w-[80%] mb-2 focus:border-yellow-400 border-blue-500 rounded-md p-2"
                 type="text"
                value=  {fullname}
                onChange={(e)=>{setfullname(e.target.value)}}
 
               />
               <input
                 className=" w-[80%] mb-2 rounded-md p-2 focus:border-yellow-400 border-blue-500"
                 type="text"
                value={email}
                onChange={(e)=>{setemail(e.target.value)}}
 
               />
               <input
                 className=" w-[80%] mb-2 rounded-md p-2 focus:border-yellow-400 border-blue-500"
                 type="text"
                value=  {phonenumber}
                onChange={(e)=>{setphonenumber(e.target.value)}}
               />
 
               <Select
                 className=" w-[83%] rounded-md p-2 focus:border-yellow-400 border-blue-500"
                 value={country}
                 options={countries}
                 onChange={ChangeCountry}
               />
               <div className=" flex items-center w-[85%] rounded-md p-2 focus:border-yellow-400 border-blue-500">
                 <img className=" w-9 h-7" src={imgflag} alt="" srcset="" />
                 <Select
                   className=" w-[90%]  rounded-md p-2"
                  value={city}
                   options={cities}
                   onChange={(e) => {
                     setcity(e);
                   }}
                 />
               </div>
               <textarea 
                 name=""
                 id=""
                 className=" rounded-2xl mb-12 w-[90%] border-[#3e3e78] border-[3px] border-[dotted] focus:border-yellow-400 border-blue-500"
                 rows="3"
                 value={biography}
                 onChange={(e)=>{setbiography(e.target.value)}}
               >
      
           
               </textarea>
 
               
               <button  onClick={postToupdateuser} className=" absolute bottom-0 right-0 text-white bg-[#2f90cc] rounded-full" ><BsSend className=" w-8 h-8 hover:cursor-pointer fill-[#ffffff]"> </BsSend> {t("profile.update")}</button> 
             
             </article>

          
          </motion.section>

          <motion.div 
          initial={{right:"-100%"}}  
          animate={{right:"0%"}}
          transition={{duration:2}} 

          className=" relative flex justify-center  w-screen h-5 bg-cyan-600 text-center text-white mb-3 mt-2 pt-[8px] pb-[30px]">
            
            <BiArrowFromTop className="  fill-yellow-500 w-6 h-6" />
            <span className=" font-bold text-lg bg-gradient-to-r from-yellow-600 to-yellow-300 text-transparent bg-clip-text h-6"> your works here</span>
           
            <BiArrowFromTop className="  fill-yellow-500 w-6 h-6" />
          </motion.div>

          <section className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {
              
            Object.values(worksartist).map((artwork,index) => {
              const pics = [];
             
              // Check if artwork.media_of_artwork exists and is an array
              if ( artwork.media_of_artwork && Array.isArray(artwork.media_of_artwork)) {
                artwork.media_of_artwork.forEach((img) => {
                  pics.push({ url: "http://localhost:8000/"+img.url });
               
                });
               
                return (
                  <motion.div  
                  initial={{ opacity: 0,transform:"rotateY(90deg)" }}
                  animate={{ opacity: 1,transform:"rotateY(0deg)"  }}
                  transition={{
                    duration: 2,   // here is the problem 
                //   delay: index/4,
                   // ease: [0, 0.71, 0.2, 1.01]
                  }}>
                     <Card
                     isowner={true} 
                     price={artwork.price}
                     oldprice={artwork.oldprice}   
                     Commentcount={artwork.comments_of_artwork.length}
                      artworkid={artwork.id}
                    createdAt={artwork.createdAt}
                    key={artwork.id}
                    name={artwork.name}
                    desc={artwork.desc}
                    imagesartis={pics} // Use the flattened array directly
                    photos={null}
                    
                    id={artwork.id}
                    removeWorkclick={(id)=>{removeWorkclick(id)}}
                  ></Card>

                  </motion.div>
                 
                );
              }

              // Handle the case where artwork.media_of_artwork is missing or not an array
              // You can display an error message or take appropriate action.
            })}
          </section>
        </div>
      )}


      
    </div>
  );
}

export default ProfileComponent;
