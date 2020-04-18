<!-- Modal -->
<div class="modal fade" id="modalHorario-DP" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document" >
    <div class="modal-content">
        <div class="modal-header" >
            <h5 class="modal-title" id="txtTitularHorario">Horario</h5>
            <input type="hidden" name="tieneH" id="txtHorario">
            <input type="hidden" name="id_personaH" id="txtPersonaHorario">
            <input type="hidden" name="nombre_persona" id="txtNombrePersona">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
      
        <div class="modal-body" id="">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div class="form-group">
                        <select name="turno" id="hTurno" class="form-control ">
                            <option value="Especial">Especial</option>
                            <option value="Matutino">Matutino</option>
                            <option value="Vespertino">Vespertino</option>
                            <option value="Nocturno">Nocturno</option>
                        </select>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div class="form-group">
                        <label id="hTotales" style="font-size: 25px;">Horas Totales: 0</label>
                    </div>
                </div>
                <div class="col-xs1-12 col-sm-12 col-md-12 col-lg-12" style="margin: 10px;">
                    <button type="button" id="btnLunesHorario" class="btn btn-primary" value="1" style="margin-right: 26px;">
                        <i class='fas fa-check'></i> Lunes
                    </button>
                    <button type="button" id="btnMartesHorario" class="btn btn-secondary" value="0" style="margin-right: 26px;">
                        Martes
                    </button>
                    <button type="button" id="btnMiercolesHorario" class="btn btn-success" value="0" style="margin-right: 26px;">
                        Miércoles
                    </button>
                    <button type="button" id="btnJuevesHorario" class="btn btn-danger" value="0" style="margin-right: 26px;">
                        Jueves
                    </button>
                    <button type="button" id="btnViernesHorario" class="btn btn-warning" value="0" style="margin-right: 26px;">
                        Viernes
                    </button>
                    <button type="button" id="btnSabadoHorario" class="btn btn-info" value="0" style="margin-right: 26px;">
                        Sabado
                    </button>
                    <button type="button" id="btnDomingoHorario" class="btn btn-dark" value="0" style="margin-right: 26px;">
                        Domingo
                    </button>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6" id="l_entradaCont">
                    <div class="form-group">
                        <label for="l_entrada">Horario de entrada:</label>
                        <input type="time" class="form-control" id="l_entrada" autofocus>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6" id="l_salidaCont">
                    <div class="form-group">
                        <label for="l_salida">Horario de salida:</label>
                        <input type="time" class="form-control" id="l_salida" autofocus>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6" id="m_entradaCont" hidden>
                    <div class="form-group">
                        <label for="m_entrada">Horario de entrada:</label>
                        <input type="time" class="form-control" id="m_entrada" autofocus>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6" id="m_salidaCont" hidden>
                    <div class="form-group">
                        <label for="m_salida">Horario de salida:</label>
                        <input type="time" class="form-control" id="m_salida" autofocus>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6" id="mi_entradaCont" hidden>
                    <div class="form-group">
                        <label for="mi_entrada">Horario de entrada:</label>
                        <input type="time" class="form-control" id="mi_entrada" autofocus>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6" id="mi_salidaCont" hidden>
                    <div class="form-group">
                        <label for="mi_salida">Horario de salida:</label>
                        <input type="time" class="form-control" id="mi_salida" autofocus>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6" id="j_entradaCont" hidden>
                    <div class="form-group">
                        <label for="j_entrada">Horario de entrada:</label>
                        <input type="time" class="form-control" id="j_entrada" autofocus>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6" id="j_salidaCont" hidden>
                    <div class="form-group">
                        <label for="j_salida">Horario de salida:</label>
                        <input type="time" class="form-control" id="j_salida" autofocus>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6" id="v_entradaCont" hidden>
                    <div class="form-group">
                        <label for="v_entrada">Horario de entrada:</label>
                        <input type="time" class="form-control" id="v_entrada" autofocus>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6" id="v_salidaCont" hidden>
                    <div class="form-group">
                        <label for="v_salida">Horario de salida:</label>
                        <input type="time" class="form-control" id="v_salida" autofocus>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6" id="s_entradaCont" hidden>
                    <div class="form-group">
                        <label for="s_entrada">Horario de entrada:</label>
                        <input type="time" class="form-control" id="s_entrada" autofocus>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6" id="s_salidaCont" hidden>
                    <div class="form-group">
                        <label for="s_salida">Horario de salida:</label>
                        <input type="time" class="form-control" id="s_salida" autofocus>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6" id="d_entradaCont" hidden>
                    <div class="form-group">
                        <label for="d_entrada">Horario de entrada:</label>
                        <input type="time" class="form-control" id="d_entrada" autofocus>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6" id="d_salidaCont" hidden>
                    <div class="form-group">
                        <label for="d_salida">Horario de salida:</label>
                        <input type="time" class="form-control" id="d_salida" autofocus>
                    </div>
                </div>
            </div>
        </div>
        
        
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger" data-dismiss="modal" id="btnCancelarHorarioDP">
                <i class='fa fa-ban fa-lg'></i>
                Cancelar
            </button>
            <button type="submit" class="btn btn-outline-success" id="btnGuardarHorarioDP">
                <i class='fa fa-save fa-lg'></i>
                Guardar Horario
            </button>
        </div>
      
    </div>
  </div>
</div>