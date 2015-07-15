
/**
 * Inicializamos la pagina de registrar usuarios
 * @returns 
 */
function initRegistrarUsuarios() {

  cargarTiposUsuarios(); //Cargamos informacion de la BD
}

/**
 * Inicializamos la pagina de listar usuarios
 * @returns 
 */
function initListaUsuarios() {

  cargarListaUsuarios();
}

/**
 * Inicializamos la pagina de modificar usuarios
 * @returns 
 */
function initModificarUsuario() {

  cargarUsuario();
}

/**
 * Funcion utilizada para autenticar usuarios 
 * utilizando informacion de BD
 * @returns 
 */
function autenticar() {

  datos = {
  
    'nombreUsuario': $('#nombreUsuario').val(),
    'contrasena': $('#password').val()
  };
  
  operacionServidor("autenticar", "POST", datos);
  $('#nombreUsuario').val('');
  $('#password').val('');
}

/**
 * Funcion utilizada para registrar nuevos usuarios en BD
 * @returns 
 */
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

  $('#nombres').val('');
  $('#apellidos').val('');
  $('#login').val('');
  $('#contrasena').val('');
  $('#repetirContrasena').val('');
  $('#ci').val('');
  $('#telefono').val('');
  $("div.divTipo select").val('0');
}

/**
 * Funcion utilizada para obtener todos los tipos de usuarios
 * registrados en BD
 * @param {int} id
 * @returns 
 */
function cargarTiposUsuarios(id) {

  $.get( URLSERVER + "tipos_usuarios", function( data ) {
    var html = "<option value=\"0\">Selecione Tipo de Usuario</option>";
    var selected = '';
    for(index in data) {

      var tipo = data[index];
      if (id !== undefined && id === tipo.id) {
        
        selected = ' selected ';
      }

      html += "<option" + selected + " value=\" " + tipo.id + " \" >" +
          tipo.tipo_usuario + "</option>";
    };
    
    $('#tipos').html(html);
  });
}

/**
 * Funcion utilizada para obtener todos los usuarios
 * registrados en BD
 * @returns 
 */
function cargarListaUsuarios() {

  $.get( URLSERVER + "usuarios", function( data ) {

    var html = "";
    var usuario;
    $.get( URLSERVER + "tipos_usuarios", function( tipos ) {

      for(var index in data) {

        usuario = data[index];
        var tipo = getTipo(usuario.id_tipo_usuario, tipos);

        html += 
        "<tr onclick=\"mostrarModalModificar(" + usuario.id + ");\">" + 
        "<td>" + usuario.nombre_usuario + "</td>" +
        "<td>" + usuario.apellido_usuario + "</td>"+
        "<td>" + usuario.ci_usuario + "</td>" +
        "<td>" + usuario.telefono_usuario +"</td>" +
        "<td>" + usuario.login_usuario + "</td>" +
        "<td>" + tipo.tipo_usuario + "</td>" +
        "<td><a class=\"btn btn-info btn-lg btn-block\" onclick=\"mostrarModalEliminar(" + usuario.id + ", event)\"><span class=\"glyphicon glyphicon-trash\"> </span></a></td>" + 
        "</tr>";
      };

      $('.table-condensed tbody').html(html);
    });

    $('#listaUsuarios').html(html);
  });
}

/**
 * Funcion utilizada para obtener el tipo de un usuario
 * basado en un conjunto de usuarios y un id espcifico
 * @param {int} id
 * @param {array} usuarios
 * @returns {Usuario}
 */
function getTipo(id, usuarios) {

  for(var index in usuarios) {
    
    if (usuarios[index].id === id) {
      return usuarios[index];
    }
  }
}

/**
 * Funcion que nos permite eliminar usuarios de la BD
 * @returns 
 */
function elminarUsuario() {

  var id = $('#modalEliminarUsuario').attr('data-id-usuario');

  datos = { 'id': id };
  operacionServidor("usuarios", "DELETE", datos);

  $('#modalEliminarUsuario').attr('data-id-usuario', '');
  $('#modalEliminarUsuario').modal('hide');
  cargarListaUsuarios();
}


/**
 * Funcion DEPRECADA NO UTILIZAR
 * Funcion que nos permite un usuario de BD
 * @returns
 */
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
          var html = "<option value=\"0\">Selecione Tipo de Usuario</option>";
          for(index in data) {

            var tipo = data[index];
            var seleccionado = "";
            
            if (tipo.id === datos.id_tipo_usuario) {
            
              seleccionado = "selected";
            }
            
            html += "<option value=\" " + tipo.id + " \" "+ 
                seleccionado + " >" +
                tipo.tipo_usuario + "</option>";
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
    'nombres': $('#nombre').val(),
    'apellidos': $('#apellido').val(),
    'usuario': $('#cuenta').val(),
    'contrasena': $('#contrasena').val(),
    'ci': $('#ci').val(),
    'telefono': $('#telefono').val(),
    'id_tipo_usuario': $('#tipos').val()
  };
  
  operacionServidor("usuarios", "PUT", datos);
  $('#modalModificarUsuario').modal('hide');
  cargarListaUsuarios();
}

/**
 * Funcion utilizada para mostrar los datos de
 * un producto especifico
 * 
 * @param {int} id
 * @returns 
 */
function mostrarModalModificar(id) {
  
  if (id !== undefined ) {
  
    data = { id : id };
    $.ajax({
      url: URLSERVER + 'usuarios/' + id,
      type: 'GET',
      dataType: 'json',
      data: JSON.stringify(data),
      processData: false,
      contentType: 'application/json',
      CrossDomain: true,
      async: false,
      success: function (datos) {
        
        console.log('datos', datos);
        $.get( URLSERVER + "tipos_usuarios/" + datos.id_tipo_usuario, function( tipo ) {
          
          $('#modalModificarUsuario').modal('show');
          $('#id').val(datos.id);
          $('#nombre').val(datos.nombre_usuario);
          $('#apellido').val(datos.apellido_usuario);
          $('#ci').val(datos.ci_usuario);
          $('#telefono').val(datos.telefono_usuario);
          $('#cuenta').val(datos.login_usuario);
          cargarTiposUsuarios(tipo.id);
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

/**
 * Funcion que nos permite mostrar 
 * la ventana de dialogo para eliminar un usuario determinado
 * @param {int} id
 * @param {object} event
 * @returns 
 */
function mostrarModalEliminar(id, event) {
  
    event.stopPropagation();
    $('#modalEliminarUsuario').modal('show');
    $('#modalEliminarUsuario').attr('data-id-usuario', id);
}