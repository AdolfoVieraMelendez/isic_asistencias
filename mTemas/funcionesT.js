//VARIABLE GLOBAL PARA NOMBRAR LOS ELEMENTOS DE LOS  FORMULARIOS
//ESTADO CIVIL-EC 
var nombreModulo_T="Temas";

$("#frmGuardar-T").submit(function(e){

    var desc    = $("#desc").val();

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
                url:"../mEstadoCivil/guardar.php",
                type:"POST",
                dateType:"html",
                data:{desc},
                success:function(respuesta){
                    console.log(respuesta);
                    $("#guardar-EC").hide();
                    llenar_lista_EC();
                    $("#frmGuardar-EC")[0].reset();
                    selectTwo();
                    alertify.success("<i class='fa fa-save fa-lg'></i>", 2);
                    $('#desc').focus();
                    actividad  ="Se insertado un nuevo registro a la tabla "+nombreModulo_EC;
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

$("#frmActualizar-T").submit(function(e){

    var id        = $("#eIdFC").val();
    var desc    = $("#eDesc").val();

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
                url:"../mEstadoCivil/actualizar.php",
                type:"POST",
                dataType:"html",
                data:{id,desc},
                success:function(respuesta){
                    console.log(respuesta);
                    llenar_lista_EC();
                        $("#frmGuardar-EC")[0].reset();
                        $("#frmActualizar-EC")[0].reset();
                        alertify.success("<i class='fa fa-bolt fa-lg'></i>", 2);
                    $("#btnCancelarG-EC , #btnCancelarA-EC").click();
                    actividad  ="Se ha modificado un registro de la tabla "+nombreModulo_EC;
                    var idUser=$("#inicioIdusuario").val();
                    log(actividad,idUser);
                    
                    $('#desc').focus();
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

function llenar_lista_T(){
    abrirModalCarga('Cargando Lista');
    $("#frmGuardar-T")[0].reset();
    $("#Listado-T").hide();
    $.ajax({
        url:"../mTemas/lista.php",
        type:"POST",
        dataType:"html",
        data:{},
        success:function(respuesta){
            $("#Listado-T").html(respuesta);
            $("#Listado-T").fadeIn("slow");
            cerrarModalCarga();      
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

function llenar_formulario_T(id,nombre_tema,color_letra,color_base,color_baseF,color_borde){
    console.log(id);
    $("#tId").val(id);
    $("#enombreTema").val(nombre_tema);

    $("#lblTitular").text(nombreModulo_T);
    $("#badgeInfo").text("Modificar datos");

    $("#guardar-T").hide();
    $("#Listado-T").hide();
    $("#editar-T").fadeIn();
    $("#enombreTema").focus();
}

function cambiar_estatus_T(id,consecutivo){

    var valor=$("#check"+consecutivo).val();
    var contravalor=(valor==1)?0:1;
    $("#check"+consecutivo).val(contravalor);

    $.ajax({
        url:"../mTemas/cEstatus.php",
        type:"POST",
        dataType:"html",
        data:{id,contravalor},
        success:function(respuesta){
            // console.log(respuesta);
            if(contravalor==1){
                alertify.success("<i class='fa fa-check fa-lg'></i>", 2);
                $("#btnEditar-T"+consecutivo).removeAttr('disabled');
                actividad  ="Se ha reactivado un registro de la tabla "+nombreModulo_EC;
                var idUser=$("#inicioIdusuario").val();
                log(actividad,idUser);
            }else{
                alertify.error("<i class='fa fa-times fa-lg'></i>", 2);
                $("#btnEditar-T"+consecutivo).attr('disabled','disabled');
                actividad  ="Se ha desactivado un registro de la tabla "+nombreModulo_EC;
                var idUser=$("#inicioIdusuario").val();
                log(actividad,idUser);
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });

}

$("#btnCancelarG-T , #btnCancelarA-T").click(function(){
    $("#editar-T").hide();
    $("#guardar-T").hide();

    $("#lblTitular").text(nombreModulo_T);
    $("#badgeInfo").text("Lista");

    $("#Listado-T").fadeIn();

    $("#spanColorLetra, #spanColorBase, #spanColorBaseF, #spanColorBorde").css("color", "#000");
 
});


function nuevo_registro_T(){
    $("#lblTitular").text(nombreModulo_T);

    $("#badgeInfo").text("Nuevo registro");

    $("#Listado-T").hide();
    $("#guardar-T").fadeIn();
    $('#frmGuardar-T')[0].reset();
    $("#nombreTema").focus();
    
};

$("#spanColorLetra").click(function () {
    $("#colorLetra").click();
});

$("#spanColorBase").click(function () {
    $("#colorBase").click();
});

$("#spanColorBaseF").click(function () {
    $("#colorBaseF").click();
});

$("#spanColorBorde").click(function () {
    $("#colorBorde").click();
});

$("#colorLetra").change(function () {
    var duracion = ".25s";
    var color = $("#colorLetra").val();
    $("#spanColorLetra").css({
        transition : 'color'+ duracion +' ease-in-out',
        "color": color
    });
});

$("#colorBase").change(function () {
    var duracion = ".25s";
    var color = $("#colorBase").val();
    $("#spanColorBase").css({
        transition : 'color'+ duracion +' ease-in-out',
        "color": color
    });
});

$("#colorBaseF").change(function () {
    var duracion = ".25s";
    var color = $("#colorBaseF").val();
    $("#spanColorBaseF").css({
        transition : 'color'+ duracion +' ease-in-out',
        "color": color
    });
});

$("#colorBorde").change(function () {
    var duracion = ".25s";
    var color = $("#colorBorde").val();
    $("#spanColorBorde").css({
        transition : 'color'+ duracion +' ease-in-out',
        "color": color
    });
});