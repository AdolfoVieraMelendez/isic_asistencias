<?php
//Variable de Nombre
$varGral="-T";
?>
<form id="frmGuardar<?php echo $varGral?>">
    <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
            <div class="form-group">
                <label for="nombreTema">Nombre:</label>
                <input type="text" class="form-control " id="nombreTema" autofocus required>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-2">
            <div class="form-group centrar">
                <label for="colorLetra">Color de Letra:</label>
                <input type="color" class="form-control inputColor" id="colorLetra" autofocus required>
                <span class="circuloTema centrar" id="spanColorLetra"><i class="fas fa-palette fa-2x borde"></i></span>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <div class="form-group centrar">
                <label for="colorBase">Color Base:</label>
                <input type="color" class="form-control inputColor" id="colorBase" autofocus required>
                <span class="circuloTema centrar" id="spanColorBase"><i class="fas fa-palette fa-2x borde"></i></span>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <div class="form-group centrar">
                <label for="colorBaseF">Color Base Fuerte:</label>
                <input type="color" class="form-control inputColor" id="colorBaseF" autofocus required>
                <span class="circuloTema centrar" id="spanColorBaseF"><i class="fas fa-palette fa-2x borde"></i></span>
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-2">
            <div class="form-group centrar">
                <label for="colorBorde">Color de Borde:</label>
                <input type="color" class="form-control inputColor" id="colorBorde" autofocus required>
                <span class="circuloTema centrar" id="spanColorBorde"><i class="fas fa-palette fa-2x borde"></i></span>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col text-left">
                    <button  type="button" class="btn btn-outline-danger  activo btnEspacio" id="btnCancelarG<?php echo $varGral?>">
                        <i class='fa fa-ban fa-lg'></i>
                        Cancelar
                    </button>
                </div>

                <div class="col text-center">
                    <button  type="button" class="btn btn-outline-success  activo btnEspacio" id="btnProbarG<?php echo $varGral?>">
                        <i class='fas fa-play fa-lg'></i>
                        Probar Tema
                    </button>
                </div>

                <div class="col text-right">
                    <button  type="submit" class="btn btn-outline-primary  activo btnEspacio" id="btnGuardar<?php echo $varGral?>">
                        <i class='fa fa-save fa-lg'></i>
                        Guardar Información
                    </button>
                </div>
            </div>
        </div>

    </div>

</form>