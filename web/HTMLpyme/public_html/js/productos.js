var URLSERVER = 'http://localhost/pymes/public/';

function initRegistrarProducto() {
  
    ocultarMensajes();
}

function initListarProductos() {
  
    ocultarMensajes();
    cargarListaProductos();
}

function ocultarMensajes() {

  $(".alert-success").hide();
  $(".alert-danger").hide();
}

function cargarListaProductos() {

  $.get( URLSERVER + "productos", function( data ) {
    var html = "";
    console.log(data);
    for(index in data) {

      var producto = data[index];
      html += "<li> <input name=\"productos[]\" value=\" " + 
        producto.id + "\" type=\"checkbox\" /> " + 
        "<input type=\"text\" readonly value=\" " + producto.nombre_producto + " \" />" +
        "<input type=\"tel\" readonly value=\" " + producto.precio_venta_producto + " \" />" +
        "</li>";
    };
    
    $('#listaProductos').html(html);
  });
}

function eliminarProductos() {

  $('input[name="productos[]"]:checked').each(function() {

    datos = { 'id': $(this).val() };
    operacionServidor("productos", "DELETE", datos);
  });
  
  $('#modalEliminarProducto').modal('hide');
  cargarListaProductos();
}

function crearProducto() {

  datos = {  
    'codigo_producto': $('#codigo').val(),
    'nombre_producto': $('#nombre').val(),
    'medida_producto': $('#medida').val(),
    'cantidad_producto': $('#cantidad').val(),
    'precio_neto_producto': $('#venta').val(),
    'precio_venta_producto': $('#compra').val(),
    'id_marca_producto': 1
  };
  
  operacionServidor("productos", "POST", datos);

  $('#codigo').val('');
  $('#nombre').val('');
  $('#medida').val('');
  $('#cantidad').val('');
  $('#venta').val('');
  $('#compra').val('');
}

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
        $(".alert-success").show("slow");
        $(".alert-danger").hide();
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(xhr.responseText);

        $(".alert-danger").show("slow");
        $(".alert-success").hide(); 
      }
    });
}