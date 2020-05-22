<?php
//Variable de Nombre
$varGral="-U";
$fecha=date("Y-m-d");
?>
<form id="frmActualizar<?php echo $varGral?>">
<input type="hidden"  id="uId">
    <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
            <div class="form-group">
                <label for="ecmbPersona-U">Persona:</label>
                <select id="ecmbPersona<?php echo $varGral?>" class="select2" style="width: 100%" disabled>

                </select>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
            <div class="form-group">
                <label for="euserName" id="elblusuarios">Nombre de Usuario:</label>
                <input type="text" class="form-control" id="euserName" autofocus required>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
            <div class="form-group">
                <label for="ecmbTema-U">Tema:</label>
                <select id="ecmbTema<?php echo $varGral?>" class="select2" style="width: 100%" >

                </select>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
            <div class="form-group">
                <label for="efecha_cad">Fecha de Caducidad:</label>
                <input type="date" class="form-control" id="efecha_cad" value="<?php echo $fecha?>" autofocus required>
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="form-group">
                <label>Permisos:</label>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
            <div class="form-group">
                <label>Datos Personales:</label>
                <input value="0" class="toggle-two" type="checkbox" data-toggle="toggle" data-onstyle="outline-success" data-width="100" data-size="sm" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="epermiso_DP">
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
            <div class="form-group">
                <label>Estado Civil:</label>
                <input value="0" class="toggle-two" type="checkbox" data-toggle="toggle" data-onstyle="outline-success" data-width="100" data-size="sm" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="epermiso_EC">
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
            <div class="form-group">
                <label>Usuarios:</label>
                <input value="0" class="toggle-two" type="checkbox" data-toggle="toggle" data-onstyle="outline-success" data-width="100" data-size="sm" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="epermiso_U">
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
            <div class="form-group">
                <label>Temas:</label>
                <input value="0" class="toggle-two" type="checkbox" data-toggle="toggle" data-onstyle="outline-success" data-width="100" data-size="sm" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="epermiso_T">
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col text-left">
                    <button  type="button" class="btn btn-outline-danger  activo btnEspacio" id="btnCancelarA<?php echo $varGral?>">
                        <i class='fa fa-ban fa-lg'></i>
                        Cancelar
                    </button>
                </div>
                <div class="col text-right">
                    <button  type="submit" class="btn btn-outline-primary  activo btnEspacio" id="btnActualizar<?php echo $varGral?>">
                        <i class='fa fa-save fa-lg'></i>
                        Guardar Información
                    </button>
                </div>
            </div>
        </div>

    </div>

</form>