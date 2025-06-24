import { Response, Request } from "express";
import { task } from "../../models/CompanyModels/task";
import { company } from "../../models/CompanyModels/company";
import { quote } from "../../models/Quote/quote";
import { Op } from "sequelize";
import moment from "moment";
import { program } from "../../models/CompanyModels/program";

export const getUserManagedTasks = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "Falta el ID de usuario para la consulta" });
        }

        const tasks = await task.findAll({
            attributes: ["id","taskName", "taskStatus"],
            where: { taskStatus: "Pendiente" }, // Filtramos por tareas pendientes
            include: [
                {
                    model: company,
                    attributes: ["companyName"],
                    required: true,
                    where: { TeamOwner: userId } // Filtramos por empresas administradas por el usuario
                }
            ]
        });

        return res.status(200).json(tasks);
    } catch (error) {
        console.error("Error al obtener tareas:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getUserManagedCompaniesCount = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "Falta el ID de usuario para la consulta" });
        }

        const companiesCount = await company.count({
            where: { TeamOwner: userId }
        });

        return res.status(200).json({ managedCompanies: companiesCount });
    } catch (error) {
        console.error("Error al obtener el conteo de empresas:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getUserManagedQuotesCount = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "Falta el ID de usuario para la consulta" });
        }

        // Buscar IDs de empresas administradas por el usuario
        const companies = await company.findAll({
            attributes: ["id"],
            where: { TeamOwner: userId }
        });

        const companyIds = companies.map((c: any) => c.id);

        // Contar cotizaciones asociadas a esas empresas
        const quotesCount = await quote.count({
            where: { companyId: companyIds }
        });

        return res.status(200).json({ managedQuotes: quotesCount });
    } catch (error) {
        console.error("Error al obtener el conteo de cotizaciones:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getUserManagedPendingTasksCount = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "Falta el ID de usuario para la consulta" });
        }

        // Buscar IDs de empresas administradas por el usuario
        const companies = await company.findAll({
            attributes: ["id"],
            where: { TeamOwner: userId }
        });

        const companyIds = companies.map((c: any) => c.id);

        // Contar tareas pendientes asociadas a esas empresas
        const pendingTasksCount = await task.count({
            where: {
                companyId: companyIds,
                taskStatus: "Pendiente"
            }
        });

        return res.status(200).json({ pendingTasks: pendingTasksCount });
    } catch (error) {
        console.error("Error al obtener el conteo de tareas pendientes:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getUserManagedProgramsThisWeek = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "Falta el ID de usuario para la consulta" });
        }

        // Buscar IDs de empresas administradas por el usuario
        const companies = await company.findAll({
            attributes: ["id"],
            where: { TeamOwner: userId }
        });

        const companyIds = companies.map((c: any) => c.id);

        // Calcular inicio y fin de la semana actual
        const startOfWeek = moment().startOf('isoWeek').toDate();
        const endOfWeek = moment().endOf('isoWeek').toDate();

        // Buscar eventos programados esta semana para esas empresas usando programDate
        const programs = await program.findAll({
            attributes: [
                "programDescription",
                "programDate",
                "programTimeStart",
                "programTimeEnd",
                "programLocation"
            ],
            where: {
                companyId: companyIds,
                programDate: {
                    [Op.between]: [startOfWeek, endOfWeek]
                }
            },
            include: [
                {
                    model: company,
                    attributes: ["id", "companyName"]
                }
            ]
        });

        return res.status(200).json({ programs });
    } catch (error) {
        console.error("Error al obtener los eventos programados de la semana:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getSalesPercentageByCountry = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "Falta el ID de usuario para la consulta" });
        }

        // Obtener solo las empresas administradas por el usuario y sus países
        const companies = await company.findAll({
            attributes: ["id", "companyCountry"],
            where: { TeamOwner: userId }
        });

        // Agrupar empresas por país
        const countryCompanyMap: { [country: string]: number[] } = {};
        companies.forEach((c: any) => {
            if (!countryCompanyMap[c.companyCountry]) {
                countryCompanyMap[c.companyCountry] = [];
            }
            countryCompanyMap[c.companyCountry].push(c.id);
        });

        // Para cada país, contar cotizaciones totales y vendidas
        const result: { country: string; totalQuotes: number; soldQuotes: number; salesPercentage: number }[] = [];

        for (const country in countryCompanyMap) {
            const companyIds = countryCompanyMap[country];

            const totalQuotes = await quote.count({
                where: { companyId: companyIds }
            });

            const soldQuotes = await quote.count({
                where: {
                    companyId: companyIds,
                    status: "Vendido"
                }
            });

            const salesPercentage = totalQuotes > 0 ? (soldQuotes / totalQuotes) * 100 : 0;

            result.push({
                country,
                totalQuotes,
                soldQuotes,
                salesPercentage: parseFloat(salesPercentage.toFixed(2))
            });
        }

        return res.status(200).json({ salesByCountry: result });
    } catch (error) {
        console.error("Error al calcular el porcentaje de ventas por país:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getMonthlySales = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "Falta el ID de usuario para la consulta" });
        }

        // Buscar IDs de empresas administradas por el usuario
        const companies = await company.findAll({
            attributes: ["id"],
            where: { TeamOwner: userId }
        });

        const companyIds = companies.map((c: any) => c.id);

        // Obtener ventas mensuales (solo cotizaciones vendidas)
        const sales = await quote.findAll({
            attributes: [
                [ 
                    // Agrupar por mes y año
                    // Formato: YYYY-MM
                    // Sequelize.literal para extraer año-mes de createdAt
                    // Esto depende de la base de datos, aquí se usa para MySQL y PostgreSQL
                    // Si usas otra base, ajusta el literal
                    // Para MySQL: DATE_FORMAT(createdAt, '%Y-%m')
                    // Para PostgreSQL: TO_CHAR("createdAt", 'YYYY-MM')
                    // Aquí se asume MySQL
                    // Si usas PostgreSQL, cambia a: Sequelize.literal(`TO_CHAR("createdAt", 'YYYY-MM')`)
                    // y pon alias 'month'
                    // Si usas SQLite, usa strftime('%Y-%m', createdAt)
                    // Ajusta según tu base de datos
                    // Ejemplo para MySQL:
                    // Sequelize.literal("DATE_FORMAT(createdAt, '%Y-%m')")
                    // Ejemplo para PostgreSQL:
                    // Sequelize.literal(`TO_CHAR("createdAt", 'YYYY-MM')`)
                    // Ejemplo para SQLite:
                    // Sequelize.literal("strftime('%Y-%m', createdAt)")
                    // Aquí se usa MySQL por defecto:
                    // Puedes cambiarlo si lo necesitas
                    // Si tienes dudas, dime qué base usas
                    // Por defecto:
                    // @ts-ignore
                    require('sequelize').literal("DATE_FORMAT(createdAt, '%Y-%m')"), 'month'
                ],
                [require('sequelize').fn('SUM', require('sequelize').col('total')), 'totalSales'],
                [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'salesCount']
            ],
            where: {
                companyId: companyIds,
                status: "Vendido"
            },
            group: [require('sequelize').literal("month")],
            order: [ [require('sequelize').literal("month"), 'ASC'] ]
        });

        return res.status(200).json({ monthlySales: sales });
    } catch (error) {
        console.error("Error al obtener las ventas mensuales:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getUserManagedSoldQuotes = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "Falta el ID de usuario para la consulta" });
        }

        // Buscar IDs de empresas administradas por el usuario
        const companies = await company.findAll({
            attributes: ["id"],
            where: { TeamOwner: userId }
        });

        const companyIds = companies.map((c: any) => c.id);

        // Fechas para los filtros
        const now = moment();
        const startOfThisMonth = now.clone().startOf('month').toDate();
        const endOfThisMonth = now.clone().endOf('month').toDate();
        const startOfLastMonth = now.clone().subtract(1, 'month').startOf('month').toDate();
        const endOfLastMonth = now.clone().subtract(1, 'month').endOf('month').toDate();
        const startOfYear = now.clone().startOf('year').toDate();
        const endOfYear = now.clone().endOf('year').toDate();

        // Suma de lo vendido este mes
        const soldThisMonth = await quote.sum('total', {
            where: {
                companyId: companyIds,
                status: "Vendido",
                createdAt: {
                    [Op.between]: [startOfThisMonth, endOfThisMonth]
                }
            }
        });

        // Suma de lo vendido el mes anterior
        const soldLastMonth = await quote.sum('total', {
            where: {
                companyId: companyIds,
                status: "Vendido",
                createdAt: {
                    [Op.between]: [startOfLastMonth, endOfLastMonth]
                }
            }
        });

        // Suma de lo vendido en el año
        const soldThisYear = await quote.sum('total', {
            where: {
                companyId: companyIds,
                status: "Vendido",
                createdAt: {
                    [Op.between]: [startOfYear, endOfYear]
                }
            }
        });

        return res.status(200).json({
            soldThisMonth: soldThisMonth || 0,
            soldLastMonth: soldLastMonth || 0,
            soldThisYear: soldThisYear || 0
        });
    } catch (error) {
        console.error("Error al obtener sumas de cotizaciones vendidas:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getQuoteStatusPercentages = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "Falta el ID de usuario para la consulta" });
        }

        // Buscar IDs de empresas administradas por el usuario
        const companies = await company.findAll({
            attributes: ["id"],
            where: { TeamOwner: userId }
        });

        const companyIds = companies.map((c: any) => c.id);

        if (companyIds.length === 0) {
            return res.status(200).json({ message: "El usuario no administra empresas", data: [] });
        }

        // Obtener solo las cotizaciones de las empresas administradas por el usuario
        const quotes = await quote.findAll({
            attributes: ['status', 'total'],
            where: { companyId: companyIds }
        });

        if (quotes.length === 0) {
            return res.status(200).json({ message: "No hay cotizaciones para este usuario", data: [] });
        }

        // Sumar los totales por status
        const totalsByStatus: Record<string, number> = {};
        let grandTotal = 0;

        quotes.forEach(q => {
            const status = q.getDataValue('status');
            const total = Number(q.getDataValue('total')) || 0;
            totalsByStatus[status] = (totalsByStatus[status] || 0) + total;
            grandTotal += total;
        });

        // Calcular el porcentaje por status
        const percentages = Object.entries(totalsByStatus).map(([status, total]) => ({
            status,
            total,
            percentage: grandTotal > 0 ? Number(((total / grandTotal) * 100).toFixed(2)) : 0
        }));

        return res.status(200).json({ data: percentages });
    } catch (error) {
        console.error("Error al calcular los porcentajes por status:", error);
        return res.status(500).json({ message: "Error al calcular los porcentajes por status" });
    }
};