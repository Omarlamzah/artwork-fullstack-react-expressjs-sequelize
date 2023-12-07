import { AiFillPicture } from "react-icons/ai"; 
import { AiOutlineClose } from "react-icons/ai"; 
import {React,useEffect,useState} from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { creatework } from "../../../store/slices/artistProfile/slice";
import { getCookie } from "../../../hookes/cookiesfun";
import { useTranslation } from "react-i18next";



export default function Modal(props) {

  const {t, i18n} =useTranslation()

    const [img1 ,setimag1]=useState("");
    const [img2 ,setimag2]=useState("");
    const [img3 ,setimag3]=useState("");
    const [name,setname]=useState("");
    const [desc,setdesc]=useState("");
    const [price,setprice]=useState("");
    const [oldprice,setpoldrice]=useState("");


    const [catego,setcatego]=useState("");
    const [formData,setFormData]=useState(new FormData())
    const dispatch =useDispatch()
    

  

const loadimag1=(e)=>{
  const file = e.target.files[0];
  const fileReader = new FileReader()
  
 fileReader.onloadend=()=>{
            setimag1(fileReader.result)
            formData.append("img1",file);
 }
 fileReader.readAsDataURL(file)
}
const loadimag2=(e)=>{
    const file = e.target.files[0];
    const fileReader = new FileReader()
    
   fileReader.onloadend=()=>{
              setimag2(fileReader.result)
              formData.append("img2",file);
   }
   fileReader.readAsDataURL(file)

}

const loadimag3=(e)=>{
    const file = e.target.files[0];
    const fileReader = new FileReader()
   fileReader.onloadend=()=>{
              setimag3(fileReader.result)
              formData.append("img3",file);
   }
   fileReader.readAsDataURL(file)

}


useEffect(()=>{
  console.log(i18n.language)
 

},[])


const newArtWorkpost=()=>{
const token = getCookie("usertoken");
console.log({token,name,desc,catego})
formData.append("token",token)
formData.append("name",name)
formData.append("desc",desc)
formData.append("catego",catego)
formData.append("price" ,price)
formData.append("oldprice",oldprice)
dispatch(creatework(formData)) 

 }
  return (
    <>
    
          <div
       
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                
                <div className="flex items-start justify-between border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                   {t("creatework")}
                  </h3>
                  
                </div>
                {/*body*/}

             
                <div className="relative p-6">
              
              <section >
              <div  className={`flex ${ i18n.language=="ar" ? " flex-row-reverse" : " flex-row"}   justify-between border-yellow-300 border-2 rounded-lg m-2 p-1`}> <label className=" pr-2" htmlFor="name">{t("namework")}</label> <input onChange={(e)=>{setname(e.target.value)}} className=" outline-none p-1 rounded-3xl focus:shadow-lg shadow-gray-900"  id="name" type="text" /></div>
                <div className={`flex ${ i18n.language=="ar" ? " flex-row-reverse" : " flex-row"}   justify-between border-yellow-300 border-2 rounded-lg m-2 p-1`}> <label htmlFor="desc">{t("desc")}</label> <textarea rows={5} onChange={(e)=>{setdesc(e.target.value)}} className=" border-solid border-blue-500 border-2 p-1 rounded-3xl focus:shadow-lg shadow-gray-900"   id="desc" type="text" > </textarea></div>
                <div  className={`flex ${ i18n.language=="ar" ? " flex-row-reverse" : " flex-row"}   justify-between border-yellow-300 border-2 rounded-lg m-2 p-1`}> <label className=" pr-2" htmlFor="name">{t("price")}</label> <input onChange={(e)=>{setprice(e.target.value)}} className=" outline-none p-1 rounded-3xl focus:shadow-lg shadow-gray-900"  id="name" type="text" /></div>
                <div  className={`flex ${ i18n.language=="ar" ? " flex-row-reverse" : " flex-row"}   justify-between border-yellow-300 border-2 rounded-lg m-2 p-1`}> <label className=" pr-2" htmlFor="name">{t("oldprice")}</label> <input onChange={(e)=>{setpoldrice(e.target.value)}} className=" outline-none p-1 rounded-3xl focus:shadow-lg shadow-gray-900"  id="name" type="text" /></div>

                <div className={`flex ${ i18n.language=="ar" ? " flex-row-reverse" : " flex-row"}   justify-between border-yellow-300 border-2 rounded-lg m-2 p-1`}> <label htmlFor="name">{t("cate")}</label><Select onChange={(e)=>{setcatego(e.value)}} className=" outline-none p-1 rounded-3xl focus:shadow-lg shadow-gray-900" options={[{value:"2",label:"category one"},{value:"2",label:"category tow"},{value:"3",label:"category three"}]}></Select></div>
 


              </section>

              <section className=" flex justify-between">
                <div><label className=" border-dashed border-3 rounded-full h-20 w-20 border-yellow-500 bg-black hover:cursor-pointer hover:border-solid hover:border-black hover:bg-white transition " htmlFor="file1"><AiFillPicture className="   h-10 fill-yellow-400 w-full mt-3 " /> 1</label><input className=" hidden" onChange={loadimag1}  type="file" name="" id="file1" /></div>
                <div><label className=" border-dashed border-3 rounded-full h-20 w-20 border-yellow-500 bg-black hover:cursor-pointer hover:border-solid hover:border-black hover:bg-white transition " htmlFor="file2"><AiFillPicture className="   h-10 fill-yellow-400 w-full mt-3 " /> 2</label><input className=" hidden" onChange={loadimag2}  type="file" name="" id="file2" /></div>
                <div><label className=" border-dashed border-3 rounded-full h-20 w-20 border-yellow-500 bg-black hover:cursor-pointer hover:border-solid hover:border-black hover:bg-white transition " htmlFor="file3"><AiFillPicture className="   h-10 fill-yellow-400 w-full mt-3 " /> 3</label><input className=" hidden" onChange={loadimag3}  type="file" name="" id="file3" /></div>
              </section>



              <section className=" flex justify-between">
                <div className=" rounded-full h-full w-20"> <img className=" w-full" src={img1} alt="" srcset="" /></div>
                <div className=" rounded-full h-full w-20"> <img className=" w-full" src={img2} alt="" srcset="" /></div>
                <div className=" rounded-full h-full w-20"> <img className=" w-full" src={img3} alt="" srcset="" /></div>
              </section>
                </div> 
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 r classounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=>{props.closeOrOpenModel(false)}}
                  >
                    {t("close")}
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={newArtWorkpost}
                  >
                   {t("upload")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      
    </>
  );
}