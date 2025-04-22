import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const Configuracions = sequelize.define('Configuracions', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pais: { 
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    yearConfiguracion: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    metaEconomica: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    metaClientes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  })