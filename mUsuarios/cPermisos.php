<?php
// Conexion mysqli
include ("../conexion/conexionli.php");

//Recibo valores con el metodo POST
$id = $_POST['id'];
$permiso_DP = trim($_POST['permiso_DP']);
$permiso_EC = trim($_POST['permiso_EC']);
$permiso_U = trim($_POST['permiso_U']);
$permiso_T = trim($_POST['permiso_T']);

$activo = 1;

$fecha=date("Y-m-d"); 
$hora=date ("H:i:s");

//Inserto registro en tabla pacientes 
$cadena = "UPDATE usuarios
			SET
				permiso_datos_persona = '$permiso_DP',
				permiso_ecivil = '$permiso_EC',
				permiso_usuario = '$permiso_U',
				permiso_temas = '$permiso_T',
				fecha_registro = '$fecha' 
			WHERE 
				id_usuario = $id";
$actualizar = mysqli_query($conexionLi, $cadena);

//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexion
mysqli_close($conexionLi);
?>