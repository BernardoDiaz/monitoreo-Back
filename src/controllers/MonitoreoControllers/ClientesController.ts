import { Response, Request } from "express";
import { Clientes } from "../../models/MonitoreoModels/Clientes";


export const newCliente = async (req: Request, res: Response) => {

    const { empresa, contacto,telefonoFijo,celular,correo,pais } = req.body;

    try {
        //Guardando usuario en base de datos
        await Clientes.create({
            empresa: empresa,
            contacto: contacto,
            telefonoFijo: telefonoFijo,
            celular: celular,
            correo: correo,
            pais: pais
        });

        res.json({
            msg: `El contacto ${contacto} de la empresa "${empresa}" ha sido creado exitosamente`
        });
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }

};

export const getClientes = async (req:Request,res:Response) =>{
try {
    const clientes = await Clientes.findAll({
        attributes:['id','empresa','contacto','telefonoFijo','celular','correo','pais'],
    });
    res.json(clientes);
} catch (error) {
    res.status(400).json({
        msg: "Ups ocurrio un error",
        error
    })
};
}

export const updateCliente = async (req: Request, res: Response) => {

    const { id } = req.params;
    const one = await Clientes.findOne({ where: { id: id } });
    const { empresa, contacto,telefonoFijo,celular,correo,pais } = req.body;

    try {
        if (one) {
            await Clientes.update({ empresa,contacto,telefonoFijo,celular,correo,pais }, { where: { id: id } });
        }else {
            return res.status(404).json({
                msg: `El registro no existe`,
            });
        }

        res.json({
            msg: `El contacto ${contacto} de la empresa "${empresa}" ha sido actualizado exitosamente`
        });
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }

};

export const deleteCliente = async (req: Request, res: Response) => {

    const { id } = req.params;

    const one = await Clientes.findOne({ where: { id: id } });
    try {

        if (one) {
            await Clientes.destroy({ where: { id: id } });
        }else {
            return res.status(404).json({
                msg: `El registro no existe o fue eliminado`,
            });
        }

        res.json({
            msg: `El contacto ha sido eliminado exitosamente`
        });
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }

}