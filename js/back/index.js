//poner nombre de topicos como: GreenSense/Topico, asi no se repite con topicos de otras personas 
//en ese caso para suscribirte a todos nuestros topicos puedo poner: GreenSense/# 

//Variables mqtt
const mqtt = require('mqtt');

let date = new Date();
let time = new Date();

let fecha = "";
let hora = "";
let basura = "";
let energia = "";
let aire = "";
let optimobasura = 1;
let optimoenergia = 1;
let optimoaire = 1;

//Variables mysql
const mysql = require ('mysql');

//Variables nodemailer
const nodemailer = require ('nodemailer');
let transporter;
let mailOptions;

//Variables express
const express = require('express');
const app = express();
const port = 4000;
const server = app.listen (port, () => {
    console.log (`> servidor en puerto ${port}, escuchando registro...`);
});

//Variables socket
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost",
      methods: ["GET", "POST"]
    }
  });
//timer
/*
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

//prueba timer (no va a andar)
async function basuraDB() {
    //esperar 15 mins
    await sleep(900000);
    //Insertar valores a DB
    conexion.query(`INSERT INTO basura (fecha, hora, valor) VALUES (${fecha} ,${hora} ,${basura} )`, function (error,results,fields){
        if (error)
        throw error;
        console.log("registro de basura insertado");  
    });   
  }
*/


//conexion con broker adafruit (key va cambiando)
const client = mqtt.connect('mqtt://io.adafruit.com', {
    //username: 'Soficasares', 
    //password: 'aio_MrNz95gaeOlLSkBTwzS3xyQrgBII'
    username: 'SantiR', 
    password: 'aio_YPHY89pviqnN5VscYugHsos3Kdd4'
}); 


//conexion DB
const conexion  = mysql.createConnection({
            
    host: 'localhost',
    database: 'greensense',
    user: 'root',
    password: 'rootroot'

});

//Conexion y suscripcion a broker
client.on('connect', function(){

    console.log("> conectado a broker de adafruit");

    //o /g-air -- tambien ver de que el feed se llame g/air asi me suscribo a g/# (si no anda /f poner /feeds)
    client.subscribe('SantiR/f/G_Air', function (err) {

        if (!err){
            console.log ("> suscrito a topico/s, escuchando...");
        }
        else {
            console.log ("> error de suscripcion");
        }
    });
});

//Accion luego de recibir mensaje
client.on('message', function(topic, message){

    console.log(topic + " - " + message.toString())

      
    //REGISTRO BASURA
    if (topic == "G/weigh"){
        
        //Guardar valores 
        fecha = date.toLocaleDateString();
        hora = time.toLocaleTimeString();
        basura = message.toString();

        //Mandar valores a front
        io.on('connection', (socket) => {
            console.log('> dato de basura enviado');
            socket.emit('basura', basura);
        });

        if (basura < optimobasura)
        {
            basura = optimobasura;
            io.on('connection', (socket) => {
                console.log('> dato de basura optima enviado');
                socket.emit('optimobasura', optimobasura);
            });
        }
    

        //Esto mandaria muchos mails, tiene que mandar solo uno (ademas no se si manda mails a todos bien)
        
        if (basura > 500) {
            conexion.query('SELECT gmail FROM usuarios', function (err, res) {
                email = res;
            })
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
                to: email,
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
        }
        
        //Cada vez que llegue valor se va a reiniciar timer (no va a funcionar)
        //basuraDB();
    }

     //REGISTRO AIRE

    if (topic == "G-Air"){

        //guardar valores (para posteriormente subirlo al grafico)
        fecha = date.toLocaleDateString();
        hora = time.toLocaleTimeString();
        aire = message.toString();

        //Mandar valores a front
        io.on('connection', (socket) => {
            console.log('> dato de aire enviado');
            socket.emit('aire', aire);
        });

        if (aire < optimoaire)
        {
            aire = optimoaire;
            io.on('connection', (socket) => {
                console.log('> dato de aire optimo enviado');
                socket.emit('optimoaire', optimoaire);
            });
        }

        //Insertar valores a DB
        conexion.query(`INSERT INTO aire (fecha, hora, valor) VALUES (${fecha} ,${hora} ,${aire} )`, function (error,results,fields){
            if (error)
            throw error;
            console.log("> registro de aire insertado");  
        });   
     }

      //REGISTRO ENERGIA
      if (topic == "GreenSense/energia"){
        //Guardar valores (para posteriormente subirlo al grafico)
        fecha = date.toLocaleDateString();
        hora = time.toLocaleTimeString();
        energia = message.toString();

        //Mandar valores a front
         

        if (energia < optimoenergia)
        {
            energia = optimoenergia;
            io.on('connection', (socket) => {
                console.log('> dato de energia optima enviado');
                socket.emit('optimoenergia', optimoenergia);
            });
        }

        //Insertar valores a DB
        conexion.query(`INSERT INTO energia (fecha, hora, valor) VALUES (${fecha} ,${hora} ,${energia} )`, function (error,results,fields){
            if (error)
            throw error;
            console.log("> registro de energia insertado");  
        });   
    }     

    //conexion.end();
    //client.end()
});

//escucha a puerto 9000
/*
app.listen (port, () => {
    console.log (`Servidor en puerto ${port}, escuchando registro...`);
});
*/
