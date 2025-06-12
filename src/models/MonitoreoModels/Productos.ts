import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { Categorias } from "./Categorias";

export const Productos = sequelize.define('productos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    producto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: true
    }
});  

Productos.belongsTo(Categorias, {
    foreignKey: 'idCategoria',
    as: 'categoria',
    onDelete: 'RESTRICT'
});

Categorias.hasMany(Productos, {
    foreignKey: 'idCategoria', 
    as: 'productos',
    onDelete: 'RESTRICT'
}); 