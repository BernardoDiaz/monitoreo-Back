import express from 'express';
import cors from "cors";
//RUTAS
import routesUsers from '../routes/UserRoute/user.Route';
import routesCompany from '../routes/CompanyRoutes/company.Route';
import routesNote from '../routes/CompanyRoutes/note.Route';
import routesRegisterActivities from '../routes/CompanyRoutes/registerActivities.Route';
import routesProgram from '../routes/CompanyRoutes/program.Route';
import routesTask from '../routes/CompanyRoutes/task.Route';
import routesQuote from '../routes/Quote/quote.Route';
import routesQuoteDetails from '../routes/Quote/quoteDetails.Route';
import routesDashboard from '../routes/DashboardRoute/dashboard.Route';

//MODELOS DE BD
import { user } from './usersModels/user';
import { company } from './CompanyModels/company';
import { note } from './CompanyModels/note'; 
import { registerActivities } from './CompanyModels/registerActivities';
import { program } from './CompanyModels/program';
import { task } from './CompanyModels/task';
import { quote } from './Quote/quote';
import { quoteDetails } from './Quote/quoteDetails';

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
        this.app.use('/api/companys', routesCompany);
        this.app.use('/api/notes', routesNote);
        this.app.use('/api/activities', routesRegisterActivities);
        this.app.use('/api/programs', routesProgram);
        this.app.use('/api/tasks', routesTask);
        this.app.use('/api/quote', routesQuote);
        this.app.use('/api/quotedetails', routesQuoteDetails);
        this.app.use('/api/dashboard', routesDashboard);

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
            await company.sync(); 
            await note.sync();
            await registerActivities.sync();
            await program.sync();
            await task.sync(); 
            await quote.sync();
            await quoteDetails.sync();
            console.log('Connection valid');                                                                                                                                                                                                                                                                                                    
        } catch (error) {
            console.error('Connection not valid', error);
        };
    };
};

export default Server;
