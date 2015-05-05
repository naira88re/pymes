<?php
class MarcaProductoController extends BaseController{
public function mostrarMarcaProducto()
 { 
   $marcaProd = MarcaProducto::all();
    return $marcaProd;
 }
    
    
     public function guardarMarcaProducto()
    {
        $marcaPoducto = new MarcaProducto;
       $marcaPoducto->nombre_marcas_productos ='pepsodent';
        $marcaPoducto->timestamps=false;
        $marcaPoducto->save();
        
    }
    public function borrarMarcaProducto()
    {
    $marcaPoducto = MarcaProducto::find(5);
    $marcaPoducto->delete();
        
    }
    
    public function modificarMarcaProducto()
    {
        $marcaProducto = MarcaProducto::find(3);
        $marcaProducto ->nombre_marcas_productos = 'edgar';
        $marcaProducto->timestamps = false;
        $marcaProducto-> save();
    }
    
}