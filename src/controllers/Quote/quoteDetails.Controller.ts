import { Response, Request } from "express";
import { quoteDetails } from "../../models/Quote/quoteDetails";
import sequelize from "../../db/connection";


export const getQuoteDetails = async (req: Request, res: Response) => {
    try {
        const { quoteId } = req.params;

        if (!quoteId) {
            return res.status(400).json({ message: "Falta el ID de la cotizacion" });
        }

       const quotes = await quoteDetails.findAll({
            attributes:['id','product','quantity','price','subtotal'],
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

        const Delete = await quoteDetails.findByPk(id);

        if (!Delete) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }

        await Delete.destroy();

        return res.status(200).json({ message: "Eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar la nota:", error);
        return res.status(500).json({ message: "Error al eliminar" });
    }
}

export const updateQuoteDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { companyId,quoteId,product,quantity,price,subtotal } = req.body;

        if (!companyId || !quoteId || !product || !quantity || !price || !subtotal) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        const Update = await quoteDetails.findByPk(id);

        if (!Update) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }

        Update.set({ companyId,quoteId,product,quantity,price,subtotal });
        await Update.save();

        return res.status(200).json(Update);
    } catch (error) {
        console.error("Error al actualizar la nota:", error);
        return res.status(500).json({ message: "Error al actualizar la nota" });
    }
}