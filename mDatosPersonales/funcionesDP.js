//VARIABLE GLOBAL PARA NOMBRAR LOS ELEMENTOS DE LOS  FORMULARIOS
//DATOS PERSONALES -DP 
var nombreModulo_DP="Datos Personales";

$("#frmGuardar-DP").submit(function(e){

    var clave    = $("#clave").val();
    var nombre    = $("#nombre").val();
    var apPaterno = $("#apPaterno").val();
    var apMaterno = $("#apMaterno").val();
    var fNac      = $("#fNac").val();
    var correo    = $("#correo").val();
    var curp      = $("#curp").val();
    var domicilio = $("#domicilio").val();
    var sexo      = $("#sexo").val();
    var ecivil    = $("#ecivil").val();

    swal({
        title: "¿Estas Seguro?",
        text: "¿Deseas Guardar la información?",
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
                url:"../mDatosPersonales/guardar.php",
                type:"POST",
                dateType:"html",
                data:{clave,nombre,apPaterno,apMaterno,fNac,correo,curp,domicilio,sexo,ecivil},
                success:function(respuesta){
                    
                    $("#guardar-DP").hide();
                    llenar_lista_DP();
                    $("#frmGuardar-DP")[0].reset();
                    selectTwo();
                    alertify.success("<i class='fa fa-save fa-lg'></i>", 2);
                    $('#nombre').focus();
                    actividad  ="Se insertado un nuevo registro a la tabla "+nombreModulo_DP;
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

$("#frmActualizar-DP").submit(function(e){

    var id        = $("#eId").val();
    var nombre    = $("#eNombre").val();
    var apPaterno = $("#eApPaterno").val();
    var apMaterno = $("#eApMaterno").val();
    var fNac      = $("#eFnac").val();
    var correo    = $("#eCorreo").val();
    var curp      = $("#eCurp").val();
    var clave     = $("#eClave").val();
    var domicilio = $("#eDomicilio").val();
    var sexo      = $("#eSexo").val();
    var ecivil    = $("#eEcivil").val();

    swal({
        title: "¿Estas Seguro?",
        text: "¿Deseas Actualizar la información?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Si deseo actualizarla",
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
                url:"../mDatosPersonales/actualizar.php",
                type:"POST",
                dateType:"html",
                data:{clave,id,nombre,apPaterno,apMaterno,fNac,correo,curp,clave,domicilio,sexo,ecivil},
                success:function(respuesta){
                    //console.log(respuesta);
                    llenar_lista_DP();
                        $("#frmGuardar-DP")[0].reset();
                        $("#frmActualizar-DP")[0].reset();
                        alertify.success("<i class='fa fa-bolt fa-lg'></i>", 2);
                    $("#btnCancelarG-DP , #btnCancelarA-DP").click();
                    actividad  ="Se ha modificado un registro de la tabla tabla "+nombreModulo_DP;
                    var idUser=$("#inicioIdusuario").val();
                    log(actividad,idUser);
                    
                    $('#nombre').focus();
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

function llenar_lista_DP(){
    abrirModalCarga('Cargando Lista');
    $("#frmGuardar-DP")[0].reset();
    $("#Listado-DP").hide();
    $.ajax({
        url:"../mDatosPersonales/lista.php",
        type:"POST",
        dateType:"html",
        data:{},
        success:function(respuesta){
            $("#Listado-DP").html(respuesta);
            $("#Listado-DP").fadeIn("slow");
            cerrarModalCarga();      
            $("#nombre").focus();
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

function edad(fecha){
    $.ajax({
        url:"../mDatosPersonales/calcularEdad.php",
        type:"POST",
        dateType:"html",
        data:{fecha},
        success:function(respuesta){

            $("#edad").val(respuesta);
            $("#eEdad").val(respuesta);

            xedad= parseInt(respuesta);
            if (xedad < 0) {
                
                $("#edad, #eEdad , #fNac , #efNac").css("color", rojo);
            } else {
                
                $("#edad, #eEdad , #fNac , #efNac").css("color", obscuro);
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

function llenar_formulario_DP(id,nombre,apPaterno,apMaterno,fNac,edad,correo,curp,clave,domicilio,sexo,ecivil){
   
    $("#eId").val(id);
    $("#eClave").val(clave);
    $("#eNombre").val(nombre);
    $("#eApPaterno").val(apPaterno);
    $("#eApMaterno").val(apMaterno);
    $("#eFnac").val(fNac);
    $("#eEdad").val(edad);
    $("#eCorreo").val(correo);
    $("#eCurp").val(curp);
    $("#eClave").val(clave);
    $("#eDomicilio").val(domicilio);
    $("#eSexo").val(sexo);
    $("#eEcivil").val(ecivil);

    selectTwo();

    $("#lblTitular").text(nombreModulo_DP);
    $("#badgeInfo").text("Modificar datos");

    $("#guardar-DP").hide();
    $("#Listado-DP").hide();
    $("#editar-DP").fadeIn();
    $("#eNombre").focus();
}

function cambiar_estatus_DP(id,consecutivo){

    var valor=$("#check"+consecutivo).val();
    var contravalor=(valor==1)?0:1;
    $("#check"+consecutivo).val(contravalor);

    $.ajax({
        url:"../mDatosPersonales/cEstatus.php",
        type:"POST",
        dateType:"html",
        data:{id,contravalor},
        success:function(respuesta){
            // console.log(respuesta);
            if(contravalor==1){
                alertify.success("<i class='fa fa-check fa-lg'></i>", 2);
                $("#btnEditar-DP"+consecutivo).removeAttr('disabled');
                $("#btnImprimir-DP"+consecutivo).removeAttr('disabled');
                $("#btnModal-DP"+consecutivo).removeAttr('disabled');
                $("#btnFoto-DP"+consecutivo).removeAttr('disabled');
                $("#btnSonido-DP"+consecutivo).removeAttr('disabled');
                $("#icoSound-DP"+consecutivo).removeClass("fa fa-volume-mute fa-lg");
                $("#icoSound-DP"+consecutivo).addClass("fa fa-volume-up fa-lg");
                actividad  ="Se ha reactivado un registro de la tabla tabla "+nombreModulo_DP;
                var idUser=$("#inicioIdusuario").val();
                log(actividad,idUser);
            }else{
                alertify.error("<i class='fa fa-times fa-lg'></i>", 2);
                $("#btnEditar-DP"+consecutivo).attr('disabled','disabled');
                $("#btnImprimir-DP"+consecutivo).attr('disabled','disabled');
                $("#btnModal-DP"+consecutivo).attr('disabled','disabled');
                $("#btnFoto-DP"+consecutivo).attr('disabled','disabled');
                $("#btnSonido-DP"+consecutivo).attr('disabled','disabled');
                $("#icoSound-DP"+consecutivo).removeClass("fa fa-volume-up fa-lg");
                $("#icoSound-DP"+consecutivo).addClass("fa fa-volume-mute fa-lg");
                actividad  ="Se ha desactivado un registro de la tabla tabla "+nombreModulo_DP;
                var idUser=$("#inicioIdusuario").val();
                log(actividad,idUser);
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });

}

function abrirModalDatos_DP(id,nombre,apPaterno,apMaterno,fNac,edad,correo,curp,clave,domicilio,sexo,ecivil) {
    $("#modalTitle-DP").text("Datos personales - "+nombre+' '+apPaterno);

    $("#mNombre").val(nombre);
    $("#mApPaterno").val(apPaterno);
    $("#mApMaterno").val(apMaterno);
    $("#mFnac").val(fNac);
    $("#mEdad").val(edad);
    $("#mCorreo").val(correo);
    $("#mCurp").val(curp);
    $("#mClave").val(clave);
    $("#mDomicilio").val(domicilio);
    $("#mSexo").val(sexo);
    $("#mEcivil").val(ecivil);

    selectTwo();

    $("#modalDatos-DP").modal("show");
}


//Manipulacion de eventos con jquery
$("#fNac").change(function(){
    var fecha = $(this).val();
    edad(fecha);
    ;
});

$("#efNac").change(function(){
    var fecha = $(this).val();
    edad(fecha);

});

$("#btnCancelarG-DP , #btnCancelarA-DP").click(function(){
    $("#editar-DP").hide();
    $("#guardar-DP").hide();

    $("#lblTitular").text(nombreModulo_DP);
    $("#badgeInfo").text("Lista");

    $("#Listado-DP").fadeIn();
 
});


$("#clave").keydown(function() {
    var valor=$(this).val();
    soloNumeros(valor);
});

$("#curp , #eCurp").keyup(function() {

    valor=$(this);
    // Convierte en mayuscula
    valor.val(valor.val().toUpperCase());
    
    //validar curp + expresion regular
    if (curpValida(valor.val())=="Si") {
        //$("#btnGuardar-DP").removeAttr('disabled');
        $(valor).css("color", obscuro);
        alertify.success("Curp valida !",1);
    }else{
        //$("#btnGuardar-DP").attr('disabled','disabled');
        $(valor).css("color", rojo);
    }

});

$("#clave").keyup(function(){
    var valor=$(this).val();
    revisar_clave(valor);
});

//Manipulacion de eventos con jquery

//Revisar clave repetida
function revisar_clave(valor){
    $.ajax({
        url:"../mDatosPersonales/rClave.php",
        type:"POST",
        dateType:"html",
        data:{valor},
        success:function(respuesta){
            res =parseInt(respuesta);
            if (res == 0) {
                $("#clave").css("color", obscuro);
            }else{
                $("#clave").css("color", rojo);
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

//validar curp
function curpValida(valor) {

    var validador;
    var curp=valor;

    // Expresion regular para curp
    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
        validado = curp.match(re);
    
    if (!validado){  //Coincide con el formato general?
        validador = "No";
    }else{
        validador = "Si";
    }
    return validador;
}

//llenar combo
function combo_ecivil()
{
    $.ajax({
        url : '../mDatosPersonales/comboEcivil.php',
        data : {},
        type : 'POST',
        dataType : 'html',
        success : function(respuesta) {
            
            $("#ecivil , #eEcivil , #mEcivil , #eDesc").empty();
            $("#ecivil , #eEcivil , #mEcivil , #eDesc").html(respuesta);    
            selectTwo();
        },
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });
}

function nuevo_registro_DP(){
    $("#lblTitular").text(nombreModulo_DP);
    $("#badgeInfo").text("Nuevo registro");

    $("#Listado-DP").hide();
    $("#guardar-DP").fadeIn();
    $('#frmGuardar-DP')[0].reset();
    $("#clave").focus();
    
}

function abrirModalFoto(id,clave,nombre,valorfoto) {

    $("#clavePersona").val(clave);
    $("#txtTitularFoto").text(nombre);

    if (valorfoto=="No") {
        $('#formVista').hide();
        $('#formSubida').fadeIn();
        $('#formSubida')[0].reset();
    }else{
        $('#formSubida').hide();
        $('#formVista').fadeIn();
        var archivo='../fotos/'+clave+".jpg";
        $("#imgFoto").attr("src",archivo);
    }
    
    $("#modalFoto").modal("show");

}

function  eliminarFoto(){

    var formData = new FormData();
    var clave=$('#clavePersona').val();
    formData.append('clave',clave);

    swal({
        title: "¿Estas Seguro?",
        text: "¿Deseas eliminar la foto?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-dark",
        confirmButtonText: "Si deseo eliminarla",
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
                url: '../mDatosPersonales/fotoBorrar.php',
                type: 'post',
                data: formData,
                contentType: false,
                processData: false,
                success: function(response) {
                  var res=parseInt(response);
                  switch(res){
                    case 0 :
                        alertify.error("<i class='fa fa-times fa-lg'></i> No se encuentra el archivo",1);
                        $("#modalFoto").modal("hide");
                        llenar_lista_DP();
                      break;
                    case 1 :
                        alertify.warning("<i class='fa fa-check fa-lg'></i> Foto Eliminada",1);
                        $("#modalFoto").modal("hide");
                        llenar_lista_DP();
                        break;
                  }
        
                },
                error:function(xhr,status){
                    alertify.error('Error en proceso');
                },
            });
        }, 2000);}
        else{
            alertify.error(" <i class='fa fa-times fa-lg'></i> Cancelado",2);
        }
      });

}

function subirFoto(){
    var formData = new FormData();

    var files = $('#image')[0].files[0];

    var clave=$('#clavePersona').val();
    var tam=$('#tamanoKB').val();

    formData.append('file',files);
    formData.append('clave',clave);
    formData.append('tam',tam);

    $.ajax({
        url: '../mDatosPersonales/fotoSubir.php',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
          var res=parseInt(response);
          switch(res){
            case 0 :
                alertify.success("<i class='fas fa-file-upload'></i>",1);
                $("#modalFoto").modal("hide");
                llenar_lista_DP();
              break;
            case 1 :

                swal({
                    title: "Error!",
                    text: "No ha sido posible cargar el archivo debido a que este debe de tener extención jpg y no debe de sobrepasar los 3 megabytes",
                    type: "error",
                    confirmButtonClass: "btn-dark",
                    confirmButtonText: "Enterado"
                }, function (isConfirm) {
                    alertify.message("Gracias !");
                });
              break;
            default:
                  alertify.error("<i class='fa fa-times fa-lg'></i>",1);
          }

        },
        error:function(xhr,status){
            alertify.error('Error en proceso');
        },
    });
// return false;
}

function abrirModalHorario(id, nombre, turno, l_entrada, l_salida, m_entrada, m_salida, mi_entrada, mi_salida, j_entrada, j_salida, v_entrada, v_salida, s_entrada, s_salida, d_entrada, d_salida, valorHorario) {
    $("#l_entrada, #l_salida, #m_entrada, #m_salida, #mi_entrada, #mi_salida, #j_entrada, #j_salida, #v_entrada, #v_salida, #s_entrada, #s_salida, #d_entrada, #d_salida").removeAttr('disabled');
    $("#btnLunesHorario").val(1);
    $("#btnMartesHorario, #btnMiercolesHorario, #btnJuevesHorario, #btnViernesHorario, #btnSabadoHorario, #btnDomingoHorario").val(0);
    cambiarBtnDia();
    $("#l_entrada, #l_salida, #m_entrada, #m_salida, #mi_entrada, #mi_salida, #j_entrada, #j_salida, #v_entrada, #v_salida, #s_entrada, #s_salida, #d_entrada, #d_salida").attr('disabled', 'disabled');
    $("#txtTitularHorario").text(nombre);
    $("#txtNombrePersona").val(nombre);
    $("#txtHorario").val(valorHorario);
    $("#txtPersonaHorario").val(id);

    if (valorHorario == 'Si') {
        var l_entradaSP = l_entrada.split(":");
        var l_entradaC = l_entradaSP[0] + ':' + l_entradaSP[1];
        var l_salidaSP = l_salida.split(":");
        var l_salidaC = l_salidaSP[0] + ':' + l_salidaSP[1];
        
        var m_entradaSP = m_entrada.split(":");
        var m_entradaC = m_entradaSP[0] + ':' + m_entradaSP[1];
        var m_salidaSP = m_salida.split(":");
        var m_salidaC = m_salidaSP[0] + ':' + m_salidaSP[1];
        
        var mi_entradaSP = mi_entrada.split(":");
        var mi_entradaC = mi_entradaSP[0] + ':' +mi_entradaSP[1];
        var mi_salidaSP = mi_salida.split(":");
        var mi_salidaC = mi_salidaSP[0] + ':' + mi_salidaSP[1];
        
        var j_entradaSP = j_entrada.split(":");
        var j_entradaC = j_entradaSP[0] + ':' +j_entradaSP[1];
        var j_salidaSP = j_salida.split(":");
        var j_salidaC = j_salidaSP[0] + ':' + j_salidaSP[1];
        
        var v_entradaSP = v_entrada.split(":");
        var v_entradaC = v_entradaSP[0] + ':' +v_entradaSP[1];
        var v_salidaSP = v_salida.split(":");
        var v_salidaC = v_salidaSP[0] + ':' + v_salidaSP[1];
        
        var s_entradaSP = s_entrada.split(":");
        var s_entradaC = s_entradaSP[0] + ':' +s_entradaSP[1];
        var s_salidaSP = s_salida.split(":");
        var s_salidaC = s_salidaSP[0] + ':' + s_salidaSP[1];
        
        var d_entradaSP = d_entrada.split(":");
        var d_entradaC = d_entradaSP[0] + ':' +d_entradaSP[1];
        var d_salidaSP = d_salida.split(":");
        var d_salidaC = d_salidaSP[0] + ':' +d_salidaSP[1];

        $("#l_entrada").val(l_entradaC);
        $("#l_salida").val(l_salidaC);

        $("#m_entrada").val(m_entradaC);
        $("#m_salida").val(m_salidaC);

        $("#mi_entrada").val(mi_entradaC);
        $("#mi_salida").val(mi_salidaC);

        $("#j_entrada").val(j_entradaC);
        $("#j_salida").val(j_salidaC);

        $("#v_entrada").val(v_entradaC);
        $("#v_salida").val(v_salidaC);

        $("#s_entrada").val(s_entradaC);
        $("#s_salida").val(s_salidaC);

        $("#d_entrada").val(d_entradaC);
        $("#d_salida").val(d_salidaC);

        if (turno == "Especial") {
            $("#hTurno option[value=" + turno + "]").attr("selected", true);
            $("#hTurno").val("Especial");
            $("#l_entrada, #l_salida, #m_entrada, #m_salida, #mi_entrada, #mi_salida, #j_entrada, #j_salida, #v_entrada, #v_salida, #s_entrada, #s_salida, #d_entrada, #d_salida").removeAttr('disabled');
            $("#l_entrada, #l_salida, #m_entrada, #m_salida, #mi_entrada, #mi_salida, #j_entrada, #j_salida, #v_entrada, #v_salida, #s_entrada, #s_salida, #d_entrada, #d_salida").val('');
            timeCalculator();
        } else {
            if (turno == "Matutino") {
                $("#hTurno option[value='Matutino']").attr("selected", true);
                $("#hTurno").val("Matutino");
                $("#l_entrada, #l_salida, #m_entrada, #m_salida, #mi_entrada, #mi_salida, #j_entrada, #j_salida, #v_entrada, #v_salida, #s_entrada, #s_salida, #d_entrada, #d_salida").attr('disabled', 'disabled');
                timeCalculator();
            } else {
                if (turno == "Vespertino") {
                    $("#hTurno option[value='Vespertino']").attr("selected", true);
                    $("#hTurno").val("Vespertino");
                    $("#l_entrada, #l_salida, #m_entrada, #m_salida, #mi_entrada, #mi_salida, #j_entrada, #j_salida, #v_entrada, #v_salida, #s_entrada, #s_salida, #d_entrada, #d_salida").attr('disabled', 'disabled');
                    timeCalculator();
                } else {
                    if (turno == "Nocturno") {
                        $("#hTurno option[value='Nocturno']").attr("selected", true);
                        $("#hTurno").val("Nocturno");
                        $("#l_entrada, #l_salida, #m_entrada, #m_salida, #mi_entrada, #mi_salida, #j_entrada, #j_salida, #v_entrada, #v_salida, #s_entrada, #s_salida, #d_entrada, #d_salida").attr('disabled', 'disabled');
                        $("#hTotales").text("Horas Totales: 30");
                        $("#hTotales").css('color', '#00b30f');
                        
                    }
                }
            }
        }
    } else {
        $("#hTurno option[value='Especial']").attr("selected", true);
        $("#hTurno").val("Especial");
        $("#l_entrada, #l_salida, #m_entrada, #m_salida, #mi_entrada, #mi_salida, #j_entrada, #j_salida, #v_entrada, #v_salida, #s_entrada, #s_salida, #d_entrada, #d_salida").removeAttr('disabled');
        $("#l_entrada, #l_salida, #m_entrada, #m_salida, #mi_entrada, #mi_salida, #j_entrada, #j_salida, #v_entrada, #v_salida, #s_entrada, #s_salida, #d_entrada, #d_salida").val('');
        timeCalculator();
    }

    

    $("#modalHorario-DP").modal("show");
}

function cambiarBtnDia() {
    var btnLunes = $("#btnLunesHorario").val(); 
    var btnMartes = $("#btnMartesHorario").val(); 
    var btnMiercoles = $("#btnMiercolesHorario").val(); 
    var btnJueves = $("#btnJuevesHorario").val(); 
    var btnViernes = $("#btnViernesHorario").val(); 
    var btnSabado = $("#btnSabadoHorario").val(); 
    var btnDomingo = $("#btnDomingoHorario").val(); 

    if (btnLunes == 1) {
        $("#l_entradaCont, #l_salidaCont").removeAttr('hidden');
        $("#btnLunesHorario").html("<i class='fas fa-check'></i> Lunes");

        $("#m_entradaCont, #m_salidaCont, #mi_entradaCont, #mi_salidaCont, #j_entradaCont, #j_salidaCont, #v_entradaCont, #v_salidaCont, #s_entradaCont, #s_salidaCont, #d_entradaCont, #d_salidaCont").attr('hidden', 'hidden');
        $("#btnMartesHorario").html("Martes");
        $("#btnMiercolesHorario").html("Miércoles");
        $("#btnJuevesHorario").html("Jueves");
        $("#btnViernesHorario").html("Viernes");
        $("#btnSabadoHorario").html("Sábado");
        $("#btnDomingoHorario").html("Domingo");
    } else {
        if (btnMartes == 1) {
            $("#l_entradaCont, #l_salidaCont, #mi_entradaCont, #mi_salidaCont, #j_entradaCont, #j_salidaCont, #v_entradaCont, #v_salidaCont, #s_entradaCont, #s_salidaCont, #d_entradaCont, #d_salidaCont").attr('hidden', 'hidden');
            $("#btnLunesHorario").html("Lunes");

            $("#m_entradaCont, #m_salidaCont").removeAttr('hidden');
            $("#btnMartesHorario").html("<i class='fas fa-check'></i> Martes");
            $("#btnMiercolesHorario").html("Miércoles");
            $("#btnJuevesHorario").html("Jueves");
            $("#btnViernesHorario").html("Viernes");
            $("#btnSabadoHorario").html("Sábado");
            $("#btnDomingoHorario").html("Domingo");
        } else {
            if (btnMiercoles == 1) {
                $("#l_entradaCont, #l_salidaCont, #m_entradaCont, #m_salidaCont, #j_entradaCont, #j_salidaCont, #v_entradaCont, #v_salidaCont, #s_entradaCont, #s_salidaCont, #d_entradaCont, #d_salidaCont").attr('hidden', 'hidden');
                $("#btnLunesHorario").html("Lunes");
                $("#btnMartesHorario").html("Martes");

                $("#mi_entradaCont, #mi_salidaCont").removeAttr('hidden');
                $("#btnMiercolesHorario").html("<i class='fas fa-check'></i> Miércoles");
                $("#btnJuevesHorario").html("Jueves");
                $("#btnViernesHorario").html("Viernes");
                $("#btnSabadoHorario").html("Sábado");
                $("#btnDomingoHorario").html("Domingo");
            } else {
                if (btnJueves == 1) {
                    $("#l_entradaCont, #l_salidaCont, #m_entradaCont, #m_salidaCont, #mi_entradaCont, #mi_salidaCont, #v_entradaCont, #v_salidaCont, #s_entradaCont, #s_salidaCont, #d_entradaCont, #d_salidaCont").attr('hidden', 'hidden');
                    $("#btnLunesHorario").html("Lunes");
                    $("#btnMartesHorario").html("Martes");
                    $("#btnMiercolesHorario").html("Miércoles");

                    $("#j_entradaCont, #j_salidaCont").removeAttr('hidden');
                    $("#btnJuevesHorario").html("<i class='fas fa-check'></i> Jueves");
                    $("#btnViernesHorario").html("Viernes");
                    $("#btnSabadoHorario").html("Sábado");
                    $("#btnDomingoHorario").html("Domingo");
                } else {
                    if (btnViernes == 1) {
                        $("#l_entradaCont, #l_salidaCont, #m_entradaCont, #m_salidaCont, #mi_entradaCont, #mi_salidaCont, #j_entradaCont, #j_salidaCont, #s_entradaCont, #s_salidaCont, #d_entradaCont, #d_salidaCont").attr('hidden', 'hidden');
                        $("#btnLunesHorario").html("Lunes");
                        $("#btnMartesHorario").html("Martes");
                        $("#btnMiercolesHorario").html("Miércoles");
                        $("#btnJuevesHorario").html("Jueves");

                        $("#v_entradaCont, #v_salidaCont").removeAttr('hidden');
                        $("#btnViernesHorario").html("<i class='fas fa-check'></i> Viernes");
                        $("#btnSabadoHorario").html("Sábado");
                        $("#btnDomingoHorario").html("Domingo");
                    } else {
                        if (btnSabado == 1) {
                            $("#l_entradaCont, #l_salidaCont, #m_entradaCont, #m_salidaCont, #mi_entradaCont, #mi_salidaCont, #j_entradaCont, #j_salidaCont, #v_entradaCont, #v_salidaCont, #d_entradaCont, #d_salidaCont").attr('hidden', 'hidden');
                            $("#btnLunesHorario").html("Lunes");
                            $("#btnMartesHorario").html("Martes");
                            $("#btnMiercolesHorario").html("Miércoles");
                            $("#btnJuevesHorario").html("Jueves");
                            $("#btnViernesHorario").html("Viernes");

                            $("#s_entradaCont, #s_salidaCont").removeAttr('hidden');
                            $("#btnSabadoHorario").html("<i class='fas fa-check'></i> Sábado");
                            $("#btnDomingoHorario").html("Domingo");
                        } else {
                            if (btnDomingo == 1) {
                                $("#l_entradaCont, #l_salidaCont, #m_entradaCont, #m_salidaCont, #mi_entradaCont, #mi_salidaCont, #j_entradaCont, #j_salidaCont, #v_entradaCont, #v_salidaCont, #s_entradaCont, #s_salidaCont").attr('hidden', 'hidden');
                                $("#btnLunesHorario").html("Lunes");
                                $("#btnMartesHorario").html("Martes");
                                $("#btnMiercolesHorario").html("Miércoles");
                                $("#btnJuevesHorario").html("Jueves");
                                $("#btnViernesHorario").html("Viernes");
                                $("#btnSabadoHorario").html("Sábado");

                                $("#d_entradaCont, #d_salidaCont").removeAttr('hidden');
                                $("#btnDomingoHorario").html("<i class='fas fa-check'></i> Domingo");
                            }
                        }
                    }
                }
            }
        }        
    }
};

$("#btnLunesHorario").click(function () {
    $("#btnLunesHorario").val(1);
    $("#btnMartesHorario, #btnMiercolesHorario, #btnJuevesHorario, #btnViernesHorario, #btnSabadoHorario, #btnDomingoHorario").val(0);
    cambiarBtnDia();
});

$("#btnMartesHorario").click(function () {
    $("#btnLunesHorario, #btnMiercolesHorario, #btnJuevesHorario, #btnViernesHorario, #btnSabadoHorario, #btnDomingoHorario").val(0);
    $("#btnMartesHorario").val(1);
    cambiarBtnDia();
});

$("#btnMiercolesHorario").click(function () {
    $("#btnLunesHorario, #btnMartesHorario, #btnJuevesHorario, #btnViernesHorario, #btnSabadoHorario, #btnDomingoHorario").val(0);
    $("#btnMiercolesHorario").val(1);
    cambiarBtnDia();
});

$("#btnJuevesHorario").click(function () {
    $("#btnLunesHorario, #btnMartesHorario, #btnMiercolesHorario, #btnViernesHorario, #btnSabadoHorario, #btnDomingoHorario").val(0);
    $("#btnJuevesHorario").val(1);
    cambiarBtnDia();
});

$("#btnViernesHorario").click(function () {
    $("#btnLunesHorario, #btnMartesHorario, #btnMiercolesHorario, #btnJuevesHorario, #btnSabadoHorario, #btnDomingoHorario").val(0);
    $("#btnViernesHorario").val(1);
    cambiarBtnDia();
});

$("#btnSabadoHorario").click(function () {
    $("#btnLunesHorario, #btnMartesHorario, #btnMiercolesHorario, #btnJuevesHorario, #btnViernesHorario, #btnDomingoHorario").val(0);
    $("#btnSabadoHorario").val(1);
    cambiarBtnDia();
});

$("#btnDomingoHorario").click(function () {
    $("#btnLunesHorario, #btnMartesHorario, #btnMiercolesHorario, #btnJuevesHorario, #btnViernesHorario, #btnSabadoHorario").val(0);
    $("#btnDomingoHorario").val(1);
    cambiarBtnDia();
});

$("#btnCancelarHorarioDP").click(function () {
    $("#modalHorario-DP").modal("hide");
});

$("#hTurno").change(function () {
    var valorSelect = $(this).val();
    console.log(valorSelect);

    if (valorSelect == 'Matutino') {
        $("#l_entrada, #m_entrada, #mi_entrada, #j_entrada, #v_entrada").val("06:00");
        $("#l_salida, #m_salida, #mi_salida, #j_salida, #v_salida").val("12:00");
        $("#l_entrada, #l_salida, #m_entrada, #m_salida, #mi_entrada, #mi_salida, #j_entrada, #j_salida, #v_entrada, #v_salida, #s_entrada, #s_salida, #d_entrada, #d_salida").attr('disabled', 'disabled');
        timeCalculator();
    } else {
        if (valorSelect == 'Vespertino') {
            $("#l_entrada, #m_entrada, #mi_entrada, #j_entrada, #v_entrada").val("12:00");
            $("#l_salida, #m_salida, #mi_salida, #j_salida, #v_salida").val("18:00");
            $("#l_entrada, #l_salida, #m_entrada, #m_salida, #mi_entrada, #mi_salida, #j_entrada, #j_salida, #v_entrada, #v_salida, #s_entrada, #s_salida, #d_entrada, #d_salida").attr('disabled', 'disabled');
            timeCalculator();
        } else {
            if (valorSelect == 'Nocturno') {
                $("#l_entrada, #m_entrada, #mi_entrada, #j_entrada, #v_entrada").val("18:00");
                $("#l_salida, #m_salida, #mi_salida, #j_salida, #v_salida").val("00:00");
                $("#l_entrada, #l_salida, #m_entrada, #m_salida, #mi_entrada, #mi_salida, #j_entrada, #j_salida, #v_entrada, #v_salida, #s_entrada, #s_salida, #d_entrada, #d_salida").attr('disabled', 'disabled');
                $("#hTotales").text("Horas Totales: 30");
                $("#hTotales").css('color', '#00b30f');
                $("#btnGuardarHorarioDP").removeAttr('disabled');

            } else {
                if (valorSelect == 'Especial') {
                    $("#l_entrada, #l_salida, #m_entrada, #m_salida, #mi_entrada, #mi_salida, #j_entrada, #j_salida, #v_entrada, #v_salida, #s_entrada, #s_salida, #d_entrada, #d_salida").removeAttr('disabled');
                    $("#l_entrada, #m_entrada, #mi_entrada, #j_entrada, #v_entrada, #s_entrada, #d_entrada, #l_salida, #m_salida, #mi_salida, #j_salida, #v_salida, #s_salida, #d_salida").val('');
                    timeCalculator();
                }
            }
        }
    }
    
});

$("#btnXD").click(function () {

});

function timeCalculator() {
    var lunes_e = $("#l_entrada").val();
    var lunes_s = $("#l_salida").val();

    var martes_e = $("#m_entrada").val();
    var martes_s = $("#m_salida").val();

    var miercoles_e = $("#mi_entrada").val();
    var miercoles_s = $("#mi_salida").val();

    var jueves_e = $("#j_entrada").val();
    var jueves_s = $("#j_salida").val();

    var viernes_e = $("#v_entrada").val();
    var viernes_s = $("#v_salida").val();

    var sabado_e = $("#s_entrada").val();
    var sabado_s = $("#s_salida").val();

    var domingo_e = $("#d_entrada").val();
    var domingo_s = $("#d_salida").val();
    
    var m_lunes_e = moment.duration(lunes_e);
    var m_lunes_s = moment.duration(lunes_s);

    var m_martes_e = moment.duration(martes_e);
    var m_martes_s = moment.duration(martes_s);

    var m_miercoles_e = moment.duration(miercoles_e);
    var m_miercoles_s = moment.duration(miercoles_s);

    var m_jueves_e = moment.duration(jueves_e);
    var m_jueves_s = moment.duration(jueves_s);

    var m_viernes_e = moment.duration(viernes_e);
    var m_viernes_s = moment.duration(viernes_s);

    var m_sabado_e = moment.duration(sabado_e);
    var m_sabado_s = moment.duration(sabado_s);

    var m_domingo_e = moment.duration(domingo_e);
    var m_domingo_s = moment.duration(domingo_s);

    var r_lunes = m_lunes_s.subtract(m_lunes_e);
    console.log(r_lunes);    
    var r_martes = m_martes_s.subtract(m_martes_e);
    console.log(r_martes);
    var r_miercoles = m_miercoles_s.subtract(m_miercoles_e);
    console.log(r_miercoles);
    var r_jueves = m_jueves_s.subtract(m_jueves_e);
    console.log(r_jueves);
    var r_viernes = m_viernes_s.subtract(m_viernes_e);
    console.log(r_viernes);
    var r_sabado = m_sabado_s.subtract(m_sabado_e);
    console.log(r_sabado);
    var r_domingo = m_domingo_s.subtract(m_domingo_e);
    console.log(r_domingo);

    var hrs_lunes = r_lunes._data.hours;
    var hrs_martes = r_martes._data.hours;
    var hrs_miercoles = r_miercoles._data.hours;
    var hrs_jueves = r_jueves._data.hours;
    var hrs_viernes = r_viernes._data.hours;
    var hrs_sabado = r_sabado._data.hours;
    var hrs_domingo = r_domingo._data.hours;

    var min_lunes = r_lunes._data.minutes;
    var min_martes = r_martes._data.minutes;
    var min_miercoles = r_miercoles._data.minutes;
    var min_jueves = r_jueves._data.minutes;
    var min_viernes = r_viernes._data.minutes;
    var min_sabado = r_sabado._data.minutes;
    var min_domingo = r_domingo._data.minutes;

    var sumaHoras = parseInt(hrs_lunes) + parseInt(hrs_martes) + parseInt(hrs_miercoles) + parseInt(hrs_jueves) + parseInt(hrs_viernes) + parseInt(hrs_sabado) + parseInt(hrs_domingo);
    var sumaMinutos = parseInt(min_lunes) + parseInt(min_martes) + parseInt(min_miercoles) + parseInt(min_jueves) + parseInt(min_viernes) + parseInt(min_sabado) + parseInt(min_domingo);

    if (sumaMinutos >= 60 && sumaMinutos <= 119) { 
        sumaHoras = sumaHoras + 1;
    } else {
        if (sumaMinutos >= 120 && sumaMinutos <= 179) {
            sumaHoras = sumaHoras + 2;
        } else {
            if (sumaMinutos >= 180 && sumaMinutos <= 239) {
                sumaHoras = sumaHoras + 3;
            } else {
                if (sumaMinutos >= 240 && sumaMinutos <= 299) {
                    sumaHoras = sumaHoras + 4;
                } else {
                    if (sumaMinutos >= 300 && sumaMinutos <= 359) {
                        sumaHoras = sumaHoras + 5;
                    } else {
                        if (sumaMinutos >= 360 && sumaMinutos <= 419) {
                            sumaHoras = sumaHoras + 6;
                        } else {
                            if (sumaMinutos >= 420 && sumaMinutos <= 479) {
                                sumaHoras = sumaHoras + 7;
                            }
                        }
                    }
                }
            }
        }
    }
    console.log(sumaHoras);

    $("#hTotales").text("Horas Totales: " + sumaHoras);
    if (sumaHoras >= 30) {
        $("#hTotales").css('color', '#00b30f');
        $("#btnGuardarHorarioDP").removeAttr('disabled');
    } else {
        $("#hTotales").css('color', '#ff1900');
        $("#btnGuardarHorarioDP").attr('disabled','disabled');
    }
};

$("#l_entrada, #m_entrada, #mi_entrada, #j_entrada, #v_entrada, #s_entrada, #d_entrada").keyup(function () {
    timeCalculator();
});

$("#l_salida, #m_salida, #mi_salida, #j_salida, #v_salida, #s_salida, #d_salida").keyup(function () {
    timeCalculator();
});

$("#btnGuardarHorarioDP").click(function () {
    var tieneHorario = $("#txtHorario").val();
    console.log(tieneHorario);

    var id_persona = $("#txtPersonaHorario").val();
    var nombre_persona = $("#txtNombrePersona").val();
    console.log(nombre_persona);
    var l_entrada = $("#l_entrada").val();
    var l_salida = $("#l_salida").val();
    var m_entrada = $("#m_entrada").val();
    var m_salida = $("#m_salida").val();
    var mi_entrada = $("#mi_entrada").val();
    var mi_salida = $("#mi_salida").val();
    var j_entrada = $("#j_entrada").val();
    var j_salida = $("#j_salida").val();
    var v_entrada = $("#v_entrada").val();
    var v_salida = $("#v_salida").val();
    var s_entrada = $("#s_entrada").val();
    var s_salida = $("#s_salida").val();
    var d_entrada = $("#d_entrada").val();
    var d_salida = $("#d_salida").val();
    var turno = $("#hTurno").val();

    if (tieneHorario == 'Si') {
        $.ajax({
            url:"../mDatosPersonales/actualizarHorario.php",
            type:"POST",
            dataType:"html",
            data:{id_persona,l_entrada,l_salida,m_entrada,m_salida,mi_entrada,mi_salida,j_entrada,j_salida,v_entrada,v_salida,s_entrada,s_salida,d_entrada,d_salida,turno},
            success:function(respuesta){
                
                $("#modalHorario-DP").modal("hide");
                llenar_lista_DP();
                alertify.success("<i class='fa fa-save fa-lg'></i> Actualizado", 5);
                actividad  ="Se ha actualizado el horario para la persona "+nombre_persona;
                var idUser=$("#inicioIdusuario").val();
                log(actividad,idUser);
    
            },
            error:function(xhr,status){
                alert("Error en metodo AJAX"); 
            },
        });
    } else {
        $.ajax({
            url:"../mDatosPersonales/guardarHorario.php",
            type:"POST",
            dataType:"html",
            data:{id_persona,l_entrada,l_salida,m_entrada,m_salida,mi_entrada,mi_salida,j_entrada,j_salida,v_entrada,v_salida,s_entrada,s_salida,d_entrada,d_salida,turno},
            success:function(respuesta){
                
                $("#modalHorario-DP").modal("hide");
                llenar_lista_DP();
                alertify.success("<i class='fa fa-save fa-lg'></i> Guardado", 5);
                actividad  ="Se ha creado un horario para la persona "+nombre_persona;
                var idUser=$("#inicioIdusuario").val();
                log(actividad,idUser);
    
            },
            error:function(xhr,status){
                alert("Error en metodo AJAX"); 
            },
        });
    }
});