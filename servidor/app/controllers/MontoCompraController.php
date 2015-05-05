<?php
 class MontoCompraController extends BaseController
{
    public function mostrarMontoCompra()
    {
        $montoCompra =MontoCompra::all();
        return $montoCompra;
    }
     
     public function guardarMontoCompra()
     {
         $montoCompra = new MontoCompra;
         $montoCompra->fecha_monto_compras = '20141010140022';
         $montoCompra->timestamps = false;
         $montoCompra->save();
     }
     
      public function borrarMontoCompra()
    {
       $montoCompra = MontoCompra::find(1);
       $montoCompra->delete();
    }
    
   public function modificarMontoCompra()
    {
        $montoCompra = MontoCompra::find(2);
        $montoCompra ->fecha_monto_compras = '20121010101023';
        $montoCompra->timestamps = false;
        $montoCompra-> save();
    }
}



    