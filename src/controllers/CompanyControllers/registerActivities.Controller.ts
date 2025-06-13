import { Response, Request } from "express";
import { registerActivities } from "../../models/CompanyModels/registerActivities";

export const newActivity = async (req: Request, res: Response) => { 
    try {
        const { activityType, activityDate, activityDescription, companyId } = req.body;

        // Validar que se reciban todos los campos necesarios
        if (!activityType || !activityDate || !activityDescription || !companyId) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Crear la nueva actividad
        const newActivity = await registerActivities.create({
            activityType,
            activityDate,
            activityDescription,
            companyId
        });

        return res.status(201).json(newActivity);
    } catch (error) {
        console.error("Error al crear la actividad:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const getActivities = async (req: Request, res: Response) => {
    try {
        const { companyId } = req.params;

        // Validar que se reciba el ID de la empresa
        if (!companyId) {
            return res.status(400).json({ message: "Falta el ID de la empresa" });
        }

        // Obtener las actividades asociadas a la empresa
        const activities = await registerActivities.findAll({
            attributes:['id','activityType','activityDate',
                'activityDescription'],
            where: { companyId:companyId },
        });

        return res.status(200).json(activities);
    } catch (error) {
        console.error("Error al obtener las actividades:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const deleteActivity = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Validar que se reciba el ID de la actividad
        if (!id) {
            return res.status(400).json({ message: "Falta el ID de la actividad" });
        }

        // Buscar la actividad por su ID
        const activityToDelete = await registerActivities.findByPk(id);
        if (!activityToDelete) {
            return res.status(404).json({ message: "Actividad no encontrada" });
        }

        // Eliminar la actividad
        await activityToDelete.destroy();
        return res.status(200).json({ message: "Actividad eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la actividad:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const updateActivity = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { activityType, activityDate, activityDescription } = req.body;

        // Validar que se reciban todos los campos necesarios
        if (!id || !activityType || !activityDate || !activityDescription) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Buscar la actividad por su ID
        const activityToUpdate = await registerActivities.findByPk(id);
        if (!activityToUpdate) {
            return res.status(404).json({ message: "Actividad no encontrada" });
        }

        // Actualizar la actividad
        activityToUpdate.set({
            activityType,
            activityDate,
            activityDescription
        });
        await activityToUpdate.save();

        return res.status(200).json({message: "Actividad actualizada correctamente"});
    } catch (error) {
        console.error("Error al actualizar la actividad:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}