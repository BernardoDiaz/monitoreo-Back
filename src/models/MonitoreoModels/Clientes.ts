import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const Clientes = sequelize.define('clientes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    empresa: {
        type: DataTypes.STRING,
        allowNull: true
    },
    contacto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telefonoFijo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    celular: {
        type: DataTypes.STRING,
        allowNull: true
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pais: {
        type: DataTypes.STRING,
        allowNull: true
    }
});