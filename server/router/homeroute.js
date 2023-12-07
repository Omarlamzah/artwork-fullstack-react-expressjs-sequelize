const express = require('express');
const router = express.Router()
const homeController= require("../controller/homeController")

 

router.post("/getworks", homeController.getworks);
router.get("/allusers", homeController.getallusers);
router.post("/posttonotification", homeController.posttonotification);
router.post("/subscribe", homeController.subscribe);
router.post("/contactus", homeController.contactus);




module.exports= router;