<?php header("Access-Control-Allow-Origin: *"); 
include('conexion.php');


$datos = json_decode(@file_get_contents("php://input"));

if ($datos){
	foreach($datos  as $dato_actual){
	$idm = $dato_actual->idm;
	$idv = $dato_actual->idv;
	$fechavac = $dato_actual->fecha_vacunacion;
$ultimas_vac = guardarVM( $idm, $idv, $fechavac);
	}

echo($ultimas_vac);

	
}else{
	echo json_encode( array( ) );
}

