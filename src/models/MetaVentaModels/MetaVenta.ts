
import { DataTypes } from 'sequelize';
import sequelize from '../../db/connection';
import { user } from '../usersModels/user';

export const metaVenta = sequelize.define('MetaVentas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pais: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  metaAnual: {
    type: DataTypes.DECIMAL(15,2),
    allowNull: false,
  },
  metaMensual: {
    type: DataTypes.DECIMAL(15,2),
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

metaVenta.belongsTo(user, { foreignKey: 'usuarioId' });
