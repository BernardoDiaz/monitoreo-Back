import { Response, Request } from "express";
import { quoteDetails } from "../../models/Quote/quoteDetails";
import { quote } from "../../models/Quote/quote";
import sequelize from "../../db/connection";


export const getQuoteDetails = async (req: Request, res: Response) => {
    try {
        const { quoteId } = req.params;

        if (!quoteId) {
            return res.status(400).json({ message: "Falta el ID de la cotizacion" });
        }

       const quotes = await quoteDetails.findAll({
            attributes:['id','quoteId','product','quantity','price','subtotal'],
            where: { quoteId:quoteId },
        });

        return res.status(200).json(quotes);
    } catch (error) {
        console.error("Error al obtener:", error);
        return res.status(500).json({ message: "Error al obtener las notas" });
    }
}


export const deleteQuoteDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Falta el ID" });
        }

        // Buscar el detalle a eliminar
        const detail = await quoteDetails.findByPk(id);

        if (!detail) {
            return res.status(404).json({ message: "no encontrada" });
        }

        // Guardar el quoteId antes de eliminar
        const quoteId = detail.getDataValue('quoteId');

        // Eliminar el detalle
        await detail.destroy();

        // Recalcular el total sumando los subtotales restantes
        const remainingDetails = await quoteDetails.findAll({
            where: { quoteId }
        });

        const newTotal = remainingDetails.reduce((sum, d) => sum + Number(d.getDataValue('subtotal')), 0);

        // Actualizar el total en la tabla quote usando el modelo importado directamente
        const quoteInstance = await quote.findByPk(quoteId);
        if (quoteInstance) {
            quoteInstance.set({ total: newTotal });
            await quoteInstance.save();
        } else {
            console.error("No se encontró la cotización para actualizar el total");
        }

        return res.status(200).json({ message: "Eliminado correctamente", newTotal });
    } catch (error) {
        console.error("Error al eliminar la nota:", error);
        return res.status(500).json({ message: "Error al eliminar", error });
    }
}


export const updateQuoteDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { product, quantity, price, subtotal } = req.body;

        if (!product || !quantity || !price || !subtotal) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        const Update = await quoteDetails.findByPk(id);

        if (!Update) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }

        Update.set({ product, quantity, price, subtotal });
        await Update.save();

        // Obtener el quoteId del detalle actualizado
        const quoteId = Update.getDataValue('quoteId');

        // Recalcular el total sumando los subtotales restantes
        const remainingDetails = await quoteDetails.findAll({
            where: { quoteId }
        });
        const newTotal = remainingDetails.reduce((sum, d) => sum + Number(d.getDataValue('subtotal')), 0);

        // Actualizar el total en la tabla quote
        const quoteInstance = await quote.findByPk(quoteId);
        if (quoteInstance) {
            quoteInstance.set({ total: newTotal });
            await quoteInstance.save();
        } else {
            console.error("No se encontró la cotización para actualizar el total");
        }

        return res.status(200).json(Update);
    } catch (error) {
        console.error("Error al actualizar la nota:", error);
        return res.status(500).json({ message: "Error al actualizar la nota" });
    }
}

export const createQuoteDetails = async (req: Request, res: Response) => {
    try {
        const { companyId,quoteId, product, quantity, price, subtotal } = req.body;

        if (!quoteId || !product || !quantity || !price || !subtotal) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        const newQuoteDetail = await quoteDetails.create({
            companyId,
            quoteId,
            product,
            quantity,
            price,
            subtotal
        });

        // Recalcular el total sumando los subtotales restantes
        const remainingDetails = await quoteDetails.findAll({
            where: { quoteId }
        });
        const newTotal = remainingDetails.reduce((sum, d) => sum + Number(d.getDataValue('subtotal')), 0);

        // Actualizar el total en la tabla quote
        const quoteInstance = await quote.findByPk(quoteId);
        if (quoteInstance) {
            quoteInstance.set({ total: newTotal });
            await quoteInstance.save();
        } else {
            console.error("No se encontró la cotización para actualizar el total");
        }

        return res.status(201).json(newQuoteDetail);
    } catch (error) {
        console.error("Error al crear el registro:", error);
        return res.status(500).json({ message: "Error al crear el registro", error });
    }
}