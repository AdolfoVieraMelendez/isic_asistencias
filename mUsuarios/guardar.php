<?php
// Conexion mysqli
include ("../conexion/conexionli.php");

//Recibo valores con el metodo POST
$id_persona     = trim($_POST['id_persona']);
$user_name    = trim($_POST['user_name']);
$id_tema = trim($_POST['id_tema']);
$fecha_cad = trim($_POST['fecha_cad']);
$permiso_DP      = trim($_POST['permiso_DP']);
$permiso_EC      = trim($_POST['permiso_EC']);
$permiso_U      = trim($_POST['permiso_U']);
$permiso_T      = trim($_POST['permiso_T']);
$contra = '12345678';
$activo    = 1;

$fecha=date("Y-m-d"); 
$hora=date ("H:i:s");

//Inserto registro en tabla pacientes 
$cadena = "INSERT INTO usuarios
				(id_dato,
				id_tema,
				nombre_usuario, 
				contra, 
				permiso_datos_persona,
				permiso_ecivil,
				permiso_usuario,
				permiso_temas,  
				fecha_caducidad, 
				fecha_registro,
				activo)
			VALUES
				('$id_persona',
				'$id_tema',
				'$user_name', 
				'$contra', 
				'$permiso_DP', 
				'$permiso_EC', 
				'$permiso_U',
				'$permiso_T',
				'$fecha_cad',
				'$fecha',
				$activo)";
$insertar = mysqli_query($conexionLi, $cadena);

//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexion
mysqli_close($conexionLi);
?>