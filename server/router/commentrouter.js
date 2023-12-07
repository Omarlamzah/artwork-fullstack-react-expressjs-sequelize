const express = require('express');
const router = express.Router();

const commentController= require("../controller/commentController")

router.post("/addComment", commentController.addComment);
router.delete("/removeComment", commentController.removeComment);
router.put("/updateComment", commentController.updateComment);
router.post("/getcomments", commentController.getComments);
 

//router.post("/update", workController.creatArtisprofile);
module.exports= router