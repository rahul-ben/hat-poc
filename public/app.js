// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = angular.module('app', ['ui.router'])
    .config(['$urlRouterProvider','$stateProvider', '$httpProvider',
      function($urlRouterProvider, $stateProvider, $httpProvider) {
          $urlRouterProvider.otherwise('/dashboard');
          $stateProvider
              .state('main', {
                  abstract: true,
                  templateUrl: 'views/base.html'
              })
              .state('login', {
                  url: '/login',
                  templateUrl: 'views/login.html'
              })
              .state('dashboard', {
                  url: '/dashboard?query',
                  templateUrl: 'views/dashboard.html',
                  controller: 'dashboardController'
              })
    }]);




