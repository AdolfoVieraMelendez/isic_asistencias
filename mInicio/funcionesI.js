// VARIABLES GLOBALES
var obscuro  = "#343A40";
var rojo     = "#D9304B";
var bongos = new Audio();
bongos.src = "../audios/Bongos.mp3";

function ocultarSecciones(){
    // ASISTENCIAS
    $("#asistencia").hide();
    $("#asistencia-AS").hide();
    //DATOS PERSONALES
    $("#datosPersona").hide();
    $("#guardar-DP").hide();
    $("#editar-DP").hide();
    $("#Listado-DP").hide();
    //ESTADO CIVIL
    $("#estadoCivil").hide();
    $("#guardar-EC").hide();
    $("#editar-EC").hide();
    $("#Listado-EC").hide();
    //USUARIOS
    $("#usuarios").hide();
    $("#guardar-U").hide();
    $("#editar-U").hide();
    $("#Listado-U").hide();
    // TEMAS
    $("#crearTemas").hide();
    $("#guardar-T").hide();
    $("#editar-T").hide();
    $("#Listado-T").hide();
}

// Click en Menu

function verAsistencias(){
    ocultarSecciones();
    preloader(1, 'Asitencia del personal', function () {
        $("#claveAS").focus();
        alertify.success("Bienvenido al registro de asistencias", 3);
        $("#claveAS").val('');
    });
    $("#sound_AS").bootstrapToggle('off');
    $("#sound_AS").val(0);
    $("#datosPersona").hide();
    $("#asistencia-AS").fadeIn();
    $("#estatus-card").hide();
    $("#data-card").hide();
    $("#lblTitular").text("Control de Asistencias");
    $("#badgeInfo").text("Dezliza tú tarjeta");
    var idTema=$("#inicioIdTema").val()
    aplicarTema(idTema, 'otro');
    
}

function verDatosPersonales(){
    ocultarSecciones();
    $("#lblTitular").text("Datos Personales");
    
    $("#editar-DP").hide();
    $("#guardar-DP").hide();
    $("#Listado-DP").fadeIn();
    $("#frmGuardar-DP")[0].reset();
    $("#frmActualizar-DP")[0].reset();
    $("#badgeInfo").text("Lista");

    $("#datosPersona").show();
    llenar_lista_DP();
    var idTema=$("#inicioIdTema").val()
    aplicarTema(idTema,'otro');      
}

function verEstadoCivil(){
    ocultarSecciones();
    $("#lblTitular").text("Estado Civil");
    
    $("#editar-EC").hide();
    $("#guardar-EC").hide();
    $("#Listado-EC").fadeIn();
    $("#frmGuardar-EC")[0].reset();
    $("#frmActualizar-EC")[0].reset();
    $("#badgeInfo").text("Lista");

    $("#estadoCivil").show();
    llenar_lista_EC();
    var idTema=$("#inicioIdTema").val()
    aplicarTema(idTema,'otro');      
}

function verUsuarios(){     
    ocultarSecciones();
    $("#lblTitular").text("Usuarios");

    $("#editar-U").hide();
    $("#guardar-U").hide();
    $("#Listado-U").fadeIn();
    $("#frmGuardar-T")[0].reset();
    $("#frmActualizar-T")[0].reset();
    $("#badgeInfo").text("Lista");

    $("#usuarios").show();
    llenar_lista_U();
    var idTema=$("#inicioIdTema").val()
    aplicarTema(idTema,'otro');
}

function verTemas() {
    ocultarSecciones();
    $("#lblTitular").text("Temas");

    $("#editar-T").hide();
    $("#guardar-T").hide();
    $("#Listado-T").fadeIn();
    $("#frmGuardar-T")[0].reset();
    $("#frmActualizar-T")[0].reset();
    $("#badgeInfo").text("Lista");

    $("#crearTemas").show();
    llenar_lista_T();
    var idTema=$("#inicioIdTema").val()
    aplicarTema(idTema,'otro');    
}

// Click en Menu


function abrirModalPDF(id,ruta,modulo) {

    $("#txtTitularPDF").text(modulo)

    var link = ruta+"/pdfDatos.php?id="+id ;
    PDFObject.embed(link, "#visualizador");

    $("#modalPDF").modal("show");
}

