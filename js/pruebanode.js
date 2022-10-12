/*
async function init() {
    console.log(1);
    await sleep(1000);
    console.log(2);
  }
  
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

 init();
 */

 const express = require('express');
 const app = express();
 const port = 9000;
 const server = app.listen(port);
 const io = require('socket.io')(server);

 let basura = 10;
  
 //Pasa valores a front si recibe conexion
 /*
  io.on('connection', (socket) => {
  console.log ('dato de basura enviado');
  socket.emit('basura', basura);
  });
  */

  //Mandar valores a front (a todos los clientes)
  console.log ('dato de basura enviado');
  io.emit('basura', basura);


  //escucha a puerto 9000
/*
app.listen (port, () => {
  console.log (`Servidor en puerto ${port}, escuchando registro...`);
});
*/

 /*
   io.on('basura', basura);
  console.log ('dato de basura enviado');
*/

 



 
