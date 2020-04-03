<!-- Modal -->
<div class="modal fade" id="modalCambio-LG" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document" >
    <div class="modal-content">
      <div class="modal-header" >
        <h5 class="modal-title" id="modalTitle-DP">Cambio de contraseña</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="form-group">
                    <label for="passw">Nueva Contraseña:</label>
                    <input type="password" class="form-control " id="passw" autofocus required>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="form-group">
                    <label for="passConfirm">Confirmar Contraseña:</label>
                    <input type="password" class="form-control " id="passConfirm" autofocus required>
                </div>
            </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button type="button" id="btnVerContra" class="btn btn-primary" value=0>
            <i id="icoVerContra" class="far fa-eye-slash"></i>
        </button>
        <button type="button" class="btn btn-outline-danger" data-dismiss="modal">
            <i class='fa fa-ban fa-lg'></i>
            Cancelar
        </button>
        <button type="button" class="btn btn-outline-warning" id="btnGenerarContra">
            <i class='fas fa-random fa-lg'></i>
            Generar Contraseña
        </button>
        <button type="button" class="btn btn-outline-success" id="btnCambiarContra">
            <i class='fa fa-save fa-lg'></i>
            Cambiar Contraseña
        </button>
      </div>
    </div>
  </div>
</div>