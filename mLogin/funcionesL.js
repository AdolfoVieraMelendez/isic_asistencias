//Hace la validacion del usuario y la contraseña
$("#frmLogin").submit(function(e){

    var usuario    = $("#loginUsuario").val();
    var contra     = $("#loginContra").val();

    $.ajax({
        url:"../mLogin/validar_login.php",
        type:"POST",
        dateType:"json",
        data:{usuario,contra},
        success:function(respuesta){
            var dataArray = JSON.parse(respuesta);
             //console.log(respuesta);
            var registros=dataArray.cRegistros;
            var dias=dataArray.dias;
            if (registros !=0 ) {//existe el usuario
                if(dias < 0){//caducidad
                    swal({
                        title: "Mensaje!",
                        text: "A caducado tu suscripción al sistema",
                        type: "error",
                        confirmButtonClass: "btn-dark",
                        confirmButtonText: "Enterado"
                    }, function (isConfirm) {
                        $("#btnIngresar").attr("disabled","disabled");
                        var h_sidebar="#c0392b";
                        var color_base="#e74c3c";
                        var letra_color="#fff";
                        var color_borde="#e74c3c";
                        cssTema(h_sidebar,color_base,letra_color,color_borde);
                        $("#icoLogin").removeClass("fas fa-unlock");
                        $("#icoLogin").addClass("fas fa-lock");
                        $("#frmLogin")[0].reset();
                        $("#loginUsuario").focus();
                    });

                }else{
                    if($('#checkCambioC').prop('checked')){
                        $("#modalCambio-LG").modal("show");
                    }else{
                        $("#contentLogin").hide();
                        $("#contentSistema").show();

                        persona=dataArray.result.persona;
                        idUsuario=dataArray.result.id_usuario;
                        idDato=dataArray.result.id_dato;

                        $("#titular").text(persona);

                        $('#sidebar').toggleClass('active');
                        permisos(dataArray.result.permiso_datos_persona,dataArray.result.permiso_ecivil,dataArray.result.permiso_usuario,dataArray.result.permiso_temas);
                        preloader(1,'Asitencia del personal');
                        actividad  ="Ingreso al sistema";
                        log(actividad,dataArray.result.id_usuario);
                        verAsistencias();
                    }
                    
                }
            }else{
                swal({
                    title: "Mensaje!",
                    text: "La contraseña es incorrecta.",
                    type: "error",
                    confirmButtonClass: "btn-dark",
                    confirmButtonText: "Enterado"
                }, function (isConfirm) {
                    $("#btnIngresar").attr("disabled","disabled");
                    var h_sidebar="#c0392b";
                    var color_base="#e74c3c";
                    var letra_color="#fff";
                    var color_borde="#e74c3c";
                    cssTema(h_sidebar,color_base,letra_color,color_borde);
                    $("#icoLogin").removeClass("fas fa-unlock");
                    $("#icoLogin").addClass("fas fa-lock");
                    $("#frmLogin")[0].reset();
                    $("#loginUsuario").focus();
                });

            }

        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
    
    e.preventDefault();
    return false;
});

//permisoa partes del menu
function permisos(datos,ecivil,usuarios,temas){
    if(datos=='si'){
        $("#liDatos").show();
    }else{
        $("#liDatos").hide();
    }

    if(ecivil=='si'){
        $("#liEcivil").show();
    }else{
        $("#liEcivil").hide();
    }

    if(usuarios=='si'){
        $("#liUsuarios").show();
    }else{
        $("#liUsuarios").hide();
    }

    if(temas=='si'){
        $("#liTemas").show();
    }else{
        $("#liTemas").hide();
    }
}

//Revisa si existe el usuario y aplica el tema del mismo
$("#loginUsuario").keyup(function(){
    valor=$(this).val();
    $.ajax({
        url:"../mLogin/rUsuario.php",
        type:"POST",
        dateType:"json",
        data:{valor},
        success:function(respuesta){
            var dataArray = JSON.parse(respuesta);
            //console.log(respuesta);
            var registros=dataArray.cRegistros;
            if (registros !=0 ) {
                //$("#frmLogin").hide();
                idTema=dataArray.result.id_tema;
                aplicarTema(idTema,'login');
                $("#btnIngresar").removeAttr("disabled");
                $("#icoLogin").removeClass("fas fa-lock");
                $("#icoLogin").addClass("fas fa-unlock");
                $("#inicioIdusuario").val(dataArray.result.id_usuario);
                $("#inicioIdDato").val(dataArray.result.id_dato);
                $("#inicioIdTema").val(dataArray.result.id_tema);
                //$("#frmLogin").fadeIn();
            }else{
                //colores default
                $("#icoLogin").removeClass("fas fa-unlock");
                $("#icoLogin").addClass("fas fa-lock");
                $("#btnIngresar").attr("disabled","disabled");
                var h_sidebar="#2f3640";
                var color_base="#353b48";
                var letra_color="#fff";
                var color_borde="#40739e";
                cssTema(h_sidebar,color_base,letra_color,color_borde);
            }

        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
});

function random_password(largo){
    var resultado = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var numCaracteres = caracteres.length;

    for(var i = 0; i < largo; i++){
        resultado += caracteres.charAt(Math.floor(Math.random() * numCaracteres));
    }
    $("#passw").val(resultado);
    $("#passConfirm").val(resultado);
    alertify.success('<i class="fas fa-check"></i> Contraseña Generada', 1);
};

$("#btnGenerarContra").click(function(){
    var largo = 8;
    random_password(largo);
    
});

function verificarContra(){
    var usuario = $("#loginUsuario").val();
    var contra = $("#passw").val();
    var vContra = $("#passConfirm").val();
    if(contra.length <=7){
        alertify.error('<i class="fas fa-times"></i> La contraseña debe tener al menos 8 caracteres', 2);
    }else{
        if(vContra != contra){
            alertify.error('<i class="fas fa-times"></i> Los campos de las contraseñas tienen que coincidir', 2);
        }else{
            $.ajax({
                url:"../mLogin/actualizar_contra_login.php",
                type:"POST",
                dateType:"html",
                data:{contra, usuario},
                success:function(respuesta){
                    alertify.success("<i class='fa fa-save fa-lg'></i> Se ha cambiado la contraseña", 2);
                    $("#passw").val("");
                    $("#passConfirm").val("");
                    $("#loginUsuario").val("");
                    $("#loginContra").val("");
                    $("#modalCambio-LG").modal("hide");
                    $("#checkCambioC").click();
                    $("#contentLogin").hide();                    
                },
                error:function(xhr,status){
                    alert("Error en metodo AJAX");
                },
            });
            $.ajax({
                url:"../mLogin/validar_login.php",
                type:"POST",
                dateType:"json",
                data:{usuario,contra},
                success:function(respuesta){
                    var dataArray = JSON.parse(respuesta);
                    $("#contentSistema").show();
                    persona=dataArray.result.persona;
                    idUsuario=dataArray.result.id_usuario;
                    idDato=dataArray.result.id_dato;
                    $("#titular").text(persona);
                    $("#sidebar").toggleClass('active');
                    permisos(dataArray.result.permiso_datos_persona,dataArray.result.permiso_ecivil,dataArray.result.permiso_usuario,dataArray.result.permiso_temas);
                    preloader(1,'Asistencia del personal');
                    actividad="Ingreso al sistema";
                    log(actividad,dataArray.result.id_usuario);
                    verAsistencias();

                },
                error:function(xhr,status){
                    alert("Error en método AJAX");
                },
            });       
        }
    }
};

$("#btnCambiarContra").click(function(){
    verificarContra();    
});


$("#btnVerContra").click(function(){
    var valorBoton = $("#btnVerContra").val();
    if (valorBoton == 0){
        $("#btnVerContra").val(1);
        $("#icoVerContra").removeClass("far fa-eye-slash");
        $("#icoVerContra").addClass("far fa-eye");
        $("#passw").attr('type', 'text');
        $("#passConfirm").attr('type', 'text');
    }else{
        $("#btnVerContra").val(0);
        $("#icoVerContra").removeClass("far fa-eye");
        $("#icoVerContra").addClass("far fa-eye-slash");   
        $("#passw").attr('type', 'password');
        $("#passConfirm").attr('type', 'password');   
    }
})


