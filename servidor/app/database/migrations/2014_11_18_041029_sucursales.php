<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Sucursales extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
            Schema::create('sucursales', function($table) {
        
                $table->increments('id');
                $table->string('direccion_sucursal');
                $table->string('telefono_sucursal');
                $table->integer('numero_sucursal');
                $table->integer('id_tipo_sucursal')->unsigned();
                $table->foreign('id_tipo_sucursal')->references('id')->on('tipos_sucursales');
            });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('sucursales');
	}
}
