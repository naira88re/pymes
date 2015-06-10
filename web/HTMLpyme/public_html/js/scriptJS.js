
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
