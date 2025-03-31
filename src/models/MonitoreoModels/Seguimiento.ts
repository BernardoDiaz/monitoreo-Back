import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const Seguimientos = sequelize.define('seguimientos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idClientes: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    idNuevaVisita: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    resultadoVisita: {
        type: DataTypes.STRING,
        allowNull: true
    },
    comentariosVisita: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cotizacion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    numeroCotizacion: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    montoCotizacion: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    proximosPasos: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estadoSeguimiento: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
});