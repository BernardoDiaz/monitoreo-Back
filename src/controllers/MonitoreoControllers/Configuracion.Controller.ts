import { Request, Response } from "express";
import { Configuracions } from "../../models/MonitoreoModels/Configuracion";
import { Op } from "sequelize";


export const getConfiguracion = async (req: Request, res: Response) => {
    try {
        const configuracion = await Configuracions.findAll({
            attributes: ['id', 'pais', 'metaEconomica', 'metaClientes']
        });
        res.json(configuracion);
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }
}

export const newConfiguracion = async (req: Request, res: Response) => {
    const { pais, yearConfiguracion, metaEconomica, metaClientes } = req.body;
    try {
        const existingConfiguracion = await Configuracions.findOne({
            where: {
                pais: {
                    [Op.like]: pais
                }
            }
        });
        if (existingConfiguracion) {
            return res.status(400).json({
                msg: "El país ya ha sido ingresado"
            });
        }
        const configuracion = await Configuracions.create({
            pais,
            yearConfiguracion,
            metaEconomica,
            metaClientes
        });
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
    const { pais, yearConfiguracion, metaEconomica, metaClientes } = req.body;
    try {
        const valid = await Configuracions.findByPk(id);
        if (!valid) {
            return res.status(404).json({
                msg: "Configuración no encontrada"
            })
        }
        const configuracion = await Configuracions.update({
            pais,
            yearConfiguracion,
            metaEconomica,
            metaClientes
        }, {
            where: {
                id
            }
        });
        res.json(configuracion);
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }
}

export const deleteConfiguracion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const valid = await Configuracions.findByPk(id);
        if (!valid) {
            return res.status(404).json({
                msg: "Configuración no encontrada"
            })
        }
        const configuracion = await Configuracions.destroy({
            where: {
                id
            }
        });
        res.json(configuracion);
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }
}
