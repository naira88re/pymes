<?php
class Usuario extends Eloquent  {

  protected $table = 'usuarios';
  
  public function tipos() {
    return $this->belongsTo('TipoUsuario', 'id');
  }
}