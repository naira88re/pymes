
<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TablaEmpresa extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void	 */
	public function up()
	{
		Schema::create('empresas', function($table){
        
            $table->increments('id');
            $table->string('nombre_empresa');
            $table->integer('telefono_empresa');
            $table->string('direccion_empresa');
            
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists ('empresas');
	}

}
