// Variables express
const express = require('express');
const app = express();
const port = 9000; 
const server = app.listen (port, () => {
    console.log (`> servidor en puerto ${port}, escuchando borrar...`);
});

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

                //envia mail de borrado al usuario
                conexion.query('SELECT gmail FROM usuarios WHERE usuario = ?', [user], function (err, result) {
                    
                    if (err) throw err;

                    email = JSON.parse(JSON.stringify(result));

                    conexion.query('DELETE FROM usuarios WHERE usuario = ? AND contrasenia = ?', [user, pass]);
                    console.log("> usuario borrado");
                    res.redirect("http://localhost/GreenSense/html/cuentaBorrada.html");

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
                        from: "Remitente",
                        to: (email[0].gmail),
                        subject: "Cuenta borrada en Green Sense",
                        text: "Su cuenta de Green Sense ha sido borrada exitosamente.",
                    };
                    
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log ("> error enviando mail de borrado de cuenta");
                            console.log (error);   
                        }
                        else {
                            console.log ("> mail de borrado de cuenta enviado");
                        }
                    });

                })

                

            }

            //Tira error si el usuario o contraseña esta mal
            else {
                console.log("> usuario o contraseña incorrectos");
                res.redirect("http://localhost/GreenSense/html/borrar.html");
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
        res.redirect("http://localhost/GreenSense/html/borrar.html");
        io.on('connection', (socket) => {
            console.log('> error de falta de datos incorrectos enviado');
            socket.emit('errordatos', 'error');
        });
    }
});
