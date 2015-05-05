function init() {
    
    $(".alert-success").hide();
    $(".alert-danger").hide();
}

function crearUsuario() {

  var datos = {
  
    'nombres': $('#nombres').val(),
    'usuario': $('#login').val(),
    'contrasena': $('#contrasena').val(),
    'ci': $('#ci').val(),
    'telefono': $('#telefono').val(),
  };
 

  $.ajax({
    url: "http://10.0.0.5/pymes/public/usuarios",
    type: "POST",
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
    error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
        console.log(xhr.status);
        console.log(xhr.responseText);
        
        $(".alert-danger").show("slow");
        $(".alert-success").hide();
       
    }
  });
}