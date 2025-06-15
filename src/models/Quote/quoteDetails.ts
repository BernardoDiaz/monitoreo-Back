import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const quoteDetails = sequelize.define('quoteDetails', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quoteId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    }
});