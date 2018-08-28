<?php header("Access-Control-Allow-Origin: *"); 
include('conexion.php');


$datos = json_decode(@file_get_contents("php://input"));

if ($datos){
	foreach($datos  as $dato_actual){
	$idm = $dato_actual->idm;
	$idc = $dato_actual->idc;
	$comentarios = $dato_actual->comentarios;
$ultimas_com = guardarCM( $idm, $idc, $comentarios);
	}

echo($ultimas_com);

	
}else{
	echo json_encode( array( ) );
}
