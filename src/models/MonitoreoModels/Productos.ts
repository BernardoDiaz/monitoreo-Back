import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const Productos = sequelize.define('productos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    producto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: true
    }
});  