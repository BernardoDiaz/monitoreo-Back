import e, { Request, Response } from "express";
import { Configuracions } from "../../models/MonitoreoModels/Configuracion";

export const newConfiguracion = async (req: Request, res: Response) => {
    try {
        const { metaEconomica, metaClientes, metaElSalvador, metaGuatemala, metaHonduras
            , metaNicaragua, metaCostaRica, metaPanama } = req.body;
        const newConfiguracion = await Configuracions.create({
            metaEconomica: metaEconomica,
            metaClientes: metaClientes,
            metaElSalvador: metaElSalvador,
            metaGuatemala: metaGuatemala,
            metaHonduras: metaHonduras,
            metaNicaragua: metaNicaragua,
            metaCostaRica: metaCostaRica,
            metaPanama: metaPanama
        });
        res.status(201).json(newConfiguracion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating configuracion" });
    }
}

export const getConfiguracion = async (req: Request, res: Response) => {
    try {
        const configuracion = await Configuracions.findAll();
        res.json(configuracion);
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }
}

export const updateConfiguracion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await Configuracions.findOne({ where: { id: id } });
    const { metaEconomica, metaClientes, metaElSalvador, metaGuatemala, metaHonduras
        , metaNicaragua, metaCostaRica, metaPanama } = req.body;

    try {
        if (one) {
            await Configuracions.update({ metaEconomica, metaClientes, metaElSalvador, metaGuatemala, metaHonduras
                , metaNicaragua, metaCostaRica, metaPanama }, { where: { id: id } });
        } else {
            return res.status(404).json({
                msg: `El registro no existe`,
            });
        }
        res.json({
            msg: `La configuración ha sido actualizado exitosamente`
        });
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }
}

export const deleteConfiguracion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await Configuracions.findOne({ where: { id: id } });
    try {
        if (one) {
            await Configuracions.destroy({ where: { id: id } });
        } else {
            return res.status(404).json({
                msg: `El registro no existe`,
            });
        }
        res.json({
            msg: `La configuración ha sido eliminado exitosamente`
        });
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }
}