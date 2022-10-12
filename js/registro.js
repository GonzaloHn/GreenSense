// Variables express
const express = require('express');
const app = express();
const port = 3000;

//Variables mysql
const mysql = require ('mysql');

//Variables de usuario 
let user = "";
let pass = "";
let email = "";

//Conexion DB
const conexion  = mysql.createConnection({
    
    host: 'localhost',
    database: 'greensense',
    user: 'root',
    password: 'rootroot'

});

//Decodificar data que pasa html
app.use (express.urlencoded({extended: true})); 

//Accion al recibir post desde front
app.post('/', (req,res)=>{    
    
    //Tomar variables de front
    user = req.body.usuario;
    pass = req.body.contra;
    email = req.body.mail;

    //Instrucciones si el usuario puso todos los datos
    if (user && pass && email) {

        conexion.query('SELECT usuario FROM usuarios WHERE usuario= ?', [user], function (err, results, fields) {
            
            //tira error si el usuario ya existe
            if (results.length > 0) {
                console.log("Error: el usuario ya existe");
                res.status(400).send("Error: El nombre de usuario ya existe");
                
            }

            //Inserta registro a DB si todos los datos cumplen requerimientos basicos
            else {

                conexion.query('INSERT INTO usuarios (usuario, contrasenia, gmail) VALUES ("'+user+'" ,"'+pass+'" ,"'+email+'" )', function (error,results,fields){
                    if (error) throw error;
                    console.log ("registro insertado");
                    res.redirect("http://localhost/GreenSense/html");
                    //conexion.end();
                });
            }

            //Falta error si mail ya esta en uso o si mail esta mal escrito 

        });
    }

    //Instrucciones si le faltaron datos al usuario
    else {
        res.status(400).send("Error: Debe ingresar todos los valores");
        console.log ("error, faltan datos de registro")
    }
    
});

//Escucha a puerto 3000
app.listen (port, () => {
    console.log (`Servidor en puerto ${port}, escuchando registro...`);
});
