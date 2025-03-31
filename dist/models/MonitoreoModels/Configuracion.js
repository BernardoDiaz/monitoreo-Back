"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuracions = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
exports.Configuracions = connection_1.default.define('configuracions', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    metaEconomica: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true
    },
    metaClientes: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    metaElSalvador: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true
    },
    metaGuatemala: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true
    },
    metaHonduras: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true
    },
    metaNicaragua: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true
    },
    metaCostaRica: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true
    },
    metaPanama: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true
    }
});
