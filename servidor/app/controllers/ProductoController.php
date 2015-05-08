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
  * Description: Mostrar informacion de un producto especifico
  * Method: GET
  * Return: JSON
  */
  public function mostrarProducto() {
  
    try {
    
      if (Input::has('id')) {
      
        $producto = Producto::findOrFail(Input::get('id'));
        return $producto;
      }
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
          Input::has('medida_producto') && Input::has('cantidad_producto') && 
          Input::has('precio_neto_producto') && Input::has('precio_venta_producto')&&
          Input::has('id_marca_producto') ) {
        
        $producto->codigo_producto = Input::get('codigo_producto');
        $producto->nombre_producto = Input::get('nombre_producto');
        $producto->medida_producto = Input::get('medida_producto');
        $producto->cantidad_producto = Input::get('cantidad_producto');
        $producto->precio_neto_producto = Input::get('precio_neto_producto');
        $producto->precio_venta_producto = Input::get('precio_venta_producto');
        
        $marca = MarcaProducto::findOrFail(Input::get('id_marca_producto'));
        $producto->id_marca_producto = $marca->id;

        $producto-> timestamps = false;
        $producto ->save();
        
        return $producto;

      } else {
      
        $mensaje = 'Los campos \'codigo\', \'nombre\', \'medida\', \'cantidad\', \'cantidad\', \'precio neto\' y \'precio venta\' son requeridos.';
        return Utils::enviarRespuesta('Datos incompletos', $mensaje, 500);
      }
    } catch(Exception $e) {
      
      return Utils::enviarRespuesta('Error', $e->getMessage(), 500);
    }
  }

  /*
  * Description: Eliminar un producto de BD
  * Method: DELETE
  * Return: JSON
  */
  public function borrarProducto() {
    
    try {
    
      if (Input::has('id')) {
    
        $producto = Producto::findOrFail(Input::get('id'));

        $producto->delete();
      
        $mensaje = 'Producto con ID: '.Input::get('id').' eliminado';
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
  * Description: Modificar un producto de BD
  * Method: PUT
  * Return: JSON
  */
  public function modificarProducto() {
    try {
    
      if (Input::has('id')) {
    
        $producto = Producto::findOrFail(Input::get('id'));

        $producto->codigo_producto = Input::get('codigo_producto', $producto->codigo_producto);
        $producto->nombre_producto = Input::get('nombre_producto', $producto->nombre_producto);
        $producto->medida_producto = Input::get('medida_producto', $producto->medida_producto);
        $producto->cantidad_producto = Input::get('cantidad_producto', $producto->cantidad_producto);
        $producto->precio_neto_producto = Input::get('precio_neto_producto', $producto->precio_neto_producto);
        $producto->precio_venta_producto = Input::get('precio_venta_producto', $producto->precio_venta_producto);
        $producto->id_marca_producto = Input::get('id_marca_producto', $producto->id_marca_producto);
        
        $producto->timestamps = false;
        $producto-> save();

        return $producto;
      } else {
      
        $mensaje = 'El campo \'id\' es requerido.';
        return Utils::enviarRespuesta('Datos incompletos', $mensaje, 406);
      }
    } catch (Exception $e) {
    
      return Utils::enviarRespuesta('Error', $e->getMessage(), 500);
    }
  }
}