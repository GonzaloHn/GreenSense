$(document).ready(function(){
    
    $("#S").click(function(){

        const mysql = require ('mysql');

        let user = $("#u").val();
        let contra = $("#c").val();
        let mail = $("#m").val();

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
    });

});