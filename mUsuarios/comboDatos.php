<?php
// Conexion mysqli
include'../conexion/conexionli.php';

$cadena = "SELECT
                datos.id_datos,
                CONCAT(datos.ap_paterno,' ',datos.ap_materno,' ',datos.nombre) AS nombre_persona,
                datos.activo
            FROM
                datos
            LEFT JOIN usuarios ON datos.id_datos = usuarios.id_dato
            WHERE
                ISNULL(usuarios.id_dato)
            ORDER BY id_datos ASC";
$consultar = mysqli_query($conexionLi, $cadena);

while($row = mysqli_fetch_array($consultar))
{  
	if ($rowl[0]!=$row[0]) {
    ?>
    <option value="<?php echo $row[0];?>"><?php echo $row[1];?></option>
    <?php
	}
}
?>
