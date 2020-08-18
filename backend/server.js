const express = require("express");
const mongoose = require("mongoose");
const app = express();
const products = require("./routes/productsRoutes");
const details = require("./routes/detailsRoutes");
const productSave = require("./routes/productSaveRoutes");
const user = require("./routes/userRoutes");
const config = require("config");
const { envVar } = require("./config");
const dotenv = require("dotenv");

dotenv.config();

const mongodbUrl = envVar.MONGODB_URL;

app.use(express.json());
app.use("/api/products", products);
app.use("/api/product/", details);
app.use("/api/users", user);
app.use("/api/productsave", productSave);

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB...");
  })
  .catch((err) => {
    console.log("Error", err.message);
  });

port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening om port: ${port}`);
});
