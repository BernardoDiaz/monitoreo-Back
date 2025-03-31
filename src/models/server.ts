import express from 'express';
import cors from "cors";
//RUTAS
import routesUsers from '../routes/UserRoute/user';
import routesCliente from '../routes/MonitoreoRoutes/ClientesRoute';
import routesCategorias from '../routes/MonitoreoRoutes/CategoriasRoute';
import routesConfiguracion from '../routes/MonitoreoRoutes/ConfiguracionRoute';
import routesProductos from '../routes/MonitoreoRoutes/ProductosRoute';
//import routesSeguimiento from '../routes/MonitoreoRoutes/SeguimientoRoute';
//import routesVisitas from '../routes/MonitoreoRoutes/VisitaRoute';
//MODELOS DE BD
import { user } from './usersModels/user';
import { Clientes } from './MonitoreoModels/Clientes';
import { Categorias } from './MonitoreoModels/Categorias';
import { Configuracions } from './MonitoreoModels/Configuracion';
import { Productos } from './MonitoreoModels/Productos';
import { Seguimientos } from './MonitoreoModels/Seguimiento';
import { Visitas } from './MonitoreoModels/Visita';

class Server {
    private app: express.Application;
    private port: number;
    private host:string; 

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT as string, 10) || 8080;
        this.host = '0.0.0.0';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    };

    listen() {
        this.app.listen(this.port,this.host, () => {
            console.log('port ' + this.port);
        });
    };

    routes() {
        //endpoint usuarios
        this.app.use('/api/users', routesUsers);
        this.app.use('/api/users/login', routesUsers);
        this.app.use('/api/clientes', routesCliente);
        this.app.use('/api/categorias', routesCategorias);
        this.app.use('/api/configuracion', routesConfiguracion);
        this.app.use('/api/productos', routesProductos);
        //this.app.use('/api/seguimiento', routesSeguimiento);
        //this.app.use('/api/visitas', routesVisitas);

    };

    midlewares() {
        //parceo body
        this.app.use(express.json());
        this.app.use(express.json({ limit: '100mb' })); // Cambia '10mb' según tus necesidades
        this.app.use(express.urlencoded({ limit: '100mb', extended: true })); // También aplica para datos codificados en URL

        //cors
        this.app.use(cors());
    };

    async dbConnect() {
        try {
            await user.sync();
            await Clientes.sync();
            await Categorias.sync();
            await Configuracions.sync();
            await Productos.sync();
            await Seguimientos.sync();
            await Visitas.sync();
            await user.sync();
            console.log('Connection valid');                                                                                                                                                                                                                                                                                                    
        } catch (error) {
            console.error('Connection not valid', error);
        };
    };
};

export default Server;
