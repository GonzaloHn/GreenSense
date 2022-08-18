var mysql = require ('mysql');

var conexion  = mysql.createConnection({
    
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
        console.log('conexione exitosa');
    }

});

conexion.query('INSERT INTO usuarios (usuario,contrasenia,gmail) VALUES ()', function (error,results,fields){
    if (error)
    throw error;

    results.forEach(result => {
        console.log(result);
    });
});

conexion.end();