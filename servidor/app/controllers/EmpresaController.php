<?php
class EmpresaController extends BaseController{
public function mostrarEmpresa()
 { 
   $empresa = Empresa::all();
    return $empresa;
 }
    
    public function guardarEmpresa()
    {
        $empresa =new Empresa;
        $empresa->nombre_empresas ='cosbell';
        $empresa->timestamps=false;
        $empresa->save();
        
    }
    public function borrarEmpresa()
    {
       $empresa = Empresa::find(4);
       $empresa->delete();
    }
    
   public function modificarEmpresa()
    {
        $empresa = Empresa::find(5);
        $empresa ->nombre_empresas = 'unilever';
        $empresa->timestamps = false;
        $empresa-> save();
    }
}
