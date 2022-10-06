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
 
 const io = require('socket.io')
 const express = require('express');
 const app = express();
 const port = 9000;
 

 let basura = 10;
  
 io.on('connection', socket => {
  console.log ('dato de basura enviado');
  socket.emit('basura', basura);
});

//escucha a puerto 9000
app.listen (port, () => {
  console.log (`Servidor en puerto ${port}, escuchando registro...`);
});

 /*
   io.on('basura', basura);
  console.log ('dato de basura enviado');
*/

 



 
