<?php
class Producto extends Eloquent  {

  protected $table = 'productos';
    
  public function marcas() {
    return $this->belongsTo('MarcaProducto', 'id');
  }
}