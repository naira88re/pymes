<?php
class MarcaProductoController extends BaseController {
public function mostrarMarcaProducto() { 
   
  $marcaProd = MarcaProducto::all();
  return $marcaProd;
 }
    
  public function guardarMarcaProducto() {
    
    try {
    
      $marcaProducto = new MarcaProducto;
      
      if (Input::has('nombre')) {
        
        $marcaProducto->nombre_marca_producto = Input::get('nombre');

        $marcaProducto-> timestamps = false;
        $marcaProducto->save();
        
        return $marcaProducto;

      } else {
      
        $mensaje = 'El campo \'nombre\' es requerido.';
        return Utils::enviarRespuesta('Datos incompletos', $mensaje, 500);
      }
    } catch(Exception $e) {
    
      return Utils::enviarRespuesta('Error', $e->getMessage(), 500);
    }
  }
    
  public function borrarMarcaProducto() {
    
    try {
    
      if (Input::has('id')) {
    
        $marcaProducto = MarcaProducto::findOrFail(Input::get('id'));

        $marcaProducto->delete();
      
        $mensaje = 'Marca con ID: '.Input::get('id').' eliminado';
        return Utils::enviarRespuesta('OK', $mensaje, 200);
      } else {
      
        $mensaje = 'El campo \'id\' es requerido.';
        return Utils::enviarRespuesta('Datos incompletos', $mensaje, 406);
      }
    } catch(Exception $e) {
    
      return Utils::enviarRespuesta('Error', $e->getMessage(), 500);
    }   
  }
    
    public function modificarMarcaProducto() {
        
      try {
    
        if (Input::has('id')) {
    
          $marcaProducto = MarcaProducto::findOrFail(Input::get('id'));
          $marcaProducto->nombre_marca_producto = Input::get('nombre', $marcaProducto->nombre_marcas_productos);
          $marcaProducto->timestamps = false;
          $marcaProducto-> save();

          return $marcaProducto;
        } else {
      
          $mensaje = 'El campo \'id\' es requerido.';
          return Utils::enviarRespuesta('Datos incompletos', $mensaje, 406);
        }
      } catch (Exception $e) {
    
        return Utils::enviarRespuesta('Error', $e->getMessage(), 500);
      }
    }
}