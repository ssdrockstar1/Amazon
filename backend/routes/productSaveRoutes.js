const express = require("express");
const route = express.Router();
const { Product } = require("../model/productsModel");
const { auth, isAdmin } = require("../util.js");

route.get("/", async (req, res) => {
  const prodcuts = await Product.find();
  res.send(prodcuts);
});

route.post("/", auth, isAdmin, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
  });

  let newProduct = await product.save();
  if (newProduct) {
    res.status(200).send("The product was created successfully");
    return;
  }

  return res.status(500).send("Error while creating new product");
});

module.exports = route;
