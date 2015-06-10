
/**
 * Carga archivo html con los controles de la 
 * barra de navegacion y la pagina de autenticacion
 * @returns 
 */
function cargarPaginaPrincipal() {
  
  $(document).ready(function() {
    $(".navbar").load('navbar.html');
    $("#contenedor_principal").load('login.html');
  });
}

function cargarPagina(item) {
  
  //console.log($(item).parent('.dl-menu'));
  console.log($(item).parent().find('#dl-menu'));
  console.log($(item));
  console.log($('#registrarProducto').parent());
}
