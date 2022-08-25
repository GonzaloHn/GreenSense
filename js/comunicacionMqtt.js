//poner nombre de topicos como: GreenSense/Topico, asi no se repite con topicos de otras personas 
//en ese caso para suscribirte a todos nuestros topicos puedo poner: GreenSense/# 

let date = new Date();
let time = new Date();

const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://io.adafruit.com', {username:"Soficasares", password:"aio_ioNI38D91lv85Lt9AndCVzopMVXI"}); //poner pagina web broker mqtt://


const mysql = require ('mysql');
const conexion  = mysql.createConnection({
            
    host: 'localhost',
    database: 'greensense',
    user: 'root',
    password: 'rootroot'

});

conexion.connect(function(error){

    if (error){
        throw error;
    }
    else{
        console.log('conexion DB exitosa');
    }

});

function EventoConectar(){
    client.subscribe('G_Light', function (err) {
        if (!err){
            console.log ("Error de suscripcion");
        }
    })
}

function EventoMensaje(topic, message){
    //que hacer al recibir mensaje
    console.log(topic + " - " + message.toString())

    if (topic == "GreenSense/basura")
    {
        //guardar valor y subirlo al grafico
        let fecha = date.toLocaleDateString();
        let hora = time.toLocaleTimeString();
        let basura = message.toString();

        //insertar a DB
        conexion.query(`INSERT INTO basura (fecha,hora,basura) VALUES (${fecha} ,${hora} ,${basura} )`, function (error,results,fields){
            if (error)
            throw error;

            results.forEach(result => {
                console.log(result);
            });
        });

        
    }
    
    conexion.end();
    //client.end()
}

client.on('connect', EventoConectar)
client.on('message', EventoMensaje)

