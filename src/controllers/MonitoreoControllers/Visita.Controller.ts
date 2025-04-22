import { Request, Response } from "express";
import { Visitas } from "../../models/MonitoreoModels/Visita";
import { Clientes } from "../../models/MonitoreoModels/Clientes"; 

export const newVisita = async (req: Request, res: Response) => {
    const { idCliente, asunto, fecha, hora, objetivo } = req.body;

    try {
        await Visitas.create({
            idCliente: idCliente,
            asunto: asunto,
            fecha: fecha,
            hora: hora,
            objetivo: objetivo
        });

        res.json({
            msg: `La visita ha sido creada exitosamente`
        });
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }
}

export const getVisitas = async (req: Request, res: Response) => {
    try {
        const visitas = await Visitas.findAll({
            attributes: ['id', 'idCliente', 'asunto', 'fecha', 'hora', 'objetivo'],
        });
        res.json(visitas);
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }
}

export const getVisitasAgendadas = async (req: Request, res: Response) => {
    try {
        const resultados = await Visitas.findAll({
            attributes: ['idCliente'], // Selecciona el idCliente de la tabla visitas
            include: [{
                model: Clientes,
                as: 'cliente', // Usa el alias definido en tu modelo
                attributes: ['empresa', 'contacto'], // Selecciona empresa y contacto de la tabla clientes
                required: true // Realiza un INNER JOIN (relación obligatoria)
            }]
        });

        res.json(resultados);
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).json({
            msg: 'Error al obtener los clientes con visitas',
            error: (error instanceof Error) ? error.message : 'Unknown error'
        });
    }
}


export const updateVisita = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await Visitas.findOne({ where: { id: id } });
    const { idCliente, asunto, fecha, hora, observaciones } = req.body;

    try {
        if (one) {
            await Visitas.update({ idCliente: idCliente, asunto: asunto, fecha: fecha, hora: hora, observaciones: observaciones }, { where: { id: id } });
        } else {
            return res.status(404).json({
                msg: `El registro no existe`,
            });
        }
        res.json({
            msg: `La visita ha sido actualizada exitosamente`
        });
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }
}

export const deleteVisita = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await Visitas.findOne({ where: { id: id } });

    try {
        if (one) {
            await Visitas.destroy({ where: { id: id } });
        } else {
            return res.status(404).json({
                msg: `El registro no existe`,
            });
        }
        res.json({
            msg: `La visita ha sido eliminada exitosamente`
        });
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }
}