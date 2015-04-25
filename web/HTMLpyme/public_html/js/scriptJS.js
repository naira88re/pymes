function crearUsuario() {

  var data = {
  
    'nombres': $('#nombres').val(),
    'usuario': $('#login').val(),
    'contrasena': $('#contrasena').val(),
    'ci': $('#ci').val(),
    'telefono': $('#telefono').val(),
  };
  console.log(data);

  $.ajax({
    url: "http://localhost/pymes/public/usuarios",
    type: "POST",
    dataType: 'json',
    data: JSON.stringify(data),
    processData: false,
    contentType: 'application/json',
    CrossDomain:true,
    async: false,
    success: function (data) {
      console.log(data);
    },
    error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
        console.log(xhr.status);
        console.log(xhr.responseText);
    }
  });
}