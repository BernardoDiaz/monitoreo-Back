import { Response, Request } from "express";
import { quote } from "../../models/Quote/quote";
import { quoteDetails } from "../../models/Quote/quoteDetails";

export const createQuoteWithDetails = async (req: Request, res: Response) => {
    try {
        const { companyId, concept, total,status, products } = req.body;

        if (!companyId || !concept || !total || !status || !products || products.length === 0) {
            return res.status(400).json({ message: "Faltan datos o la lista de productos está vacía" });
        }

        // Crear la cotización y obtener su ID  
        const newQuote = await quote.create({ companyId, concept, total, status });

        // Obtener el ID de la cotización creada
        const quoteId = newQuote.getDataValue('id');

        // Insertar los productos asociados a la cotización
        await Promise.all(
            (products as { product: string; quantity: number; price: number; subtotal: number }[]).map(
                ({ product, quantity, price, subtotal }) =>
                    quoteDetails.create({ companyId, quoteId, product, quantity, price, subtotal })
            )
        );
        return res.status(201).json({ message: "Cotización y productos creados correctamente" });

    } catch (error) {
        console.error("Error al crear la cotización con productos:", error);
        return res.status(500).json({ message: "Error al crear la cotización y sus productos" });
    }
};

export const getQuote = async (req: Request, res: Response) => {
    try {
        const { companyId } = req.params;

        if (!companyId) {
            return res.status(400).json({ message: "Falta el ID de la empresa" });
        }

       const quotes = await quote.findAll({
            attributes:['id','concept','total','status','createdAt'],
            where: { companyId:companyId },
        });

        return res.status(200).json(quotes);
    } catch (error) {
        console.error("Error al obtener:", error);
        return res.status(500).json({ message: "Error al obtener" });
    }
}

export const deleteQuote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Falta el ID" });
        }

        const quoteToDelete = await quote.findByPk(id);

        if (!quoteToDelete) {
            return res.status(404).json({ message: "No encontrada" });
        }

        // Eliminar los quoteDetails asociados a la cotización
        await quoteDetails.destroy({ where: { quoteId: id } });

        // Eliminar la cotización
        await quoteToDelete.destroy();

        return res.status(200).json({ message: "Eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar:", error);
        return res.status(500).json({ message: "Error al eliminar" });
    }
}

export const updateQuote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { companyId, concept, total } = req.body;

        if (!companyId || !concept || !total) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        const Update = await quote.findByPk(id);

        if (!Update) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }

        Update.set({ companyId, concept, total });
        await Update.save();

        return res.status(200).json(Update);
    } catch (error) {
        console.error("Error al actualizar la nota:", error);
        return res.status(500).json({ message: "Error al actualizar la nota" });
    }
}

export const updateQuoteTotal = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { total } = req.body;

        if (total === undefined) {
            return res.status(400).json({ message: "Falta el total" });
        }

        const quoteToUpdate = await quote.findByPk(id);

        if (!quoteToUpdate) {
            return res.status(404).json({ message: "Cotización no encontrada" });
        }

        quoteToUpdate.set({ total });
        await quoteToUpdate.save();

        return res.status(200).json(quoteToUpdate);
    } catch (error) {
        console.error("Error al actualizar el total de la cotización:", error);
        return res.status(500).json({ message: "Error al actualizar el total de la cotización" });
    }
}