//VARIABLE GLOBAL PARA NOMBRAR LOS ELEMENTOS DE LOS  FORMULARIOS
//USUARIOS -U
var nombreModulo_U = "Usuarios";

$("#frmGuardar-U").submit(function(e){

    var id_persona    = $("#cmbPersona-U").val();
    var user_name    = $("#userName").val();
    var id_tema = $("#cmbTema-U").val();
    var fecha_cad = $("#fecha_cad").val();
    var permiso_DP      = $("#permiso_DP").val();
    var permiso_EC      = $("#permiso_EC").val();
    var permiso_U      = $("#permiso_U").val();
    var permiso_T     = $("#permiso_T").val();

    (permiso_DP == 1) ? permiso_DP = 'si': permiso_DP = 'no';
    (permiso_EC == 1) ? permiso_EC = 'si': permiso_EC = 'no';
    (permiso_U == 1) ? permiso_U = 'si': permiso_U = 'no';
    (permiso_T == 1) ? permiso_T = 'si': permiso_T = 'no';

    swal({
        title: "¿Desea Guardar?",
        text: "¿El usuario se guardará con la contraseña '12345678'?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-primary",
        confirmButtonText: "Si deseo guardarla",
        cancelButtonText: "Cancelar Acción",
        cancelButtonClass: "btn-outline-danger",
        closeOnConfirm: false,
        closeOnCancel: true,
        showLoaderOnConfirm: true
      }, function (isConfirm) {
        if (isConfirm) {
        setTimeout(function () {
            swal.close();
            $.ajax({
                url:"../mUsuarios/guardar.php",
                type:"POST",
                dataType:"html",
                data:{id_persona,user_name,id_tema,fecha_cad,permiso_DP,permiso_EC,permiso_U,permiso_T},
                success:function(respuesta){
                    $("#guardar-U").hide();
                    llenar_lista_U();
                    $("#badgeInfo").text("Lista");
                    $("#frmGuardar-U")[0].reset();
                    alertify.success("<i class='fa fa-save fa-lg'></i>", 2);
                    $('#userName').focus();
                    actividad  ="Se insertado un nuevo registro a la tabla "+nombreModulo_U;
                    var idUser=$("#inicioIdusuario").val();
                    log(actividad, idUser);
                    
                    console.log(permiso_DP);
                    console.log(permiso_EC);
                    console.log(permiso_U);
                    console.log(permiso_T);
        
                },
                error:function(xhr,status){
                    alert("Error en metodo AJAX"); 
                },
            });
        }, 2000);}
        else{
            alertify.error(" <i class='fa fa-times fa-lg'></i> Cancelado",2);
        }
      });

    e.preventDefault();
    return false;
});


$("#frmActualizar-U").submit(function(e){

    var id = $("#uId").val();
    var user_name    = $("#euserName").val();
    var id_tema = $("#ecmbTema-U").val();
    var fecha_cad = $("#efecha_cad").val();
    var permiso_DP      = $("#epermiso_DP").val();
    var permiso_EC      = $("#epermiso_EC").val();
    var permiso_U      = $("#epermiso_U").val();
    var permiso_T     = $("#epermiso_T").val();

    (permiso_DP == 1) ? permiso_DP = 'si': permiso_DP = 'no';
    (permiso_EC == 1) ? permiso_EC = 'si': permiso_EC = 'no';
    (permiso_U == 1) ? permiso_U = 'si': permiso_U = 'no';
    (permiso_T == 1) ? permiso_T = 'si': permiso_T = 'no';

    swal({
        title: "¿Estas Seguro?",
        text: "¿Deseas Actualizar la información?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Si, deseo actualizarla",
        cancelButtonText: "Cancelar Acción",
        cancelButtonClass: "btn-outline-danger",
        closeOnConfirm: false,
        closeOnCancel: true,
        showLoaderOnConfirm: true
      }, function (isConfirm) {
        if (isConfirm) {
        setTimeout(function () {
            swal.close();
            $.ajax({
                url:"../mUsuarios/actualizar.php",
                type:"POST",
                dataType:"html",
                data:{id, user_name, id_tema, fecha_cad, permiso_DP, permiso_EC, permiso_U, permiso_T},
                success:function(respuesta){
                    console.log(respuesta);
                    $("#editar-U").hide();
                    llenar_lista_U();
                    $("#badgeInfo").text("Lista");
                    $("#frmActualizar-U")[0].reset();
                    alertify.succeess("<i class='fa fa-save fa-lg'></i>", 2);
                    $('#userName').focus();
                    actividad  ="Se ha modificado un registro de la tabla "+nombreModulo_U;
                    var idUser=$("#inicioIdusuario").val();
                    log(actividad,idUser);
                    
                },
                error:function(xhr,status){
                    alert("Error en metodo AJAX"); 
                },
            });
        }, 2000);}
        else{
            alertify.error(" <i class='fa fa-times fa-lg'></i> Cancelado",2);
        }
      });

    e.preventDefault();
    return false;
});

