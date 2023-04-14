import express, { Application } from 'express';
import cors from 'cors'

import itemsRoutes from '../routes/items';
import { dbConection } from '../database/config';

class Server{

  private app: Application;

  private port: string;

  private apiPaths = {
    items: '/api/items'
  }

  constructor(){

    this.app = express();
    this.port = process.env.PORT || '8080';
    
    // Start database
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // App routes
    this.routes();
  }

  async conectarDB() {
    await dbConection();
  }

  middlewares(){

    // CORS
    this.app.use( cors() );

    // Lectura y parseo del body
    this.app.use( express.json() );

    //? Public folder (optional)
    // this.app.use( express.static('public'));

  }

  routes(){

    this.app.use(this.apiPaths.items, itemsRoutes);

  }

  listen(){

    this.app.listen(this.port, () => {

      console.log('Servidor corriendo en el puerto: '+ this.port);

    });

  }
}

export default Server;