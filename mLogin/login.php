<div class="login-box" >
    <div class="login-box-body bordeLogin">

        <p class="tituloLogin">Sistema Control de Accesos</p>
        
        <form action="verificar_login.php" method="post" id="frmLogin" style="border-color:#40739e">
            <div class="form-group has-feedback logoActivo">
                <label class="lblTitulo">Usuario:</label>
            <input type="usuario" id="loginUsuario" class="form-control" placeholder="Escribe el nombre de usuario" autofocus required>
            </div>
            <div class="form-group has-feedback">
                <label class="lblTitulo">Contraseña:</label>
                <input type="password" id="loginContra" class="form-control" placeholder="Escribe la contraseña" required>
           
            </div>
            
            <div class="col text-center form-group">
                <label class="lblTitulo" id="lblCambiarC">Cambiar Contraseña:</label>
                <input value="" class="toggle-two" type="checkbox" data-toggle="toggle" data-onstyle="outline-success" data-width="60" data-size="sm" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="checkCambioC">
            </div>
            
            <div class="col text-center">
                <div>
                    <button   type="submit" class="btn btn-outline-dark active" id="btnIngresar" disabled>
                        <i class="fas fa-lock" id="icoLogin"></i>
                        Ingresar al sistema
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>