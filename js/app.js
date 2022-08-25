const mysql = require ('mysql');

const express = require ('express');
const bodyParser = require ('body-parser');
const papth = require ("path");

const port = process.env.PORT || 80;  //asignar puerto de servidor (4848)


const app = express(); //nuestra app


/*
//api middleware
app.use (express.json()); //aceptar data el formato json
app.use (bodyParser.urlencoded({extended: false})); //decodificar daa que pasa html
app.use(express.static('public')); //serve public folder as static folder
*/

//api route
app.get ('/',(req,res)=>{

    console.log(__dirname);

    res.sendFile(path.resolve (__dirname, '../html/registrar.html'));
});

app.post('/', (req,res)=>{
    console.log (req.body);

    res.render('/html/registrar.html', {title: 'data guardada', message: 'data guardada exitosamente'})
    /*
    usuario = req.body.usuario;
    contraseña = req.body.contra;
    mail = req.body.mail;
    */
});


//escuchar puerto
app.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`);
});





/*let user = $("#u").val();
let contra = $("#c").val();
let mail = $("#m").val();*/


/*
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
        console.log('conexion exitosa');
    }

});

conexion.query(`INSERT INTO usuarios (usuario,contrasenia,gmail) VALUES (${user} ,${contra} ,${mail} )`, function (error,results,fields){
    if (error)
    throw error;

    results.forEach(result => {
        console.log(result);
    });
});

conexion.end();
*/
