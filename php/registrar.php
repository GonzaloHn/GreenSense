<?php

$con = new mysqli("localhost", "root", "rootroot");
mysqli_select_db($con,"greensense");

if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

$data=array();


	    	$sql="INSERT INTO usuarios (usuario,contrasenia,gmail) VALUES ('".$_REQUEST['usu']."','".$_REQUEST['pass']."','".$_REQUEST['ema']."')";

	    	//echo $sql;
	        $res=$con->query($sql);

	        if ($res==1)
            {
	        	$data['status'] = 'ok';
	        	$data['result'] = '1';	
	        }
            else
            {
	        	$data['status'] = 'error';
	        	$data['result'] = '';
	        }
	    
    //retorno los datos en formato JSON
    echo json_encode($data);
	
	$con->close();


?>
