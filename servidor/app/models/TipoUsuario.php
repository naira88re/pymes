<?php
class TipoUsuario extends Eloquent  {

  protected $table = 'tipos_usuarios';
  
  public function usuarios() {
    return $this->hasMany('Usuario');
  }
}