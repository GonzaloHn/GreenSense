// Variables express
const express = require('express');
const app = express();
const port = 9000; //necesitaria poner otro puerto aca
const server = app.listen (port, () => {
    console.log (`> servidor en puerto ${port}, escuchando borrar...`);
});;

//Variables socket
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost",
      methods: ["GET", "POST"]
    }
  });
//Variables mysql
const mysql = require ('mysql');

//Variables nodemailer
const nodemailer = require ('nodemailer');
let transporter;
let mailOptions;

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

app.post('/', (req,res)=>{ 
    
    //Tomar variables de front
    user = req.body.usuario;
    pass = req.body.contra;

    //Instrucciones si el usuario puso todos los datos
    if (user && pass) {

        conexion.query('SELECT usuario FROM usuarios WHERE usuario = ? AND contrasenia = ?', [user, pass], function (err, results, fields) {
            
            //Se borra usuario si todos los datos cumplen requerimientos basicos
            if (results.length > 0) {

                //no se si esto agarra bien mail para enviarle a user
                conexion.query('SELECT gmail FROM usuarios WHERE usuario = ? AND contrasenia = ?' [user, pass], function (err, res) {
                    email = res;
                    console.log(email);
                })

                conexion.query('DELETE FROM usuarios WHERE usuario = ? AND contrasenia = ?', [user, pass]);
                console.log("> usuario borrado");
                res.redirect("http://localhost/GreenSense/html");

                transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: "greensense22@gmail.com",
                        pass: "tsagmhszxpxreyck",
                    },
                });

                mailOptions = {
                    from: "Remitente",
                    to: email,
                    subject: "Cuenta borrada en Green Sense",
                    text: "Su cuenta de Green Sense ha sido borrada exitosamente.",
                };
                
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log ("> error enviando mail de borrado de cuenta");
                        //res.status(400).send("Error: El mail de registración no ha podido ser enviado");   
                    }
                    else {
                        console.log ("> mail de borrado de cuenta enviado");
                    }
                });

            }

            //Tira error si el usuario o contraseña esta mal
            else {
                console.log("> usuario o contraseña incorrectos");
                res.status(400).send("Usuario o contraseña incorrectos");
                io.on('connection', (socket) => {
                    console.log('> error de datos incorrectos enviado');
                    socket.emit('errorincor', 'error');
                  });
                
            }
        });
    
    }

    //Instrucciones si le faltaron datos al usuario
    else {
        console.log("> error: faltan datos");
        res.status(400).send("Error: Debe ingresar todos los valores");
        io.on('connection', (socket) => {
            console.log('> error de falta de datos incorrectos enviado');
            socket.emit('errordatos', 'error');
          });
    }
    
});

//Escucha a puerto 3000
/*
app.listen (port, () => {
    console.log (`> servidor en puerto ${port}, escuchando borrar...`);
});
*/