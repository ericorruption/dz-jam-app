'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('startCtrl', ['$scope', function($scope) {
        $scope.slide = 'slide-start';
    }])
    .controller('introCtrl', ['$scope', function($scope) {
        $scope.slide = 'slide-left';
    }])
    .controller('preRoundCtrl', ['$location', '$scope', '$rootScope', '$routeParams', function ($location, $scope, $rootScope, $routeParams) {
        $scope.slide = 'slide-left';
        $scope.round = $rootScope.rounds[$routeParams.round - 1];

        $scope.$on('timer-stopped', function (event, data) {
            if (data.millis === 0) {
                setTimeout(function () {
                    $scope.$apply(function () {
                        $location.path('/round/' + $routeParams.round);
                    });
                }, 500);
            }
        });
    }])
    .controller('timerCtrl', ['$location', '$scope', '$rootScope', '$routeParams', function ($location, $scope, $rootScope, $routeParams) {
        $scope.slide = 'slide-left';
        $scope.roundNum = $routeParams.round;
        $scope.goTo = parseInt($scope.roundNum, 10) + 1;
        $scope.round = $rootScope.rounds[$routeParams.round - 1];
        $scope.timerRunning = true;
        $scope.isHelpHidden = true;
        $scope.timerFinished = false;

        if ($scope.roundNum === '3') {
            $scope.button = 'finish';
            $scope.buttonText = 'Finalizar Jam';
            $scope.goTo = '#/end';
        } else {
            $scope.button = 'continue';
            $scope.buttonText = 'Continue';
            $scope.goTo = '#/pre-round/' + (parseInt($scope.roundNum, 10) + 1);
        }

        $scope.startTimer = function () {
            $scope.$broadcast('timer-resume');
            $scope.timerRunning = true;
        };

        $scope.pauseTimer = function () {
            $scope.$broadcast('timer-stop');
            $scope.timerRunning = false;
        };

        $scope.addTime = function () {
            $scope.$broadcast('timer-add-cd-seconds', 5 * 60);
            $scope.$broadcast('timer-resume');
            $scope.timerFinished = false;
            $scope.timerRunning = true;
        };

        $scope.showHelp = function () {
            $scope.isHelpHidden = false;
            $scope.blur = 'blur';
        };

        $scope.hideHelp = function () {
            $scope.isHelpHidden = true;
            $scope.blur = '';
        };

        $scope.$on('timer-stopped', function (event, data){
            if (data.millis === 0) {
                if (navigator.notification){
                    navigator.notification.vibrate(1500); // 1.5 second
                }

                $scope.$apply(function () {
                    $scope.timerFinished = true;
                    $scope.timerRunning = false;
                });
            }
        });
    }])
    .controller('aboutCtrl', ['$scope', function ($scope) {
        $scope.slide = 'slide-left';
    }])
    .controller('endCtrl', ['$scope', function ($scope) {
        $scope.slide = 'slide-left';
    }]);