function aplicarTema(id,validador){
    $.ajax({
        url:"datosTema.php",
        type:"POST",
        dateType:"json",
        data:{id},
        success:function(respuesta){

            var dataArray = JSON.parse(respuesta);

            var h_sidebar=dataArray.result.color_base_fuerte;
            var color_base=dataArray.result.color_base;
            var letra_color=dataArray.result.color_letra;
            var color_borde=dataArray.result.color_borde;
            
            cssTema(h_sidebar, color_base, letra_color, color_borde);
            
            $("#inputColorLetra").val(letra_color);
            $("#inputColorBase").val(color_base);
            $("#inputColorBaseF").val(h_sidebar);
            $("#inputColorBorde").val(color_borde);

            if (validador!='login'){
                relacionarTema(id);
                var tema=dataArray.result.nombre_tema;
                $("#inicioIdTema").val(dataArray.result.id_tema);
                //alertify.success(actividad,2);

                if(validador=='enlace'){
                    preloader(1,"Cambiando al tema "+tema);
                    actividad  ="Ha cambiado al tema "+tema;
                    var idUser = $("#inicioIdusuario").val();
                    bongos.play();

                    $('#mnuColapsado').click();

                    log(actividad,idUser);
                    $("html, body").animate({ scrollTop: 0 }, 1000); 
                    return false; 
                } else {
                    if (validador == 'tabla') {
                        swal({
                            title: "¿Estas Seguro?",
                            text: "¿Deseas Aplicar el Tema?",
                            type: "info",
                            showCancelButton: true,
                            confirmButtonClass: "btn-success",
                            confirmButtonText: "Si, deseo aplicar el tema",
                            cancelButtonText: "Cancelar Acción",
                            cancelButtonClass: "btn-outline-danger",
                            closeOnConfirm: false,
                            closeOnCancel: true,
                            showLoaderOnConfirm: true
                            }, function (isConfirm) {
                            if (isConfirm) {
                            setTimeout(function () {
                                swal.close();
                                preloader(1,"Cambiando al tema "+tema);
                                actividad  ="Ha cambiado al tema "+tema;
                                var idUser = $("#inicioIdusuario").val();
                                bongos.play();

                                log(actividad,idUser);
                                $("html, body").animate({ scrollTop: 0 }, 1000); 
                            }, 2000);}
                            else{
                                alertify.error(" <i class='fa fa-times fa-lg'></i> Cancelado",2);
                            }
                        });

                        
                    }
                }
            }

        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

function relacionarTema(idTema){
    var idUsuario = $("#inicioIdusuario").val();
    $.ajax({
        url:"relacionarTema.php",
        type:"POST",
        dateType:"json",
        data:{idUsuario,idTema},
        success:function(respuesta){
            
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

function preloader(seg,mensaje, callback){
    var s=parseInt(seg)*1000;
    abrirModalCarga(mensaje);
    setTimeout(function() {

        cerrarModalCarga();
        if (callback) callback();
    },s);
}

function cssTema(h_sidebar,color_base,letra_color,color_borde){

    var duracion=".5s";

    $(".myJT").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        "background-color": color_base,
        color: letra_color,
        "border-bottom":'8px solid' + color_borde
    });

    $(".hTabla").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        "background-color": color_base,
        color: letra_color,
    });

    $("form , .contenedor").css({
        'border-top':'.1em solid'+ color_borde ,
        'border-bottom':'.1em solid'+ color_borde ,
        'border-left':'.1em solid'+ color_borde ,
        'border-right':'.1em solid'+ color_borde ,
    });

    $("#sidebar").css({
        "background": color_base,
        color: letra_color,
        "border-right": "1px solid "+ h_sidebar,
    });  

    $("#sidebar .sidebar-header").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        "background": h_sidebar,
    });  

    $("#sidebar ul.components").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        "border-bottom": "1px solid "+ h_sidebar,
    });  

    $("#sidebar ul p").css({
        color: letra_color,
    }); 

    $("#sidebar ul li").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        "background-color": color_base,
        color: letra_color,
        'border-bottom':"1px solid "+ color_base,
    }); 

    $("#sidebar ul li").mouseout(function(){
        $(this).css("color", letra_color);
        
        }, function(){
        $(this).css("background-color", color_base);
    });

    $("#sidebar ul li").mouseover(function(){
        $(this).css("color", letra_color);
        }, function(){
        $(this).css("background-color", h_sidebar);
    });

    $("#sidebar ul li ul li a").mouseout(function(){
        $(this).css("color", letra_color);
        }, function(){
        $(this).css("background-color", color_base);
    });

    $("#sidebar ul li ul li a").mouseover(function(){
        $(this).css("color", letra_color);
        }, function(){
        $(this).css("background-color", h_sidebar);
    });
  
    $("ul ul a").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        background: color_base,
    }); 

    $("a.article , .activado").css({
        "background-color": h_sidebar,
        color: letra_color,
        'border-bottom':"1px solid "+ color_base,
    }); 

    $("a.article , .activado").mouseover(function(){
        $(this).css("color", "red");
        }, function(){
        $(this).css("background-color", color_borde);
        $(this).css('border-bottom',"1px solid "+ color_base);
    });

    $("a.article , .activado").mouseout(function(){
        $(this).css("color", "red");
        }, function(){
        $(this).css("background-color", h_sidebar);
        $(this).css('border-bottom',"1px solid "+ color_base);
    });

    $(".modal-carga").css({
        "background": color_base,
    });  

    $(".modal-carga-letra").css({
        "color": letra_color,
    });  

    $("#sidebar ul li.active").css({
        "color": letra_color,
        "background": h_sidebar,
    });  

    $(".login_box").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        "background": color_base,
    });  

    $("#frmLogin").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        "border-color": color_borde,
    });  

    $(".bordeLogin").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        "border-color": color_base,
    });  

    $(".tituloLogin").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        "color": h_sidebar,
    });  

    $(".badge").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        "color": letra_color,
        "background": h_sidebar,
    });  

    $("#txtMnuOp").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        'background-color': color_base,
        'border-top':"1px solid "+ h_sidebar,
        'border-bottom':"1px solid "+ h_sidebar,
        "color": letra_color,
    }); 

    $("#scroll").css({
        'background-color': color_base
    }); 

    $("#scroll").mouseover(function(){
        $(this).css("background-color", h_sidebar);
        }, function(){
            $(this).css("background-color", h_sidebar);
    });

    $("#scroll").mouseout(function(){
        $(this).css("background-color", color_base);
        }, function(){
            $(this).css("background-color", color_base);
    });


    $("#scroll span").css({
        'border-bottom-color': letra_color
    }); 

    $(".card-container").css({
        'background-color': color_base,
        'color': letra_color
    });

    $("img.profile").css({
        'border': letra_color + ' 3px solid'
    });

    $('head').append('<style>.guion:before{background: ' + letra_color + ';}</style>');

    $("#reloj").css('color', h_sidebar);

    $(".estatus-container").css({
        'background-color': color_base,
        'color': letra_color
    });
    
}

