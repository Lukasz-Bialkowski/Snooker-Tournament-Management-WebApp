'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
 angular.module('mainApp', ['ngResource','ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/mainsearch');
      $stateProvider
        .state('mainsearch', {
          url : '/mainsearch',
          templateUrl : 'scripts/mainPageSearch.tmpl.html',
          controller : 'MainSearchCtrl'
      }).state('tournaments', {
          url : '/tournaments',
          templateUrl : 'scripts/tournaments.tmpl.html',
          controller : 'TournamentsCtrl'
      }).state('players', {
          url : '/players',
          templateUrl : 'scripts/players.tmpl.html',
          controller : 'PlayersCtrl'
      });

  }).factory('tournamentHTTPSrv', function($resource){

      var res = $resource('http://localhost:8080/snooker-competition-chart/tournaments/:operation/:tournamentId', {}, {
          listMatches : {
              method : 'GET',
              isArray : true
          },
          getMatch : {
              method : 'GET'
          },
          saveMatch : {
              method : 'POST'
          },
          deleteMatch : {
            method : 'DELETE'
          }

      });
      return res;

}).factory('playerHTTPSrv', function($resource){

      var res = $resource('http://localhost:8080/snooker-competition-chart/players/:operation/:playerId', {}, {
      });
      return res;

}).controller('MainSearchCtrl',['$scope', 'tournamentHTTPSrv','$stateParams','$state',
        function ($scope, tournamentHTTPSrv,$stateParams,$state) {

        $scope.matches = [{}];
        $scope.players = [{id : 3, name: "Grzegorz", surname: "Pawlak", telephone: "2301203323"},{id : 5, name: "Grzegorz", surname: "Pawlak", telephone: "2301203323"}];
        $scope.tournaments = [{id: 1, name:"gowno",year: 2010}];

}]).controller('TournamentsCtrl',['$scope', 'tournamentHTTPSrv','$stateParams','$state',
        function ($scope, tournamentHTTPSrv,$stateParams,$state) {

        $scope.matches = [{}];
        $scope.players = [{id : 3, name: "Grzegorz", surname: "Pawlak", telephone: "2301203323"},{id : 5, name: "Grzegorz", surname: "Pawlak", telephone: "2301203323"}];
        $scope.tournaments = [{id: 1, name:"gowno",year: 2010}];

}]).controller('PlayersCtrl',['$scope', 'tournamentHTTPSrv','$stateParams','$state','playerHTTPSrv',
        function ($scope, tournamentHTTPSrv,$stateParams,$state,playerHTTPSrv) {

        $scope.matches = [{}];
        $scope.players = [{id : 3, name: "Grzegorz", surname: "Pawlak", telephone: "2301203323"},{id : 5, name: "Grzegorz", surname: "Pawlak", telephone: "2301203323"}];
        $scope.tournaments = [{id: 1, name:"gowno",year: 2010}];

}]);
