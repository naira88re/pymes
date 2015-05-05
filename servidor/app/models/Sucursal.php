<?php
class Sucursal extends Eloquent {

    protected $table = 'sucursales';
    
    public function tipoSucursal() {
    
        return $this->hasOne('TipoSucursal');
        //return $this->hasOne('TipoSucursal', 'tipo_sucursal_id');
    }
}