function salir(){

      swal({
        title: "¿Estas Seguro?",
        text: "¿Deseas Salir del Sistema?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-dark",
        confirmButtonText: "Si deseo salir",
        cancelButtonText: "Cancelar Acción",
        cancelButtonClass: "btn-outline-danger",
            closeOnConfirm: false,
            closeOnCancel: true,
            showLoaderOnConfirm: true
        }, function (isConfirm) {
          if (isConfirm) {
          setTimeout(function () {
              swal.close();
              $("#contentSistema").hide();
              $("#contentLogin").fadeIn();
              $("#frmLogin")[0].reset();
              var h_sidebar="#2f3640";
              var color_base="#353b48";
              var letra_color="#fff";
              var color_borde="#40739e";
              cssTema(h_sidebar,color_base,letra_color,color_borde);
              $("#icoLogin").removeClass("fas fa-unlock");
              $("#icoLogin").addClass("fas fa-lock");
              $("#btnIngresar").attr("disabled","disabled");
              $("#loginUsuario").focus();
  
              var idUsuario=$("#inicioIdusuario").val();
              actividad  ="Salio del sistema";
              log(actividad,idUsuario);
          }, 2000);}
          else{
              alertify.error(" <i class='fa fa-times fa-lg'></i> Cancelado",2);
          }
        });
      
}

