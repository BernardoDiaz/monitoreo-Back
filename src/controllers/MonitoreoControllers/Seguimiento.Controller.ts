import { Request, Response } from "express";
import { Seguimientos } from "../../models/MonitoreoModels/Seguimiento";


export const getSeguimiento = async (req: Request, res: Response) => {
    try {
        const seguimiento = await Seguimientos.findAll();
        res.json(seguimiento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los seguimientos" });
    }
}

export const NuevoSeguimiento = async (req: Request, res: Response) => {
    try {
        const { idCliente, idNuevaVisita, resultadoVisita,
             comentariosVisita,cotizacion,numeroCotizacion,
            proximosPasos, estadoSeguimiento } = req.body;
        const nuevoSeguimiento = await Seguimientos.create({
            idClientes: idCliente,
            idNuevaVisita: idNuevaVisita,
            resultadoVisita: resultadoVisita,
            comentariosVisita: comentariosVisita,
            cotizacion: cotizacion,
            numeroCotizacion: numeroCotizacion,
            proximosPasos: proximosPasos,
            estadoSeguimiento: estadoSeguimiento
        });
        res.status(201).json(nuevoSeguimiento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el seguimiento" });
    }
}

export const ActualizarSeguimiento = async (req: Request, res: Response) => {
    try {
        const { idSeguimiento } = req.params;
        const { idCliente, idNuevaVisita, resultadoVisita,
            comentariosVisita,cotizacion,numeroCotizacion,
            proximosPasos, estadoSeguimiento } = req.body;
        const seguimiento = await Seguimientos.findByPk(idSeguimiento);
        if (!seguimiento) {
            return res.status(404).json({ error: "Seguimiento no encontrado" });
        }
        await Seguimientos.update({
            idClientes: idCliente,
            idNuevaVisita: idNuevaVisita,
            resultadoVisita: resultadoVisita,
            comentariosVisita: comentariosVisita,
            cotizacion: cotizacion,
            numeroCotizacion: numeroCotizacion,
            proximosPasos: proximosPasos,
            estadoSeguimiento: estadoSeguimiento
        }, {
            where: { id: idSeguimiento }
        });
        res.json({ message: "Seguimiento actualizado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el seguimiento" });
    }
}

export const EliminarSeguimiento = async (req: Request, res: Response) => {
    try {
        const { idSeguimiento } = req.params;
        const seguimiento = await Seguimientos.findByPk(idSeguimiento);
        if (!seguimiento) {
            return res.status(404).json({ error: "Seguimiento no encontrado" });
        }
        await Seguimientos.destroy({
            where: { id: idSeguimiento }
        });
        res.json({ message: "Seguimiento eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el seguimiento" });
    }
}
