const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

// Define the student model that creates a table in the `student_database`
const Product = sequelize.define("product", {
  name: DataTypes.STRING,
  category: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
  price: DataTypes.INTEGER,
});

module.exports = { Product };
