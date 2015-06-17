
/**
 * Carga archivo html con los controles de la 
 * barra de navegacion y la pagina de autenticacion.
 * @returns 
 */
function cargarPaginaPrincipal() {
  
  $(document).ready(function() {

    $(".navbar").load('navbar.html');
    $("#contenedor_principal").load('login.html');
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
