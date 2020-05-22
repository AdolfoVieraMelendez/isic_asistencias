<?php
// Conexion mysqli
include ("../conexion/conexionli.php");

//Recibo valores con el metodo POST
$id_usuario = $_POST['id_usuario'];
$contra = '12345678';

$activo = 1;

$fecha=date("Y-m-d"); 
$hora=date ("H:i:s");

//Inserto registro en tabla pacientes 
$cadena = "UPDATE usuarios
			SET
				contra = '$contra',
				fecha_registro = '$fecha' 
			WHERE 
				id_usuario = $id_usuario";
$actualizar = mysqli_query($conexionLi, $cadena);

//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexion
mysqli_close($conexionLi);
?>