var URLSERVER = 'http://nairare.gabitosoft.com/pymes/public/';

function initListarMarcas() {
  
    cargarListaMarcas();
}

function initModificarMarca() {

  cargarMarca();
}

function cargarListaMarcas() {

  $.get( URLSERVER + "marcas_productos", function( data ) {
    var html = "";
    console.log(data);
    for(index in data) {

      var marca = data[index];
      html += 
        "<tr>" + 
        "<td> <input class=\"form-control\" type=\"text\" value=\"" + marca.nombre_marca_producto + " \" /> </td>" +
        "<td><a href=\"#modalModificarMarca\" class=\"btn btn-default btn-lg btn-block\"><span class=\"glyphicon glyphicon-floppy-disk\"></pan></a></td>" +
        "<td><a data-toggle=\"modal\" href=\"#modalEliminarMarca\" class=\"btn btn-danger btn-lg btn-block\"><span class=\"glyphicon glyphicon-trash\"> </span></a></td>" + 
        "</tr>";
    };
    
    $('.table-condensed tbody').html(html);
  });
}

function eliminarMarcas() {

  $('input[name="marcas[]"]:checked').each(function() {

    datos = { 'id': $(this).val() };
    operacionServidor("marcas_productos", "DELETE", datos);
  });
  
  $('#modalEliminarMarca').modal('hide');
  cargarListaMarcas();
}

function crearMarca() {

  datos = {  
    'nombre': $('#nombre').val()
  };
  
  operacionServidor("marcas_productos", "POST", datos);

  $('#nombre').val('');
}

function modificarMarca() {

  datos = {

    'id': $('#id').val(),
    'nombre_producto': $('#nombre').val()
  };
  
  operacionServidor("marcas_productos", "PUT", datos);
  $('#modalModificarMarca').modal('hide');
}

function cargarMarca() {

  var id = getUrlParameter('id');
  if (id !== undefined ) {
  
    data = { id : id };
    $.ajax({
      url: URLSERVER + 'marcas_productos',
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
        $('#nombre').val(datos.nombre_producto);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(xhr.responseText);

        $("#alertCargarMarca").show("slow");
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