
angular.module('pymes', ['ngRoute', 'pymes.controladores', 'pymes.servicios'])

.config(function($routeProvider) {

  $routeProvider.
      when('/inicio', { templateUrl:'../alert/summary.html' }).
      when('/nuevoProducto', { templateUrl: '../alert/list.html'}).
      when('/listaProducto', { templateUrl: '../sensor/list.html'}).
      when('/nuevoUsuario', { templateUrl: '../sensor/new.html'}).
      when('/listarUsuario', { templateUrl: '../setting/index.html'}).
      when('/venta', { templateUrl: '../user/list.html'}).      
      otherwise({ redirectTo: '/', templateUrl: '../login.html' });
});
