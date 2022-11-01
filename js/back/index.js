//poner nombre de topicos como: GreenSense/Topico, asi no se repite con topicos de otras personas 
//en ese caso para suscribirte a todos nuestros topicos puedo poner: GreenSense/# 

//Variables mqtt
const mqtt = require('mqtt');

let date = "";
let time = "";

let fecha = "";
let hora = "";
let basura = 0;
let energia = 0;
let aire = 0;
let optimobasura = 1000;
let optimoenergia = 1000;
let optimoaire = 1000;

//Variables mysql
const mysql = require ('mysql');

//Variables nodemailer
const nodemailer = require ('nodemailer');
let transporter;
let mailOptions;
let email = "";
let emails = "";

//Variables express
const express = require('express');
const app = express();
const port = 4000;
const server = app.listen (port, () => {
    console.log (`> servidor en puerto ${port}, escuchando index...`);
});

//Variables socket
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost",
      methods: ["GET", "POST"]
    }
});


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
    client.subscribe('SantiR/f/G-Elc', function (err) {

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
    if (topic == "SantiR/f/G/Weight"){
        
        //Guardar valores 
        date = new Date();
        time = new Date();
        fecha = date.toLocaleDateString();
        hora = time.toLocaleTimeString();
        basura = parseFloat(message);
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
            conexion.query('SELECT gmail FROM usuarios', function (err, result) {
                
                email = JSON.parse(JSON.stringify(result));

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
                        console.log ("> error enviando mail de basura inoptima");
                        //res.status(400).send("Error: El mail de registración no ha podido ser enviado");   
                    }
                    else {
                        console.log ("> mail de basura inoptima enviado");
                    }
                });
            })   
        }

        //Insertar valores a DB
        conexion.query('INSERT INTO basura (fecha, hora, valor) VALUES ("'+fecha+'" ,"'+hora+'" ,"'+basura+'")', function (error,results,fields){
            if (error)
            throw error;
            console.log("> registro de basura insertado");  
        });   
        
    }

     //REGISTRO AIRE

    if (topic == "SantiR/f/G/Air"){

        //guardar valores (para posteriormente subirlo al grafico)
        date = new Date();
        time = new Date();
        fecha = date.toLocaleDateString();
        hora = time.toLocaleTimeString();
        aire = parseFloat(message);
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

        if (aire > 60) {
            conexion.query('SELECT gmail FROM usuarios', function (err, result) {
                
                email = JSON.parse(JSON.stringify(result));

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
                    subject: "Green Sense: aire inoptim",
                    text: "El aire pasa los 60 ICA.",
                };
                
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log ("> error enviando mail de aire inoptimo");
                        //res.status(400).send("Error: El mail de registración no ha podido ser enviado");   
                    }
                    else {
                        console.log ("> mail de aire inoptimo enviado");
                    }
                });
            })   
        }

        //Insertar valores a DB
        conexion.query('INSERT INTO aire (fecha, hora, valor) VALUES ("'+fecha+'" ,"'+hora+'" ,"'+aire+'")', function (error,results,fields){
            if (error)
            throw error;
            console.log("> registro de aire insertado");  
        });   
     }

      //REGISTRO ENERGIA
      if (topic == "SantiR/f/G-Elc"){
        //Guardar valores (para posteriormente subirlo al grafico)
        
        date = new Date();
        time = new Date();
        fecha = date.toLocaleDateString();
        hora = time.toLocaleTimeString();
        energia = parseFloat(message);
        //Mandar valores a front
         

        if (energia < optimoenergia)
        {
            optimoenergia = energia;
            io.on('connection', (socket) => {
                console.log('> dato de energia optima enviado');
                socket.emit('optimoenergia', optimoenergia);
            });
        }

        if (energia > 2000) {
            conexion.query('SELECT gmail FROM usuarios', function (err, result) {
                
                email = JSON.parse(JSON.stringify(result));

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
                    subject: "Green Sense: energia inoptima",
                    text: "La energia pasa los x kwh.",
                };
                
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log ("> error enviando mail de energia inoptima");
                        //res.status(400).send("Error: El mail de registración no ha podido ser enviado");   
                    }
                    else {
                        console.log ("> mail de energia inoptima enviado");
                    }
                });
            })   
        }

        //Insertar valores a DB
        conexion.query('INSERT INTO energia (fecha, hora, valor) VALUES ("'+fecha+'" ,"'+hora+'" ,"'+energia+'")', function (error,results,fields){
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
