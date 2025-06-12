import { Response, Request } from "express";
import { note } from "../../models/CompanyModels/note";

export const newNote = async (req: Request, res: Response) => {
    try {
        const { noteText, companyId } = req.body;

        if (!companyId || !noteText) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        const newNote = await note.create({
            companyId,
            noteText
        });

        return res.status(201).json({message: "Nota creada correctamente"});
    } catch (error) {
        console.error("Error al crear la nota:", error);
        return res.status(500).json({ message: "Error al crear la nota" });
    }
}

export const getNotes = async (req: Request, res: Response) => {
    try {
        const { companyId } = req.params;

        if (!companyId) {
            return res.status(400).json({ message: "Falta el ID de la empresa" });
        }

        const notes = await note.findAll({
            where: { companyId },
            include: ["company"]
        });

        return res.status(200).json(notes);
    } catch (error) {
        console.error("Error al obtener las notas:", error);
        return res.status(500).json({ message: "Error al obtener las notas" });
    }
}

export const deleteNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Falta el ID de la nota" });
        }

        const noteToDelete = await note.findByPk(id);

        if (!noteToDelete) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }

        await noteToDelete.destroy();

        return res.status(200).json({ message: "Nota eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la nota:", error);
        return res.status(500).json({ message: "Error al eliminar la nota" });
    }
}

export const updateNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { noteText } = req.body;

        if (!id || !noteText) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        const noteToUpdate = await note.findByPk(id);

        if (!noteToUpdate) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }

        noteToUpdate.set('noteText', noteText);
        await noteToUpdate.save();

        return res.status(200).json(noteToUpdate);
    } catch (error) {
        console.error("Error al actualizar la nota:", error);
        return res.status(500).json({ message: "Error al actualizar la nota" });
    }
}