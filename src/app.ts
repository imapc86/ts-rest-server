import dotenv from 'dotenv';
import Server from './server/server';

//* Config dotenv
dotenv.config();


const server = new Server();
server.listen()

