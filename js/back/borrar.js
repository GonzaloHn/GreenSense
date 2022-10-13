// Variables express
const express = require('express');
const app = express();
const port = 3000;

//Variables mysql
const mysql = require ('mysql');

//Variables de usuario 
let user = "";
let pass = "";

//Conexion DB
const conexion  = mysql.createConnection({
    
    host: 'localhost',
    database: 'greensense',
    user: 'root',
    password: 'rootroot'

});

//Decodificar data que pasa html
app.use (express.urlencoded({extended: true})); 

app.post('/', (req,res)=>{ 
    
    //Tomar variables de front
    user = req.body.usuario;
    pass = req.body.contra;

    //Instrucciones si el usuario puso todos los datos
    if (user && pass) {

        conexion.query('SELECT usuario FROM usuarios WHERE usuario = ? AND contrasenia = ?', [user, pass], function (err, results, fields) {
            
            //Se borra usuario si todos los datos cumplen requerimientos basicos
            if (results.length > 0) {
                conexion.query('DELETE FROM usuarios WHERE usuario = ? AND contrasenia = ?', [user, pass]);
                console.log("> usuario borrado");
                res.redirect("http://localhost/GreenSense/html");
            }

            //Tira error si el usuario o contraseña esta mal
            else {
                console.log("> usuario o contraseña incorrectos");
                res.status(400).send("Usuario o contraseña incorrectos");
            }
        });
    
    }

    //Instrucciones si le faltaron datos al usuario
    else {
        console.log("> error: faltan datos");
        res.status(400).send("Error: Debe ingresar todos los valores");
    }
    
});

//Escucha a puerto 3000
app.listen (port, () => {
    console.log (`> servidor en puerto ${port}, escuchando borrar...`);
});