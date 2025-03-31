import { Request,Response } from "express";
import { Productos } from "../../models/MonitoreoModels/Productos";

export const newProducto = async (req: Request, res: Response) => {
    const { idcategoria,producto,precio } = req.body;

    try {
        await Productos.create({
            idCategoria: idcategoria,
            producto: producto,
            precio: precio
        });

        res.json({
            msg: `El producto ${producto} ha sido creado exitosamente`
        });
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }
}

export const getProductos = async (req: Request, res: Response) => {
    try {
        const productos = await Productos.findAll({
            attributes: ['id', 'idCategoria', 'producto', 'precio'],});
        res.json(productos);
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }
}

export const updateProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await Productos.findOne({ where: { id: id } });
    const { idcategoria,producto,precio } = req.body;

    try {
        if (one) {
            await Productos.update({ idCategoria: idcategoria, producto: producto, precio: precio }, { where: { id: id } });
        } else {
            return res.status(404).json({
                msg: `El registro no existe`,
            });
        }
        res.json({
            msg: `El producto ha sido actualizado exitosamente`
        });
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }
}

export const deleteProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await Productos.findOne({ where: { id: id } });

    try {
        if (one) {
            await Productos.destroy({ where: { id: id } });
        } else {
            return res.status(404).json({
                msg: `El registro no existe`,
            });
        }
        res.json({
            msg: `El producto ha sido eliminado exitosamente`
        });
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }
}