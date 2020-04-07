<!-- Modal -->
<div class="modal fade" id="modalCambio-I" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document" >
    <div class="modal-content">
      <div class="modal-header" >
        <h5 class="modal-title" id="modalTitle-I">Cambio de contraseña</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <div class="form-group">
                    <label for="passwInicio">Nueva Contraseña:</label>
                    <input type="password" class="form-control" id="passwInicio" autofocus required>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <div class="form-group">
                    <label for="passConfirmInicio">Confirmar Contraseña:</label>
                    <input type="password" class="form-control" id="passConfirmInicio" autofocus required>
                </div>
            </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button type="button" id="btnVerContraInicio" class="btn btn-primary" value=0>
            <i id="icoVerContraInicio" class="far fa-eye-slash"></i>
        </button>
        <button type="button" class="btn btn-outline-danger" data-dismiss="modal" id="btnCancelarContraInicio">
            <i class='fa fa-ban fa-lg'></i>
            Cancelar
        </button>
        <button type="button" class="btn btn-outline-warning" id="btnGenerarContraInicio">
            <i class='fas fa-random fa-lg'></i>
            Generar Contraseña
        </button>
        <button type="button" class="btn btn-outline-success" id="btnCambiarContraInicio">
            <i class='fa fa-save fa-lg'></i>
            Cambiar Contraseña
        </button>
      </div>
    </div>
  </div>
</div>