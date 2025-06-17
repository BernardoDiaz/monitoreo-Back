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
const user_Route_1 = __importDefault(require("../routes/UserRoute/user.Route"));
const company_Route_1 = __importDefault(require("../routes/CompanyRoutes/company.Route"));
const note_Route_1 = __importDefault(require("../routes/CompanyRoutes/note.Route"));
const registerActivities_Route_1 = __importDefault(require("../routes/CompanyRoutes/registerActivities.Route"));
const program_Route_1 = __importDefault(require("../routes/CompanyRoutes/program.Route"));
const task_Route_1 = __importDefault(require("../routes/CompanyRoutes/task.Route"));
const quote_Route_1 = __importDefault(require("../routes/Quote/quote.Route"));
const quoteDetails_Route_1 = __importDefault(require("../routes/Quote/quoteDetails.Route"));
const dashboard_Route_1 = __importDefault(require("../routes/DashboardRoute/dashboard.Route"));
//MODELOS DE BD
const user_1 = require("./usersModels/user");
const company_1 = require("./CompanyModels/company");
const note_1 = require("./CompanyModels/note");
const registerActivities_1 = require("./CompanyModels/registerActivities");
const program_1 = require("./CompanyModels/program");
const task_1 = require("./CompanyModels/task");
const quote_1 = require("./Quote/quote");
const quoteDetails_1 = require("./Quote/quoteDetails");
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
        this.app.use('/api/users', user_Route_1.default);
        this.app.use('/api/companys', company_Route_1.default);
        this.app.use('/api/notes', note_Route_1.default);
        this.app.use('/api/activities', registerActivities_Route_1.default);
        this.app.use('/api/programs', program_Route_1.default);
        this.app.use('/api/tasks', task_Route_1.default);
        this.app.use('/api/quote', quote_Route_1.default);
        this.app.use('/api/quotedetails', quoteDetails_Route_1.default);
        this.app.use('/api/dashboard', dashboard_Route_1.default);
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
                yield user_1.user.sync();
                yield company_1.company.sync();
                yield note_1.note.sync();
                yield registerActivities_1.registerActivities.sync();
                yield program_1.program.sync();
                yield task_1.task.sync();
                yield quote_1.quote.sync();
                yield quoteDetails_1.quoteDetails.sync();
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
