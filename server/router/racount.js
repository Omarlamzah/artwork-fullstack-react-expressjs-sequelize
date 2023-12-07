const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const passport = require("passport");
const  {isLoggedIn_Mid,logout_Mid} =require("../controller/middleware/acountmidlleware");
const  inputValidatoMidl =require("../controller/middleware/inputvalidate");


router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
router.get('/auth/google' , userController.registerByGoogle);
router.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, userwithtoken) => {
    if (err) {return next(err);}
    if (!userwithtoken) {
      res.status(404).json({"message":"error to find user"})
    }


    res.redirect("http://localhost:3000/Login/" + encodeURIComponent(JSON.stringify(userwithtoken)));

    console.log(userwithtoken)
    res.status(200).json(userwithtoken);
  })
  (req, res, next);
});
router.post('/login', userController.login);
 router.post('/regester',userController.regester);
router.post('/reset',  inputValidatoMidl,userController.forgetPassword);
router.post('/restorepass',  inputValidatoMidl,userController.updatePassword);
router.get ("/isloged",isLoggedIn_Mid);
router.get('/logout', (req, res) => {logout_Mid (req,res)});
module.exports = router;