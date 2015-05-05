<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TablaProductos extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('productos', function($table) {
        
          $table->increments('id');
          $table->string('codigo_producto');
          $table->integer('nombre_producto');
          $table->string('medida_producto');
          $table->float('cantidad_producto');
          $table->float('precio_neto_producto');
          $table->float('precio_venta_producto');

          $table->integer('id_marca_producto')->unsigned();
          $table->foreign('id_marca_producto')->references('id')->on('marcas_productos');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('productos');
	}

}
