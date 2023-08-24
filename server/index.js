const { sequelize } = require("./db");
const { Product } = require("./models/product");

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Validate and connect to the database
sequelize
  .authenticate()
  .then(() =>
    app.listen(8000, () => {
      console.log("Successfully connected to the database!");
    })
  )
  .catch((error) => console.log("Failed to connect the database:", error));

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
  const { category, name, price, quantity } = req.body;
  sequelize
    .sync()
    .then(async () => {
      // Insert new row using `create()` method
      await Product.create({ category, name, price, quantity });
      console.log("Successfully added a new product!");
    })
    .catch((error) =>
      console.log("Failed to synchronize with the database:", error)
    );
});

app.patch("/:id", async function (req, res) {
  const { quantity: toDecrease } = req.body;
  const { id } = req.params;
  sequelize
    .sync()
    .then(async () => {
      // Insert new row using `create()` method
      const product = await Product.findByPk(id);
      await Product.update(
        {
          quantity:
            product.quantity - toDecrease < 0
              ? 0
              : product.quantity - toDecrease,
        },
        {
          where: {
            id: id,
          },
        }
      );
      console.log("Successfully added a new product!");
    })
    .catch((error) =>
      console.log("Failed to synchronize with the database:", error)
    );
});
