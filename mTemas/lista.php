<?php
// Conexion mysqli
include'../conexion/conexionli.php';

include'../funciones/diasTranscurridos.php';
//Variable de Nombre
$varGral="-T";
$fecha=date("Y-m-d");

$cadena = "SELECT
                id_tema,
                activo,
                nombre_tema,
                color_letra,
                color_base,
                color_base_fuerte,
                color_borde,
                fecha_registro,
                hora_registro
            FROM
                temas
            ORDER BY id_tema DESC";
$consultar = mysqli_query($conexionLi, $cadena);
//$row = mysqli_fetch_array($consultar);

?>
<div class="table-responsive">
<table id="example<?php echo $varGral;?>" class="table table-striped table-bordered" style="width:100%">

        <thead>
            <tr class='hTabla'>
                <th scope="col">#</th>
                <th scope="col">Editar</th>
                <th scope="col">Exportar</th>
                <th scope="col">Aplicar</th>
                <th scope="col">Nombre</th>
                <th scope="col">Creación</th>
                <th scope="col">Hora de Creación</th>
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

            $nombre_tema     = $row[2];
            $color_letra    = $row[3];
            $color_base    = $row[4];
            $color_base_fuerte       = $row[5];
            $color_borde = $row[6];
            $fechaR = $row[7];
            $horaR = $row[8];
            $creacion = dias_transcurridos($fecha,$fechaR);
            $tiempoC = ($creacion > 1)?'Creado hace '.$creacion.' días.':'Creado hace '.$creacion.' día.';

            ?>
            <tr class="centrar">
                <th scope="row" class="textoBase">
                    <?php echo $n?>
                </th>
                <td>
                    <button <?php echo $dtnDesabilita?> type="button" class="editar btn btn-outline-success btn-sm activo" id="btnEditar<?php echo $varGral?><?php echo $n?>" onclick="llenar_formulario_T('<?php echo $id?>','<?php echo $nombre_tema?>','<?php echo $color_letra?>','<?php echo $color_base?>','<?php echo $color_base_fuerte?>','<?php echo $color_borde?>')">
                                <i class="far fa-edit fa-lg"></i>
                    </button>
                </td>
                <td>
                    <button <?php echo $dtnDesabilita?> type="button" class="exportar btn btn-outline-danger btn-sm activo" id="btnImprimir<?php echo $varGral?><?php echo $n?>" onclick="abrirModalPDF('<?php echo $id?>','../mDatosPersonales','Datos Personales')">
                                <i class="fas fa-file-download fa-lg"></i>
                    </button>
                </td>
                <td>
                    <button <?php echo $dtnDesabilita?> type="button" class="ventana btn btn-outline-info btn-sm activo"  id="btnModal<?php echo $varGral?><?php echo $n?>" onclick="abrirModalDatos_DP('<?php echo $id?>','<?php echo $nombre?>','<?php echo $paterno?>','<?php echo $materno?>','<?php echo $fNac?>','<?php echo $edad?>','<?php echo $correo?>','<?php echo $curp?>','<?php echo $clave?>','<?php echo $domicilio?>','<?php echo $sexo?>','<?php echo $ecivil?>')">
                        <i class="fas fa-palette fa-lg"></i>
                    </button>
                </td>
                <td>
                    <label class="textoBase">
                        <?php echo $nombre_tema?>
                    </label>
                </td>
                <td>
                    <label class="textoBase">
                        <?php echo $tiempoC?>
                    </label>
                </td>
                <td>
                    <label class="textoBase">
                        <?php echo $horaR?>
                    </label>
                </td>
                <td>
                    <input value="<?php echo $chkValor?>" onchange="cambiar_estatus_T(<?php echo $id?>,<?php echo $n?>)" class="toggle-two" type="checkbox" <?php echo $chkChecado?> data-toggle="toggle" data-onstyle="outline-success" data-width="60" data-size="sm" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="check<?php echo $n?>">
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
                <th scope="col">Exportar</th>
                <th scope="col">Aplicar</th>
                <th scope="col">Nombre</th>
                <th scope="col">Creación</th>
                <th scope="col">Hora de Creación</th>
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
                                nuevo_registro_T();
                            }
                        },
                        {
                            text: "<i class='fas fa-file-upload fa-lg' aria-hidden='true'></i> &nbsp;Importar Tema",
                            className: 'btn btn-outline-warning btnEspacio',
                            id: 'btnImportar',
                            //   action : function(){
                                
                            //   }
                        },
                        {
                          extend: 'excel',
                          text: "<i class='far fa-file-excel fa-lg' aria-hidden='true'></i> &nbsp;Exportar a Excel",
                          className: 'btn btn-outline-secondary btnEspacio',
                          title:'Lista_temas_creados',
                          id: 'btnExportar',
                          exportOptions: {
                            columns:  [6,7,8,9,10],
                          }
                        }
                        

            ]
        } );
    } );

</script>

<script>
    $('.toggle-two').bootstrapToggle();
</script>