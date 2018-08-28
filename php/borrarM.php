<?php header("Access-Control-Allow-Origin: *");
include('conexion.php');

$datos = json_decode(@file_get_contents("php://input"));
	$ids = implode("," , $datos); 
	
	borrarM($ids); 
	
	echo get_mascotas();
	
	
?>