const express = require('express');
const mysql = require ('mysql');

let user = "";
let pass = "";
let email = "";


const conexion  = mysql.createConnection({
    
    host: 'localhost',
    database: 'greensense',
    user: 'root',
    password: 'rootroot'

});


const app = express();

app.use (express.urlencoded({extended: true})); //decodificar data que pasa html

/*
app.get ('/', (req, res) => {
    res.sendFile('C:\\AppServ\\www\\GreenSense\\html\\registrar.html');
});
*/

app.post('/', (req,res)=>{
    
    /*
    conexion.connect(function(error){

        if (error){
            throw error;
        }
        else{
            console.log('conexion a DB exitosa');
        }
    
    });
    */
    
    user = req.body.usuario;
    pass = req.body.contra;
    email = req.body.mail;

    if (user == "" || pass == "" || email == "")
    {
        res.status(400).send("debde ingresar todos los valores");
        console.log ("error, faltan datos de registro")
    }
    else 
    {
        conexion.query('INSERT INTO usuarios (usuario, contrasenia, gmail) VALUES ("'+user+'" ,"'+pass+'" ,"'+email+'" )', function (error,results,fields){
            if (error) throw error;
            console.log ("registro insertado");
            //conexion.end();
        });
        
        
    }
   
});

/*
app.get ('/styles.css', (req, res) => {
    res.sendFile('C:\\AppServ\\www\\GreenSense\\css\\syles.css');
})
*/

app.listen (3000);
console.log ('Servidor en puerto 3000, escuchando...')