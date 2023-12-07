const express = require('express');
const router = express.Router()
const artistController= require("../controller/artistController")

router.post("/profile", artistController.getartisprofile);
router.post("/remove", artistController.removeartist);
router.post("/create", artistController.creatArtisprofile);
router.post("/update", artistController.updateArtistProfile);

//router.post("/update",(req,res)=>{console.log(req.files)})


router.post("/getworks", artistController.getworks);

module.exports= router;