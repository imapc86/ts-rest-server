import http from 'http';
import express, { Application } from 'express';
import socketIo, { Server as SocketIOServer } from 'socket.io';

//import cors from 'cors'

import itemsRoutes from '../routes/items';
import { dbConection } from '../database/config';

class Server{

  private app: Application;

  private port: string;

  private apiPaths = {
    items: '/api/items'
  }

  private server: http.Server;

  private io: SocketIOServer;

  constructor(){

    this.app = express();
    this.port = process.env.PORT || '8080';

    //* Config socket
    this.server = http.createServer(this.app);
    this.io = new socketIo.Server(this.server, {
      cors: {
        origin: true,
        credentials: true
      }
    });
    
    //* Start database
    this.conectarDB();

    //* Middlewares
    this.middlewares();

    //* App routes
    this.routes();

    //* Socket
    this.sockets();
  }

  async conectarDB() {
    await dbConection();
  }

  middlewares(){

    // CORS
    //this.app.use( cors() );

    // Lectura y parseo del body
    this.app.use( express.json() );

    //? Public folder (optional)
    this.app.use( express.static('src/public'));
    
  }

  routes(){

    this.app.use(this.apiPaths.items, itemsRoutes);

  }

  sockets(){

    this.io.on('connection', socket => {

      console.log('Cliente conectado =>', socket.id);

      const { nameRoom = 'default' } = socket.handshake.query;

      socket.join(nameRoom)

      socket.on('coords', coords => {
        //console.log(coords);
        socket.to(nameRoom).emit('coords', coords);
      });

      socket.on('disconnect', ()=>{
        console.log('cliente desconectado =>', socket.id);
      });

    });
  }

  listen(){

    //* Funcionando con socket.io
    this.server.listen(this.port, () => {
      console.log('Servidor sockets corriendo en el puerto: '+ this.port);
    });

    //! Funcionando con express:
    // this.app.listen(this.port, () => {
    //   console.log('Servidor corriendo en el puerto: '+ this.port);
    // });
  }
}

export default Server;