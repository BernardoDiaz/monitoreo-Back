"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ventasMensuales = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const user_1 = require("../usersModels/user");
exports.ventasMensuales = connection_1.default.define('VentasMensuales', {
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
    mes: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    anio: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    ventaReal: {
        type: sequelize_1.DataTypes.DECIMAL(15, 2),
        allowNull: false,
    }
}, {
    timestamps: true
});
exports.ventasMensuales.belongsTo(user_1.user, { foreignKey: 'usuarioId' });
