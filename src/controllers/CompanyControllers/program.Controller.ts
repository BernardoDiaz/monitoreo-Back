import { Response, Request } from "express";
import { program } from "../../models/CompanyModels/program";

export const newProgram = async (req: Request, res: Response) => {
    try {
        const { programActivity,programDate,programTimeStart,programTimeEnd,
            programDescription, programLocation, companyId } = req.body;
        if (!companyId || !programActivity || !programDate || !programTimeStart ||
            !programTimeEnd || !programDescription || !programLocation) {
            return res.status(400).json({ message: "Faltan datos" });
        }
        const newProgram = await program.create({
            companyId,
            programActivity,
            programDate,
            programTimeStart,
            programTimeEnd,
            programDescription,
            programLocation
        });
        return res.status(201).json(newProgram);
    } catch (error) {
        console.error("Error al crear el programa:", error);
        return res.status(500).json({ message: "Error al crear el programa" });
    }
}

export const getPrograms = async (req: Request, res: Response) => {
    try {
        const { companyId } = req.params;
        if (!companyId) {
            return res.status(400).json({ message: "Falta el ID de la empresa" });
        }
        const programs = await program.findAll({
            where: { companyId },
            include: ["company"]
        });
        return res.status(200).json(programs);
    } catch (error) {
        console.error("Error al obtener los programas:", error);
        return res.status(500).json({ message: "Error al obtener los programas" });
    }
}

export const deleteProgram = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Falta el ID del programa" });
        }
        const programToDelete = await program.findByPk(id);
        if (!programToDelete) {
            return res.status(404).json({ message: "Programa no encontrado" });
        }
        await programToDelete.destroy();
        return res.status(200).json({ message: "Programa eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el programa:", error);
        return res.status(500).json({ message: "Error al eliminar el programa" });
    }
}

export const updateProgram = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { programActivity, programDate, programTimeStart, programTimeEnd,
            programDescription, programLocation } = req.body;

        if (!id || !programActivity || !programDate || !programTimeStart ||
            !programTimeEnd || !programDescription || !programLocation) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        const programToUpdate = await program.findByPk(id);
        if (!programToUpdate) {
            return res.status(404).json({ message: "Programa no encontrado" });
        }

        await programToUpdate.update({
            programActivity,
            programDate,
            programTimeStart,
            programTimeEnd,
            programDescription,
            programLocation
        });

        return res.status(200).json(programToUpdate);
    } catch (error) {
        console.error("Error al actualizar el programa:", error);
        return res.status(500).json({ message: "Error al actualizar el programa" });
    }
}