<?php
// Conexion mysqli
include'../conexion/conexionli.php';

include'../funciones/diasTranscurridos.php';
//Variable de Nombre
$varGral="-U";
$fecha=date("Y-m-d");

$cadena = "SELECT
                usuarios.id_usuario,
                usuarios.activo,
                usuarios.id_dato,
                usuarios.id_tema,
                usuarios.nombre_usuario,
                CONCAT(datos.ap_paterno,' ',datos.ap_materno,' ',datos.nombre) as nombre_persona,
                usuarios.contra,
                usuarios.permiso_datos_persona,
                usuarios.permiso_ecivil,
                usuarios.permiso_usuario,
                usuarios.permiso_temas,
                usuarios.fecha_caducidad,
                usuarios.fecha_registro
            FROM
                usuarios INNER JOIN datos ON usuarios.id_dato = datos.id_datos
            ORDER BY id_usuario DESC";
$consultar = mysqli_query($conexionLi, $cadena);
//$row = mysqli_fetch_array($consultar);

?>
<div class="table-responsive">
    <table id="example<?php echo $varGral;?>" class="table table-striped table-bordered" style="width:100%">
        <thead>
            <tr class='hTabla'>
                <th scope="col">#</th>
                <th scope="col">Editar</th>
                <th scope="col">Restablecer Contraseña</th>
                <th scope="col">Permisos</th>
                <th scope="col">Nombre</th>
                <th scope="col">Usuario</th>
                <th scope="col">Registro</th>
                <th scope="col">Caducidad</th>
                <th scope="col">Status</th>
            </tr>
        </thead>

        <tbody>
        <?php
        // Recorro el arreglo y le asigno variables a cada valor del item
        $n=1;
        while( $row = mysqli_fetch_array($consultar) ) {

            $id          = $row[0];

            if ($row[1] == 1) {
                $chkChecado    = "checked";
                $dtnDesabilita = "";
                $chkValor      = "1";
            }else{
                $chkChecado    = "";
                $dtnDesabilita = "disabled";
                $chkValor      = "0";
            }

            $id_dato     = $row[2];
            $id_tema    = $row[3];
            $nombre_usuario    = $row[4];
            $nombre_persona       = $row[5];
            $contra = $row[6];
            $permiso_datos_persona = $row[7];
            $permiso_ecivil = $row[8];
            $permiso_usuario = $row[9];
            $permiso_temas = $row[10];
            $fecha_caducidad = $row[11];
            $fecha_registro = $row[12];
            $creacion = dias_transcurridos($fecha, $fecha_registro);
            $tiempoC = ($creacion > 1)?'Creado hace '.$creacion.' días.':'Creado hace '.$creacion.' día. ';
            $caducidad = dias_transcurridos($fecha_caducidad, $fecha);
            $tiempoCA = ($caducidad > 1)?'Esta cuenta caducará en '.$caducidad.' días.':'Esta cuenta caducará en '.$caducidad.' día. ';

            ?>
            <tr class="centrar">
                <th scope="row" class="textoBase">
                    <?php echo $n?>
                </th>
                <td>
                    <button <?php echo $dtnDesabilita?> type="button" class="editar btn btn-outline-success btn-sm activo" id="btnEditar<?php echo $varGral?><?php echo $n?>" onclick="llenar_formulario_U('<?php echo $id?>','<?php echo $id_dato?>','<?php echo $id_tema?>', '<?php echo $nombre_usuario?>','<?php echo $fecha_caducidad?>', '<?php echo $permiso_datos_persona?>', '<?php echo $permiso_ecivil?>', '<?php echo $permiso_usuario?>', '<?php echo $permiso_temas?>')">
                                <i class="far fa-edit fa-lg"></i>
                    </button>
                </td>
                <td>
                    <button <?php echo $dtnDesabilita?> type="button" class="res-contra btn btn-outline-danger btn-sm activo" id="btnR-Contra<?php echo $varGral?><?php echo $n?>" onclick="reset_passw('<?php echo $id?>')">
                                <i class="fas fa-undo fa-lg"></i>
                    </button>
                </td>
                <td>
                    <button <?php echo $dtnDesabilita?> type="button" class="permisos sfx btn btn-outline-info btn-sm activo" id="btnPermisos<?php echo $varGral?><?php echo $n?>" onclick="abrirModalPermisos_U('<?php echo $id?>', '<?php echo $nombre_usuario?>', '<?php echo $permiso_datos_persona?>', '<?php echo $permiso_ecivil?>', '<?php echo $permiso_usuario?>', '<?php echo $permiso_temas?>')">
                        <i class="fas fa-cog fa-lg"></i>
                    </button>
                </td>
                <td>
                    <label class="textoBase">
                        <?php echo $nombre_persona?>
                    </label>
                </td>
                <td>
                    <label class="textoBase">
                        <?php echo $nombre_usuario?>
                    </label>
                </td>
                <td>
                    <label class="textoBase">
                        <?php echo $tiempoC?> 
                    </label>
                </td>
                <td>
                    <label class="textoBase">
                        <?php echo $tiempoCA?> 
                    </label>
                </td>
                <td>
                    <input value="<?php echo $chkValor?>" onchange="cambiar_estatus_U(<?php echo $id?>,<?php echo $n?>)" class="toggle-two" type="checkbox" <?php echo $chkChecado?> data-toggle="toggle" data-onstyle="outline-success" data-width="60" data-size="sm" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="check<?php echo $n?>">
                </td>
            </tr>
        <?php
        $n++;
        }
        ?>

        </tbody>
        <tfoot>
            <tr class='hTabla'>
                <th scope="col">#</th>
                <th scope="col">Editar</th>
                <th scope="col">Restablecer Contraseña</th>
                <th scope="col">Permisos</th>
                <th scope="col">Nombre</th>
                <th scope="col">Usuario</th>
                <th scope="col">Registro</th>
                <th scope="col">Caducidad</th>
                <th scope="col">Status</th>
            </tr>
        </tfoot>
    </table>
<div>

<?php
//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexionLi
mysqli_close($conexionLi);
?>

<script type="text/javascript">
  var varGral='<?php echo $varGral?>';
  $(document).ready(function() {
        $('#example'+varGral).DataTable( {
            "language": {
                    // "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                    "url": "../plugins/dataTablesB4/langauge/Spanish.json"
                },
            "order": [[ 0, "asc" ]],
            "paging":   true,
            "ordering": true,
            "info":     true,
            "responsive": true,
            "searching": true,
            stateSave: true,
            dom: 'Bfrtip',
            lengthMenu: [
                [ 10, 25, 50, -1 ],
                [ '10 Registros', '25 Registros', '50 Registros', 'Todos' ],
            ],
            columnDefs: [ {
                // targets: 0,
                // visible: false
            }],
            buttons: [
                        {
                            text: "<i class='fas fa-plus fa-lg' aria-hidden='true'></i> &nbsp;Nuevo Registro",
                            className: 'btn btn-outline-primary btnEspacio',
                            id: 'btnNuevo',
                            action : function(){
                                nuevo_registro_U();
                            }
                        },
                        {
                          extend: 'excel',
                          text: "<i class='far fa-file-excel fa-lg' aria-hidden='true'></i> &nbsp;Exportar a Excel",
                          className: 'btn btn-outline-secondary btnEspacio',
                          title:'Lista_usuarios_creados',
                          id: 'btnExportar',
                          exportOptions: {
                            columns:  [0,4,5,6,7],
                          }
                        }
            ]
        } );
    } );

</script>

<script>
    $('.toggle-two').bootstrapToggle();
</script>