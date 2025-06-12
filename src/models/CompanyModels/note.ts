import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const note = sequelize.define('notes', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    noteText: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}); 