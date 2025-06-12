import { Response, Request } from "express";
import { company } from "../../models/CompanyModels/company";



export const newCompany = async (req: Request, res: Response) => {

    const { companyName, companyEmail, companyPhone, companyCountry, LifeStage,
        TeamOwner, companyWeb, companyAddress, originContact } = req.body;

    try {
        //Guardando usuario en base de datos
        await company.create({
            companyName,
            companyEmail,
            companyPhone,
            companyCountry,
            LifeStage,
            TeamOwner,
            companyWeb,
            companyAddress,
            originContact
        });

        res.json({
            msg: `La empresa ${companyName} ha sido creada exitosamente`
        });
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }

};

export const getCompanys = async (req: Request, res: Response) => {
    try {
        const companys = await company.findAll();
        res.json(companys);
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    };
}

export const getCompanyById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const companyData = await company.findByPk(id);
        if (!companyData) {
            return res.status(404).json({
                msg: "Empresa no encontrada"
            });
        }
        res.json(companyData);
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
};

export const updateCompany = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { companyName, companyEmail, companyPhone, companyCountry, LifeStage,
        TeamOwner, companyWeb, companyAddress, originContact } = req.body;

    try {
        const [updated] = await company.update({
            companyName,
            companyEmail,
            companyPhone,
            companyCountry,
            LifeStage,
            TeamOwner,
            companyWeb,
            companyAddress,
            originContact
        }, {
            where: { id }
        });

        if (updated) {
            // const updatedCompany = await company.findByPk(id);
            res.json({
                msg: `La empresa ha sido actualizada exitosamente`
            });
        } else {
            res.status(404).json({
                msg: "Empresa no encontrada"
            });
        }
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
}

export const deleteCompany = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deleted = await company.destroy({
            where: { id }
        });

        if (deleted) {
            res.json({
                msg: "Empresa eliminada exitosamente"
            });
        } else {
            res.status(404).json({
                msg: "Empresa no encontrada"
            });
        }
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
}