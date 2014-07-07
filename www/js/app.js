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
      hint: 'Preencher JamBOARD',
      content: '<p class="big">Você tem 15 minutos para<br/>' +
        'preencher o <strong>JAM</strong>BOARD com:</p>' +
        '<ul><li>Briefing do Cliente</li>' +
        '<li>Seu Briefing</li>' +
        '<li>Pilares da Marca</li>' +
        '<li>Target</li>' +
        '<li>PopTalks</li>' +
        '<li>MarketTalks</li></ul>',
      remminutes: 15 * 60
    },{
      round: 2,
      image: 'jam',
      hint: 'Fazer Jam',
      content: '<p class="big">É hora da <strong>JAM</strong>!</p>' +
        '<p>Vire o JamBoard.<br/>' +
        'Anote as ideias no verso.<br/>' +
        'Agora vale tudo!</p>',
      remminutes: 30 * 60
    },{
      round: 3,
      image: 'tracks',
      hint: 'Registrar Tracks',
      content: '<p class="big">Escolha as 3 melhores ideias.</p>' +
        '<p>Vire o JamBoard<br/> e registre as tracks.</p>',
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
