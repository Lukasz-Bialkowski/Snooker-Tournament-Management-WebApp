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

      $urlRouterProvider.otherwise('/scores');
      $stateProvider
        .state('scores', {
          url : '/scores',
          templateUrl : 'views/scores.tmpl.html',
          controller : 'ScoresCtrl'
      }).state('tournaments', {
          url : '/tournaments',
          templateUrl : 'views/tournaments.tmpl.html',
          controller : 'TournamentsCtrl'
      }).state('matches', {
          url : '/:tournamentId/matches',
          templateUrl : 'views/matches.tmpl.html',
          controller : 'MatchesCtrl'
      }).state('players', {
          url : '/players',
          templateUrl : 'views/players.tmpl.html',
          controller : 'PlayersCtrl'
      });

  }).factory('tournamentHTTPSrv', function($resource){

      var res = $resource('http://localhost:8080/snooker-competition-chart/tournaments/:operation/:tournamentId', {}, {
          list : {
            method : 'GET',
            isArray : true
          },
          get : {
              method : 'GET'
          },
          create : {
              method : 'GET',
              params : {
                  operation : 'create'
              }
          },
          save : {
              method : 'POST',
              params : {
                  operation : 'save'
              }
          },
          remove : {
              method : 'DELETE'
          }

      });
      return res;

}).factory('scoresHTTPSrv', function($resource){

      var res = $resource('http://localhost:8080/snooker-competition-chart/tournaments/:operation/:tournamentId/:subresource/:suboperation/:subresourceId', {}, {

          listMatches : {
              method : 'GET',
              params : {
                subresource : 'matches'
              },
              isArray : true
          },
          getMatch : {
              params : {
                subresource : 'matches'
              },
              method : 'GET'
          },
          saveMatch : {
              params : {
                subresource : 'matches',
                suboperation : 'save'
              },
              method : 'POST'
          },
          deleteMatch : {
              params : {
                subresource : 'matches'
              },
              method : 'DELETE'
          }

      });
      return res;

}).factory('playerHTTPSrv', function($resource){

      var res = $resource('http://localhost:8080/snooker-competition-chart/players/:operation/:playerId', {}, {
          list : {
              method : 'GET',
              isArray : true
          },
          get : {
              method : 'GET'
          },
          create : {
              method : 'GET',
              params : {
                  operation : 'create'
              }
          },
          save : {
              method : 'POST',
              params : {
                  operation : 'save'
              }
          },
          remove : {
              method : 'DELETE'
          }

      });
      return res;

}).factory('matchHTTPSrv', function($resource){

      var res = $resource('http://localhost:8080/snooker-competition-chart/tournaments/:tournamentId/:subresource/:suboperation/:subresourceId', {}, {
          list : {
              method : 'GET',
              params : {
                subresource : 'matches'
              },
              isArray : true
          },
          get : {
              params : {
                subresource : 'matches'
              },
              method : 'GET'
          },
          create : {
              method : 'GET',
              params : {
                  subresource : 'matches',
                  suboperation : 'create'
              }
          },
          save : {
              method : 'POST',
              params : {
                  subresource : 'matches',
                  suboperation : 'save'
              }
          },
          remove : {
              params : {
                subresource : 'matches'
              },
              method : 'DELETE'
          }

      });
      return res;

}).controller('ScoresCtrl',['$scope', 'tournamentHTTPSrv','scoresHTTPSrv','$stateParams','$state','playerHTTPSrv','matchHTTPSrv',
        function ($scope, tournamentHTTPSrv,scoresHTTPSrv,$stateParams,$state,playerHTTPSrv,matchHTTPSrv) {

        $scope.players = [];
        $scope.tournaments = [];
        $scope.matches = [];
        $scope.currentTournament;

        tournamentHTTPSrv.list({}, function(response){
          $scope.tournaments = response;
        });

        playerHTTPSrv.list({}, function(response){
          $scope.players = response;
        });

        $scope.tournamentMatches = function() {
            matchHTTPSrv.list({tournamentId : $scope.currentTournament.id}, function(response){
              $scope.matches = response;
            });
        };

        $scope.addMatch = function() {
          $state.go("matches", {tournamentId : $scope.currentTournament.id});
        };


}]).controller('TournamentsCtrl',['$scope', 'tournamentHTTPSrv','$stateParams','$state',
        function ($scope, tournamentHTTPSrv,$stateParams,$state) {
        $scope.current = {};

        tournamentHTTPSrv.create({}, function(response) {
            $scope.current = response;
        });

        $scope.save = function(item) {
          tournamentHTTPSrv.save(item, function(response){
            $scope.current=response;
          })
        };

        $scope.remove = function(item) {
          tournamentHTTPSrv.remove({tournamentId : item.id}, function(response){

          })
        };

}]).controller('PlayersCtrl',['$scope', 'tournamentHTTPSrv','$stateParams','$state','playerHTTPSrv',
        function ($scope, tournamentHTTPSrv,$stateParams,$state,playerHTTPSrv) {

        $scope.current = {};

        playerHTTPSrv.create({}, function(response) {
            $scope.current = response;
        });

        $scope.save = function(item) {
          playerHTTPSrv.save(item, function(response){
            $scope.current=response;
          })
        };

        $scope.remove = function(item) {
          playerHTTPSrv.remove({tournamentId : item.id}, function(response){

          })
        };

}]).controller('MatchesCtrl',['$scope', '$stateParams','$state','matchHTTPSrv','playerHTTPSrv','tournamentHTTPSrv',
        function ($scope, $stateParams,$state,matchHTTPSrv,playerHTTPSrv,tournamentHTTPSrv) {

        $scope.current = {};
        $scope.players = [];
        $scope.currentTournament = {};

        matchHTTPSrv.create({tournamentId : $stateParams.tournamentId}, function(response) {
            $scope.current = response;
        });

        playerHTTPSrv.list({}, function(response){
          $scope.players = response;
        });

        tournamentHTTPSrv.get({tournamentId : $stateParams.tournamentId}, function(response){
          $scope.currentTournament = response;
        });

        $scope.save = function(item) {
          matchHTTPSrv.save({tournamentId : $stateParams.tournamentId}, item, function(response){
            $scope.current=response;
          })
        };

        $scope.remove = function(item) {
          matchHTTPSrv.remove({tournamentId : $stateParams.tournamentId, subresourceId : item.id}, function(response){

          })
        };

}]);
