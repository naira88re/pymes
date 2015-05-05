<?php

class Utils {

  public static function enviarRespuesta($nombre, $descripcion, $tipo) {

    $contenido = [$nombre, $descripcion];
    
    $respuesta = Response::make($contenido, $tipo);
    $respuesta->header('Content-Type', 'application/json');
    
    return $respuesta;
  }
}