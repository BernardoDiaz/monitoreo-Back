import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { user } from "../../models/usersModels/user";
import Jwt from "jsonwebtoken";

//Metodo para crear nuevo usuario
export const newUser = async (req: Request, res: Response) => {

    const { username, password, rol } = req.body;

    //Validacion de usuario
    const uservalid = await user.findOne({ where: { username: username } });

    if (uservalid) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`
        })
    }

    //Encriptacion de la password
    const hastpassword = await bcrypt.hash(password, 10);

    try {
        //Guardando usuario en base de datos
        await user.create({
            username: username,
            password: hastpassword,
            rol: rol
        });

        res.json({
            msg: `Usuario ${username} creado exitosamente con el rol de ${rol}`
        });
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }

};
//Metodo de loggin para usuarios y generacion de token
export const loginUser = async (req: Request, res: Response) => {

    const { username, password } = req.body;

    //validar si el usuario existe en bd
    const uservalidlog: any = await user.findOne({ where: { username: username } });
    //Verificar si el usuario está activado
    const userActivate: any = await user.findOne({ where: { username:username,state: 1 } });

    //Si el user no existe
    if (!uservalidlog) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} registrado`
        });
    }

    if (!userActivate) {
        return res.status(400).json({
            msg: `Cuenta Inactiva. Comunicate con soporte IT`
        });
    }
    
    //Validamos password
    const passwordvalid = await bcrypt.compare(password, uservalidlog.password);
    if (!passwordvalid) {
        return res.status(400).json({
            msg: `Tu contraseña no es correcta, intenta nuevamente`
        })
    }
    //Si todo se cumplio vamos a la Generacion de token jwt 
    const token = Jwt.sign({
        username: username,
        tdo:'hfgdbverig'
    }, process.env.SECRET_KEY || '6KgpWr@TtNW4LKMKC5J8o6b6F', );//{ expiresIn: 1800 });
    //Devolvemos el token como respuesta via JSON
    res.json(token);

};

export const getUsers = async (req: Request, res: Response) => {
    //Generamos la lista
    const listU = await user.findAll({ attributes: ['id', 'username', 'rol'] });

    //Devolvemos la respuesta via JSON
    res.json(listU);
}

export const getUserById = async (req: Request, res: Response) => {
    const { username } = req.params;
    const one = await user.findOne({ attributes: ['rol'], where: { username: username,state:1 } });

    //validacion de existencia
    try {
        if (one) {
            const myString = JSON.stringify(one).slice(8, -2);
            res.json(myString);

        } else {

            return res.status(404).json({
                msg: `No existe el usuario`
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar el usuario`
        });
    }


};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await user.findOne({ where: { id: id } });

    try {
        if (one) {
            await user.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        } else {
            res.status(404).json({
                msg: `El grado ya no existe`
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar, si hay una vinculacion, no te sera posible eliminarlo comunicate con el encargado de IT para verificar la situacion`,
            error
        });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, rol } = req.body;

    const one = await user.findOne({ where: { id: id } });

    try {
        if (one) {
            await user.update({ username, rol }, { where: { id: id } });
            res.json({
                msg: `Actualizado con exito`
            });
        } else {
            return res.status(404).json({
                msg: `No existe un registro con el id: ${id} `,
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar`,
            error
        });
    }
};