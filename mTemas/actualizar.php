<?php
// Conexion mysqli
include ("../conexion/conexionli.php");

//Recibo valores con el metodo POST
$id    	   = $_POST['id'];
$color_letra     = trim($_POST['color_letra']);
$color_base     = trim($_POST['color_base']);
$color_baseFuerte     = trim($_POST['color_baseFuerte']);
$color_borde     = trim($_POST['color_borde']);

$activo    = 1;

$fecha=date("Y-m-d"); 
$hora=date ("H:i:s");

//Inserto registro en tabla pacientes 
$cadena = "UPDATE temas
			SET
				color_letra = '$color_letra',
				color_base = '$color_base',
				color_base_fuerte = '$color_baseFuerte',
				color_borde = '$color_borde',
				fecha_registro = '$fecha', 
				hora_registro  = '$hora'
			WHERE 
				id_tema= $id";
$actualizar = mysqli_query($conexionLi, $cadena);

//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexion
mysqli_close($conexionLi);
?>