import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const task = sequelize.define('tasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    taskName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taskStatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});