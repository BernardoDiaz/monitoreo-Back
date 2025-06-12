import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const company = sequelize.define('companys', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    companyName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    companyEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyPhone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyCountry: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LifeStage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TeamOwner:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // _____________________
    companyWeb:{
        type: DataTypes.STRING,
        allowNull: true
    },
    companyAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    originContact:{
        type: DataTypes.STRING,
        allowNull: true
    }
});