function llenar_lista_U(){
    abrirModalCarga('Cargando Lista');
    $("#frmGuardar-U")[0].reset();
    $("#Listado-U").hide();
    $.ajax({
        url:"../mUsuarios/lista.php",
        type:"POST",
        dataType:"html",
        data:{},
        success:function(respuesta){
            $("#Listado-U").html(respuesta);
            $("#Listado-U").fadeIn("slow");
            cerrarModalCarga();      
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
};

function combo_persona_U()
{
    $.ajax({
        url : '../mUsuarios/comboDatos.php',
        data : {},
        type : 'POST',
        dataType : 'html',
        success : function(respuesta) {
            
            $("#cmbPersona-U").empty();
            $("#cmbPersona-U").html(respuesta);    
            selectTwo();
        },
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });
};

function ecombo_persona_U(id)
{
    $.ajax({
        url : '../mUsuarios/ecomboDatos.php',
        data : {id},
        type : 'POST',
        dataType : 'html',
        success : function(respuesta) {
            
            $("#ecmbPersona-U").empty();
            $("#ecmbPersona-U").html(respuesta);    
            selectTwo();
        },
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });
};

function combo_temas_U()
{
    $.ajax({
        url : '../mUsuarios/comboTemas.php',
        data : {},
        type : 'POST',
        dataType : 'html',
        success : function(respuesta) {
            
            $("#cmbTema-U, #ecmbTema-U").empty();
            $("#cmbTema-U, #ecmbTema-U").html(respuesta);    
            selectTwo();
        },
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });
};

function llenar_formulario_U(id,id_dato,id_tema,nombre_usuario,fecha_caducidad,permiso_DP,permiso_EC,permiso_U,permiso_T){
    console.log(id);

    $("#uId").val(id);
    ecombo_persona_U(id);
    $("#ecmbPersona-U").val(id_dato);
    $("#euserName").val(nombre_usuario);
    $("#ecmbTema-U").val(id_tema);
    $("#efecha_cad").val(fecha_caducidad);

    if (permiso_DP == 'si') {
        $("#epermiso_DP").bootstrapToggle('on');
        $("#epermiso_DP").val(1);
    } else {
        $("#epermiso_DP").bootstrapToggle('off');
        $("#epermiso_DP").val(0);
    }

    if (permiso_EC == 'si') {
        $("#epermiso_EC").bootstrapToggle('on');
        $("#epermiso_EC").val(1);
    } else {
        $("#epermiso_EC").bootstrapToggle('off');
        $("#epermiso_EC").val(0);
    }

    if (permiso_U == 'si') {
        $("#epermiso_U").bootstrapToggle('on');
        $("#epermiso_U").val(1);
    } else {
        $("#epermiso_U").bootstrapToggle('off');
        $("#epermiso_U").val(0);
    }

    if (permiso_T == 'si') {
        $("#epermiso_T").bootstrapToggle('on');
        $("#epermiso_T").val(1);
    } else {
        $("#epermiso_T").bootstrapToggle('off');
        $("#epermiso_T").val(0);
    }

    selectTwo();

    $("#lblTitular").text(nombreModulo_U);
    $("#badgeInfo").text("Modificar datos");

    $("#guardar-U").hide();
    $("#Listado-U").hide();
    $("#editar-U").fadeIn();
    $("#euserName").focus();
}

function reset_passw(id) {
    var id_usuario = id;

    swal({
        title: "¿Está Seguro?",
        text: "La contraseña del usuario se restablecerá a: 12345678",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-primary",
        confirmButtonText: "Si",
        cancelButtonText: "Cancelar Acción",
        cancelButtonClass: "btn-outline-danger",
        closeOnConfirm: false,
        closeOnCancel: true,
        showLoaderOnConfirm: true
      }, function (isConfirm) {
        if (isConfirm) {
        setTimeout(function () {
            swal.close();
            $.ajax({
                url : '../mUsuarios/resetContra.php',
                data : {id_usuario},
                type : 'POST',
                dataType : 'html',
                success : function(respuesta) {
                    
                    llenar_lista_U();
                    alertify.success("<i class='fa fa-save fa-lg'></i>", 2);
                },
                error : function(xhr, status) {
                    alert('Disculpe, existió un problema');
                },
            });
        }, 2000);}
        else{
            alertify.error(" <i class='fa fa-times fa-lg'></i> Cancelado",2);
        }
      });

}

function cambiar_estatus_U(id,consecutivo){

    var valor=$("#check"+consecutivo).val();
    var contravalor=(valor==1)?0:1;
    $("#check"+consecutivo).val(contravalor);

    $.ajax({
        url:"../mUsuarios/cEstatus.php",
        type:"POST",
        dataType:"html",
        data:{id,contravalor},
        success:function(respuesta){
            // console.log(respuesta);
            if(contravalor==1){
                alertify.success("<i class='fa fa-check fa-lg'></i>", 2);
                $("#btnEditar-U"+consecutivo).removeAttr('disabled');
                $("#btnR-Contra-U"+consecutivo).removeAttr('disabled');
                $("#btnPermisos-U"+consecutivo).removeAttr('disabled');
                actividad  ="Se ha reactivado un registro de la tabla "+nombreModulo_U;
                var idUser=$("#inicioIdusuario").val();
                log(actividad,idUser);
            }else{
                alertify.error("<i class='fa fa-times fa-lg'></i>", 2);
                $("#btnEditar-U"+consecutivo).attr('disabled','disabled');
                $("#btnR-Contra-U"+consecutivo).attr('disabled','disabled');
                $("#btnPermisos-U"+consecutivo).attr('disabled','disabled');
                actividad  ="Se ha desactivado un registro de la tabla "+nombreModulo_U;
                var idUser=$("#inicioIdusuario").val();
                log(actividad,idUser);
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });

}

$("#btnCancelarG-U , #btnCancelarA-U").click(function(){
    $("#editar-U").hide();
    $("#guardar-U").hide();

    $("#lblTitular").text(nombreModulo_U);
    $("#badgeInfo").text("Lista");

    $("#Listado-U").fadeIn(); 
});


function nuevo_registro_U(){
    $("#lblTitular").text(nombreModulo_U);

    $("#badgeInfo").text("Nuevo registro");

    $("#Listado-U").hide();
    $("#guardar-U").fadeIn();
    $('#frmGuardar-U')[0].reset();  
    combo_persona_U();
    $("#permiso_DP").bootstrapToggle('off');
    $("#permiso_DP").val(0);
    $("#permiso_EC").bootstrapToggle('off');
    $("#permiso_EC").val(0);
    $("#permiso_U").bootstrapToggle('off');
    $("#permiso_U").val(0);
    $("#permiso_T").bootstrapToggle('off');
    $("#permiso_T").val(0);
};

$("#permiso_DP").change(function () {
    var valor = $(this).val();
    
    (valor == 0) ? $(this).val(1): $(this).val(0);
});

$("#permiso_EC").change(function () {
    var valor = $(this).val();
    
    (valor == 0) ? $(this).val(1): $(this).val(0);
});

$("#permiso_U").change(function () {
    var valor = $(this).val();
    
    (valor == 0) ? $(this).val(1): $(this).val(0);
});

$("#permiso_T").change(function () {
    var valor = $(this).val();
    
    (valor == 0) ? $(this).val(1): $(this).val(0);
});

$("#epermiso_DP").change(function () {
    var valor = $(this).val();
    
    (valor == 0) ? $(this).val(1): $(this).val(0);
});

$("#epermiso_EC").change(function () {
    var valor = $(this).val();
    
    (valor == 0) ? $(this).val(1): $(this).val(0);
});

$("#epermiso_U").change(function () {
    var valor = $(this).val();
    
    (valor == 0) ? $(this).val(1): $(this).val(0);
});

$("#epermiso_T").change(function () {
    var valor = $(this).val();
    
    (valor == 0) ? $(this).val(1): $(this).val(0);
});

$("#mpermiso_DP").change(function () {
    var valor = $(this).val();
    
    (valor == 0) ? $(this).val(1): $(this).val(0);
});

$("#mpermiso_EC").change(function () {
    var valor = $(this).val();
    
    (valor == 0) ? $(this).val(1): $(this).val(0);
});

$("#mpermiso_U").change(function () {
    var valor = $(this).val();
    
    (valor == 0) ? $(this).val(1): $(this).val(0);
});

$("#mpermiso_T").change(function () {
    var valor = $(this).val();
    
    (valor == 0) ? $(this).val(1): $(this).val(0);
});

// Revisar Nombre Usuario

$("#userName").keyup(function(){
    var valor=$(this).val();
    revisar_nombre_U(valor);
});

$("#euserName").keyup(function(){
    var valor=$(this).val();
    revisar_enombre_U(valor);
});

$("#enombreTema").keyup(function(){
    var valor=$(this).val();
    revisar_enombre_T(valor);
});

function revisar_nombre_U(valor){
    $.ajax({
        url:"../mUsuarios/rNombre.php",
        type:"POST",
        dataType:"html",
        data:{valor},
        success: function (respuesta) {
            res = parseInt(respuesta);
            
            if (res == 0) {
                $("#userName").css("color", obscuro);
                $("#lblusuarios").text("Nombre de Usuario");
                $("#lblusuarios").css("color", obscuro);
                $("#btnGuardar-U").removeAttr('disabled');
            }else{
                $("#userName").css("color", rojo);
                $("#lblusuarios").text("Ya existe un usuario con este nombre.");
                $("#lblusuarios").css("color", rojo);
                $("#btnGuardar-U").attr('disabled', 'disabled');
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
};

function revisar_enombre_U(valor){
    $.ajax({
        url:"../mUsuarios/rNombre.php",
        type:"POST",
        dataType:"html",
        data:{valor},
        success: function (respuesta) {
            res = parseInt(respuesta);
            
            if (res == 0) {
                $("#euserName").css("color", obscuro);
                $("#elblusuarios").text("Nombre de Usuario");
                $("#elblusuarios").css("color", obscuro);
                $("#btnActualizar-U").removeAttr('disabled');
            }else{
                $("#euserName").css("color", rojo);
                $("#elblusuarios").text("Ya existe un usuario con este nombre.");
                $("#elblusuarios").css("color", rojo);
                $("#btnActualizar-U").attr('disabled', 'disabled');
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
};


// Revisar Nombre Tema

// Modal Permisos

function abrirModalPermisos_U(id, nombre_usuario, permiso_DP, permiso_EC, permiso_U, permiso_T) {
    $("#txtTitularPermisos").text("Permisos de Usuario - " + nombre_usuario);
    $("#txtIdPermisos").val(id);
    $("#txtNombreUsuario").val(nombre_usuario);

    if (permiso_DP == 'si') {
        $("#mpermiso_DP").bootstrapToggle('on');
        $("#mpermiso_DP").val(1);
    } else {
        $("#mpermiso_DP").bootstrapToggle('off');
        $("#mpermiso_DP").val(0);
    }

    if (permiso_EC == 'si') {
        $("#mpermiso_EC").bootstrapToggle('on');
        $("#mpermiso_EC").val(1);
    } else {
        $("#mpermiso_EC").bootstrapToggle('off');
        $("#mpermiso_EC").val(0);
    }

    if (permiso_U == 'si') {
        $("#mpermiso_U").bootstrapToggle('on');
        $("#mpermiso_U").val(1);
    } else {
        $("#mpermiso_U").bootstrapToggle('off');
        $("#mpermiso_U").val(0);
    }

    if (permiso_T == 'si') {
        $("#mpermiso_T").bootstrapToggle('on');
        $("#mpermiso_T").val(1);
    } else {
        $("#mpermiso_T").bootstrapToggle('off');
        $("#mpermiso_T").val(0);
    }

    $("#modalPermisos-U").modal("show");
}

$("#btnGuardarPermisosU").click(function () {
    var id = $("#txtIdPermisos").val();
    var nombre_usuario = $("#txtNombreUsuario").val();
    var permiso_DP = $("#mpermiso_DP").val();
    var permiso_EC = $("#mpermiso_EC").val();
    var permiso_U = $("#mpermiso_U").val();
    var permiso_T = $("#mpermiso_T").val();

    (permiso_DP == 1) ? permiso_DP = 'si': permiso_DP = 'no';
    (permiso_EC == 1) ? permiso_EC = 'si': permiso_EC = 'no';
    (permiso_U == 1) ? permiso_U = 'si': permiso_U = 'no';
    (permiso_T == 1) ? permiso_T = 'si' : permiso_T = 'no';

    $.ajax({
        url : '../mUsuarios/cPermisos.php',
        data : {id,permiso_DP,permiso_EC,permiso_U,permiso_T},
        type : 'POST',
        dataType : 'html',
        success: function (respuesta) {
            
            $("#modalPermisos-U").modal("hide");
            llenar_lista_U();
            alertify.success("<i class='fa fa-save fa-lg'></i> Guardado", 5);
            actividad  ="Se han actualizado los permisos del usuario "+nombre_usuario;
            var idUser=$("#inicioIdusuario").val();
            log(actividad,idUser);
        },
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });
    
    
});
// Modal Permisos