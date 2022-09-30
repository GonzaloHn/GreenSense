//poner nombre de topicos como: GreenSense/Topico, asi no se repite con topicos de otras personas 
//en ese caso para suscribirte a todos nuestros topicos puedo poner: GreenSense/# 


const mqtt = require('mqtt');

const mysql = require ('mysql');

const express = require('express');
const app = express();
const port = 9000;

const io = require('socket.io');



let date = new Date();
let time = new Date();

let fecha = "";
let hora = "";
let basura = "";
let energia = "";
let aire = "";

//timer
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





//conexion con broker adafruit (key va cambiando)
const client = mqtt.connect('mqtt://io.adafruit.com', {
    //username: 'Soficasares', 
    //password: 'aio_MrNz95gaeOlLSkBTwzS3xyQrgBII'
    username: 'SantiR', 
    password: 'aio_NDug04yb9PQpvqkV81gFzyWRhMPv'
}); 


//conexion DB
const conexion  = mysql.createConnection({
            
    host: 'localhost',
    database: 'greensense',
    user: 'root',
    password: 'rootroot'

});


//conectar a DB (ya ser conecta antes, este codigo no funciona)
/*
conexion.connect(function(error){

    if (error){
        throw error;
    }
    else{
        console.log('conexion DB exitosa');
    }

});
*/

//Funcion conexion y suscripcion a broker
client.on('connect', function(){

    console.log("conectado a adafruit");

    client.subscribe('G_Air', function (err) {

        if (!err){
            console.log ("Suscrito a topico/s, escuchando...");
        }
        else {
            console.log ("error de suscripcion");
        }
    });
});

//Accion luego de recibir mensaje
client.on('message', function(topic, message){

    console.log(topic + " - " + message.toString())

      
    //registro basura
    if (topic == "GreenSense/basura"){
        //guardar valores 
        fecha = date.toLocaleDateString();
        hora = time.toLocaleTimeString();
        basura = message.toString();

        //pasar valores a front
        io.on('connection', socket => {
            console.log ('dato de basura enviado');
            socket.emit('basura', basura);
        });

        //cada vez que llegue valor se va a reiniciar timer (no va a funcionar)
        basuraDB();
    }

     //registro aire
     if (topic == "GreenSense/aire"){
        //guardar valores (para posteriormente subirlo al grafico)
        fecha = date.toLocaleDateString();
        hora = time.toLocaleTimeString();
        aire = message.toString();

        //pasar valores a front
        io.on('connection', socket => {
            console.log ('dato de basura enviado');
            socket.emit('aire', aire);
        });

        //Insertar valores a DB
        conexion.query(`INSERT INTO aire (fecha, hora, valor) VALUES (${fecha} ,${hora} ,${aire} )`, function (error,results,fields){
            if (error)
            throw error;
            console.log("registro de aire insertado");  
        });   
     }

      //registro energia
      if (topic == "GreenSense/energia"){
        //guardar valores (para posteriormente subirlo al grafico)
        fecha = date.toLocaleDateString();
        hora = time.toLocaleTimeString();
        energia = message.toString();

        //pasar valores a front
        io.on('connection', socket => {
            console.log ('dato de basura enviado');
            socket.emit('energia', energia);
        });

        //Insertar valores a DB
        conexion.query(`INSERT INTO energia (fecha, hora, valor) VALUES (${fecha} ,${hora} ,${energia} )`, function (error,results,fields){
            if (error)
            throw error;
            console.log("registro de energia insertado");  
        });   
     }
     

    //conexion.end();
    //client.end()
});

//escucha a puerto 9000
app.listen (port, () => {
    console.log (`Servidor en puerto ${port}, escuchando registro...`);
});

