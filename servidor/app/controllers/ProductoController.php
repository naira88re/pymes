<?php
class ProductoController extends BaseController {

  /*
  * Description: Mostrar la lista de todos los productos registrados
  * Method: GET
  * Return: JSON
  */
  public function mostrarProductos() { 
    try {
    
      $productos = Producto::all();
      return $productos;
    } catch(Exception $e) {
    
      return Utils::enviarRespuesta('Exception', $e->getMessage(), 500);
    }
  }
  
  /*
  * Description: Insertar nuevo producto en BD
  * Method: POST
  * Return: JSON
  */
  public function guardarProducto() {
    try {
    
      $producto = new Producto;

      if (Input::has('codigo_producto') && Input::has('nombre_producto') &&
          Input::has('medida_producto') && Input::has('medida_producto') && ) {
        
        $producto->nombre_usuarios = Input::get('nombres');
        $producto->apellido_usuarios = Input::get('apellidos');
        $producto->login_usuarios = Input::get('usuario');
        $producto->password_usuarios = Input::get('contrasena');
        $producto->tipo_usuarios = Input::get('tipo_usuarios');
        
        if (Input::has('ci')) {
        
          $usuario->ci_usuarios = Input::get('ci');
        }
        
        if (Input::has('telefono')) {
        
          $usuario->telefono_usuarios = Input::get('telefono');
        }

        $usuario-> timestamps = false;
        $usuario ->save();
        
        return $usuario;

      } else {
      
        $mensaje = 'Los campos \'nombres\', \'usuario\' y \'contrasena\' son requeridos.';
        return Utils::enviarRespuesta('Datos incompletos', $mensaje, 500);
      }
    } catch(Exception $e) {
      
      return Utils::enviarRespuesta('Error', $e->getMessage(), 500);
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

        $usuario->nombre_usuarios = Input::get('nombres', $usuario->nombre_usuarios);
        $usuario->apellido_usuarios = Input::get('apellidos', $usuario->apellido_usuarios);
        $usuario->login_usuarios = Input::get('usuario', $usuario->login_usuarios);
        $usuario->password_usuarios = Input::get('contrasena', $usuario->password_usuarios);
        $usuario->ci_usuarios = Input::get('ci', $usuario->ci_usuarios);
        $usuario->telefono_usuarios = Input::get('telefono', $usuario->telefono_usuarios);
        $usuario->tipo_usuarios = Input::get('tipo_usuarios', $usuario->tipo_usuarios);
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