const { sequelize } = require("./db");
const { Product } = require("./models/product");

const express = require("express");

const app = express();
app.use(express.json());

app.get("/", async function (req, res) {
  sequelize
    .sync()
    .then(async () => {
      let products;
      // Select all rows using `findAll()` method
      products = await Product.findAll({ raw: true });
      console.log("List of products", products);
      res.status(200).json(products);
    })
    .catch((error) =>
      console.log("Failed to synchronize with the database", error)
    );
});

app.post("/", async function (req, res) {
  sequelize
    .sync()
    .then(async () => {
      // Insert new row using `create()` method
      await Product.create({
        name: "Eclairs",
        category: "Chocolates",
        quantity: 100,
        price: 5,
      });
      console.log("Successfully added a new product!");
    })
    .catch((error) =>
      console.log("Failed to synchronize with the database:", error)
    );
});

// Validate and connect to the database
sequelize
  .authenticate()
  .then(() =>
    app.listen(8000, () => {
      console.log("Successfully connected to the database!");
    })
  )
  .catch((error) => console.log("Failed to connect the database:", error));