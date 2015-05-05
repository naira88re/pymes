<?php
class ClienteController extends BaseController{
public function mostrarCliente()
 { 
   $cliente = Cliente::all();
    return $cliente;
 }
     public function guardarCliente()
    {
        $cliente =new Cliente;
        $cliente->nombre_clientes ='naira';
        $cliente->timestamps=false;
        $cliente->save();
        
    }
    public function borrarCliente()
    {
        //echo $id;
      $cliente = Cliente::find(2);
     $cliente->delete();
        
    }
    
    public function modificarCliente()
    {
        $cliente = Cliente::find(3);
        $cliente->nombre_clientes ='gabriel';
        $cliente->timestamps=false;
        $cliente->save();
        echo $cliente;
    }
}