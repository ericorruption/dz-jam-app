'use strict';

window.addEventListener('load', function() {
    new FastClick(document.body);
}, false);

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'ngSanitize',
  'myApp.controllers',
  'timer'
]).
run(function($rootScope) {
    $rootScope.rounds = [{
      round: 1,
      image: 'jamboard',
      hint: 'Preencher <strong>Context area</strong>',
      content: '<p class="big">Você tem 15 minutos para<br/>' +
        'preencher a <strong>Context Area</strong> do <strong>JAM</strong>BOARD com:</p>' +
        '<ul><li>Briefing do Cliente</li>' +
        '<li>Seu Briefing</li>' +
        '<li>Pilares da Marca</li>' +
        '<li>Target</li>' +
        '<li>PopTalks</li>' +
        '<li>Market Talks</li></ul>',
      remminutes: 15 * 60
    },{
      round: 2,
      image: 'jam',
      hint: '<strong>JAM</strong>SESSION',
      content: '<p class="big">É hora do caos!</p>' +
        '<p>Use o verso do <strong>JAM</strong>BOARD<br/>' +
        'para anotar as ideias.<br/>' +
        'Você tem 30 minutos.</p>',
      remminutes: 30 * 60
    },{
      round: 3,
      image: 'tracks',
      hint: 'Registrar <strong>TRACKS</strong>',
      content: '<p class="big">Escolha as 3 melhores ideias!</p>' +
        '<p>Elas serão suas tracks e você tem<br/>' +
        '15 minutos para registrá-las no JAMBOARD</p>',
      remminutes: 15 * 60
    }];
}).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'start.html',
        controller: 'startCtrl'
    });

    $routeProvider.when('/intro', {
        templateUrl: 'intro.html',
        controller: 'introCtrl'
    });

    $routeProvider.when('/pre-round/:round', {
        templateUrl: 'pre-round.html',
        controller: 'preRoundCtrl'
    });

    $routeProvider.when('/round/:round', {
        templateUrl: 'timer.html',
        controller: 'timerCtrl'
    });

    $routeProvider.when('/end', {
        templateUrl: 'end.html',
        controller: 'endCtrl'
    });

    $routeProvider.when('/about', {
        templateUrl: 'about.html',
        controller: 'aboutCtrl'
    });

    $routeProvider.otherwise({redirectTo: '/'});
}]);
