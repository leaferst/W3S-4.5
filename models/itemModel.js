const { DataTypes } = require("sequelize");
const { sequelize } = require("./conn");


const Item = sequelize.define('items', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: false,
});

module.exports = Item;