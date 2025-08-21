"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaVenta = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const user_1 = require("../usersModels/user");
exports.metaVenta = connection_1.default.define('MetaVentas', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuarioId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    pais: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    anio: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    metaAnual: {
        type: sequelize_1.DataTypes.DECIMAL(15, 2),
        allowNull: false,
    },
    metaMensual: {
        type: sequelize_1.DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
    }
}, {
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['usuarioId', 'pais', 'anio']
        }
    ]
});
exports.metaVenta.belongsTo(user_1.user, { foreignKey: 'usuarioId' });
