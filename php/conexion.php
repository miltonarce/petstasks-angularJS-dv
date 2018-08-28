<?php header("Access-Control-Allow-Origin: *");

$cnx = mysqli_connect('fdb21.awardspace.net', '2755342_milton', 'MAre45-PHL', '2755342_milton' );
mysqli_set_charset($cnx,'utf8');
function eliminar_mascota( $id ){ 
	global $cnx;
	$c = "DELETE FROM mascotas WHERE id in ($id) ";
	mysqli_query($cnx, $c);
	
	return get_mascotas();
}

function guardar($nombre, $edad, $comentarios, $tipo, $fecha_creacion,  $raza, $falsoid ){
	global $cnx;	
    $c = "INSERT INTO mascotas VALUES (null, '$nombre','$edad','$comentarios','$tipo', 'no-image.png','$fecha_creacion','$raza','$falsoid')";
   $retorno = mysqli_query($cnx, $c); 
	return get_mascotas(10);
}
function updateM($id, $nombre, $edad, $comentarios, $tipo, $raza, $falsoid ){
	global $cnx;	
    $c = "UPDATE mascotas SET nombre='$nombre',edad='$edad',comentarios='$comentarios',tipo='$tipo',fk_id_raza='$raza',falsoid='$falsoid' WHERE id='$id'";
   $retorno = mysqli_query($cnx, $c); 
	return get_mascotas(10);
}
function guardarVM($idm, $idv, $fechavac){
	global $cnx;	
    $c = "INSERT INTO rel_masc_vac VALUES (null, '$idm','$idv','$fechavac')";
	 $retorno = mysqli_query($cnx, $c); 
	 return get_relmascvac(10);
}


function guardarCM($idm, $idc, $comentarios){
	global $cnx;	
    $c = "INSERT INTO rel_masc_com VALUES (null, '$idm','$idc','$comentarios')";
	 $retorno = mysqli_query($cnx, $c); 
	 return get_relmasccom(10);
}
function get_relmasccom($cantidad = null ){ 
	global $cnx;
	$c = "SELECT * FROM rel_masc_com";
	if($cantidad != null){ 
		$c.=" limit $cantidad";
	}
	$f = mysqli_query($cnx, $c);
	$retorno = array( );
	
	while($a = mysqli_fetch_assoc($f)){
		$retorno[] = $a; 
	}
	
	return json_encode($retorno, JSON_UNESCAPED_UNICODE);
	
}

function get_relmascvac($cantidad = null ){ 
	global $cnx;
	$c = "SELECT * FROM rel_masc_vac";
	if($cantidad != null){ 
		$c.=" limit $cantidad";
	}
	$f = mysqli_query($cnx, $c);
	$retorno = array( );
	
	while($a = mysqli_fetch_assoc($f)){
		$retorno[] = $a; 
	}
	
	return json_encode($retorno, JSON_UNESCAPED_UNICODE);
	
}

function get_relcomidas($cantidad = null){ 
	global $cnx;
	$c = "SELECT 
	R.id,
	M.nombre,
	C.nombrecomida,
	R.comentarios
 FROM rel_masc_com AS R LEFT JOIN mascotas AS M ON R.id_mascota = M.id RIGHT JOIN comidas AS C ON R.id_comida = C.id HAVING
	M.nombre IS NOT NULL AND R.id IS NOT NULL";
	if($cantidad != null){ 
		$c.=" limit $cantidad";
	}
	$f = mysqli_query($cnx, $c);
	$retorno = array( );
	
	while($a = mysqli_fetch_assoc($f)){
		$retorno[] = $a; 
	}
	
	return json_encode($retorno, JSON_UNESCAPED_UNICODE);
	
}
function get_relvacunas($cantidad = null){ 
	global $cnx;
	$c = "SELECT 
	R.id,
	M.nombre,
	V.nombrevacuna,
	R.fecha_vacunacion
 FROM rel_masc_vac AS R LEFT JOIN mascotas AS M ON R.id_mascota = M.id RIGHT JOIN vacunas AS V ON R.id_vacunas = V.id HAVING
	M.nombre IS NOT NULL AND R.id IS NOT NULL";
	if($cantidad != null){ 
		$c.=" limit $cantidad";
	}
	$f = mysqli_query($cnx, $c);
	$retorno = array( );
	
	while($a = mysqli_fetch_assoc($f)){
		$retorno[] = $a; 
	}
	
	return json_encode($retorno, JSON_UNESCAPED_UNICODE);
	
}

function borrarM( $id ){ 
	global $cnx;
	$c = "DELETE FROM mascotas WHERE id in ($id) "; 
	mysqli_query($cnx, $c);
	
	return get_mascotas();
}


function get_mascotas($cantidad = null ){ 
	global $cnx;
	$c = "SELECT 
		M.id,
    M.nombre,
    M.edad,
    M.comentarios,
    M.tipo,
    M.imagen,
    M.fecha_creación,
		M.fk_id_raza,
    R.nombreraza,
    M.falsoid
	 FROM mascotas AS M LEFT JOIN razas AS R ON M.fk_id_raza = R.ID ORDER BY M.fecha_creación";
	if($cantidad != null){ 
		$c.=" limit $cantidad";
	}
	$f = mysqli_query($cnx, $c);
	$retorno = array( );
	
	while($a = mysqli_fetch_assoc($f)){
		$retorno[] = $a; 
	}

	
	return json_encode($retorno, JSON_UNESCAPED_UNICODE);
	
}


function get_raza($cantidad = null ){ 
	global $cnx;
	$c = "SELECT * FROM razas ORDER BY id";
	if($cantidad != null){ 
		$c.=" limit $cantidad";
	}
	$f = mysqli_query($cnx, $c);
	$retorno = array( );
	
	while($a = mysqli_fetch_assoc($f)){
		$retorno[] = $a; 
	}
	
	
	return json_encode($retorno, JSON_UNESCAPED_UNICODE);
	
}
function get_vacunas($cantidad = null ){ 
	global $cnx;
	$c = "SELECT * FROM vacunas ORDER BY id";
	if($cantidad != null){ 
		$c.=" limit $cantidad";
	}
	$f = mysqli_query($cnx, $c);
	$retorno = array( );
	
	while($a = mysqli_fetch_assoc($f)){
		$retorno[] = $a; 
	}

	
	return json_encode($retorno, JSON_UNESCAPED_UNICODE);
	
}
function get_comidas($cantidad = null ){ 
	global $cnx;
	$c = "SELECT * FROM comidas ORDER BY id";
	if($cantidad != null){ 
		$c.=" limit $cantidad";
	}
	$f = mysqli_query($cnx, $c);
	$retorno = array( );
	
	while($a = mysqli_fetch_assoc($f)){
		$retorno[] = $a; 
	}

	
	return json_encode($retorno, JSON_UNESCAPED_UNICODE);
	
}

?>