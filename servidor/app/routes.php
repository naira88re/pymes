<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.

*/
Route::get('/', '');
//routes empresas
Route::get('empresas', 'EmpresaController@mostrarEmpresa');
Route::post('empresas', 'EmpresaController@guardarEmpresa');
Route::delete('empresas', 'EmpresaController@borrarEmpresa');
Route::put('empresas', 'EmpresaController@modificarEmpresa');

//routes clientes
Route::get('clientes', 'ClienteController@mostrarCliente');
Route::post('clientes', 'ClienteController@guardarCliente');
Route::delete('clientes/{id}', 'ClienteController@borrarCliente');
Route::put('clientes/{id}', 'ClienteController@modificarCliente');

//routes tipos_usuarios
Route:: get('tipos_usuarios', 'TipoUsuarioController@mostrarTiposUsuarios');
Route:: post('tipos_usuarios', 'TipoUsuarioController@guardarTipoUsuario');
Route:: delete('tipos_usuarios', 'TipoUsuarioController@borrarTipoUsuario');
Route:: put('tipos_usuarios', 'TipoUsuarioController@modificarTipoUsuario');

//routes usuarios
Route:: get('usuarios', 'UsuarioController@mostrarUsuarios');
Route:: post('usuario', 'UsuarioController@mostrarUsuario');
Route:: post('usuarios', 'UsuarioController@guardarUsuario');
Route:: delete('usuarios', 'UsuarioController@borrarUsuario');
Route:: put('usuarios', 'UsuarioController@modificarUsuario');

//routes marcas_producto
Route:: get('marcas_productos', 'MarcaProductoController@mostrarMarcaProducto');
Route:: post('marcas_productos', 'MarcaProductoController@guardarMarcaProducto');
Route:: delete('marcas_productos', 'MarcaProductoController@borrarMarcaProducto');
Route:: put('marcas_productos', 'MarcaProductoController@modificarMarcaProducto');

//routes producto
Route:: get('productos', 'ProductoController@mostrarProductos');
Route:: post('producto', 'ProductoController@mostrarProducto');
Route:: post('productos', 'ProductoController@guardarProducto');
Route:: delete('productos', 'ProductoController@borrarProducto');
Route:: put('productos', 'ProductoController@modificarProducto');

//routes tipo_sucrusal
Route:: get('tipos_sucursales', 'TipoSucursalController@mostrarTipoSucursal');
Route:: post('tipos_sucursales', 'TipoSucursalController@guardarTipoSucursal');
Route:: delete('tipos_sucursales', 'TipoSucursalController@borrarTipoSucursal');
Route:: put('tipos_sucursales', 'TipoSucursalController@modificarTipoSucursal');

//route detalles
Route:: get('detalles', 'DetalleController@mostrarDetalle');
Route:: post('detalles', 'DetalleController@guardarDetalle');
Route:: delete('detalles', 'DetalleController@borrarDetalle');
Route:: put('detalles', 'DetalleController@modificarDetalle');

// routes monto_compra
Route:: get('monto_compras', 'MontoCompraController@mostrarMontoCompra');
Route:: post('monto_compras', 'MontoCompraController@guardarMontoCompra');
Route:: delete('momto_compras', 'MontoCompraController@borrarMontoCompra');
Route:: put('monto_compras', 'MontoCompraController@modificarMontoCompra');

//routes sucursales
Route:: get('sucursales', 'SucursalController@mostrarSucursal');
Route:: post('sucursales', 'SucursalController@guardarSucursal');
Route:: delete('sucursales', 'SucursalController@borrarSucursal');
Route:: put('sucursales', 'SucursalController@modificarSucursal');