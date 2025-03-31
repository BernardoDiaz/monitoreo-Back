import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const Visitas = sequelize.define('visitas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    asunto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: true
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: true
    },
    objetivo: {
        type: DataTypes.STRING,
        allowNull: true
    }
});