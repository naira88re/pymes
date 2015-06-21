// Definimos la ruta del proveedor de los servicios REST
var URLSERVER = 'http://nairare.gabitosoft.com/pymes/public/';

/**
 * Funcion para crear tipos de usuarios
 * @returns 
 */
function crearTipoUsuario() {
  
  datos = {
  
    'tipo_usuario': $('#nombre').val()
  };
  
  operacionServidor("tipos_usuarios", "POST", datos);
  $('#nombre').val('');
}
