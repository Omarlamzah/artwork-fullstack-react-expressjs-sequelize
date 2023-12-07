const express = require('express');
const router = express.Router()
const favorContoller= require("../controller/favorContoller")

 

router.post("/createFavorite", favorContoller.createFavorite);
router.post("/deleteFavoriteByToken", favorContoller.deleteFavoriteByToken);
router.delete("/getFavoritesByToken", favorContoller.getFavoritesByToken);
router.put("/updateFavoriteByToken", favorContoller.updateFavoriteByToken);
 



module.exports= router;