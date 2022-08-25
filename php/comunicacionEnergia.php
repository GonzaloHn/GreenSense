<?php
$servername = "localhost";
$username = "root";
$password = "rootroot";
$dbname = "greensense";

//poner horarios argentinos
date_default_timezone_set('America/Argentina/Buenos_Aires');


/*$conn = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);*/

//clave para recibir datos de hardware a software (poner la misma en los dos archivos)
$api_key_value = "tPmAT5Ab3j7F9";

$api_key= $resenergia = "";


//postea valores de nodeMCU a variables en php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $api_key = test_input($_POST["api_key"]);
    if($api_key == $api_key_value) {

        $resenergia = test_input($_POST["resenergia"]);

        $fecha = date('d/m/y');
        $hora = date('h:i:s');
        
        // Crear conexion con DB
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Checkear conexion
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 

        //insertar valores energia
        
        $sql = "INSERT INTO energia (fecha, hora, valor) VALUES ('" . $fecha . "', '" . $hora . "', '" . $resenergia . "')";
        
        if ($conn->query($sql) === TRUE) {
            echo "Registro de aire creado";
        } 
        else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
        

        $conn->close();
    }
    else {
        echo "Wrong API Key provided.";
    }

}
else {
    echo "No data posted with HTTP POST.";
}

//funcion para postear datos de nodeMCU a la pagina sin problemas
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}