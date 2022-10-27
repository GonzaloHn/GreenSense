// Variables express
const { RestartProcess } = require('concurrently');
const express = require('express');
const app = express();
const port = 3000;
const server = app.listen (port, () => {
    console.log (`> servidor en puerto ${port}, escuchando registro...`);
});

/*
const sesion = require ('express-session');
const flash = require ('connect-flash');
app.use(sesion({
    secret: 'a',
    cookie: {maxAge: 60000},
    saveUninitialized: false,
    resave: false
}));
app.use(flash());
*/

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
                console.log("> error: el nombre de usuario ya esta en uso");
                res.status(400).send("Error: El nombre de usuario ya esta en uso");
                io.on('connection', (socket) => {
                    console.log('> dato de error de usuario enviado');
                    socket.emit('errorusu', 'error');
                  });
            }

            //Si usuario esta bien comprueba gmail
            else {
                conexion.query('SELECT gmail FROM usuarios WHERE gmail = ?', [email], function (err, results, fields) {
                    
                    //Tira error si mail esta en uso
                    if (results.length > 0) {
                        console.log("> error: el mail ya esta en uso");
                        res.status(400).send("Error: El mail ya esta en uso");   
                        io.on('connection', (socket) => {
                            console.log('> dato de error de mail enviado');
                            socket.emit('errormail', 'error');
                          });
                    }
                    
                    //Sube datos a DB y mandar mail de registro si esta todo bien (FALTA COMPROBAR QUE MAIL ESTE COMPLETO)
                    else {
                        conexion.query('INSERT INTO usuarios (usuario, contrasenia, gmail) VALUES ("'+user+'" ,"'+pass+'" ,"'+email+'" )', function (error,results,fields){
                            if (error) throw error;
                            console.log ("> registro insertado");
                            res.redirect("http://localhost/GreenSense/html/cuentaCreada.html");

                            transporter = nodemailer.createTransport({
                                host: "smtp.gmail.com",
                                port: 465,
                                secure: true,
                                auth: {
                                    user: "greensense22@gmail.com",
                                    pass: "tjdngfvodfqdlsbn",
                                },
                            });

                            mailOptions = {
                                from: "greensense22@gmail.com",
                                to: email,
                                subject: "Registro en Green Sense",
                                text: "Su cuenta de Green Sense ha sido creada exitosamente.",
                            };
                            
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    console.log ("> error enviando mail de registracion");
                                    console.log (error);
                                    //res.status(400).send("Error: El mail de registración no ha podido ser enviado");   
                                }
                                else {
                                    console.log ("> mail de registracion enviado");
                                }
                            });
                            
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
        console.log ("> error, faltan datos de registro");
        io.on('connection', (socket) => {
            console.log('> dato de error de datos enviado');
            socket.emit('errordatos', 'error');
          });
        
        //req.flash('error', 'Debe ingresar todos los valores');

    }
    
});

//Escucha a puerto 3000
/*
app.listen (port, () => {
    console.log (`> servidor en puerto ${port}, escuchando registro...`);
});
*/
