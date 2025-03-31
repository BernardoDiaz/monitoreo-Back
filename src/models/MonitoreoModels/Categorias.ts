import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const Categorias = sequelize.define('categorias', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: true
    }
});