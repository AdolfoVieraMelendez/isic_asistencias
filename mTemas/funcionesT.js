//VARIABLE GLOBAL PARA NOMBRAR LOS ELEMENTOS DE LOS  FORMULARIOS
//CAMBIAR TEMA -T
var nombreModulo_T = "Temas";

$("#frmGuardar-T").submit(function(e){

    var nombre_tema    = $("#nombreTema").val();
    var color_letra    = $("#colorLetra").val();
    var color_base = $("#colorBase").val();
    var color_baseFuerte = $("#colorBaseF").val();
    var color_borde      = $("#colorBorde").val();

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
                url:"../mTemas/guardar.php",
                type:"POST",
                dataType:"html",
                data:{nombre_tema,color_letra,color_base,color_baseFuerte,color_borde},
                success:function(respuesta){
                    $("#guardar-T").hide();
                    llenar_lista_T();
                    $("#frmGuardar-T")[0].reset();
                    resetColores();
                    alertify.success("<i class='fa fa-save fa-lg'></i>", 2);
                    $('#nombreTema').focus();
                    actividad  ="Se insertado un nuevo registro a la tabla "+nombreModulo_T;
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

    var id = $("#tId").val();
    var color_letra    = $("#ecolorLetra").val();
    var color_base = $("#ecolorBase").val();
    var color_baseFuerte = $("#ecolorBaseF").val();
    var color_borde      = $("#ecolorBorde").val();

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
                url:"../mTemas/actualizar.php",
                type:"POST",
                dataType:"html",
                data:{id, color_letra, color_base, color_baseFuerte, color_borde},
                success:function(respuesta){
                    console.log(respuesta);
                    $("#editar-T").hide();
                    llenar_lista_T();
                    $("#frmActualizar-T")[0].reset();
                    resetColores();
                    alertify.succeess("<i class='fa fa-save fa-lg'></i>", 2);
                    $('#nombreTema').focus();
                    actividad  ="Se ha modificado un registro de la tabla "+nombreModulo_T;
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
    $("#ecolorLetra").val(color_letra);
    $("#ecolorBase").val(color_base);
    $("#ecolorBaseF").val(color_baseF);
    $("#ecolorBorde").val(color_borde);

    $("#espanColorLetra").css("color", color_letra);
    $("#espanColorBase").css("color", color_base);
    $("#espanColorBaseF").css("color", color_baseF);
    $("#espanColorBorde").css("color", color_borde);

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

    resetColores();
 
});


function nuevo_registro_T(){
    $("#lblTitular").text(nombreModulo_T);

    $("#badgeInfo").text("Nuevo registro");

    $("#Listado-T").hide();
    $("#guardar-T").fadeIn();
    $('#frmGuardar-T')[0].reset();
    $("#nombreTema").focus();
    var colorletra = $("#colorLetra").val();
    console.log(colorletra);
    
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

$("#espanColorLetra").click(function () {
    $("#ecolorLetra").click();
});

$("#espanColorBase").click(function () {
    $("#ecolorBase").click();
});

$("#espanColorBaseF").click(function () {
    $("#ecolorBaseF").click();
});

$("#espanColorBorde").click(function () {
    $("#ecolorBorde").click();
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

$("#ecolorLetra").change(function () {
    var duracion = ".25s";
    var color = $("#ecolorLetra").val();
    $("#espanColorLetra").css({
        transition : 'color'+ duracion +' ease-in-out',
        "color": color
    });
});

$("#ecolorBase").change(function () {
    var duracion = ".25s";
    var color = $("#ecolorBase").val();
    $("#espanColorBase").css({
        transition : 'color'+ duracion +' ease-in-out',
        "color": color
    });
});

$("#ecolorBaseF").change(function () {
    var duracion = ".25s";
    var color = $("#ecolorBaseF").val();
    $("#espanColorBaseF").css({
        transition : 'color'+ duracion +' ease-in-out',
        "color": color
    });
});

$("#ecolorBorde").change(function () {
    var duracion = ".25s";
    var color = $("#ecolorBorde").val();
    $("#espanColorBorde").css({
        transition : 'color'+ duracion +' ease-in-out',
        "color": color
    });
});

function resetColores() {
    var color = "#000000";
    $("#spanColorLetra, #spanColorBase, #spanColorBaseF, #spanColorBorde, #espanColorLetra, #espanColorBase, #espanColorBaseF, #espanColorBorde").css("color", color);
};

// Importar Temas

function abrirModalImportar_T() {
    $("#modalImportar-T").modal("show");
};

function importarArchivo_T(){
    var files = $('#image-T')[0].files[0];
    var archivo=files.name;
    var ruta= "../Temas/"+archivo;

    console.log(ruta);
    
    $.getJSON(ruta, function(data){
        //for para decorre las propiedades
        for(tema in data){

            var nombre_tema       = data[tema].nombre_tema;
            var color_letra       = data[tema].color_letra;
            var color_base        = data[tema].color_base;
            var color_base_fuerte = data[tema].color_base_fuerte;
            var color_borde       = data[tema].color_borde;
            var fecha_registro    = data[tema].fecha_registro;
            var hora_registro     = data[tema].hora_registro;

            $.ajax({
                url:"../mTemas/importarTema.php",
                type:"POST",
                dataType:"html",
                data:{nombre_tema,color_letra,color_base,color_base_fuerte,color_borde,fecha_registro,hora_registro},
                success:function(respuesta){
                    console.log(respuesta);
                    var bandera=respuesta;
                    if (bandera==0) {
                        preloader(1,"Importando Tema ...");
                        $("#modalImportar-T").modal("hide");
                        llenar_lista_T();
                    }else{
                        swal({
                            title: "Error!",
                            text: "Ya existe un tema con el nombre "+nombre_tema,
                            type: "error",
                            confirmButtonClass: "btn-dark",
                            confirmButtonText: "Enterado"
                        }, function (isConfirm) {
                            alertify.message("Tema Importado");
                        });
                    }
                   
                },
                error:function(xhr,status){
                    alert("Error en metodo AJAX"); 
                },
            });
        }
    });
}

// Importar Temas

// Exportar Temas

function exportar_T(id){
    var valor = id;

    swal({
        title: "¿Estas Seguro?",
        text: "¿Deseas Exportar el Tema Seleccionado?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Si, deseo exportar el tema",
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
                url:"../mTemas/exportar.php",
                type:"POST",
                dateType:"html",
                data:{valor},
                success:function(respuesta){
                   // console.log(respuesta);
                    preloader(1, "Generando archivo JSON");
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
}

// Exportar Temas

// Probar Tema

function probarTemaG() {
    var id = $("#inicioIdusuario").val();
    var h_sidebar_N = $("#colorBaseF").val();
    var color_base_N = $("#colorBase").val();
    var letra_color_N = $("#colorLetra").val();
    var color_borde_N = $("#colorBorde").val();
    var tiempo = 6;
    var countdown = setInterval(function () {
        tiempo--;
        $("#btnProbarG-T").html("<i class='fas fa-forward fa-lg'></i> " + tiempo);
        $("#btnProbarG-T").attr('disabled', 'disabled');
        
        if (tiempo <= 0) {
            clearInterval(countdown);
            $("#btnProbarG-T").html("<i class='fas fa-play fa-lg'></i> Probar Tema");
            $("#btnProbarG-T").removeAttr('disabled');
        }
    }, 1000);

    bongos.play();
    cssTema(h_sidebar_N, color_base_N, letra_color_N, color_borde_N);

    $.ajax({
        url:"../mTemas/datosTema.php",
        type:"POST",
        dataType:"json",
        data:{id},
        success:function(respuesta){
            var dataArray = respuesta;

            var h_sidebar=dataArray.result.color_base_fuerte;
            var color_base=dataArray.result.color_base;
            var letra_color=dataArray.result.color_letra;
            var color_borde=dataArray.result.color_borde;
            
            setTimeout(function () {
                cssTema(h_sidebar, color_base, letra_color, color_borde);
            }, 6000);
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
};

function probarTemaE() {
    var id = $("#inicioIdusuario").val();
    var h_sidebar_N = $("#ecolorBaseF").val();
    var color_base_N = $("#ecolorBase").val();
    var letra_color_N = $("#ecolorLetra").val();
    var color_borde_N = $("#ecolorBorde").val();
    var tiempo = 6;
    var countdown = setInterval(function () {
        tiempo--;
        $("#btnProbarA-T").html("<i class='fas fa-forward fa-lg'></i> " + tiempo);
        $("#btnProbarA-T").attr('disabled', 'disabled');
        
        if (tiempo <= 0) {
            clearInterval(countdown);
            $("#btnProbarA-T").html("<i class='fas fa-play fa-lg'></i> Probar Tema");
            $("#btnProbarA-T").removeAttr('disabled');
        }
    }, 1000);

    bongos.play();
    cssTema(h_sidebar_N, color_base_N, letra_color_N, color_borde_N);

    $.ajax({
        url:"../mTemas/datosTema.php",
        type:"POST",
        dataType:"json",
        data:{id},
        success:function(respuesta){
            var dataArray = respuesta;

            var h_sidebar=dataArray.result.color_base_fuerte;
            var color_base=dataArray.result.color_base;
            var letra_color=dataArray.result.color_letra;
            var color_borde=dataArray.result.color_borde;
            
            setTimeout(function () {
                cssTema(h_sidebar, color_base, letra_color, color_borde);
            }, 6000);
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
};

// Probar Tema

// Revisar Nombre Tema

$("#nombreTema").keyup(function(){
    var valor=$(this).val();
    revisar_nombre_T(valor);
});

$("#enombreTema").keyup(function(){
    var valor=$(this).val();
    revisar_enombre_T(valor);
});

function revisar_nombre_T(valor){
    $.ajax({
        url:"../mTemas/rNombre.php",
        type:"POST",
        dataType:"html",
        data:{valor},
        success: function (respuesta) {
            res = parseInt(respuesta);
            
            if (res == 0) {
                $("#nombreTema").css("color", obscuro);
                $("#btnGuardar-T").removeAttr('disabled');
            }else{
                $("#nombreTema").css("color", rojo);
                $("#btnGuardar-T").attr('disabled', 'disabled');
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
};


// Revisar Nombre Tema


// Hover Tema

function hoverAplicarTema(color_letra,color_base,color_base_fuerte,color_borde) {
    cssTema(color_base_fuerte, color_base, color_letra, color_borde);
};

$(document).on('mouseout', 'button.aplicar', function () {
    var color_letra = $("#inputColorLetra").val();
    var color_base = $("#inputColorBase").val();
    var color_base_fuerte = $("#inputColorBaseF").val();
    var color_borde = $("#inputColorBorde").val();

    cssTema(color_base_fuerte, color_base, color_letra, color_borde);
});



// Hover Tema