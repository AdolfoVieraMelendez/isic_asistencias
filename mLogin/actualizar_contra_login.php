    <?php 
    //Conexion mysql
    include'../conexion/conexionli.php';

    //Recibe valores con el metdoo POST
    $usuario = trim($_POST['usuario']);
    $contra = trim($_POST['contra']);

    $activo = 1;

    $fecha=date("Y-m-d");
    $hora=date("H:i:s");

    //Inserto registro
    $cadena = "UPDATE usuarios
                    SET contra = '$contra'
                WHERE nombre_usuario = '$usuario'";
    $consultar = mysqli_query($conexionLi, $cadena);

    //En caso de error imprime
    print_r(mysqli_error($conexionLi));
    //Cierro conexion
    mysqli_close($conexionLi);
    ?>