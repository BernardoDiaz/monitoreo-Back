import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { company } from "./company";

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

note.belongsTo(company, {
    foreignKey: 'companyId',
    targetKey: 'id'
});