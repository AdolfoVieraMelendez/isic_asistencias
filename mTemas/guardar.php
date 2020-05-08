<?php
// Conexion mysqli
include ("../conexion/conexionli.php");

//Recibo valores con el metodo POST
$nombre_tema     = trim($_POST['nombre_tema']);
$color_letra    = trim($_POST['color_letra']);
$color_base = trim($_POST['color_base']);
$color_baseFuerte = trim($_POST['color_baseFuerte']);
$color_borde      = trim($_POST['color_borde']);
$activo    = 1;

$fecha=date("Y-m-d"); 
$hora=date ("H:i:s");

//Inserto registro en tabla pacientes 
$cadena = "INSERT INTO temas
				(nombre_tema,
				color_letra,
				color_base, 
				color_base_fuerte, 
				color_borde,  
				fecha_registro, 
				hora_registro,
				activo)
			VALUES
				('$nombre_tema',
				'$color_letra',
				'$color_base', 
				'$color_baseFuerte', 
				'$color_borde', 
				'$fecha', 
				'$hora',
				$activo)";
$insertar = mysqli_query($conexionLi, $cadena);

//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexion
mysqli_close($conexionLi);
?>