<?php
class MarcaProducto extends Eloquent  {

  protected $table = 'marcas_productos';
  
  public function productos() {
    return $this->hasMany('Producto');
  }
}