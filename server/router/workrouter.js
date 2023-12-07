const express = require('express');
const router = express.Router();

const workController= require("../controller/artworKController")

router.get("/works", workController.getartis_works);
router.post("/remove", workController.removework);
router.post("/create", workController.creatwork);
//router.post("/update", workController.creatArtisprofile);
module.exports= router