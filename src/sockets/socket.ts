import socketIo, { Socket } from "socket.io";

export const disconnect = (cliente: Socket) => {

  cliente.on('disconnect', ()=> {

    console.log(`Cliente desconectado ${cliente.id}`);

  });

}

//* Escuchar mensajes
export const message = (cliente: Socket, io:socketIo.Server) =>{

  cliente.on('message', (payload: {from:string, body:string})=>{

    //io.emit('new-message', payload);
    console.log(io);

    cliente.broadcast.emit('new-message', payload);
  });

}