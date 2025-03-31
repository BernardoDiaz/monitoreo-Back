import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const Configuracions = sequelize.define('configuracions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    metaEconomica: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    metaClientes: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    metaElSalvador: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    metaGuatemala: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    metaHonduras: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    metaNicaragua: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    metaCostaRica: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    metaPanama: {
        type: DataTypes.DOUBLE,
        allowNull: true
    }
});