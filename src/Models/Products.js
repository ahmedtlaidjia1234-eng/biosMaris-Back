import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Products = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
   qrCode: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true,
  },
    description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
    images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
    ingredients: {
    type: DataTypes.ARRAY(DataTypes.STRING), 
    allowNull: true,
  },
    benefits: {
    type: DataTypes.ARRAY(DataTypes.STRING), 
    allowNull: true,
  },usage:{
    type: DataTypes.STRING,
    allowNull: true
  }
});

export default Products;