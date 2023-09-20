//poner nombre de topicos como: GreenSense/Topico, asi no se repite con topicos de otras personas 
//en ese caso para suscribirte a todos nuestros topicos puedo poner: GreenSense/# 

const dotenv = require("dotenv")

dotenv.config()


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
/*
const nodemailer = require ('nodemailer');
let transporter;
let mailOptions;
let email = "";
let emails = "";
*/

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
    password: process.env.ADAFRUITPWD,
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

    console.log("\n> conectado a broker de adafruit");

    //o /g-air -- tambien ver de que el feed se llame g/air asi me suscribo a g/# (si no anda /f poner /feeds)
    client.subscribe('SantiR/f/g-air', function (err) {

        if (!err){
            console.log ("> suscrito a topico g-air, escuchando...");
        }
        else {
            console.log ("> error de suscripcion topico g-air");
        }
    });

    client.subscribe('SantiR/f/g-elc', function (err) {

        if (!err){
            console.log ("> suscrito a topico g-elc, escuchando...");
        }
        else {
            console.log ("> error de suscripcion topico g-elc");
        }
    });

    client.subscribe('SantiR/f/g-weigh', function (err) {

        if (!err){
            console.log ("> suscrito a topico g-weigh, escuchando...");
        }
        else {
            console.log ("> error de suscripcion topico g-weigh");
        }
    });
});

//Accion luego de recibir mensaje
client.on('message', function(topic, message){

    console.log(topic + " - " + message.toString())

      
    //REGISTRO BASURA
    if (topic == "SantiR/f/g-weigh"){
        
        //Guardar valores 
        date = new Date();
        time = new Date();
        fecha = date.toLocaleDateString();
        hora = time.toLocaleTimeString();
        basura = parseFloat(message);
        //Mandar valores a front
        console.log('> dato de basura enviado');
        io.emit('basura', basura);

        if (basura < optimobasura)
        {
            optimobasura = basura;
        }

        console.log('> dato de basura optima enviado');
        io.emit('optimobasura', optimobasura);
    

        //Esto mandaria muchos mails, tiene que mandar solo uno (ademas no se si manda mails a todos bien)
        /*
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
                    }
                    else {
                        console.log ("> mail de basura inoptima enviado");
                    }
                });
            })   
        }
        */

        //Insertar valores a DB
        conexion.query('INSERT INTO basura (fecha, hora, valor) VALUES ("'+fecha+'" ,"'+hora+'" ,"'+basura+'")', function (error,results,fields){
            if (error)
            throw error;
            console.log("> registro de basura insertado");  
        });   
        
    }

     //REGISTRO AIRE

    if (topic == "SantiR/f/g-air"){

        //guardar valores (para posteriormente subirlo al grafico)
        date = new Date();
        time = new Date();
        fecha = date.toLocaleDateString();
        hora = time.toLocaleTimeString();
        aire = parseFloat(message);

        //Mandar valores a front        
        console.log('> dato de aire enviado');
        io.emit('aire', aire);

        if (aire < optimoaire)
        {
            optimoaire = aire;
        }

        console.log('> dato de aire optimo enviado');
        io.emit('optimoaire', optimoaire);

        /*
        if (aire > 181) {
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
        */

        //Insertar valores a DB
        conexion.query('INSERT INTO aire (fecha, hora, valor) VALUES ("'+fecha+'" ,"'+hora+'" ,"'+aire+'")', function (error,results,fields){
            if (error)
            throw error;
            console.log("> registro de aire insertado");  
        });   
     }

      //REGISTRO ENERGIA
      if (topic == "SantiR/f/g-elc"){
        
        //Guardar valores (para posteriormente subirlo al grafico)
        date = new Date();
        time = new Date();
        fecha = date.toLocaleDateString();
        hora = time.toLocaleTimeString();
        energia = parseFloat(message);
        
        //Mandar valores a front
        console.log('> dato de electricidad enviado');
        io.emit('energia', energia);

        if (energia < optimoenergia)
        {
            optimoenergia = energia;
        }

        console.log('> dato de energia optima enviado');
        io.emit('optimoenergia', optimoenergia);

        /*
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
                    }
                    else {
                        console.log ("> mail de energia inoptima enviado");
                    }
                });
            })   
        }
        */

        //Insertar valores a DB
        conexion.query('INSERT INTO energia (fecha, hora, valor) VALUES ("'+fecha+'" ,"'+hora+'" ,"'+energia+'")', function (error,results,fields){
            if (error)
            throw error;
            console.log("> registro de energia insertado");  
        });   
    }     
});

