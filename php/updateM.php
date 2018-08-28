<?php header("Access-Control-Allow-Origin: *"); 
include('conexion.php');


$datos = json_decode(@file_get_contents("php://input"));

if ($datos){
	foreach($datos  as $dato_actual){
  $id = $dato_actual->id;
	$nombre = $dato_actual->nombre;
	$edad = $dato_actual->edad;
	$raza = $dato_actual->raza;
	$tipo = $dato_actual->tipo;
	$comentarios = $dato_actual->comentarios ;
	$falsoid = $dato_actual->falsoid;
$ultimas_mascotas = updateM( $id, $nombre, $edad, $comentarios, $tipo, $raza, $falsoid );
	}

echo($ultimas_mascotas);

	
}else{
	echo json_encode( array( ) );
}


?>