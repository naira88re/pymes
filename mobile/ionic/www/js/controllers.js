angular.module('starter.controllers', [])

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

.controller('FactoryCtrl', function($scope, $ionicModal, $timeout) {

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;

  $scope.items = [
    { name: 'Unilever', code: 1, phone: '71721222' },
    { name: 'Loreal', code: 2, phone: '4232343'},
    { name: 'Nivea', code: 3, phone: '43433112' },
    { name: 'Gillete', code: 4, phone: '7432233' }
  ];
  
  // New product modal section
  
  // Form data for the login modal
  $scope.newProductData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/factories/new.html', {
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
  $scope.newFactory = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeModal();
    }, 1000);
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
});
