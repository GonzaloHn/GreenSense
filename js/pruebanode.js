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

let basura = 10;

 const io = require('socket.io')(9000);

 io.on('connection', socket => {
    console.log ('dato de basura enviado');
    socket.emit('basura', basura);
});

