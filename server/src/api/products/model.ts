import { Model, DataTypes } from "sequelize";
import sequelize from "../../services/sequelize";

class Product extends Model {}

Product.init(
  {
    id: {
      field: "product_id",
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productName: {
      type: DataTypes.STRING,
      field: "product_name",
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    tableName: "product",
    modelName: "product",
  },
);

export default Product;
