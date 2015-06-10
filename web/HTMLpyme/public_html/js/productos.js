var URLSERVER = 'http://nairare.gabitosoft.com/pymes/public/';

function initRegistrarProducto() {
  
    ocultarMensajes();
}

function initListarProductos() {
  
    ocultarMensajes();
    cargarListaProductos();
}

function initModificarProducto() {

  ocultarMensajes();
  cargarProducto();
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
      html += 
        "<tr>" + 
        "<td> <input class=\"form-control\" type=\"text\" value=\"" + producto.codigo_producto + " \" /> " +
        "<td> <input class=\"form-control\" type=\"text\" value=\"" + producto.id_marca_producto + " \" /> </td>"+
        "<td> <input class=\"form-control\" type=\"text\" value=\"" + producto.nombre_producto + " \" /> </td>" +
        "<td> <input class=\"form-control\" type=\"text\" value=\"" + producto.cantidad_producto + " \"/> </td>" +
        "<td><input class=\"form-control\" type=\"text\" value=\"" + producto.medida_producto + " \" /></td>" +
        "<td> <input class=\"form-control\" type=\"tel\" value=\"" + producto.precio_neto_producto +" \" /></td>" +
        "<td> <input class=\"form-control\" type=\"tel\" value=\"" + producto.precio_venta_producto +" \" /></td>" +
        "<td><a data-toggle=\"modal\" href=\"#modalEliminarProducto\" class=\"btn btn-info btn-lg btn-block\"><span class=\"glyphicon glyphicon-trash\"> </span></a></td>" + 
        "<td><span class=\"glyphicon glyphicon-floppy-disk\"></pan></td>" +
        "</tr>";
    };
    
    $('.table-condensed tbody').html(html);
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
    'precio_neto_producto': $('#compra').val(),
    'precio_venta_producto': $('#venta').val(),
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

function modificarProducto() {

  datos = {

    'id': $('#id').val(),
    'codigo_producto': $('#codigo').val(),
    'nombre_producto': $('#nombre').val(),
    'medida_producto': $('#medida').val(),
    'cantidad_producto': $('#cantidad').val(),
    'precio_venta_producto': $('#venta').val(),
    'precio_neto_producto': $('#compra').val(),
    'id_marca_producto': $('#marca').attr('data-id-marca')
  };
  
  operacionServidor("productos", "PUT", datos);
  $('#modalModificarProducto').modal('hide');
}

function cargarProducto() {

  var id = getUrlParameter('id');
  if (id !== undefined ) {
  
    data = { id : id };
    $.ajax({
      url: URLSERVER + 'producto',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(data),
      processData: false,
      contentType: 'application/json',
      CrossDomain:true,
      async: false,
      success: function (datos) {
        console.log(datos);
        $('#id').val(datos.id);
        $('#codigo').val(datos.codigo_producto);
        $('#nombre').val(datos.nombre_producto);
        $('#medida').val(datos.medida_producto);
        $('#cantidad').val(datos.cantidad_producto);
        $('#venta').val(datos.precio_venta_producto);
        $('#compra').val(datos.precio_neto_producto);

        $.get( URLSERVER + "marcas_productos", function( data ) {
          for(index in data) {
            var marca = data[index];
            if (marca.id === datos.id_marca_producto) {
              $('#marca').val(marca.nombre_marca_producto);
              $('#marca').attr('data-id-marca', datos.id_marca_producto);
                break;
            }
          };
        });
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(xhr.responseText);

        $("#alertCargarProducto").show("slow");
      }
    });
  }
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
        mostrarAlerta('OK', 'Operacion realizada con exito!');
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(xhr.responseText);
        mostrarAlerta('ERROR', 'Ocurrio un error, porfavor consulte con el administrador.');
      }
    });
}

function getUrlParameter(sParam)
{
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