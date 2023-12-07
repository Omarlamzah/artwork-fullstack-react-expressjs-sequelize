// controllers/productController.js
const {Product,Artwork,Media} = require('../models');
 
// Create a new product
exports.createProduct = async (req, res) => {
  console.log(req.body)
  try {
     Product.create(req.body);
     console.log(req.body)
    const products  = await Product.findAll({where:{userid:req.body.userid}});
    res.json(products);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all products
exports.getProducts = async (req, res) => {  
    console.log(req.body.userid) 
  try {
    const products = await Artwork.findAll({ include:[{model:Product,as :"product_of_artwork"},{model:Media,as:"media_of_artwork", attributes: ["url"],}],where:{"$product_of_artwork.userid$":req.body.userid},},);
    res.json(products);
  } catch (error) { 
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
 
// Get a specific product by ID 

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
  console.log(req.body)
  try {
    const deletedRows = await Product.destroy({
      where: { artworkid: req.body.artworkid},
    });
    if (deletedRows > 0) {
      const products = await Artwork.findAll({ include:[{model:Product,as :"product_of_artwork"},{model:Media,as:"media_of_artwork", attributes: ["url"],}],where:{"$product_of_artwork.userid$":req.body.userid},},);
      res.json(products);
        } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
