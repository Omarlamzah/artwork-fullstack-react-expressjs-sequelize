const express = require('express');
const router = express.Router()
const prodauctController= require("../controller/prodauctController")

 

router.post("/createProduct", prodauctController.createProduct);
router.post("/deleteProductByid", prodauctController.deleteProductById );
router.post("/getProducts", prodauctController.getProducts );




module.exports= router;  