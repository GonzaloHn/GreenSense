//poner nombre de topicos como: GreenSense/Topico, asi no se repite con topicos de otras personas 
//en ese caso para suscribirte a todos nuestros topicos puedo poner: GreenSense/# 

const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://test.mosquitto.org'); //poner pagina web broker

function EventoConectar(){
    client.subscribe('topicoEscuchar', function (err) {
        if (!err){
            
        }
    })
}

function EventoMensaje(topic, message){
    //que hacer al recibir mensaje
    console.log(topic + " - " + message.toString())

    if (topic == "GreenSense/basura")
    {
        //insertar a DB
    }
    
    //client.end()
}

client.on('connect', EventoConectar)
client.on('message', EventoMensaje)


