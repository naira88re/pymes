<?php
class TipoSucursal extends Eloquent  {

	protected $table = 'tipos_sucursales';
    
    public function sucursal()
    {
      return $this->belongsTo('Sucursal');
    }
}