const mongoose = require("mongoose");
const express = require("express");
const routes = express.Router();
const { data } = require("../data");

routes.get("/:id", async (req, res) => {
  const productId = req.params.id;
  console.log(productId);

  const product = await data.products.find((x) => x._id === productId);
  console.log(product);

  if (product) {
    res.send(product);
  } else res.status(404).send({ msg: "The product could not be found" });
});

module.exports = routes;
