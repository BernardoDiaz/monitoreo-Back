"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//RUTAS
const user_1 = __importDefault(require("../routes/UserRoute/user"));
const ClientesRoute_1 = __importDefault(require("../routes/MonitoreoRoutes/ClientesRoute"));
const CategoriasRoute_1 = __importDefault(require("../routes/MonitoreoRoutes/CategoriasRoute"));
const ConfiguracionRoute_1 = __importDefault(require("../routes/MonitoreoRoutes/ConfiguracionRoute"));
const ProductosRoute_1 = __importDefault(require("../routes/MonitoreoRoutes/ProductosRoute"));
//import routesSeguimiento from '../routes/MonitoreoRoutes/SeguimientoRoute';
//import routesVisitas from '../routes/MonitoreoRoutes/VisitaRoute';
//MODELOS DE BD
const user_2 = require("./usersModels/user");
const Clientes_1 = require("./MonitoreoModels/Clientes");
const Categorias_1 = require("./MonitoreoModels/Categorias");
const Configuracion_1 = require("./MonitoreoModels/Configuracion");
const Productos_1 = require("./MonitoreoModels/Productos");
const Seguimiento_1 = require("./MonitoreoModels/Seguimiento");
const Visita_1 = require("./MonitoreoModels/Visita");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(process.env.PORT, 10) || 8080;
        this.host = '0.0.0.0';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    ;
    listen() {
        this.app.listen(this.port, this.host, () => {
            console.log('port ' + this.port);
        });
    }
    ;
    routes() {
        //endpoint usuarios
        this.app.use('/api/users', user_1.default);
        this.app.use('/api/users/login', user_1.default);
        this.app.use('/api/clientes', ClientesRoute_1.default);
        this.app.use('/api/categorias', CategoriasRoute_1.default);
        this.app.use('/api/configuracion', ConfiguracionRoute_1.default);
        this.app.use('/api/productos', ProductosRoute_1.default);
        //this.app.use('/api/seguimiento', routesSeguimiento);
        //this.app.use('/api/visitas', routesVisitas);
    }
    ;
    midlewares() {
        //parceo body
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.json({ limit: '100mb' })); // Cambia '10mb' según tus necesidades
        this.app.use(express_1.default.urlencoded({ limit: '100mb', extended: true })); // También aplica para datos codificados en URL
        //cors
        this.app.use((0, cors_1.default)());
    }
    ;
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_2.user.sync();
                yield Clientes_1.Clientes.sync();
                yield Categorias_1.Categorias.sync();
                yield Configuracion_1.Configuracions.sync();
                yield Productos_1.Productos.sync();
                yield Seguimiento_1.Seguimientos.sync();
                yield Visita_1.Visitas.sync();
                yield user_2.user.sync();
                console.log('Connection valid');
            }
            catch (error) {
                console.error('Connection not valid', error);
            }
            ;
        });
    }
    ;
}
;
exports.default = Server;
