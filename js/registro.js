const express = require('express');
const app = express();
const port = 3000;

const mysql = require ('mysql');

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



app.use (express.urlencoded({extended: true})); //decodificar data que pasa html

app.post('/', (req,res)=>{
    
    
    user = req.body.usuario;
    pass = req.body.contra;
    email = req.body.mail;

    
    conexion.query('SELECT usuario FROM usuarios WHERE usuario= ?', [user], function (err, row) {
        //tira error si el usuario ya existe
        if (row && row.length) {
            console.log("Error: el usuario ya existe");
            res.status(400).send("Error: El nombre de usuario ya existe");
        }
        //tira error si faltan valores (no anda bien)
        else if (user == "" || pass == "" || email == "")
        {
            //tira error enpuerto 3000 (deberia redirijrlo al front despues)
            res.status(400).send("Error: Debe ingresar todos los valores");
            console.log ("error, faltan datos de registro")
        }
        //Insertar regisistro a DB
        else 
        {
            conexion.query('INSERT INTO usuarios (usuario, contrasenia, gmail) VALUES ("'+user+'" ,"'+pass+'" ,"'+email+'" )', function (error,results,fields){
                if (error) throw error;
                console.log ("registro insertado");

                //redirije a pagina principal front
                res.redirect("http://localhost/GreenSense/html");
                //conexion.end();
            });
            
            
        }
    });
    

   //ESTE CODIGO INSERTA, NO LE IMPORTA LA UNIQUE ID 
   /*
    conexion.query('INSERT INTO usuarios (usuario, contrasenia, gmail) VALUES ("'+user+'" ,"'+pass+'" ,"'+email+'" )', function (error,results,fields){
        
        if( error & error != "ER_DUP_ENTRY" ){
            // do normal error handling
            console.log ("registro insertado");
            //redirije a pagina principal front
            res.redirect("http://localhost/GreenSense/html");
            //conexion.end();
          }
        else if (user == "" || pass == "" || email == "")
        {
            //tira error enpuerto 3000 (deberia redirijrlo al front despues)
            res.status(400).send("Error: Debe ingresar todos los valores");
            console.log ("error, faltan datos de registro")
        }
        else {
            res.status(400).send("Error: usuario o mail repetidos");
            console.log ("error, usuario o email repetido")
        }
        
    });
    */
    

});

/*
app.get ('/styles.css', (req, res) => {
    res.sendFile('C:\\AppServ\\www\\GreenSense\\css\\syles.css');
})
*/

//escucha a puerto 3000
app.listen (port, () => {
    console.log (`Servidor en puerto ${port}, escuchando registro...`);
});
