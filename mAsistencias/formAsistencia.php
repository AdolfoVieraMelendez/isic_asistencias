<?php
//Variable de Nombre
$varGral="-AS";
?>
<form id="frmAsistencia<?php echo $varGral?>">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4 centrar">
            <label class="lblTiempo">
                <span id="reloj"> <i class="far fa-clock"></i> 00:00:00</span>
            </label>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <div class="form-group clave-group bg-icon">
                <input type="number" class="form-control" id="claveAS" autofocus required autocomplete="off">
                <span class="clave_ph">Clave del Trabajador</span>
                <i class="fas fa-key" id="clave-ico"></i>
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <div class="form-group centrar">
                <label>Sonido:</label>
                <input value="0" class="toggle-two" type="checkbox" data-toggle="toggle" data-onstyle="outline-success" data-width="100" data-size="md" data-offstyle="outline-danger" data-on="<i class='fas fa-volume-up'></i> On" data-off="<i class='fas fa-volume-mute'></i> Off" id="sound_AS">
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">
            <div class="form-group centrar">
                <label><i class="fas fa-circle" id="historialP-AS"></i> Entrada Puntual</label>
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">
            <div class="form-group centrar">
                <label><i class="fas fa-circle" id="historialRMe-AS"></i> Retardo Menor</label>
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">
            <div class="form-group centrar">
                <label><i class="fas fa-circle" id="historialRMa-AS"></i> Retardo Mayor</label>
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">
            <div class="form-group centrar">
                <label><i class="fas fa-circle" id="historialS-AS"></i> Salida</label>
            </div>
        </div>
    </div>

    <div class="estatus-container" id="estatus-card">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="form-group centrar">
                    <label id="lblestatus<?php echo $varGral?>">Estado de la Entrada/Salida de la Persona</label>
                </div> 
            </div>
        </div>
    </div>
        

    <div class="card-container" id="data-card">
        <div class="card-box1" id="img<?php echo $varGral;?>">
            <div class="img-container">
                <img src="#" class="profile" id="img-card" alt="Imagen de Persona" onerror="this.src='../fotos/default-profile-pic.png'">
            </div>
        </div>
        <div class="card-box2" id="nombre<?php echo $varGral;?>">
            <label><i class="fas fa-user-tie"></i> Nombre: </label>
            <label class="guion" id="lblNombre<?php echo $varGral;?>">Nombre de la persona</label>
        </div>
        <div class="card-box3" id="clave<?php echo $varGral;?>">
            <label><i class="fas fa-key"></i> Clave: </label>
            <label class="guion" id="lblclave<?php echo $varGral;?>">Clave de la persona</label>
        </div>
        <div class="card-box4" id="edad<?php echo $varGral;?>">
            <label><i class="fas fa-sort-numeric-up"></i> Edad: </label>
            <label class="guion" id="lblEdad<?php echo $varGral;?>">Edad de la persona</label>
        </div>
        <div class="card-box5" id="correo<?php echo $varGral;?>">
            <label><i class="fas fa-at"></i> Correo: </label>
            <label class="guion" id="lblCorreo<?php echo $varGral;?>">Correo de la persona</label>
        </div>
        <div class="card-box6" id="ecivil<?php echo $varGral;?>">
            <label><i class="fas fa-compass"></i> Estado Civil: </label>
            <label class="guion" id="lblEcivil<?php echo $varGral;?>">Estado Civil de la persona</label>
        </div>
        <div class="card-box7" id="curp<?php echo $varGral;?>">
            <label><i class="fas fa-id-card"></i> CURP: </label>
            <label class="guion" id="lblCurp<?php echo $varGral;?>">Curp de la persona</label>
        </div>
    </div>

</form>