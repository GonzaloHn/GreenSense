//poner nombre de topicos como: GreenSense/Topico, asi no se repite con topicos de otras personas 
//en ese caso para suscribirte a todos nuestros topicos puedo poner: GreenSense/# 

let date = new Date();
let time = new Date();

let fecha = "";
let hora = "";
let basura = "";

const mqtt = require('mqtt');

//conexion con broker adagruit
const client = mqtt.connect('mqtt://io.adafruit.com', {
    username: 'Soficasares', 
    password: 'aio_ioNI38D91lv85Lt9AndCVzopMVXI'
}); 


const mysql = require ('mysql');

//conexion DB
const conexion  = mysql.createConnection({
            
    host: 'localhost',
    database: 'greensense',
    user: 'root',
    password: 'rootroot'

});

console.log("prueba desde mqtt");

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

//Funcion suscripcion a broker
function EventoConectar(){
    client.subscribe('G_Light', function (err) {
        if (!err){
            console.log ("Error de suscripcion");
        }
        console.log ("Suscrito a topico/s, escuchando...")
    })
}

//Accion luego de recibir mensaje
function EventoMensaje(topic, message){
    console.log(topic + " - " + message.toString())

    if (topic == "GreenSense/basura"){
        //guardar valores (para posteriormente subirlo al grafico)
        fecha = date.toLocaleDateString();
        hora = time.toLocaleTimeString();
        basura = message.toString();

        //Insertar valores a DB
        conexion.query(`INSERT INTO basura (fecha,hora,basura) VALUES (${fecha} ,${hora} ,${basura} )`, function (error,results,fields){
            if (error)
            throw error;
            console.log("registro de basura insertado");  
        });   
    }
    
    conexion.end();
    //client.end()
}

client.on('connect', EventoConectar)
client.on('message', EventoMensaje)


