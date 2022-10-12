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

        conexion.query('SELECT usuario FROM usuarios WHERE usuario = ?', [user], function (err, results, fields) {
            
            //tira error si el usuario ya existe
            if (results.length > 0) {
                console.log("Error: el nombre de usuario ya esta en uso");
                res.status(400).send("Error: El nombre de usuario ya esta en uso");
                
            }

            //Si usuario esta bien comprueba gmail
            else {
                conexion.query('SELECT gmail FROM usuarios WHERE gmail = ?', [email], function (err, results, fields) {
                    
                    //Tira error si mail esta en uso
                    if (results.length > 0) {
                        console.log("Error: el mail ya esta en uso");
                        res.status(400).send("Error: El mail ya esta en uso");   
                    }
                    
                    //Sube datos a DB si esta todo bien (FALTA COMPROBAR QUE MAIL ESTE COMPLETO)
                    else {
                        conexion.query('INSERT INTO usuarios (usuario, contrasenia, gmail) VALUES ("'+user+'" ,"'+pass+'" ,"'+email+'" )', function (error,results,fields){
                            if (error) throw error;
                            console.log ("registro insertado");
                            res.redirect("http://localhost/GreenSense/html");
                            //conexion.end();
                        });     
                    }

                });
            }

            //FALTA ERROR SI MAIL ESTA MAL ESCRITO 

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
