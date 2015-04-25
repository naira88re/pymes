function crearUsuario() {

  var datos = {
  
    'nombres': $('#nombres').val(),
    'usuario': $('#login').val(),
    'contrasena': $('#contrasena').val(),
    'ci': $('#ci').val(),
    'telefono': $('#telefono').val(),
  };

  $.ajax({
    url: "http://localhost/pymes/public/usuarios",
    type: "POST",
    dataType: 'json',
    data: JSON.stringify(datos),
    processData: false,
    contentType: 'application/json',
    CrossDomain:true,
    async: false,
    success: function (datos) {
      console.log(datos);
    },
    error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
        console.log(xhr.status);
        console.log(xhr.responseText);
    }
  });
}