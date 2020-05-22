<?php
// Conexion mysqli
include ("../conexion/conexionli.php");

//Recibo valores con el metodo POST
$id          = $_POST['id'];
$contravalor = $_POST['contravalor'];

$fecha=date("Y-m-d"); 
$hora=date ("H:i:s");

//Inserto registro en tabla pacientes 
$cadena = "UPDATE usuarios 
			SET
				activo=$contravalor,
				fecha_registro='$fecha'
			WHERE 
				id_usuario= $id";

echo $contraValor;
$actualizar = mysqli_query($conexionLi, $cadena);

//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexion
mysqli_close($conexionLi);
?>