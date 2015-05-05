<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TablaUsuarios extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		 Schema::create('usuarios',function($table)
      {                
		$table->increments('id');
        $table->string('nombre_usuario');
        $table->string('apellido_usuario');
        $table->string('login_usuario');
        $table->string('password_usuario');  
        $table->integer('ci_usuario');
        $table->integer('telefono_usuario');
        
        $table->integer('id_tipo_usuario')->unsigned();
        $table->foreign('id_tipo_usuario')->references('id')->on('tipo_usuarios');
	  });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('usuarios');
	}

}
