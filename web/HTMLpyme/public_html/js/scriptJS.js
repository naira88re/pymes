// Variable global utilizada para establecer conexion con el servicio web
var URLSERVER = 'http://nairare.gabitosoft.com/pymes/public/';

/**
 * Carga archivo html con los controles de la 
 * barra de navegacion y la pagina de autenticacion.
 * @returns 
 */
function cargarPaginaPrincipal() {
  
  $(document).ready(function() {

    $(".navbar").load('navbar.html');
    $("#contenedor_principal").load('usuario/inicioAdmin.html');
  });
  
  // Agregamos el evento para mostrar el gif de espera
  $(document).ajaxStart(function() {

    $(".se-pre-con").show();
  });
  
  // Agregamos el evento para ocultar lentamente el gif de espera
  $(document).ajaxStop(function() {

    $(".se-pre-con").fadeOut("slow");
  });
}

/**
 * Permite a los menu items cargar determinadas paginas
 * en el contenedor principal.
 * @param {string} ruta
 * @returns 
 */
function activarItem(ruta) {

  $('#contenedor_principal').load(ruta);
  $('#dl-menu').dlmenu('closeMenu');
}

/**
 * Esta funcion buscara el elemento alert-message 
 * dependiendo de los parametros enviados se mostrara un 
 * un mensaje satisfactorio o de error
 * @param {string} tipo
 * @param {string} texto
 * @returns 
 */
function mostrarAlerta(tipo, texto) {

  var item = $('#alert-message');
  item.hide();

  if (tipo === 'ERROR') {

    item.removeClass('alert-success');
    item.addClass('alert alert-danger');
  } else {

    item.removeClass('alert-danger');
    item.addClass('alert alert-success');
  }

  item.html(texto);
  item.show("slow");
}

/**
 * Funcion que permite enviar datos hacia el servidor
 * basandose en el tipo de solicitud enviada
 * 
 * @param {string} ruta
 * @param {string} tipo
 * @param {string} datos
 * @returns 
 */
function operacionServidor(ruta, tipo, datos) {

  $.ajax({
      url: URLSERVER + ruta,
      type: tipo,
      dataType: 'json',
      data: JSON.stringify(datos),
      processData: false,
      contentType: 'application/json',
      CrossDomain:true,
      async: false,
      success: function (datos) {
        console.log(datos);
        if (datos.mensaje !== undefined ) {
          mostrarAlerta('OK', 'Operacion realizada con exito!');
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(xhr.responseText);

        mostrarAlerta('ERROR', 'Ocurrio un error, porfavor consulte con el administrador.');
      }
    });
}

/**
 * Funcion que nos permite obtener los parametros de una 
 * direccion URL
 * @param {string} sParam
 * @returns {getUrlParameter.sParameterName}
 */
function getUrlParameter(sParam) {

    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}
