<?php
class UsuarioController extends BaseController {

  /*
  * Description: Mostrar la lista de todos los usuarios registrados
  * Method: GET
  * Return: JSON
  */
  public function mostrarUsuarios() { 
    try {
    
      $usuarios = Usuario::all();
      return $usuarios;
    } catch(Exception $e) {
    
      return Utils::enviarRespuesta('Exception', $e->getMessage(), 500);
    }
  }
  
  /*
  * Description: Insertar nuevo usuario en BD
  * Method: POST
  * Return: JSON
  */
  public function guardarUsuario() {
    try {
    
      $usuario = new Usuario;

      if (Input::has('nombres') && Input::has('usuario') 
          && Input::has('contrasena') && Input::has('id_tipo_usuario') &&
         Input::has('apellidos')) {
        
        $usuario->nombre_usuario = Input::get('nombres');
        $usuario->apellido_usuario = Input::get('apellidos');
        $usuario->login_usuario = Input::get('usuario');
        $usuario->password_usuario = Input::get('contrasena');
        $tipo = TipoUsuario::findOrFail(Input::get('id_tipo_usuario'));
        $usuario->id_tipo_usuario = $tipo->id;
        
        //Columnas opcionales, si no existe dato, seran 0
        $usuario->ci_usuario = Input::get('ci', 0);
        $usuario->telefono_usuario = Input::get('telefono', 0);

        $usuario-> timestamps = false;
        $usuario->save();
        
        return $usuario;

      } else {
      
        $mensaje = 'Los campos \'nombres\', \'usuario\', \'contrasena\' y \'tipo\' son requeridos.';
        return Utils::enviarRespuesta('Datos incompletos', $mensaje, 500);
      }
    } catch(Exception $e) {
      
      return Utils::enviarRespuesta('Error', $e->getMessage(), 500);
    }
  }
  
  /*
  * Description: Mostrar informacion de un usuario especifico
  * Method: GET
  * Return: JSON
  */
  public function mostrarUsuario() {
  
    try {
    
      if (Input::has('id')) {
      
        $usuario = Usuario::findOrFail(Input::get('id'));
        return $usuario;
      }
    } catch(Exception $e) {
    
      return Utils::enviarRespuesta('Exception', $e->getMessage(), 500);
    }
  }

  /*
  * Description: Eliminar un usuario de BD
  * Method: DELETE
  * Return: JSON
  */
  public function borrarUsuario() {
    
    try {
    
      if (Input::has('id')) {
    
        $usuario = Usuario::findOrFail(Input::get('id'));

        $usuario->delete();
      
        $mensaje = 'Usuario con ID: '.Input::get('id').' eliminado';
        return Utils::enviarRespuesta('OK', $mensaje, 200);
      } else {
      
        $mensaje = 'El campo \'id\' es requerido.';
        return Utils::enviarRespuesta('Datos incompletos', $mensaje, 406);
      }
    } catch(Exception $e) {
    
      return Utils::enviarRespuesta('Error', $e->getMessage(), 500);
    }
  }

  /*
  * Description: Modificar un usuario de BD
  * Method: PUT
  * Return: JSON
  */
  public function modificarUsuario() {
    try {
    
      if (Input::has('id')) {
    
        $usuario = Usuario::findOrFail(Input::get('id'));

        $usuario->nombre_usuario = Input::get('nombres', $usuario->nombre_usuario);
        $usuario->apellido_usuario = Input::get('apellidos', $usuario->apellido_usuario);
        $usuario->login_usuario = Input::get('usuario', $usuario->login_usuario);
        $usuario->password_usuario = Input::get('contrasena', $usuario->password_usuario);
        $usuario->ci_usuario = Input::get('ci', $usuario->ci_usuario);
        $usuario->telefono_usuario = Input::get('telefono', $usuario->telefono_usuario);
        $usuario->id_tipo_usuario = Input::get('tipo_usuario', $usuario->id_tipo_usuario);
        $usuario->timestamps = false;

        $usuario-> save();

        return $usuario;
      } else {
      
        $mensaje = 'El campo \'id\' es requerido.';
        return Utils::enviarRespuesta('Datos incompletos', $mensaje, 406);
      }
    } catch (Exception $e) {
    
      return Utils::enviarRespuesta('Error', $e->getMessage(), 500);
    }
  }
}