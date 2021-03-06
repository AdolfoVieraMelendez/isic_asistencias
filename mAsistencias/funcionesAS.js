var ssTO;

$("#claveAS").on('keydown', function () {
    if (event.keyCode == 13) {
        var valor = $(this).val();
        if (valor == "") {
            alertify.error("Escribe una clave", 2);
            $("#estatus-card").fadeOut();
            $("#data-card").fadeOut();
        } else {
            revisar_clave_activo(valor);            
        }
    }
    soloNumeros(valor);
});

function revisar_clave_activo(valor) {
    var mensaje_AS = "";
    var soundVal = $("#sound_AS").val();
    $.ajax({
        url:"../mAsistencias/rClave.php",
        type:"POST",
        dataType:"html",
        data:{valor},
        success:function(respuesta){
            res = parseInt(respuesta);
            console.log(res);
            if (res == 1) {
                if ($("#data-card").is(":visible") || $("#estatus-card").is(":visible")) {
                    stopSixSeconds_TO();
                    $("#data-card").fadeOut();
                    $("#estatus-card").fadeOut();
                    setTimeout(function () {
                        llenar_datos_card(valor);
                        sixSeconds_TO();
                    }, 1000);
                } else {
                    llenar_datos_card(valor);
                    sixSeconds_TO();
                }
            } else {
                mensaje_AS = "La clave que escribiste no está relacionada con ningún trabajador";
                estatus_alerta = "error";
                switchAudio(soundVal, mensaje_AS, estatus_alerta);
                $("#lblestatus-AS").html('<i class="fas fa-exclamation-circle"></i> ' + mensaje_AS);
                
                if ($("#data-card").is(":visible") || $("#estatus-card").is(":visible")) {
                    stopSixSeconds_TO();
                    $("#data-card").fadeOut();
                    $("#estatus-card").fadeOut();
                    setTimeout(function () {
                        $("#estatus-card").fadeIn();
                        sixSeconds_TO();
                    }, 1000);
                } else {
                    $("#estatus-card").fadeIn();
                    sixSeconds_TO();
                }
                
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

function llenar_datos_card(valor) {
    var fechaActual_AS = moment().format('YYYY-MM-DD');
    var hoy = moment(fechaActual_AS);
    
    $.ajax({
        url:"../mAsistencias/datosPersonas.php",
        type:"POST",
        dataType:"json",
        data:{valor},
        success: function (respuesta) {

            var dataArray = respuesta;

            var id_AS = dataArray.result.id_datos;
            var nombre_AS = dataArray.result.nombre;
            var ap_Paterno_AS = dataArray.result.ap_paterno;
            var ap_Materno_AS = dataArray.result.ap_materno;
            var fecha_nac_AS = moment(dataArray.result.fecha_nac);
            var edad_AS = hoy.diff(fecha_nac_AS, "years");
            var correo_AS = dataArray.result.correo;
            var curp_AS = dataArray.result.curp;
            var ecivil_AS = dataArray.result.descripcion;

            var turno_AS = dataArray.result.turno;
            
            var l_entrada_AS = dataArray.result.l_entrada;
            var l_salida_AS = dataArray.result.l_salida;
            var m_entrada_AS = dataArray.result.m_entrada;
            var m_salida_AS = dataArray.result.m_salida;
            var mi_entrada_AS = dataArray.result.mi_entrada;
            var mi_salida_AS = dataArray.result.mi_salida;
            var j_entrada_AS = dataArray.result.j_entrada;
            var j_salida_AS = dataArray.result.j_salida;
            var v_entrada_AS = dataArray.result.v_entrada;
            var v_salida_AS = dataArray.result.v_salida;
            var s_entrada_AS = dataArray.result.s_entrada;
            var s_salida_AS = dataArray.result.s_salida;
            var d_entrada_AS = dataArray.result.d_entrada;
            var d_salida_AS = dataArray.result.d_salida;

            var foto_AS = new Image();
            foto_AS.src = '../fotos/' + valor + '.jpg';
            var default_foto_AS = new Image();
            default_foto_AS.src = '../fotos/default-profile-pic.png';
            
            var img_prueba = document.getElementById('img-card');
            $("#img-card").attr('src', foto_AS.src);
            
        
            $("#lblNombre-AS").text(ap_Paterno_AS + ' ' + ap_Materno_AS + ' ' + nombre_AS);
            $("#lblEdad-AS").text(edad_AS + ' años');
            $("#lblclave-AS").text(valor);
            $("#lblCorreo-AS").text(correo_AS);
            $("#lblEcivil-AS").text(ecivil_AS);
            $("#lblCurp-AS").text(curp_AS);

            $("#data-card").fadeIn();
            $("#estatus-card").fadeIn();

            checar_dia(id_AS, valor, turno_AS, l_entrada_AS, l_salida_AS, m_entrada_AS, m_salida_AS, mi_entrada_AS, mi_salida_AS, j_entrada_AS, j_salida_AS, v_entrada_AS, v_salida_AS, s_entrada_AS, s_salida_AS, d_entrada_AS, d_salida_AS);
            
                        
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
};

function checar_dia(id, clave, turno, l_entrada, l_salida, m_entrada, m_salida, mi_entrada, mi_salida, j_entrada, j_salida, v_entrada, v_salida, s_entrada, s_salida, d_entrada, d_salida) {
    var dia = new Date();
    var dia_AS = dia.getDay();
    console.log(turno);
    if (dia_AS == 0) { // Domingo
        console.log("Domingo");
        checar_entrada_salida(id, clave, turno, d_entrada, d_salida);
    } else {
        if (dia_AS == 1) { // Lunes
            console.log("Lunes");
            checar_entrada_salida(id, clave, turno, l_entrada, l_salida);
        } else {
            if (dia_AS == 2) { // Martes
                console.log("Martes");
                checar_entrada_salida(id, clave, turno, m_entrada, m_salida);
            } else {
                if (dia_AS == 3) { // Miercoles
                    console.log("Miércoles");
                    checar_entrada_salida(id, clave, turno, mi_entrada, mi_salida);
                } else {
                    if (dia_AS == 4) { // Jueves
                        console.log("Jueves");
                        checar_entrada_salida(id, clave, turno, j_entrada, j_salida);
                    } else {
                        if (dia_AS == 5) { // Viernes
                            console.log("Viernes");
                            checar_entrada_salida(id, clave, turno, v_entrada, v_salida);
                        } else {
                            if (dia_AS == 6) { //Sabado
                                console.log("Sábado");
                                checar_entrada_salida(id, clave, turno, s_entrada, s_salida);
                            }
                        }
                    }
                }
            }
        }
    }
}

function checar_entrada_salida(id, clave, turno, hora_entrada, hora_salida) {
    let id_AS = id;
    let sonidoVal = $("#sound_AS").val();
    let mensaje_AS = "";
    let alerta_estatus = "";
    let hora_Actual = moment().format('HH:mm:ss');
    console.log("Hora actual: " + hora_Actual);
    console.log("Hora de entrada: " + hora_entrada);
    let incidencia_entrada;
    let incidencia_salida;
    let FR_e = '00:10:01';
    let FR_d = '00:05:00';
    let P_1 = '00:10:00';
    let P_2 = '00:05:00';
    let RMe_1 = '00:05:01';
    let RMe_2 = '00:15:00';
    let RMa_1 = '00:15:01';
    let RMa_2 = '00:05:00';
    let S_1 = '00:05:00';
    let S_2 = '00:30:00';
    let clave_log = clave;
    let actividad;
    let idUser=$("#inicioIdusuario").val();
    

    let FR_horario_e = moment.duration(FR_e);
    let FR_horario_s = moment.duration(FR_d);
    

    let P_horario_1 = moment.duration(P_1);
    let P_horario_2 = moment.duration(P_2);

    let RMe_horario_1 = moment.duration(RMe_1);
    let RMe_horario_2 = moment.duration(RMe_2);

    let RMa_horario_1 = moment.duration(RMa_1);
    let RMa_horario_2 = moment.duration(RMa_2);

    let FR_horario_r1 = moment.duration("1 " + hora_entrada).subtract(FR_horario_e);
    let FR_horario_r2 = moment.duration("1 " + hora_salida).subtract(FR_horario_s);
    let FR_horario_r3 = FR_horario_r1._data.hours + ':' + FR_horario_r1._data.minutes + ':' + FR_horario_r1._data.seconds;
    let FR_horario_r4 = FR_horario_r2._data.hours + ':' + FR_horario_r2._data.minutes + ':' + FR_horario_r2._data.seconds;
    let FR_horario_r5 = corregir_hora(FR_horario_r3);
    let FR_horario_r6 = corregir_hora(FR_horario_r4);

    let P_horario_r1 = moment.duration("1 " + hora_entrada).subtract(P_horario_1);   
    let P_horario_r2 = moment.duration("1 " + hora_entrada).add(P_horario_2);
    let P_horario_r3 = P_horario_r1._data.hours + ':' + P_horario_r1._data.minutes + ':' + P_horario_r1._data.seconds;
    let P_horario_r4 = P_horario_r2._data.hours + ':' + P_horario_r2._data.minutes + ':' + P_horario_r2._data.seconds;
    let P_horario_r5 = corregir_hora(P_horario_r3);
    console.log("Esto debería de ser 00:50:00 : " + P_horario_r5);
    let P_horario_r6 = corregir_hora(P_horario_r4);
    console.log("Esto debería de ser 01:04:59 : " + P_horario_r6);
    

    let RMe_horario_r1 = moment.duration("1 " + hora_entrada).add(RMe_horario_1);
    let RMe_horario_r2 = moment.duration("1 " + hora_entrada).add(RMe_horario_2);
    let RMe_horario_r3 = RMe_horario_r1._data.hours + ':' + RMe_horario_r1._data.minutes + ':' + RMe_horario_r1._data.seconds;
    let RMe_horario_r4 = RMe_horario_r2._data.hours + ':' + RMe_horario_r2._data.minutes + ':' + RMe_horario_r2._data.seconds;
    let RMe_horario_r5 = corregir_hora(RMe_horario_r3);
    let RMe_horario_r6 = corregir_hora(RMe_horario_r4);
    

    let RMa_horario_r1 = moment.duration("1 " + hora_entrada).add(RMa_horario_1);
    let RMa_horario_r2 = moment.duration("1 " + hora_salida).subtract(RMa_horario_2);
    let RMa_horario_r3 = RMa_horario_r1._data.hours + ':' + RMa_horario_r1._data.minutes + ':' + RMa_horario_r1._data.seconds;
    let RMa_horario_r4 = RMa_horario_r2._data.hours + ':' + RMa_horario_r2._data.minutes + ':' + RMa_horario_r2._data.seconds;
    let RMa_horario_r5 = corregir_hora(RMa_horario_r3);
    let RMa_horario_r6 = corregir_hora(RMa_horario_r4);
    

    let S_horario_r1 = moment.duration("1 " + hora_salida).subtract(S_1);
    let S_horario_r2 = moment.duration("1 " + hora_salida).add(S_2);
    let S_horario_r3 = S_horario_r1._data.hours + ':' + S_horario_r1._data.minutes + ':' + S_horario_r1._data.seconds;
    let S_horario_r4 = S_horario_r2._data.hours + ':' + S_horario_r2._data.minutes + ':' + S_horario_r2._data.seconds;
    let S_horario_r5 = corregir_hora(S_horario_r3);
    let S_horario_r6 = corregir_hora(S_horario_r4);
    

    $.ajax({
        url:"../mAsistencias/rEntrada.php",
        type:"POST",
        dataType:"html",
        data:{id_AS},
        success:function(respuesta){
            res = parseInt(respuesta);
            console.log(res);
            if (res == 0) {
                if (turno == 'Matutino') {
                    if (hora_entrada == '00:00:00' && hora_salida == '00:00:00') {
                        console.log("Hoy no jalo");
                        mensaje_AS = "Hoy no es un día laboral para ti";
                        alerta_estatus = "error";
                        switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                        $("#lblestatus-AS").html('<i class="fas fa-times"></i> ' + mensaje_AS);
                    } else {
                        if (hora_Actual <= FR_horario_r5 || hora_Actual >= FR_horario_r6) {
                            mensaje_AS = "Tu asistencia se encuentra fuera del rango de tu horario";
                            alerta_estatus = "error";
                            switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                            $("#lblestatus-AS").html('<i class="fas fa-times"></i> ' + mensaje_AS);
                        } else {
                            if (hora_Actual >= P_horario_r5 && hora_Actual <= P_horario_r6) {
                                incidencia_entrada = 'Entrada Puntual';
                                mensaje_AS = "Gracias por registrar su entrada";
                                alerta_estatus = "success";
                                switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                                registrar_Entrada(id_AS, incidencia_entrada, hora_Actual);
                                $("#lblestatus-AS").html('<i class="fas fa-circle" id="estatusIco-AS"></i> ' + mensaje_AS);
                                $("#estatusIco-AS").css('color', '#4cd137');
                                actividad = 'Se ha registrado la entrada del trabajador con clave ' + clave_log + ' como ' + incidencia_entrada;
                                log(actividad,idUser);
                            } else {
                                if (hora_Actual >= RMe_horario_r5 && hora_Actual <= RMe_horario_r6) {
                                    incidencia_entrada = 'Retardo Menor';
                                    mensaje_AS = "Gracias por registrar su entrada";
                                    alerta_estatus = "success";
                                    switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                                    registrar_Entrada(id_AS, incidencia_entrada, hora_Actual);
                                    $("#lblestatus-AS").html('<i class="fas fa-circle" id="estatusIco-AS"></i> ' + mensaje_AS);
                                    $("#estatusIco-AS").css('color', '#F97F51');
                                    actividad = 'Se ha registrado la entrada del trabajador con clave ' + clave_log + ' como ' + incidencia_entrada;
                                    log(actividad,idUser);
                                } else {
                                    if (hora_Actual >= RMa_horario_r5 && hora_Actual <= RMa_horario_r6) {
                                        incidencia_entrada = 'Retardo Mayor';
                                        mensaje_AS = "Gracias por registrar su entrada";
                                        alerta_estatus = "success";
                                        switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                                        registrar_Entrada(id_AS, incidencia_entrada, hora_Actual);
                                        $("#lblestatus-AS").html('<i class="fas fa-circle" id="estatusIco-AS"></i> ' + mensaje_AS);
                                        $("#estatusIco-AS").css('color', '#d63031');
                                        actividad = 'Se ha registrado la entrada del trabajador con clave ' + clave_log + ' como ' + incidencia_entrada;
                                        log(actividad,idUser);
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (turno == 'Vespertino') {
                        if (hora_entrada == '00:00:00' && hora_salida == '00:00:00') {
                            mensaje_AS = "Hoy no es un día laboral para ti";
                            alerta_estatus = "error";
                            switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                            $("#lblestatus-AS").html('<i class="fas fa-times"></i> ' + mensaje_AS);
                        } else {
                            if (hora_Actual <= FR_horario_r5 || hora_Actual >= FR_horario_r6) {
                                mensaje_AS = "Tu asistencia se encuentra fuera del rango de tu horario";
                                alerta_estatus = "error";
                                switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                                $("#lblestatus-AS").html('<i class="fas fa-times"></i> ' + mensaje_AS);
                            } else {
                                if (hora_Actual >= P_horario_r5 && hora_Actual <= P_horario_r6) {
                                    incidencia_entrada = 'Entrada Puntual';
                                    mensaje_AS = "Gracias por registrar su entrada";
                                    alerta_estatus = "success";
                                    switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                                    registrar_Entrada(id_AS, incidencia_entrada, hora_Actual);
                                    $("#lblestatus-AS").html('<i class="fas fa-circle" id="estatusIco-AS"></i> ' + mensaje_AS);
                                    $("#estatusIco-AS").css('color', '#4cd137');
                                    actividad = 'Se ha registrado la entrada del trabajador con clave ' + clave_log + ' como ' + incidencia_entrada;
                                    log(actividad,idUser);
                                } else {
                                    if (hora_Actual >= RMe_horario_r5 && hora_Actual <= RMe_horario_r6) {
                                        incidencia_entrada = 'Retardo Menor';
                                        mensaje_AS = "Gracias por registrar su entrada";
                                        alerta_estatus = "success";
                                        switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                                        registrar_Entrada(id_AS, incidencia_entrada, hora_Actual);
                                        $("#lblestatus-AS").html('<i class="fas fa-circle" id="estatusIco-AS"></i> ' + mensaje_AS);
                                        $("#estatusIco-AS").css('color', '#F97F51');
                                        actividad = 'Se ha registrado la entrada del trabajador con clave ' + clave_log + ' como ' + incidencia_entrada;
                                        log(actividad,idUser);
                                    } else {
                                        if (hora_Actual >= RMa_horario_r5 && hora_Actual <= RMa_horario_r6) {
                                            incidencia_entrada = 'Retardo Mayor';
                                            mensaje_AS = "Gracias por registrar su entrada";
                                            alerta_estatus = "success";
                                            switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                                            registrar_Entrada(id_AS, incidencia_entrada, hora_Actual);
                                            $("#lblestatus-AS").html('<i class="fas fa-circle" id="estatusIco-AS"></i> ' + mensaje_AS);
                                            $("#estatusIco-AS").css('color', '#d63031');
                                            actividad = 'Se ha registrado la entrada del trabajador con clave ' + clave_log + ' como ' + incidencia_entrada;
                                            log(actividad,idUser);
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (turno == 'Nocturno') {
                            if (hora_entrada == '00:00:00' && hora_salida == '00:00:00') {
                                mensaje_AS = "Hoy no es un día laboral para ti";
                                alerta_estatus = "error";
                                switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                                $("#lblestatus-AS").html('<i class="fas fa-times"></i> ' + mensaje_AS);
                            } else {
                                if (hora_Actual <= FR_horario_r5 || hora_Actual >= FR_horario_r6) {
                                    mensaje_AS = "Tu asistencia se encuentra fuera del rango de tu horario";
                                    alerta_estatus = "error";
                                    switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                                    $("#lblestatus-AS").html('<i class="fas fa-times"></i> ' + mensaje_AS);
                                } else {
                                    if (hora_Actual >= P_horario_r5 && hora_Actual <= P_horario_r6) {
                                        incidencia_entrada = 'Entrada Puntual';
                                        mensaje_AS = "Gracias por registrar su entrada";
                                        alerta_estatus = "success";
                                        switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                                        registrar_Entrada(id_AS, incidencia_entrada, hora_Actual);
                                        $("#lblestatus-AS").html('<i class="fas fa-circle" id="estatusIco-AS"></i> ' + mensaje_AS);
                                        $("#estatusIco-AS").css('color', '#4cd137');
                                        actividad = 'Se ha registrado la entrada del trabajador con clave ' + clave_log + ' como ' + incidencia_entrada;
                                        log(actividad,idUser);
                                    } else {
                                        if (hora_Actual >= RMe_horario_r5 && hora_Actual <= RMe_horario_r6) {
                                            incidencia_entrada = 'Retardo Menor';
                                            mensaje_AS = "Gracias por registrar su entrada";
                                            alerta_estatus = "success";
                                            switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                                            registrar_Entrada(id_AS, incidencia_entrada, hora_Actual);
                                            $("#lblestatus-AS").html('<i class="fas fa-circle" id="estatusIco-AS"></i> ' + mensaje_AS);
                                            $("#estatusIco-AS").css('color', '#F97F51');
                                            actividad = 'Se ha registrado la entrada del trabajador con clave ' + clave_log + ' como ' + incidencia_entrada;
                                            log(actividad,idUser);
                                        } else {
                                            if (hora_Actual >= RMa_horario_r5 && hora_Actual <= RMa_horario_r6) {
                                                incidencia_entrada = 'Retardo Mayor';
                                                mensaje_AS = "Gracias por registrar su entrada";
                                                alerta_estatus = "success";
                                                switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                                                registrar_Entrada(id_AS, incidencia_entrada, hora_Actual);
                                                $("#lblestatus-AS").html('<i class="fas fa-circle" id="estatusIco-AS"></i> ' + mensaje_AS);
                                                $("#estatusIco-AS").css('color', '#d63031');
                                                actividad = 'Se ha registrado la entrada del trabajador con clave ' + clave_log + ' como ' + incidencia_entrada;
                                                log(actividad,idUser);
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            if (turno == 'Especial') {
                                if (hora_entrada == '00:00:00' && hora_salida == '00:00:00') {
                                    mensaje_AS = "Hoy no es un día laboral para ti";
                                    alerta_estatus = "error";
                                    switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                                    $("#lblestatus-AS").html('<i class="fas fa-times"></i> ' + mensaje_AS);
                                } else {
                                    if (hora_Actual <= FR_horario_r5 || hora_Actual >= FR_horario_r6) {
                                        console.log("Estas fuera del rango Especial");
                                        mensaje_AS = "Tu asistencia se encuentra fuera del rango de tu horario";
                                        alerta_estatus = "error";
                                        switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                                        $("#lblestatus-AS").html('<i class="fas fa-times"></i> ' + mensaje_AS);
                                    } else {
                                        if (hora_Actual >= P_horario_r5 && hora_Actual <= P_horario_r6) {
                                            incidencia_entrada = 'Entrada Puntual';
                                            mensaje_AS = "Gracias por registrar su entrada";
                                            alerta_estatus = "success";
                                            switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                                            registrar_Entrada(id_AS, incidencia_entrada, hora_Actual);
                                            $("#lblestatus-AS").html('<i class="fas fa-circle" id="estatusIco-AS"></i> ' + mensaje_AS);
                                            $("#estatusIco-AS").css('color', '#4cd137');
                                            actividad = 'Se ha registrado la entrada del trabajador con clave ' + clave_log + ' como ' + incidencia_entrada;
                                            log(actividad,idUser);
                                        } else {
                                            if (hora_Actual >= RMe_horario_r5 && hora_Actual <= RMe_horario_r6) {
                                                incidencia_entrada = 'Retardo Menor';
                                                mensaje_AS = "Gracias por registrar su entrada";
                                                alerta_estatus = "success";
                                                switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                                                registrar_Entrada(id_AS, incidencia_entrada, hora_Actual);
                                                $("#lblestatus-AS").html('<i class="fas fa-circle" id="estatusIco-AS"></i> ' + mensaje_AS);
                                                $("#estatusIco-AS").css('color', '#F97F51');
                                                actividad = 'Se ha registrado la entrada del trabajador con clave ' + clave_log + ' como ' + incidencia_entrada;
                                                log(actividad,idUser);
                                            } else {
                                                if (hora_Actual >= RMa_horario_r5 && hora_Actual <= RMa_horario_r6) {
                                                    console.log(RMa_horario_r5);
                                                    console.log(RMa_horario_r6);
                                                    incidencia_entrada = 'Retardo Mayor';
                                                    mensaje_AS = "Gracias por registrar su entrada";
                                                    alerta_estatus = "success";
                                                    switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                                                    registrar_Entrada(id_AS, incidencia_entrada, hora_Actual);
                                                    $("#lblestatus-AS").html('<i class="fas fa-circle" id="estatusIco-AS"></i> ' + mensaje_AS);
                                                    $("#estatusIco-AS").css('color', '#d63031');
                                                    actividad = 'Se ha registrado la entrada del trabajador con clave ' + clave_log + ' como ' + incidencia_entrada;
                                                    log(actividad,idUser);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }    
            } else { //Aqui checa si res == 1
                if (turno == 'Matutino') {
                    if (hora_Actual >= S_horario_r5 && hora_Actual <= S_horario_r6) {
                        incidencia_salida = 'Salida';
                        mensaje_AS = 'Gracias por registrar su salida';
                        alerta_estatus = 'success';
                        switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                        registrar_Salida(id_AS, incidencia_salida, hora_Actual);
                        $("#lblestatus-AS").html('<i class="fas fa-circle" id="estatusIco-AS"></i> ' + mensaje_AS);
                        $("#estatusIco-AS").css('color', '#0984e3');
                        actividad = 'Se ha registrado la salida del trabajador con clave ' + clave_log + ' como ' + incidencia_salida;
                        log(actividad,idUser);
                    } else {
                        mensaje_AS = 'Tu asistencia se encuentra fuera del rango de tu horario';
                        alerta_estatus = 'error';
                        switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                        $("#lblestatus-AS").html('<i class="fas fa-times"></i> ' + mensaje_AS);
                    }
                } else {
                    if (turno == 'Vespertino') {
                        if (hora_Actual >= S_horario_r5 && hora_Actual <= S_horario_r6) {
                            incidencia_salida = 'Salida';
                            mensaje_AS = 'Gracias por registrar su salida';
                            alerta_estatus = 'success';
                            switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                            registrar_Salida(id_AS, incidencia_salida, hora_Actual);
                            $("#lblestatus-AS").html('<i class="fas fa-circle" id="estatusIco-AS"></i> ' + mensaje_AS);
                            $("#estatusIco-AS").css('color', '#0984e3');
                            actividad = 'Se ha registrado la salida del trabajador con clave ' + clave_log + ' como ' + incidencia_salida;
                            log(actividad,idUser);
                        } else {
                            mensaje_AS = 'Tu asistencia se encuentra fuera del rango de tu horario';
                            alerta_estatus = 'error';
                            switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                            $("#lblestatus-AS").html('<i class="fas fa-times"></i> ' + mensaje_AS);
                        }
                    } else {
                        if (turno == 'Nocturno') {
                            if (hora_Actual >= S_horario_r5 && hora_Actual <= S_horario_r6) {
                                incidencia_salida = 'Salida';
                                mensaje_AS = 'Gracias por registrar su salida';
                                alerta_estatus = 'success';
                                switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                                registrar_Salida(id_AS, incidencia_salida, hora_Actual);
                                $("#lblestatus-AS").html('<i class="fas fa-circle" id="estatusIco-AS"></i> ' + mensaje_AS);
                                $("#estatusIco-AS").css('color', '#0984e3');
                                actividad = 'Se ha registrado la salida del trabajador con clave ' + clave_log + ' como ' + incidencia_salida;
                                log(actividad,idUser);
                            } else {
                                mensaje_AS = 'Tu asistencia se encuentra fuera del rango de tu horario';
                                alerta_estatus = 'error';
                                switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                                $("#lblestatus-AS").html('<i class="fas fa-times"></i> ' + mensaje_AS);
                            }
                        } else {
                            if (turno == 'Especial') {
                                if (hora_Actual >= S_horario_r5 && hora_Actual <= S_horario_r6) {
                                    incidencia_salida = 'Salida';
                                    mensaje_AS = 'Gracias por registrar su salida';
                                    alerta_estatus = 'success';
                                    switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                                    registrar_Salida(id_AS, incidencia_salida, hora_Actual);
                                    $("#lblestatus-AS").html('<i class="fas fa-circle" id="estatusIco-AS"></i> ' + mensaje_AS);
                                    $("#estatusIco-AS").css('color', '#0984e3');
                                } else {
                                    mensaje_AS = 'Tu asistencia se encuentra fuera del rango de tu horario';
                                    alerta_estatus = 'error';
                                    switchAudio(sonidoVal, mensaje_AS, alerta_estatus);
                                    $("#lblestatus-AS").html('<i class="fas fa-times"></i> ' + mensaje_AS);
                                    actividad = 'Se ha registrado la salida del trabajador con clave ' + clave_log + ' como ' + incidencia_salida;
                                    log(actividad,idUser);
                                }
                            }
                        }
                    }
                }            
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
    
};


function registrar_Entrada(id, incidencia, hora) {
    $.ajax({
        url:"../mAsistencias/guardarE.php",
        type:"POST",
        dataType:"html",
        data:{id, incidencia, hora},
        success:function(respuesta){
            console.log("Entrada registrada");
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
};

function registrar_Salida(id, incidencia, hora) {
    $.ajax({
        url:"../mAsistencias/guardarS.php",
        type:"POST",
        dataType:"html",
        data:{id, incidencia, hora},
        success:function(respuesta){
            console.log("Salida registrada");
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
};


function sixSeconds_TO(){
    ssTO = setTimeout(function () {
                $("#data-card").fadeOut();
                $("#estatus-card").fadeOut();
                $("#claveAS").focus();
            },6000);
}

function stopSixSeconds_TO(){
    clearTimeout(ssTO);
}

function showTime() {
    var tiempoAS = new Date();
    var horaAS = tiempoAS.getHours();
    var minutosAS = tiempoAS.getMinutes();
    var segundosAS = tiempoAS.getSeconds();

    if (horaAS < 10) {
        horaAS = '0' + horaAS;
    }
    if (minutosAS < 10) {
        minutosAS = '0' + minutosAS;
    }
    if (segundosAS < 10) {
        segundosAS = '0' + segundosAS;
    }

    var tiempoActual = '<i class="far fa-clock"></i> ' + horaAS + ':' + minutosAS + ':' + segundosAS;
    $("#reloj").html(tiempoActual);

    setTimeout(showTime, 1000);
};


$("#clave-ico, .clave_ph").click(function () {
    $("#claveAS").focus();
    $("#clave-ico").css({
        "color": "#fff",
        "background-color": "dodgerblue"
    });
});


$("#claveAS").focus(function () {
    $("#clave-ico").css({
        "color": "#fff",
        "background-color": "dodgerblue"
    });
});

$("#claveAS").focusout(function () {
    $("#clave-ico").css({
        "color": "#fff",
        "background-color": "#aaa"
    });
});

$("#sound_AS").change(function () {
    var valor = $(this).val();

    (valor == 0) ? $(this).val(1) : $(this).val(0);
});

// Funcion para corregir el formato de las horas

function corregir_hora(hora) {
    var byte = hora.split(':');
    if (byte[0] < 10) {
        byte[0] = '0' + byte[0];
    }
    if (byte[1] < 10) {
        byte[1] = '0' + byte[1];
    }
    if (byte[2] < 10) {
        byte[2] = '0' + byte[2];
    }
    let hora_corregida = byte[0] + ':' + byte[1] + ':' + byte[2];
    return hora_corregida;
}

// Funcion para corregir el formato de las horas

// Funcion que determinará si se leerán los mensajes de acuerdo al switch de audio

function switchAudio(soundValue, message, alertStatus) {
    (soundValue == '1') ? soundValue = 'si' : soundValue = 'no';
    
    if (soundValue == 'si') {
        if (alertStatus == 'success') {
            alertify.success(message, 2);
            hablar(message);
        } else {
            alertify.error(message, 2);
            hablar(message);
        }
    } else {
        if (soundValue == 'no') {
            if (alertStatus == 'success') {
                alertify.success(message, 2);
            } else {
                alertify.error(message, 2);
            }
        }
    }
}

// Funcion que determinará si se leerán los mensajes de acuerdo al switch de audio