import { Response, Request } from "express";
import { task } from "../../models/CompanyModels/task";

export const newTask = async (req: Request, res: Response) => {
    try {
        const { taskName, taskStatus, companyId } = req.body;

        // Validar que se reciban todos los campos necesarios
        if (!taskName || !taskStatus || !companyId) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Crear la nueva tarea
        const newTask = await task.create({
            taskName,
            taskStatus,
            companyId
        });

        return res.status(201).json(newTask);
    } catch (error) {
        console.error("Error al crear la tarea:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const getTasks = async (req: Request, res: Response) => {
    try {
        const { companyId } = req.params;

        // Validar que se reciba el ID de la empresa
        if (!companyId) {
            return res.status(400).json({ message: "Falta el ID de la empresa" });
        }

        // Obtener las tareas asociadas a la empresa
        const tasks = await task.findAll({
            attributes:['id','taskName','taskStatus'],
            where: { companyId:companyId }
        });

        return res.status(200).json(tasks);
    } catch (error) {
        console.error("Error al obtener las tareas:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Validar que se reciba el ID de la tarea
        if (!id) {
            return res.status(400).json({ message: "Falta el ID de la tarea" });
        }

        // Buscar la tarea por su ID
        const taskToDelete = await task.findByPk(id);
        if (!taskToDelete) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        // Eliminar la tarea
        await taskToDelete.destroy();
        return res.status(200).json({ message: "Tarea eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la tarea:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { taskName, taskStatus } = req.body;

        // Validar que se reciban todos los campos necesarios
        if (!id || !taskName || !taskStatus) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Buscar la tarea por su ID
        const taskToUpdate = await task.findByPk(id);
        if (!taskToUpdate) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        // Actualizar la tarea
        taskToUpdate.set({ taskName, taskStatus });
        await taskToUpdate.save();

        return res.status(200).json({ message: "Tarea actualizada correctamente" });
    } catch (error) {
        console.error("Error al actualizar la tarea:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}