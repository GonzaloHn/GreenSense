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

const server = app.listen(port, () => {
  console.log(`> servidor en puerto ${port}, escuchando registro...`);
});

const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost",
    methods: ["GET", "POST"]
  }
});

let basura = 10;

//Pasa valores a front si recibe conexion 
/*
io.on('connection', (socket) => {
  console.log('> dato de basura enviado');
  socket.emit('basura', basura);
});

io.on('connection', (socket) => {
  console.log('> dato de basura enviado');
  socket.emit('basura', basura++);
});
io.on('connection', (socket) => {
  console.log('> dato de basura enviado');
  socket.emit('basura', basura++);
});




io.on('connection', (socket) => {
  console.log('> dato de energia enviado');
  socket.emit('energia', '12000');
});

io.on('connection', (socket) => {
  console.log('> dato de aire enviado');
  socket.emit('aire', '3000');
});
*/

//Mandar valores a front (a todos los clientes)

//console.log('dato de basura enviado');
//io.emit('basura', basura);
//socket.emit('basura', basura);

// .---------------------------------------------------------------------------------


const mysql = require ('mysql');

let user = "prueba3000";
let pass = "aasdasd";
let email = "";
let emails = "";

//Variables nodemailer
const nodemailer = require ('nodemailer');
let transporter;
let mailOptions;

const conexion  = mysql.createConnection({
  
 host: 'localhost',
 database: 'greensense',
 user: 'root',
 password: 'rootroot'

});

conexion.query('SELECT gmail FROM usuarios', function (err, res) {

  if (err) throw err;
  

  email = JSON.parse(JSON.stringify(res));
  
   emails = email.map(function (obj) {
     return (obj.gmail);
  });

  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "greensense22@gmail.com",
        pass: "tjdngfvodfqdlsbn",
    },
  });

  mailOptions = {
      from: "Remitente",
      to: emails,
      subject: "Green Sense: Basura inoptima",
      text: "La basura pasa los x kg.",
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log ("> error enviando mail de registracion");
          //res.status(400).send("Error: El mail de registración no ha podido ser enviado");   
      }
      else {
          console.log ("> mail de registracion enviado");
      }
  });
  
  //console.log (emails);
  //console.log(email[0].gmail);



})