$(document).ready(function () {
    
    $('.sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
});

function abrirModalCarga(mensaje) {
    $("#modalCarga").modal("show");
    $("#msjCarga").text(mensaje);
}

function cerrarModalCarga(mensaje) {
    $("#modalCarga").modal("hide");
}

//Verifica el tamaño de la pantalla
$(document).ready(function(){
    $(window).resize(function() {
      if ($(this).width() <= 800){
        $(".btnEspacio").addClass("btn-block");
      }else{
        $(".btnEspacio").removeClass("btn-block");
      }
    });
  });

  
function log(actividad,ejecuta){
    $.ajax({
        url:"log.php",
        type:"POST",
        dateType:"html",
        data:{actividad,ejecuta},
        success:function(respuesta){

        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

//solo numeros
function soloNumeros(e){
    if(event.shiftKey)
    {
         event.preventDefault();
    }
 
    if (event.keyCode == 46 || event.keyCode == 9 || event.keyCode == 8 )    {
    }
    else {
         if (event.keyCode < 95) {
           if (event.keyCode < 45 || event.keyCode > 57) {
                 event.preventDefault();
           }
         } 
         else {
               if (event.keyCode < 96 || event.keyCode > 105) {
                   event.preventDefault();
               }
         }
       }
}

function printDiv(nombreDiv) {
	var mode = 'iframe'; //popup
	var close = mode == "popup";
	var options = { mode : mode, popClose : close};
	$('#areaImprimir').printArea( options );
}

function hablar(texto){
    //se requiere conexion a internet
    var textoAtraducir;
    textoAtraducir=texto; 
    responsiveVoice.speak(textoAtraducir,"Spanish Female"); 
    alertify.success("<i class='fa fa-volume-up fa-lg'></i>", 2);
}

function selectTwo(){
    $( ".select2" ).select2({
        theme: "bootstrap4",
        placeholder: 'Seleccione...'
    });
}

$(".menu").click(function(){
    var id= $(this).attr("id");
    $(".menu").removeClass("active activado");
    $("#"+id).addClass("active activado");
})

$('#scroll').click(function(){ 
    $("html, body").animate({ scrollTop: 0 }, 600); 
    return false; 
});

$("#btnCambiarContraMenu").click(function(){
    $("#modalCambio-I").modal("show");
});

function random_password_Inicio(largo){
    var resultado = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var numCaracteres = caracteres.length;

    for(var i = 0; i < largo; i++){
        resultado += caracteres.charAt(Math.floor(Math.random() * numCaracteres));
    }
    $("#passwInicio").val(resultado);
    $("#passConfirmInicio").val(resultado);
    alertify.success('<i class="fas fa-check"></i> Contraseña Generada', 1);
};

$("#btnGenerarContraInicio").click(function(){
    var largo = 8;
    random_password_Inicio(largo);
    
});

function verificarContraInicio(){
    var usuario = $("#inicioIdusuario").val();
    var contra = $("#passwInicio").val();
    var vContra = $("#passConfirmInicio").val();
    if(contra.length <=7){
        alertify.error('<i class="fas fa-times"></i> La contraseña debe tener al menos 8 caracteres', 2);
    }else{
        if(vContra != contra){
            alertify.error('<i class="fas fa-times"></i> Los campos de las contraseñas tienen que coincidir', 2);
        }else{
            $.ajax({
                url:"../mInicio/actualizar_contra_inicio.php",
                type:"POST",
                dateType:"html",
                data:{contra, usuario},
                success:function(respuesta){
                    alertify.success("<i class='fa fa-save fa-lg'></i> Se ha cambiado la contraseña", 2);
                    $("#passwInicio").val("");
                    $("#passConfirmInicio").val("");
                    $("#modalCambio-I").modal("hide");
                },
                error:function(xhr,status){
                    alert("Error en metodo AJAX");
                },
            });   
        }
    }
};

$("#btnCambiarContraInicio").click(function(){
    verificarContraInicio();    
});

$("#btnCancelarContraInicio").click(function(){
    $("#passwInicio").val("");
    $("#passConfirmInicio").val("");
});

$("#btnVerContraInicio").click(function(){
    var valorBoton = $("#btnVerContraInicio").val();
    if (valorBoton == 0){
        $("#btnVerContraInicio").val(1);
        $("#icoVerContraInicio").removeClass("far fa-eye-slash");
        $("#icoVerContraInicio").addClass("far fa-eye");
        $("#passwInicio").attr('type', 'text');
        $("#passConfirmInicio").attr('type', 'text');
    }else{
        $("#btnVerContraInicio").val(0);
        $("#icoVerContraInicio").removeClass("far fa-eye");
        $("#icoVerContraInicio").addClass("far fa-eye-slash");   
        $("#passwInicio").attr('type', 'password');
        $("#passConfirmInicio").attr('type', 'password');   
    }
});