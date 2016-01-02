angular.module('starter.controllers', ['ionic', 'ngResource'])

.factory('FactoryService', function ($resource) {
    return $resource('http://localhost/pymes/public/empresas/:id', {},
    {
      'query': { method: 'GET', isArray: true },
      'get': {method: 'GET'}
    });
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('HomeCtrl', function($scope) {


})

.controller('FactoryCtrl', function($scope, $ionicModal, $timeout, FactoryService, FactoryDelete) {

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;

  $scope.items =  FactoryService.query();

  // Create the new factory modal that we will use later
  $ionicModal.fromTemplateUrl('templates/factories/new.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  /**
   * Function to close modal
   */
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  /**
   * Function to open modal
   */
  $scope.displayModal = function() {
    $scope.modal.show();
  };

  /**
   * Function to create a new Factory
   */
  $scope.factoryModel = {}; //define model
  $scope.posts = FactoryService.query();
  $scope.newFactory = function() {

    $scope.postData = {
      'nombre': $scope.factoryModel.name,
      'telefono': $scope.factoryModel.phone,
      'direccion': $scope.factoryModel.address
    };

    //Post information to server
    var post = new FactoryService($scope.postData);
    post.$save().then(function(res) {
      $scope.items.push(res);
      $timeout(function() {
        $scope.closeModal();
      }, 200);
    });
  };

  /**
   * Function to delete factory
   */
   $scope.deleteFactory = function(item) {

     //Delete information from server
     FactoryDelete.remove({id: item.id}, function(res) {

       console.log('response', res);
     });
    //  post.remove().then(function(res) {
    //    console.log('response', res);
    //    $scope.items =  FactoryGet.query();
    //  });
   };
})

.controller('ProductCtrl', function($scope, $ionicModal, $timeout) {

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;

  $scope.items = [
    { name: 'Detergente', code: 1, description: 'lo mejor para ropa' },
    { name: 'Ace', code: 2, description: 'Nuevo embase'},
    { name: 'Desengrasante', code: 3, description: 'quita todo tipo de mancha' },
    { name: 'Jabon liquido', code: 4, description: 'Suaviza las manos' },
    { name: 'Crema Corporal', code: 5, description: 'Con proteccion solar' },
    { name: 'Desengrasante', code: 6, description: 'lo mejor para ropa' }
  ];

  // New product modal section

  // Form data for the login modal
  $scope.newProductData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/products/new.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  // Open the new product modal
  $scope.displayForm = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.newProduct = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeModal();
    }, 1000);
  };
})

.controller('SaleCtrl', function($scope, $ionicModal, $timeout) {

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;

  $scope.items = [
    { amount: '1000', date: 'Lunes 12 Oct 2015', code: 1, description: 'Detergente, Jabon, Pasta dental, Desinfectante', client: 'Sonia Ortega' },
    { amount: '120', date: 'Martes 18 Dic 2015', code: 2, description: 'Shampoo, Pasta dental, Desinfectante', client: 'Marco Fernandez'},
    { amount: '360', date: 'Jueves 21 Sep 2015', code: 3, description: 'Quita manchas, Jabon', client: 'Ronald Torrico' },
    { amount: '480', date: 'Lunes 2 Ago 2015', code: 4, description: 'Shampoo, Detergente', client: 'Marco Valdivia' },
    { amount: '700', date: 'Viernes 14 Marz 2015', code: 5, description: 'Protector solar, Shampoo, Detergente', client: 'Miguel Hinojosa' },
    { amount: '12', date: 'Sabado 7 Nov 2015', code: 6, description: 'Pasta dental', client: 'Carlos Silva' }
  ];

  // New product modal section

  // Form data for the login modal
  $scope.newSaleData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/sales/new.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  // Open the new product modal
  $scope.displayForm = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.newSale = function() {
    console.log('new Sale', $scope.saleData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeModal();
    }, 1000);
  };
})
.controller('AccountCtrl', function($scope, $ionicModal, $timeout) {

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;

  $scope.items = [
    { date: 'Lunes 2 Ago 2015', reason: 'Venta', type: 'Entrada', amount: '1000' },
    { date: 'Jueves 21 Sep 2015', reason: 'Venta', type: 'Entrada', amount: '12'},
    { date: 'Viernes 22 Sep 2015', reason: 'Venta', type: 'Entrada', amount: '100' },
    { date: 'Lunes 12 Ene 2016', reason: 'Devolucion', type: 'Entrada', amount: '300' },
    { date: 'Miercoles 2 Mar 2016', reason: 'Alquiler', type: 'Salida', amount: '800' }
  ];

  // Form data for the login modal
  $scope.newAccountData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/accounts/new.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  // Open the new product modal
  $scope.displayForm = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.newAccount = function() {
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeModal();
    }, 1000);
  };
});
