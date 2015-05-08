<?php
class TipoUsuarioController extends BaseController {
  
  public function mostrarTiposUsuarios() { 
   
    $tiposUsuarios = TipoUsuario::all();
    return $tiposUsuarios;
  }
    
  public function guardarTipoUsuario() {
    
    try {
    
      $tipoUsuario = new TipoUsuario;
      
      if (Input::has('tipo_usuario')) {
        
        $tipoUsuario->tipo_usuario = Input::get('tipo_usuario');

        $tipoUsuario-> timestamps = false;
        $tipoUsuario->save();
        
        return $tipoUsuario;

      } else {
      
        $mensaje = 'El campo \'tipo_usuario\' es requerido.';
        return Utils::enviarRespuesta('Datos incompletos', $mensaje, 500);
      }
    } catch(Exception $e) {
    
      return Utils::enviarRespuesta('Error', $e->getMessage(), 500);
    }
  }
    
  public function borrarTipoUsuario() {
    
    try {
    
      if (Input::has('id')) {
    
        $tipoUsuario = TipoUsuario::findOrFail(Input::get('id'));

        $tipoUsuario->delete();
      
        $mensaje = 'TipoUsuario con ID: '.Input::get('id').' eliminado';
        return Utils::enviarRespuesta('OK', $mensaje, 200);
      } else {
      
        $mensaje = 'El campo \'id\' es requerido.';
        return Utils::enviarRespuesta('Datos incompletos', $mensaje, 406);
      }
    } catch(Exception $e) {
    
      return Utils::enviarRespuesta('Error', $e->getMessage(), 500);
    }   
  }
    
    public function modificarTipoUsuario() {
        
      try {
    
        if (Input::has('id')) {
    
          $tipoUsuario = TipoUsuario::findOrFail(Input::get('id'));
          $tipoUsuario->tipo_usuario = Input::get('tipo_usuario', $tipoUsuario->tipo_usuario);
          $tipoUsuario->timestamps = false;
          $tipoUsuario-> save();

          return $tipoUsuario;
        } else {
      
          $mensaje = 'El campo \'id\' es requerido.';
          return Utils::enviarRespuesta('Datos incompletos', $mensaje, 406);
        }
      } catch (Exception $e) {
    
        return Utils::enviarRespuesta('Error', $e->getMessage(), 500);
      }
    }
}