<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TablaTiposSucursales extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		
      Schema::create('tipos_sucursales',function($table)
      {                
		$table->increments('id');
        $table->string('nombre_tipo_sucursal');
        
	  });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('tipos_sucursales');
	}

}
