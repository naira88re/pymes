var URLSERVER = 'http://nairare.gabitosoft.com/pymes/public/';

function irRegistrarVendedor() {
    crearProveedor();
    $("#contenedor_principal").load('vendedor/registrarVendedor.html');
}


function crearProveedor() {

  datos = {
  
    'nombre': $('#nombreEmpresa').val(),
    'telefono': $('#telefonoEmpresa').val(),
    'direccion': $('#direccionEmpresa').val()
  };
  
  
  operacionServidor("empresas", "POST", datos);
  
  $('#nombreEmpresa').val('');
  $('#telefonoEmpresa').val('');
  $('#direccionEmpresa').val('');
 
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