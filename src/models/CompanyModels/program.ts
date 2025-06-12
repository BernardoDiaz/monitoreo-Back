import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const program = sequelize.define('programs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    programActivity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    programDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    programTimeStart: {
        type: DataTypes.TIME,
        allowNull: false
    },
    programTimeEnd: {
        type: DataTypes.TIME,
        allowNull: false
    },
    programDescription: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    //para enlaces o ubicaciones de la actividad
    programLocation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    //para el saber que empresa creo la actividad
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});