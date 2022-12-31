const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

app.use(cors());
app.options("*", cors());

// middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
App.use("public/uploads", express.static(__dirname + "public/uploads"));
app.use(errorHandler);

//Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");
const { default: App } = require("../App");

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

// database
mongoose
  .connect(process.env.MONGOOSE_DB)
  .then(() => {
    console.log("Database connection is ready...");
  })
  .catch((error) => {
    console.log(error);
  });

// server
app.listen(3000, () => {
  console.log("The server is running...");
});
