<?php
class TipoSucursalController extends BaseController{
public function mostrarTipoSucursal()
 { 
   $tipoSucursal = TipoSucursal::all();
    return $tipoSucursal;
 }
    
    
     public function guardarTipoSucursal()
    {
        $tipoSucursal =new TipoSucursal;
        $tipoSucursal->nombre_tipos_sucursales ='romero';
        $tipoSucursal->timestamps=false;
        $tipoSucursal->save();
        
    }
    public function borrarTipoSucursal()
    {
      $tipoSucursal= TipoSucursal::find(1);
      $tipoSucursal->delete();
        
    }
    
    public function modificarTipoSucursal()
    {
        $tipoSucursal = TipoSucursal::find(2);
        $tipoSucursal->nombre_tipos_sucursales ='gabriel';
        $tipoSucursal->timestamps=false;
        $tipoSucursal->save();
    }
}