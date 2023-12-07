import React, { useEffect } from "react";
import { Link, useNavigate,Navigate } from "react-router-dom";
import Navbarhome from "./navbarhome";
import { useSelector } from "react-redux";
import Login from "../login/login";
import { getCookie } from "../../hookes/cookiesfun";
import Chatsupport from "./chatsupport";
import Mainbody from "./mainbody";
import Footer from "../../componants/Footer/Footer";
import ContactForm from "../../componants/contactus/ContactForm";
import Scrolltotop from "../../componants/scrolltotop/scrolltotop";

const Home = () => {
 
  const { isAuthenticated } = useSelector((state) => {
    return state.loginslice;
  });
  const isLogin = getCookie("islogin");
  if (!isLogin && !isAuthenticated) {
 
    return <Navigate to="/login" />;

  }
  return (
    <div>
      <Navbarhome />
      <Chatsupport />
      <Mainbody />
      <ContactForm />
      <Footer />
      <Scrolltotop />
    </div>
  );
};

export default Home;
