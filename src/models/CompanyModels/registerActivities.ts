import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { company } from "./company";

export const registerActivities = sequelize.define('registerActivities', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    activityType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    activityDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    activityDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

registerActivities.belongsTo(company, {
    foreignKey: 'companyId',
    targetKey: 'id'
});