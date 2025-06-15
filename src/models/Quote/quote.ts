import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const quote = sequelize.define('quotes',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    companyId:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    concept:{
        type:DataTypes.STRING,
        allowNull:false
    },
    total:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    }
});