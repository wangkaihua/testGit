// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
//angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
var utilsModule = angular.module('utilsModule', []);
var goodsModule = angular.module('goodsModule', []);
var loginModule = angular.module('loginModule', []);//登陆模块
var mainModule = angular.module('mainModule', []);//主页面模块
var app = angular.module('app', ['loginModule',
  'utilsModule',
  'ionic',
  'mainModule',
  'goodsModule','ngCordova']);

app.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    console.log("app.run");
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      window.StatusBar.overlaysWebView(true);
    }
  });
})

app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.views.swipeBackEnabled(false);
  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');
  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');
  $stateProvider

    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login/login.html',
      controller: 'loginCtrl'
    })
    .state('tab.main', {
      url: '/main',
      views: {
        'tab-main': {
          templateUrl: 'templates/main/main.html',
          controller: 'mainCtrl'
        }
      }
    })
    .state('tab.goods', {
      url: '/goods',
      views: {
        'tab-goods': {
          templateUrl: 'templates/goods/goods.html',
          controller: 'goodsCtrl'
        }
      }
    })
    .state('tab.order', {
      url: '/order',
      views: {
        'tab-order': {
          templateUrl: 'templates/order/order.html',
          controller: 'orderCtrl'
        }
      }
    });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
