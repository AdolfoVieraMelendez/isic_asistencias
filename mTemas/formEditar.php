<?php
//Variable de Nombre
$varGral="-T";
?>

<form id="frmActualizar<?php echo $varGral?>">
    <input type="hidden"  id="tId">
    <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
            <div class="form-group">
                <label for="enombreTema">Nombre:</label>
                <input type="text" class="form-control " id="enombreTema" autofocus required>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-2">
            <div class="form-group centrar">
                <label for="ecolorLetra">Color de Letra:</label>
                <input type="color" class="form-control inputColor" id="ecolorLetra" autofocus required>
                <span class="circuloTema centrar" id="espanColorLetra"><i class="fas fa-palette fa-2x borde"></i></span>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <div class="form-group centrar">
                <label for="ecolorBase">Color Base:</label>
                <input type="color" class="form-control inputColor" id="ecolorBase" autofocus required>
                <span class="circuloTema centrar" id="espanColorBase"><i class="fas fa-palette fa-2x borde"></i></span>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <div class="form-group centrar">
                <label for="ecolorBaseF">Color Base Fuerte:</label>
                <input type="color" class="form-control inputColor" id="ecolorBaseF" autofocus required>
                <span class="circuloTema centrar" id="espanColorBaseF"><i class="fas fa-palette fa-2x borde"></i></span>
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-2">
            <div class="form-group centrar">
                <label for="ecolorBorde">Color de Borde:</label>
                <input type="color" class="form-control inputColor" id="ecolorBorde" autofocus required>
                <span class="circuloTema centrar" id="espanColorBorde"><i class="fas fa-palette fa-2x borde"></i></span>
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

                <div class="col text-center">
                    <button  type="button" class="btn btn-outline-success  activo btnEspacio" id="btnProbarA<?php echo $varGral?>">
                        <i class='fas fa-play fa-lg'></i>
                        Probar Tema
                    </button>
                </div>

                <div class="col text-right">
                    <button  type="submit" class="btn btn-outline-primary  activo btnEspacio" id="btnActualizar<?php echo $varGral?>">
                        <i class='fa fa-bolt fa-lg'></i>
                        Actualizar Información
                    </button>
                </div>
            </div>
        </div>

    </div>

</form>