var URLSERVER = 'http://localhost/pymes/public/';

function initRegistrarUsuarios() {
  
    ocultarMensajes();
    cargarTiposUsusarios(); //Cargamos informacion de la BD
}

function initListaUsuarios() {

  ocultarMensajes();
  cargarListaUsuarios();
}

function initModificarUsuario() {

  ocultarMensajes();
  cargarUsuario();
}

function ocultarMensajes() {

  $(".alert-success").hide();
  $(".alert-danger").hide();
}

function crearUsuario() {

  datos = {
  
    'nombres': $('#nombres').val(),
    'apellidos': $('#apellidos').val(),
    'usuario': $('#login').val(),
    'contrasena': $('#contrasena').val(),
    'ci': $('#ci').val(),
    'telefono': $('#telefono').val(),
    'id_tipo_usuario': $('#tipos').val()
  };
  
  operacionServidor("usuarios", "POST", datos);
  //limpiarCampos(['nombres','apellidos','login','contrasena','repetirContrasena','ci','telefono']);
  $('#nombres').val('');
  $('#apellidos').val('');
  $('#login').val('');
  $('#contrasena').val('');
  $('#repetirContrasena').val('');
  $('#ci').val('');
  $('#telefono').val('');
  $("div.divTipo select").val('0');
}

function cargarTiposUsusarios() {

  $.get( URLSERVER + "tipos_usuarios", function( data ) {
    var html = "<option value=\"0\">Selecione Tipo de Usuario</option>"
    for(index in data) {

      var tipo = data[index];
      html += "<option value=\" " + tipo.id + " \" >" +
          tipo.tipo_usuario + "</option>"
    };
    
    $('#tipos').html(html);
  });
}

function cargarListaUsuarios() {

  $.get( URLSERVER + "usuarios", function( data ) {
    var html = "";
    console.log(data);
    for(index in data) {

      var usuario = data[index];
      html += "<li> <input name=\"usuarios[]\" value=\" " + 
        usuario.id + "\" type=\"checkbox\" /> <a href=\"modificarUsuarios.html?id="+ 
        usuario.id + "\">" + 
        usuario.nombre_usuario + 
        " " + usuario.apellido_usuario + " </a></li>";
    };
    
    $('#listaUsuarios').html(html);
  });
}

function elminarUsuarios() {

  $('input[name="usuarios[]"]:checked').each(function() {

    datos = { 'id': $(this).val() };
    operacionServidor("usuarios", "DELETE", datos);
  });
  
  $('#modalEliminarUsuario').modal('hide');
  cargarListaUsuarios();
}

function cargarUsuario() {

  var id = getUrlParameter('id');
  if (id !== undefined ) {
  
    data = { id : id };
    $.ajax({
      url: URLSERVER + 'usuario',
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
        $('#nombres').val(datos.nombre_usuario);
        $('#apellidos').val(datos.apellido_usuario);
        $('#login').val(datos.login_usuario);
        $('#contrasena').val(datos.password_usuario);
        $('#repetirContrasena').val(datos.password_usuario);
        $('#ci').val(datos.ci_usuario);
        $('#telefono').val(datos.telefono_usuario);
        
        $.get( URLSERVER + "tipos_usuarios", function( data ) {
          var html = "<option value=\"0\">Selecione Tipo de Usuario</option>"
          for(index in data) {

            var tipo = data[index];
            var seleccionado = "";
            
            if (tipo.id === datos.id_tipo_usuario) {
            
              seleccionado = "selected";
            }
            
            html += "<option value=\" " + tipo.id + " \" "+ 
                seleccionado + " >" +
                tipo.tipo_usuario + "</option>"
          };
          $('#tipos').html(html);
        });
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(xhr.responseText);

        $("#alertCargarUsuario").show("slow");
      }
    });
  }
}

function modificarUsuario() {

  datos = {
  
    'id': $('#id').val(),
    'nombres': $('#nombres').val(),
    'apellidos': $('#apellidos').val(),
    'usuario': $('#login').val(),
    'contrasena': $('#contrasena').val(),
    'ci': $('#ci').val(),
    'telefono': $('#telefono').val(),
    'id_tipo_usuario': $('#tipos').val()
  };
  
  operacionServidor("usuarios", "PUT", datos);
  $('#modalModificarUsuario').modal('hide');
}

function limpiarCampos(campos) {

  for (campo in campos) {
  
    $('#' + campo).val('');
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