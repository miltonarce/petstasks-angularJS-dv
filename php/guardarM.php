<?php header("Access-Control-Allow-Origin: *"); 
include('conexion.php');


$datos = json_decode(@file_get_contents("php://input"));

if ($datos){
	foreach($datos  as $dato_actual){
	$nombre = $dato_actual->nombre;
	$edad = $dato_actual->edad;
	$raza = $dato_actual->raza;
	$tipo = $dato_actual->tipo;
	$comentarios = $dato_actual->comentarios ;
	/*$imagen = $dato_actual->imagen;*/
	$fecha_creacion = $dato_actual->fecha_creacion ;
	$falsoid = $dato_actual->falsoid;
$ultimas_mascotas = guardar( $nombre, $edad, $comentarios, $tipo, $fecha_creacion,  $raza, $falsoid );
	}

echo($ultimas_mascotas);

	
}else{
	echo json_encode( array( ) );
}


?>