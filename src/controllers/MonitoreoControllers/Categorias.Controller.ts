import { Response, Request } from "express";
import { Categorias } from "../../models/MonitoreoModels/Categorias";

export const newCategoria = async (req: Request, res: Response) => {
    const { categoria } = req.body;

    try {
        //Guardando usuario en base de datos
        await Categorias.create({
            categoria: categoria
        });

        res.json({
            msg: `La categoria "${categoria}" ha sido creada exitosamente`
        });
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }
}

export const getCategorias = async (req: Request,res: Response) => {

    try {
        const categorias = await Categorias.findAll({
            attributes:['id','categoria']});
        res.json(categorias);
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }
};

export const updateCategoria = async (req: Request, res: Response) => {

    const { id } = req.params;
    const one = await Categorias.findOne({ where: { id: id } });
    const { categoria } = req.body;

    try {
        if (one) {
            await Categorias.update({ categoria }, { where: { id: id } });
        } else {
            return res.status(404).json({
                msg: `El registro no existe`,
            });
        }
        res.json({
            msg: `La categoria "${categoria}" ha sido actualizada exitosamente`
        });
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }
}

export const deleteCategoria = async (req: Request, res: Response) => {

    const { id } = req.params;
    const one = await Categorias.findOne({ where: { id: id } });

    try {
        if (one) {
            await Categorias.destroy({ where: { id: id } });
        } else {
            return res.status(404).json({
                msg: `El registro no existe`,
            });
        }
        res.json({
            msg: `La categoria ha sido eliminada exitosamente`
        });
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }
}