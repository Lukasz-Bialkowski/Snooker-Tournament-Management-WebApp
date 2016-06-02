'use strict';
angular.module('myApp.controllers')
.controller('MatchesCtrl',['$scope', '$stateParams','$state','matchHTTPSrv','playerHTTPSrv','tournamentHTTPSrv',
        function ($scope, $stateParams,$state,matchHTTPSrv,playerHTTPSrv,tournamentHTTPSrv) {

        $scope.current = {};
        $scope.players = [];
        $scope.currentTournament = {};
        $scope.tournamentMatches = [];

        matchHTTPSrv.create({tournamentId : $stateParams.tournamentId}, function(response) {
            $scope.current = response;
        });

        $scope.getTournamentMatches = function() {
            matchHTTPSrv.tournamentMatches({tournamentId : $stateParams.tournamentId}, function(response){
              $scope.tournamentMatches = response;
            });
        };

        $scope.getTournamentMatches();

        playerHTTPSrv.list({}, function(response){
          $scope.players = response;
        });

        tournamentHTTPSrv.get({tournamentId : $stateParams.tournamentId}, function(response){
          $scope.currentTournament = response;
        });

        $scope.save = function(item) {
          matchHTTPSrv.save({tournamentId : $stateParams.tournamentId}, item, function(response){
            $scope.current=response;
            $("#saveModal").modal();
            $scope.getTournamentMatches();
          })
        };

        $scope.remove = function(item) {
          matchHTTPSrv.remove({tournamentId : $stateParams.tournamentId, subresourceId : item.id}, function(response){
            $scope.create();
          })
        };

        $scope.create = function() {
          matchHTTPSrv.create({tournamentId : $stateParams.tournamentId}, function(response) {
            $scope.current = response;
          });
        };

}]);
