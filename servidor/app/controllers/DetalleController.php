<?php
class DetalleController extends BaseController{
  public function mostrarDetalle()
  { 
   $detalle = Detalle::all();
    return $detalle;
  }
   
    public function guardarDetalle()
    {
        $detalle =new Detalle;
        $detalle ->fecha_venc_detalles ='20141010140030';
        $detalle->fecha_elab_detalles = '20141011140040';
        $detalle->timestamps=false;
        $detalle ->save();
        
    }
    
      public function borrarDetalle()
    {
        //echo $id;
      $detalle = Detalle::find(3);
      $detalle->delete();
        
    }
    
    public function modificarDetalle()
    {
        $detalle = Detalle::find(3);
        $detalle->fecha_venc_detalles = '20131010140031';
        $detalle->fecha_elab_detalles = '20121111111112';
        $detalle->timestamps=false;
        $detalle->save();
        //echo $detalle;
    }
  
}