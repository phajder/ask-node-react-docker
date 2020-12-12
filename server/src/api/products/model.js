const Sequelize = require('sequelize');
const sequelize = require('../../services/sequelize');
const Model = Sequelize.Model;

class Product extends Model {}

Product.init({
    id: {
        field: "product_id", 
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true
    },
    productName: { 
        type: Sequelize.STRING,
        field: "product_name",
        allowNull: false
    },
    price: { 
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    tableName: 'product',
    modelName: 'product'
});

module.exports = Product;