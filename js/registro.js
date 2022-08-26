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

conexion.connect(function(error){

    if (error){
        throw error;
    }
    else{
        console.log('conexion a DB exitosa');
    }

});

const app = express();

app.use (express.urlencoded({extended: true})); //decodificar data que pasa html

app.get ('/', (req, res) => {
    res.sendFile('C:\\AppServ\\www\\GreenSense\\html\\registrar.html');
});

app.post('/', (req,res)=>{
    
    user = req.body.usuario;
    pass = req.body.contra;
    email = req.body.mail;

    if (user == "" || pass == "" || email == "")
    {
        console.log ("error, faltan datos de registro")
    }
    else 
    {
        conexion.query('INSERT INTO usuarios (usuario, contrasenia, gmail) VALUES ("'+user+'" ,"'+pass+'" ,"'+email+'" )', function (error,results,fields){
            if (error) throw error;
            console.log ("registro insertado");
            conexion.end();
        });
        
        
    }
    /*
    if (user == "" || pass == "" || email == "")
    {
        res.status(400).send("debde ingresar todos los valores");
    }
    */

    //anda pero saca datos de replica de pagina (localhost:3000, en vez del appserv, es decir la ag principal)
   
});


/*
conexion.query("INSERT INTO usuarios (usuario, contrasenia, gmail) VALUES ('a' ,'b' ,'c')", function (error,results,fields){
    if (error)
        throw error;
            
    });
    
    conexion.end();
*/

/*
if (user == "" || pass == "" || email == "")
{
    console.log ("error, faltan datos de registro")
}
else 
{
    conexion.query('INSERT INTO usuarios (usuario, contrasenia, gmail) VALUES ("'+user+'" ,"'+pass+'" ,"'+email+'" )', function (error,results,fields){
        if (error) throw error;
    });
    
    conexion.end();
}
*/

/*
app.get ('/styles.css', (req, res) => {
    res.sendFile('C:\\AppServ\\www\\GreenSense\\css\\syles.css');
})
*/

app.listen (3000);
console.log ('Servidor en puerto 3000, escuchando...')