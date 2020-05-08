<?php
// Conexion mysqli
include ("../conexion/conexionli.php");

$id = trim($_POST["id"]);
$cadena = "SELECT
				id_usuario,
				color_letra,
				color_base,
				color_base_fuerte,
				color_borde
			FROM
				usuarios
			LEFT JOIN temas ON usuarios.id_tema = temas.id_tema
			WHERE id_usuario = '$id'";

$consultar = mysqli_query($conexionLi, $cadena);
//for ($arreglo = array (); $row = $consultar->fetch_assoc(); $arreglo[] = $row);
	$arreglo = $consultar->fetch_assoc();
	$data['status'] = 'ok';
	$data['result'] = $arreglo;

//returns data as JSON format
echo json_encode($data);
?>