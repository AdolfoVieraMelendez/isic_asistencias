<!-- Modal -->
<div class="modal fade" id="modalPermisos-U" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document" >
    <div class="modal-content">
        <div class="modal-header" >
            <h5 class="modal-title" id="txtTitularPermisos">Permisos</h5>
            <input type="hidden" name="id" id="txtIdPermisos">
            <input type="hidden" name="nombre_usuario" id="txtNombreUsuario">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
      
        <div class="modal-body" id="">
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div class="form-group">
                        <label>Datos Personales:</label>
                        <input value="0" class="toggle-two" type="checkbox" data-toggle="toggle" data-onstyle="outline-success" data-width="70" data-size="sm" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="mpermiso_DP">
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div class="form-group">
                        <label>Estado Civil:</label>
                        <input value="0" class="toggle-two" type="checkbox" data-toggle="toggle" data-onstyle="outline-success" data-width="70" data-size="sm" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="mpermiso_EC">
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div class="form-group">
                        <label>Usuarios:</label>
                        <input value="0" class="toggle-two" type="checkbox" data-toggle="toggle" data-onstyle="outline-success" data-width="70" data-size="sm" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="mpermiso_U">
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div class="form-group">
                        <label>Temas:</label>
                        <input value="0" class="toggle-two" type="checkbox" data-toggle="toggle" data-onstyle="outline-success" data-width="70" data-size="sm" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="mpermiso_T">
                    </div>
                </div>
            </div>
        </div>
        
        
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger" data-dismiss="modal" id="btnCancelarPermisosU">
                <i class='fa fa-ban fa-lg'></i>
                Cancelar
            </button>
            <button type="submit" class="btn btn-outline-success" id="btnGuardarPermisosU">
                <i class='fa fa-save fa-lg'></i>
                Guardar
            </button>
        </div>
      
    </div>
  </div>
</div>